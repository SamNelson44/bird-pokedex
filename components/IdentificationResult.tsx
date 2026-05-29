"use client";

import Link from "next/link";
import { clsx } from "clsx";

export interface IdentifyResponse {
  identified: boolean;
  in_la_list?: boolean;
  is_new_discovery?: boolean;
  species_id?: string;
  common_name?: string;
  scientific_name?: string;
  confidence?: "high" | "medium" | "low";
  description?: string;
  rarity?: "common" | "uncommon" | "rare" | "legendary" | "unknown";
  error?: string;
}

const rarityColors: Record<string, string> = {
  common: "text-pokedex-common border-pokedex-common",
  uncommon: "text-pokedex-uncommon border-pokedex-uncommon",
  rare: "text-pokedex-rare border-pokedex-rare",
  legendary: "text-pokedex-legendary border-pokedex-legendary",
  unknown: "text-gray-400 border-gray-400",
};

interface Props {
  result: IdentifyResponse;
  onTryAgain: () => void;
}

const confidenceColors = {
  high: "text-pokedex-common",
  medium: "text-pokedex-legendary",
  low: "text-orange-500",
};

function ActionButtons({
  speciesId,
  onTryAgain,
  scanLabel = "SCAN AGAIN",
}: {
  speciesId?: string;
  onTryAgain: () => void;
  scanLabel?: string;
}) {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {speciesId && (
        <Link
          href={`/species/${speciesId}`}
          className="font-pixel text-[9px] px-4 py-2 border-2 border-gray-500 text-gray-300 hover:border-white hover:text-white transition-colors"
        >
          VIEW ENTRY
        </Link>
      )}
      <Link
        href="/pokedex"
        className="font-pixel text-[9px] px-4 py-2 border-2 border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300 transition-colors"
      >
        MY DEX
      </Link>
      <button
        onClick={onTryAgain}
        className="font-pixel text-[9px] px-4 py-2 border-2 border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-colors"
      >
        {scanLabel}
      </button>
    </div>
  );
}

export default function IdentificationResult({ result, onTryAgain }: Props) {
  // No bird in photo
  if (!result.identified) {
    return (
      <div className="text-center space-y-4 p-6 border-2 border-gray-700 bg-pokedex-screen">
        <div className="text-4xl">📷</div>
        <p className="font-pixel text-xs text-gray-400">NO BIRD DETECTED</p>
        <p className="font-pixel text-[9px] text-gray-500">
          Make sure a bird is clearly visible in the photo
        </p>
        <button
          onClick={onTryAgain}
          className="font-pixel text-[9px] px-4 py-2 border-2 border-gray-600 text-gray-300 hover:border-pokedex-red hover:text-white transition-colors"
        >
          TRY AGAIN
        </button>
      </div>
    );
  }

  // New discovery — LA list or unknown
  if (result.is_new_discovery) {
    const isUnknown = !result.in_la_list;
    return (
      <div
        className={clsx(
          "text-center space-y-4 p-6 border-2 bg-pokedex-screen discovery-flash",
          isUnknown ? "border-gray-400" : "border-pokedex-red"
        )}
      >
        <div className="text-4xl animate-bounce">{isUnknown ? "🔍" : "🎉"}</div>
        <p
          className={clsx(
            "font-pixel text-xs blink",
            isUnknown ? "text-gray-300" : "text-pokedex-red"
          )}
        >
          {isUnknown ? "UNKNOWN SPECIES LOGGED!" : "NEW SPECIES CAPTURED!"}
        </p>

        {isUnknown && (
          <p className="font-pixel text-[7px] text-gray-500 leading-relaxed">
            Not in the LA region list — added to your dex as UNKNOWN
          </p>
        )}

        <div
          className={clsx(
            "border-2 p-3 bg-black",
            isUnknown ? "border-gray-600" : "border-pokedex-red"
          )}
        >
          <p className="font-pixel text-[11px] text-white mb-1">
            {result.common_name}
          </p>
          <p className="font-pixel text-[8px] text-gray-400 italic mb-2">
            {result.scientific_name}
          </p>
          <div className="flex items-center gap-3 mt-2">
            {result.rarity && (
              <span className={clsx(
                "font-pixel text-[7px] px-2 py-1 border",
                rarityColors[result.rarity] ?? "text-gray-400 border-gray-400"
              )}>
                ◆ {result.rarity.toUpperCase()}
              </span>
            )}
            {result.confidence && (
              <p className={clsx("font-pixel text-[7px]", confidenceColors[result.confidence])}>
                {result.confidence.toUpperCase()} CONFIDENCE
              </p>
            )}
          </div>
        </div>

        {result.description && (
          <p className="font-pixel text-[7px] text-gray-400 leading-relaxed">
            {result.description}
          </p>
        )}

        <ActionButtons speciesId={result.species_id} onTryAgain={onTryAgain} />
      </div>
    );
  }

  // Already captured
  return (
    <div className="text-center space-y-4 p-6 border-2 border-gray-600 bg-pokedex-screen">
      <div className="text-4xl">✓</div>
      <p className="font-pixel text-xs text-gray-400">ALREADY IN YOUR DEX</p>
      <div className="border border-gray-700 p-3 bg-black">
        <p className="font-pixel text-[11px] text-white mb-1">{result.common_name}</p>
        <p className="font-pixel text-[8px] text-gray-500 italic">{result.scientific_name}</p>
      </div>
      <ActionButtons
        speciesId={result.species_id}
        onTryAgain={onTryAgain}
        scanLabel="SCAN AGAIN"
      />
    </div>
  );
}
