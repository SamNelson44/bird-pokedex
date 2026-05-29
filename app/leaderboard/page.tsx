import Link from "next/link";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { clsx } from "clsx";

const TOTAL_LA_SPECIES = 50;

const rankStyle = (rank: number) => {
  if (rank === 1) return "text-yellow-400";
  if (rank === 2) return "text-gray-300";
  if (rank === 3) return "text-amber-600";
  return "text-gray-600";
};

const rankLabel = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
};

export default async function LeaderboardPage() {
  const session = await auth();

  // 1. Get all LA species IDs (exclude unknowns)
  const { data: laSpecies } = await supabase
    .from("species")
    .select("id")
    .neq("rarity", "unknown");

  const laSpeciesIds = (laSpecies ?? []).map((s) => s.id);

  // 2. Get every discovery for those species
  const { data: discoveries } = await supabase
    .from("discoveries")
    .select("user_id")
    .in("species_id", laSpeciesIds.length ? laSpeciesIds : ["none"]);

  // 3. Count per user in JS
  const countMap = new Map<string, number>();
  (discoveries ?? []).forEach((d) => {
    countMap.set(d.user_id, (countMap.get(d.user_id) ?? 0) + 1);
  });

  const sorted = [...countMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50);

  // 4. Fetch names for the ranked users
  const userIds = sorted.map(([id]) => id);
  const { data: users } = userIds.length
    ? await supabase.from("users").select("id, name").in("id", userIds)
    : { data: [] };

  const userMap = new Map((users ?? []).map((u) => [u.id, u.name]));

  const rows = sorted.map(([userId, count]) => ({
    user_id: userId,
    user_name: (userMap.get(userId) as string) ?? "TRAINER",
    catch_count: count,
  }));

  const currentUserRank = session?.user?.id
    ? rows.findIndex((r) => r.user_id === session.user.id) + 1
    : 0;

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div
        className="bg-pokedex-red border-b-4 border-pokedex-darkred px-2 flex justify-between items-center sticky top-0 z-30"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)", minHeight: 56 }}
      >
        <Link href="/pokedex" className="tap-target font-pixel text-white text-[10px] px-2">
          ◀ DEX
        </Link>
        <span className="font-pixel text-white text-[10px]">LEADERBOARD</span>
        <div className="w-16" />
      </div>

      <div className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
        <p className="font-pixel text-[8px] text-gray-500 mb-6">
          LOS ANGELES REGION — TOP TRAINERS
        </p>

        {/* Current user rank callout */}
        {session?.user && currentUserRank > 0 && (
          <div className="mb-6 p-3 border-2 border-pokedex-red bg-pokedex-screen flex justify-between items-center">
            <span className="font-pixel text-[8px] text-gray-400">YOUR RANK</span>
            <span className="font-pixel text-[10px] text-pokedex-red">
              #{currentUserRank} — {rows[currentUserRank - 1].catch_count}/{TOTAL_LA_SPECIES}
            </span>
          </div>
        )}

        {rows.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-pixel text-gray-500 text-[9px]">NO DATA YET</p>
            <p className="font-pixel text-gray-600 text-[8px] mt-2">
              Be the first to catch a bird!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {rows.map((row, i) => {
              const rank = i + 1;
              const isCurrentUser = session?.user?.id === row.user_id;
              const pct = Math.round((row.catch_count / TOTAL_LA_SPECIES) * 100);

              return (
                <div
                  key={row.user_id}
                  className={clsx(
                    "border-2 bg-pokedex-screen p-3",
                    isCurrentUser ? "border-pokedex-red" : "border-gray-800"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={clsx("font-pixel text-[10px] w-8 shrink-0 text-center", rankStyle(rank))}>
                      {rankLabel(rank)}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className={clsx(
                          "font-pixel text-[9px] truncate",
                          isCurrentUser ? "text-pokedex-red" : "text-white"
                        )}>
                          {row.user_name}
                          {isCurrentUser && (
                            <span className="text-gray-500 ml-2">◀ YOU</span>
                          )}
                        </span>
                        <span className="font-pixel text-[8px] text-gray-400 shrink-0 ml-2">
                          {row.catch_count}/{TOTAL_LA_SPECIES}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 border border-gray-700">
                        <div
                          className={clsx(
                            "h-full",
                            rank === 1 ? "bg-yellow-400" : isCurrentUser ? "bg-pokedex-red" : "bg-gray-600"
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
