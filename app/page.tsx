import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex-1 flex flex-col">
      {/* Header bar */}
      <div className="bg-pokedex-red border-b-4 border-pokedex-darkred px-4 py-3 flex justify-between items-center">
        <span className="font-pixel text-white text-xs tracking-widest">
          BIRDDEX
        </span>
        {session?.user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/pokedex"
              className="font-pixel text-[8px] px-3 py-1 bg-black text-white border border-red-800 hover:bg-gray-900"
            >
              MY DEX
            </Link>
            <Link
              href="/profile"
              className="font-pixel text-[8px] px-3 py-1 bg-black text-white border border-red-800 hover:bg-gray-900"
            >
              PROFILE
            </Link>
          </div>
        ) : (
          <Link
            href="/signin"
            className="font-pixel text-[8px] px-3 py-1 bg-black text-white border border-red-800 hover:bg-gray-900"
          >
            SIGN IN
          </Link>
        )}
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        {/* Pokédex body mockup */}
        <div className="w-full max-w-md bg-pokedex-red border-4 border-pokedex-darkred p-6 mb-8 relative">
          {/* LED lights */}
          <div className="flex gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-blue-600 shadow-lg" />
            <div className="w-3 h-3 rounded-full bg-red-300 border border-red-500 self-center" />
            <div className="w-3 h-3 rounded-full bg-yellow-300 border border-yellow-500 self-center" />
            <div className="w-3 h-3 rounded-full bg-green-300 border border-green-500 self-center" />
          </div>

          {/* Screen */}
          <div className="bg-pokedex-screen border-4 border-black p-4 scanline-overlay relative">
            <div className="flex flex-col gap-2 text-left">
              <p className="font-pixel text-pokedex-red text-[10px]">
                ▶ BIRDDEX v1.0
              </p>
              <p className="font-pixel text-green-400 text-[8px]">
                REGION: LOS ANGELES
              </p>
              <p className="font-pixel text-gray-400 text-[8px]">
                SPECIES: 50 LOGGED
              </p>
              <p className="font-pixel text-gray-500 text-[8px] mt-1">
                YOUR DEX: 0/50 CAPTURED
              </p>
              <div className="mt-2 h-1 bg-gray-700">
                <div className="h-full bg-pokedex-red w-0" />
              </div>
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="flex gap-3 mt-4 justify-end">
            <div className="w-12 h-5 bg-pokedex-darkred border-2 border-black rounded-sm" />
            <div className="w-12 h-5 bg-pokedex-darkred border-2 border-black rounded-sm" />
          </div>
        </div>

        {/* Title & CTA */}
        <h1 className="font-pixel text-white text-sm mb-2 leading-loose">
          LA BIRDDEX
        </h1>
        <p className="font-pixel text-gray-400 text-[9px] mb-2 max-w-xs leading-relaxed">
          DISCOVER & IDENTIFY BIRDS IN THE LOS ANGELES AREA
        </p>
        <p className="font-pixel text-gray-600 text-[8px] mb-8 max-w-xs leading-relaxed">
          50 SPECIES TO CAPTURE ACROSS 4 RARITY TIERS
        </p>

        {session?.user ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/identify"
              className="font-pixel text-[10px] px-6 py-3 bg-pokedex-red text-white border-2 border-pokedex-darkred hover:bg-pokedex-darkred transition-colors"
            >
              ▶ SCAN A BIRD
            </Link>
            <Link
              href="/pokedex"
              className="font-pixel text-[10px] px-6 py-3 bg-pokedex-screen text-gray-300 border-2 border-gray-600 hover:border-gray-400 transition-colors"
            >
              MY POKÉDEX
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/signup"
              className="font-pixel text-[10px] px-8 py-4 bg-pokedex-red text-white border-2 border-pokedex-darkred hover:bg-pokedex-darkred transition-colors"
            >
              ▶ START YOUR DEX
            </Link>
            <p className="font-pixel text-[7px] text-gray-600">
              ALREADY REGISTERED?{" "}
              <Link href="/signin" className="text-pokedex-red">
                SIGN IN
              </Link>
            </p>
          </div>
        )}

        {/* Rarity legend */}
        <div className="mt-12 flex gap-6 flex-wrap justify-center">
          {[
            { label: "COMMON", color: "text-pokedex-common" },
            { label: "UNCOMMON", color: "text-pokedex-uncommon" },
            { label: "RARE", color: "text-pokedex-rare" },
            { label: "LEGENDARY", color: "text-pokedex-legendary" },
          ].map(({ label, color }) => (
            <span key={label} className={`font-pixel text-[7px] ${color}`}>
              ◆ {label}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
