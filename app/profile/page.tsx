import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import EditNameForm from "./EditNameForm";
import ChangePasswordForm from "./ChangePasswordForm";
import SignOutButton from "./SignOutButton";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const userId = session.user.id;

  // Fetch user record, LA catches, total catches in parallel
  const [userResult, laSpeciesResult, allDiscoveriesResult] = await Promise.all([
    supabase.from("users").select("name, email, created_at").eq("id", userId).single(),
    supabase.from("species").select("id").neq("rarity", "unknown"),
    supabase.from("discoveries").select("species_id, species:species_id(rarity)").eq("user_id", userId),
  ]);

  const user = userResult.data;

  // If user record not found, session JWT has a stale UUID (e.g. after a DB reset).
  // Show a clear message rather than auto-redirecting.
  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-6">
        <p className="font-pixel text-[9px] text-gray-400 text-center leading-relaxed">
          SESSION OUT OF DATE
        </p>
        <p className="font-pixel text-[7px] text-gray-600 text-center leading-relaxed">
          Your session no longer matches the database.
          Sign out and sign back in to fix this.
        </p>
        <SignOutButton />
      </div>
    );
  }

  const laSpeciesIds = new Set((laSpeciesResult.data ?? []).map((s) => s.id));
  const allDiscoveries = allDiscoveriesResult.data ?? [];

  const totalCatches = allDiscoveries.length;
  const laCatches = allDiscoveries.filter((d) => {
    const sp = d.species as unknown as { rarity: string } | null;
    return sp?.rarity && sp.rarity !== "unknown";
  }).length;

  // Get leaderboard rank
  const { data: allDiscoveriesForRank } = await supabase
    .from("discoveries")
    .select("user_id, species:species_id(rarity)");

  const rankMap = new Map<string, number>();
  (allDiscoveriesForRank ?? []).forEach((d) => {
    const sp = d.species as unknown as { rarity: string } | null;
    if (sp?.rarity && sp.rarity !== "unknown") {
      rankMap.set(d.user_id, (rankMap.get(d.user_id) ?? 0) + 1);
    }
  });
  const sorted = [...rankMap.entries()].sort((a, b) => b[1] - a[1]);
  const rank = sorted.findIndex(([id]) => id === userId) + 1;

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "—";

  const initial = (user?.name ?? user?.email ?? "?")[0].toUpperCase();

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
        <span className="font-pixel text-white text-[10px]">PROFILE</span>
        <div className="w-16" />
      </div>

      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full space-y-6">

        {/* Avatar + info */}
        <div className="flex items-center gap-4 border-2 border-gray-700 bg-pokedex-screen p-4">
          <div className="w-14 h-14 bg-pokedex-red border-2 border-pokedex-darkred flex items-center justify-center shrink-0">
            <span className="font-pixel text-white text-lg">{initial}</span>
          </div>
          <div className="min-w-0">
            <p className="font-pixel text-[10px] text-white truncate">{user?.name ?? "TRAINER"}</p>
            <p className="font-pixel text-[7px] text-gray-500 mt-1 truncate">{user?.email}</p>
            <p className="font-pixel text-[6px] text-gray-700 mt-1">JOINED {joinDate.toUpperCase()}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="border-2 border-gray-700 bg-pokedex-screen">
          <div className="border-b border-gray-700 px-4 py-2">
            <p className="font-pixel text-[8px] text-pokedex-red">◆ STATS</p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-gray-700">
            {[
              { label: "LA CATCHES", value: `${laCatches}/50` },
              { label: "ALL CATCHES", value: totalCatches },
              { label: "RANK", value: rank > 0 ? `#${rank}` : "—" },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 text-center">
                <p className="font-pixel text-[11px] text-white">{value}</p>
                <p className="font-pixel text-[6px] text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Edit name */}
        <div className="border-2 border-gray-700 bg-pokedex-screen">
          <div className="border-b border-gray-700 px-4 py-2">
            <p className="font-pixel text-[8px] text-pokedex-red">◆ TRAINER NAME</p>
          </div>
          <div className="p-4">
            <EditNameForm currentName={user?.name ?? ""} />
          </div>
        </div>

        {/* Change password */}
        <div className="border-2 border-gray-700 bg-pokedex-screen">
          <div className="border-b border-gray-700 px-4 py-2">
            <p className="font-pixel text-[8px] text-pokedex-red">◆ CHANGE PASSWORD</p>
          </div>
          <div className="p-4">
            <ChangePasswordForm />
          </div>
        </div>

        {/* Sign out */}
        <SignOutButton />

      </div>
    </div>
  );
}
