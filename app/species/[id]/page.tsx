import Image from "next/image";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { SpeciesRow } from "@/lib/supabase";
import { clsx } from "clsx";

const rarityColors: Record<string, string> = {
  common: "text-pokedex-common border-pokedex-common/40",
  uncommon: "text-pokedex-uncommon border-pokedex-uncommon/40",
  rare: "text-pokedex-rare border-pokedex-rare/40",
  legendary: "text-pokedex-legendary border-pokedex-legendary/40",
  unknown: "text-gray-400 border-gray-500/40",
};

export default async function SpeciesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const [speciesResult, discoveryResult] = await Promise.all([
    supabase.from("species").select("*").eq("id", id).single(),
    supabase
      .from("discoveries")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("species_id", id)
      .single(),
  ]);

  if (!speciesResult.data) notFound();
  const species = speciesResult.data as SpeciesRow;

  // If not discovered, redirect to pokedex
  if (!discoveryResult.data) redirect("/pokedex");

  const discovery = discoveryResult.data;
  const displayImage = discovery.photo_url ?? species.image_url;

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-pokedex-red border-b-4 border-pokedex-darkred px-4 py-3 flex justify-between items-center sticky top-0 z-30">
        <Link href="/pokedex" className="font-pixel text-white text-[9px]">
          ◀ MY DEX
        </Link>
        <span className="font-pixel text-white text-[9px]">
          #{String(species.pokedex_number).padStart(3, "0")}
        </span>
        <Link
          href="/identify"
          className="font-pixel text-[9px] px-3 py-1 bg-black text-pokedex-red border border-red-800"
        >
          SCAN ▶
        </Link>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* Species image */}
        <div
          className={clsx(
            "relative w-full max-w-sm mx-auto border-2 mb-6",
            rarityColors[species.rarity]?.split(" ")[1] ?? "border-gray-500/40"
          )}
        >
          {displayImage ? (
            <Image
              src={displayImage}
              alt={species.name}
              width={400}
              height={400}
              className="w-full aspect-square object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full aspect-square bg-pokedex-screenlight flex items-center justify-center">
              <span className="font-pixel text-[9px] text-gray-600">NO IMAGE</span>
            </div>
          )}
          {discovery.photo_url && (
            <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1">
              <span className="font-pixel text-[6px] text-green-400">
                YOUR PHOTO
              </span>
            </div>
          )}
        </div>

        {/* Name & classification */}
        <div className="border-b-2 border-gray-800 pb-4 mb-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="font-pixel text-sm text-white mb-1 leading-relaxed">
                {species.name}
              </h1>
              <p className="font-pixel text-[8px] text-gray-400 italic">
                {species.scientific_name}
              </p>
            </div>
            <span
              className={clsx(
                "font-pixel text-[7px] px-2 py-1 border whitespace-nowrap",
                rarityColors[species.rarity]
              )}
            >
              {species.rarity.toUpperCase()}
            </span>
          </div>

          <p className="font-pixel text-[7px] text-gray-500 mt-3">
            CAPTURED:{" "}
            {new Date(discovery.discovered_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="font-pixel text-[8px] text-pokedex-red mb-2">
            ◆ DESCRIPTION
          </p>
          <p className="font-pixel text-[8px] text-gray-300 leading-relaxed">
            {species.description}
          </p>
        </div>

        {/* Habitat */}
        <div className="mb-6">
          <p className="font-pixel text-[8px] text-pokedex-red mb-2">
            ◆ HABITAT
          </p>
          <p className="font-pixel text-[8px] text-gray-300 leading-relaxed">
            {species.habitat}
          </p>
        </div>

        {/* Fun facts */}
        {species.fun_facts?.length > 0 && (
          <div className="mb-6">
            <p className="font-pixel text-[8px] text-pokedex-red mb-3">
              ◆ FUN FACTS
            </p>
            <ul className="space-y-3">
              {species.fun_facts.map((fact: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="font-pixel text-[7px] text-pokedex-red shrink-0">
                    {i + 1}.
                  </span>
                  <p className="font-pixel text-[7px] text-gray-400 leading-relaxed">
                    {fact}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
