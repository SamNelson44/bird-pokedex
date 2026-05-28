import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import type { SpeciesRow } from "@/lib/supabase";

interface Props {
  species: SpeciesRow;
  isUnlocked: boolean;
}

const rarityColors: Record<string, string> = {
  common: "text-pokedex-common",
  uncommon: "text-pokedex-uncommon",
  rare: "text-pokedex-rare",
  legendary: "text-pokedex-legendary",
  unknown: "text-gray-400",
};

const rarityGlow: Record<string, string> = {
  common: "glow-common",
  uncommon: "glow-uncommon",
  rare: "glow-rare",
  legendary: "glow-legendary",
  unknown: "glow-unknown",
};

const rarityBorders: Record<string, string> = {
  common: "border-pokedex-common/40",
  uncommon: "border-pokedex-uncommon/40",
  rare: "border-pokedex-rare/40",
  legendary: "border-pokedex-legendary/40",
  unknown: "border-gray-500/40",
};

export default function SpeciesCard({ species, isUnlocked }: Props) {
  const card = (
    <div
      className={clsx(
        "species-card relative flex flex-col border-2 rounded-none overflow-hidden cursor-pointer",
        "bg-pokedex-screen",
        isUnlocked
          ? [rarityBorders[species.rarity], rarityGlow[species.rarity]]
          : "border-gray-700"
      )}
    >
      {/* Number badge */}
      <div className="absolute top-1 left-1 z-20 text-[6px] text-gray-400 font-pixel">
        {species.pokedex_number
          ? `#${String(species.pokedex_number).padStart(3, "0")}`
          : "???"}
      </div>

      {/* Image area */}
      <div className="relative w-full aspect-square bg-pokedex-screenlight overflow-hidden">
        {isUnlocked ? (
          species.image_url ? (
            <Image
              src={species.image_url}
              alt={species.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 160px"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-2xl">🐦</span>
            </div>
          )
        ) : (
          <>
            {species.image_url && (
              <Image
                src={species.image_url}
                alt="???"
                fill
                className="object-cover species-silhouette"
                sizes="160px"
                unoptimized
              />
            )}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="font-pixel text-gray-500 text-xs">???</span>
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-2 flex flex-col gap-1">
        <p
          className={clsx(
            "font-pixel text-[7px] leading-tight truncate",
            isUnlocked ? "text-white" : "text-gray-600"
          )}
        >
          {isUnlocked ? species.name : "???"}
        </p>

        {/* Rarity dots */}
        <div className="flex gap-0.5 items-center">
          {["common", "uncommon", "rare", "legendary"].map((tier) => (
            <span
              key={tier}
              className={clsx(
                "inline-block w-1.5 h-1.5",
                isUnlocked && species.rarity === tier
                  ? rarityColors[tier].replace("text-", "bg-")
                  : species.rarity === tier
                    ? "bg-gray-600"
                    : "bg-transparent"
              )}
            />
          ))}
          {isUnlocked && (
            <span
              className={clsx(
                "font-pixel text-[5px] ml-1",
                rarityColors[species.rarity]
              )}
            >
              {species.rarity.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (!isUnlocked) return card;

  return <Link href={`/species/${species.id}`}>{card}</Link>;
}
