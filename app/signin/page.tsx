"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";

export default function SignInPage() {
  const [error, formAction, isPending] = useActionState(loginAction, "");

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-pokedex-red border-b-4 border-pokedex-darkred px-4 py-3">
        <span className="font-pixel text-white text-xs">BIRDDEX</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="border-2 border-pokedex-red bg-pokedex-screen p-6">
            <p className="font-pixel text-pokedex-red text-[10px] mb-1">▶ TRAINER LOGIN</p>
            <p className="font-pixel text-gray-500 text-[7px] mb-6">
              SIGN IN TO ACCESS YOUR DEX
            </p>

            <form action={formAction} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-pixel text-[7px] text-gray-400">EMAIL</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="bg-black border-2 border-gray-700 text-white font-pixel px-3 py-2 focus:outline-none focus:border-pokedex-red"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-pixel text-[7px] text-gray-400">PASSWORD</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="bg-black border-2 border-gray-700 text-white font-pixel px-3 py-2 focus:outline-none focus:border-pokedex-red"
                />
              </div>

              {error && (
                <p className="font-pixel text-[7px] text-red-400">⚠ {error}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="font-pixel text-[9px] bg-pokedex-red text-white border-2 border-pokedex-darkred hover:bg-pokedex-darkred disabled:opacity-50 transition-colors tap-target w-full"
              >
                {isPending ? "LOADING..." : "▶ SIGN IN"}
              </button>
            </form>
          </div>

          <p className="font-pixel text-[7px] text-gray-600 text-center mt-4">
            NO ACCOUNT?{" "}
            <Link href="/signup" className="text-pokedex-red hover:text-red-400">
              REGISTER
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
