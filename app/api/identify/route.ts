import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { auth } from "@/lib/auth";
import { identifyBird } from "@/lib/anthropic";
import { supabase } from "@/lib/supabase";
import type { SpeciesRow } from "@/lib/supabase";

const DAILY_LIMIT = 20;
const MAX_IMAGE_DIMENSION = 1024;

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  // Rate limiting
  const today = new Date().toISOString().split("T")[0];
  const { data: usageRow } = await supabase
    .from("usage_logs")
    .select("identify_count")
    .eq("user_id", userId)
    .eq("date", today)
    .single();

  if (usageRow && usageRow.identify_count >= DAILY_LIMIT) {
    return NextResponse.json(
      { error: "Daily identification limit reached (20/day)" },
      { status: 429 }
    );
  }

  // Parse uploaded image
  const formData = await req.formData();
  const file = formData.get("image") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Unsupported image type. Use JPEG, PNG, or WebP." },
      { status: 400 }
    );
  }

  // Resize image before sending to Claude
  const buffer = Buffer.from(await file.arrayBuffer());
  const resized = await sharp(buffer)
    .resize(MAX_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 85 })
    .toBuffer();
  const base64 = resized.toString("base64");

  // Call Claude Vision
  let identification;
  try {
    identification = await identifyBird(base64, "image/jpeg");
  } catch {
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }

  if (!identification.identified) {
    await incrementUsage(userId, today);
    return NextResponse.json({ identified: false });
  }

  // Match against LA species list
  const { data: allSpecies } = await supabase
    .from("species")
    .select("id, name, aliases, scientific_name, rarity");

  const claudeName = identification.common_name?.toLowerCase() ?? "";
  const claudeScientific = identification.scientific_name?.toLowerCase() ?? "";

  const matched = (allSpecies as SpeciesRow[] | null)?.find((s) => {
    const nameMatch = s.name.toLowerCase() === claudeName;
    const sciMatch = s.scientific_name?.toLowerCase() === claudeScientific;
    const aliasMatch = s.aliases?.some(
      (a: string) => a.toLowerCase() === claudeName
    );
    return nameMatch || sciMatch || aliasMatch;
  });

  // Record usage
  await incrementUsage(userId, today);

  // Resolve species ID — either matched from LA list, or create an unknown entry
  let speciesId: string;
  let inLaList: boolean;

  if (!matched) {
    // Find or create an unknown species row
    const { data: inserted } = await supabase
      .from("species")
      .insert({
        name: identification.common_name,
        scientific_name: identification.scientific_name ?? "Unknown species",
        description: identification.description ?? "",
        habitat: "Identified outside the LA region species list",
        rarity: "unknown",
        fun_facts: [],
        image_url: null,
        aliases: [],
      })
      .select("id")
      .single();

    if (inserted) {
      speciesId = inserted.id;
    } else {
      // Name already exists as unknown — fetch it
      const { data: existing } = await supabase
        .from("species")
        .select("id")
        .eq("name", identification.common_name)
        .single();
      if (!existing) {
        return NextResponse.json({ error: "Failed to log species" }, { status: 500 });
      }
      speciesId = existing.id;
    }
    inLaList = false;
  } else {
    speciesId = matched.id;
    inLaList = true;
  }

  // Check if already discovered
  const { data: existing } = await supabase
    .from("discoveries")
    .select("id")
    .eq("user_id", userId)
    .eq("species_id", speciesId)
    .single();

  const isNewDiscovery = !existing;

  // Upload photo to Supabase Storage if new discovery
  let photoUrl: string | null = null;
  if (isNewDiscovery) {
    const storagePath = `discoveries/${userId}/${speciesId}.jpg`;
    const { error: uploadError } = await supabase.storage
      .from("Discovery-Photos")
      .upload(storagePath, resized, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (!uploadError) {
      const { data: pub } = supabase.storage
        .from("Discovery-Photos")
        .getPublicUrl(storagePath);
      photoUrl = pub.publicUrl ?? null;

      // For unknown species, use the discovery photo as the species image too
      if (!inLaList && photoUrl) {
        await supabase
          .from("species")
          .update({ image_url: photoUrl })
          .eq("id", speciesId);
      }
    }
  }

  // Upsert discovery
  if (isNewDiscovery) {
    await supabase.from("discoveries").insert({
      user_id: userId,
      species_id: speciesId,
      photo_url: photoUrl,
    });
  }

  return NextResponse.json({
    identified: true,
    in_la_list: inLaList,
    is_new_discovery: isNewDiscovery,
    species_id: speciesId,
    common_name: identification.common_name,
    scientific_name: identification.scientific_name,
    confidence: identification.confidence,
    description: identification.description,
    rarity: inLaList ? (matched as SpeciesRow)?.rarity : "unknown",
  });
}

async function incrementUsage(userId: string, date: string) {
  await supabase.rpc("increment_usage", { p_user_id: userId, p_date: date });
}
