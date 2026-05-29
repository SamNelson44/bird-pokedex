/**
 * Fetches real Wikipedia thumbnail URLs for all seeded species and
 * updates species.image_url in Supabase.
 *
 * Usage: npx tsx scripts/fetch-images.ts
 */
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getWikipediaImage(name: string): Promise<string | null> {
  const encoded = encodeURIComponent(name.replace(/ /g, "_"));
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`,
    { headers: { "User-Agent": "BirdDex/1.0 (bird identification app)" } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  // Prefer original image, fall back to thumbnail
  return data.originalimage?.source ?? data.thumbnail?.source ?? null;
}

async function run() {
  const { data: species, error } = await supabase
    .from("species")
    .select("id, name, scientific_name")
    .neq("rarity", "unknown")
    .order("pokedex_number");

  if (error || !species) {
    console.error("Failed to fetch species:", error?.message);
    process.exit(1);
  }

  console.log(`Fetching images for ${species.length} species...\n`);

  for (const s of species) {
    // Try common name first, then scientific name
    let imageUrl = await getWikipediaImage(s.name);
    if (!imageUrl) imageUrl = await getWikipediaImage(s.scientific_name);

    if (imageUrl) {
      const { error: updateError } = await supabase
        .from("species")
        .update({ image_url: imageUrl })
        .eq("id", s.id);

      if (updateError) {
        console.log(`✗ ${s.name} — DB update failed: ${updateError.message}`);
      } else {
        console.log(`✓ ${s.name}`);
      }
    } else {
      console.log(`✗ ${s.name} — no Wikipedia image found`);
    }

    // Stay within Wikipedia's rate limit
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log("\nDone!");
}

run();
