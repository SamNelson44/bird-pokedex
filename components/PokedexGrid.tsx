"use client";

import SpeciesCard from "./SpeciesCard";
import type { SpeciesRow } from "@/lib/supabase";

interface Props {
  species: SpeciesRow[];
  unlockedIds: Set<string>;
}

const RARITY_ORDER = ["common", "uncommon", "rare", "legendary", "unknown"] as const;

export default function PokedexGrid({ species, unlockedIds }: Props) {
  const unlockedCount = unlockedIds.size;

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-6 p-4 bg-pokedex-screen border-2 border-pokedex-red">
        <div className="flex justify-between items-center mb-2">
          <span className="font-pixel text-xs text-gray-300">PROGRESS</span>
          <span className="font-pixel text-xs text-pokedex-red">
            {unlockedCount}/{species.length} CAPTURED
          </span>
        </div>
        <div className="w-full h-3 bg-gray-800 border border-gray-600">
          <div
            className="h-full bg-pokedex-red transition-all duration-500"
            style={{ width: `${(unlockedCount / species.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Rarity sections */}
      {RARITY_ORDER.map((rarity) => {
        const tierSpecies = species.filter((s) => s.rarity === rarity);
        if (!tierSpecies.length) return null;
        return (
          <div key={rarity} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`font-pixel text-[10px] ${
                  rarity === "common"
                    ? "text-pokedex-common"
                    : rarity === "uncommon"
                      ? "text-pokedex-uncommon"
                      : rarity === "rare"
                        ? "text-pokedex-rare"
                        : rarity === "legendary"
                          ? "text-pokedex-legendary"
                          : "text-gray-400"
                }`}
              >
                ◆ {rarity.toUpperCase()}
              </span>
              <div className="flex-1 h-px bg-gray-700" />
              <span className="font-pixel text-[8px] text-gray-500">
                {tierSpecies.filter((s) => unlockedIds.has(s.id)).length}/
                {tierSpecies.length}
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              {tierSpecies.map((s) => (
                <SpeciesCard
                  key={s.id}
                  species={s}
                  isUnlocked={unlockedIds.has(s.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
