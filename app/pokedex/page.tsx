import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import PokedexGrid from "@/components/PokedexGrid";
import type { SpeciesRow } from "@/lib/supabase";

export default async function PokedexPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const [speciesResult, discoveriesResult] = await Promise.all([
    supabase
      .from("species")
      .select("*")
      .order("pokedex_number", { ascending: true }),
    supabase
      .from("discoveries")
      .select("species_id, photo_url")
      .eq("user_id", session.user.id),
  ]);

  const species = (speciesResult.data as SpeciesRow[]) ?? [];
  const discoveries = discoveriesResult.data ?? [];
  const unlockedIds = new Set(discoveries.map((d) => d.species_id as string));
  const discoveryPhotos = new Map<string, string | null>(
    discoveries.map((d) => [d.species_id as string, d.photo_url as string | null])
  );

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div
        className="bg-pokedex-red border-b-4 border-pokedex-darkred px-2 flex justify-between items-center sticky top-0 z-30"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)", minHeight: 56 }}
      >
        <Link
          href="/leaderboard"
          className="tap-target font-pixel text-[10px] px-3 bg-black text-white border border-red-800"
        >
          RANKS
        </Link>
        <span className="font-pixel text-[9px] text-red-200">
          {unlockedIds.size}/{species.length} CAPTURED
        </span>
        <Link
          href="/profile"
          className="tap-target font-pixel text-[10px] px-3 bg-black text-white border border-red-800"
        >
          PROFILE
        </Link>
      </div>

      {/* Content — pb-28 gives room above the FAB */}
      <div className="flex-1 px-4 py-6 pb-28 max-w-7xl mx-auto w-full">
        <h1 className="font-pixel text-xs text-white mb-1">MY POKÉDEX</h1>
        <p className="font-pixel text-[8px] text-gray-500 mb-6">
          LOS ANGELES REGION
        </p>

        {species.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-pixel text-gray-500 text-[9px]">
              No species data loaded.
            </p>
            <p className="font-pixel text-gray-600 text-[8px] mt-2">
              Run the seed script to populate species.
            </p>
          </div>
        ) : (
          <PokedexGrid species={species} unlockedIds={unlockedIds} discoveryPhotos={discoveryPhotos} />
        )}
      </div>

      {/* Floating scan button — thumb-reachable at bottom of screen */}
      <Link
        href="/identify"
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 bg-pokedex-red border-t-4 border-pokedex-darkred font-pixel text-white text-[11px] active:bg-pokedex-darkred"
        style={{
          minHeight: 56,
          paddingBottom: "env(safe-area-inset-bottom, 8px)",
        }}
      >
        <span className="text-xl">📷</span>
        SCAN A BIRD
      </Link>
    </div>
  );
}
