"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Registration failed");
    } else {
      router.push("/signin?registered=1");
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-pokedex-red border-b-4 border-pokedex-darkred px-4 py-3">
        <span className="font-pixel text-white text-xs">BIRDDEX</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="border-2 border-pokedex-red bg-pokedex-screen p-6">
            <p className="font-pixel text-pokedex-red text-[10px] mb-1">▶ NEW TRAINER</p>
            <p className="font-pixel text-gray-500 text-[7px] mb-6">
              CREATE YOUR ACCOUNT
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-pixel text-[7px] text-gray-400">
                  TRAINER NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="optional"
                  autoComplete="name"
                  className="bg-black border-2 border-gray-700 text-white font-pixel px-3 py-2 focus:outline-none focus:border-pokedex-red placeholder:text-gray-700"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-pixel text-[7px] text-gray-400">EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="bg-black border-2 border-gray-700 text-white font-pixel px-3 py-2 focus:outline-none focus:border-pokedex-red"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-pixel text-[7px] text-gray-400">
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="bg-black border-2 border-gray-700 text-white font-pixel px-3 py-2 focus:outline-none focus:border-pokedex-red"
                />
                <span className="font-pixel text-[6px] text-gray-600">
                  MIN 6 CHARACTERS
                </span>
              </div>

              {error && (
                <p className="font-pixel text-[7px] text-red-400">⚠ {error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="font-pixel text-[9px] bg-pokedex-red text-white border-2 border-pokedex-darkred hover:bg-pokedex-darkred disabled:opacity-50 transition-colors tap-target w-full"
              >
                {loading ? "CREATING..." : "▶ CREATE ACCOUNT"}
              </button>
            </form>
          </div>

          <p className="font-pixel text-[7px] text-gray-600 text-center mt-4">
            HAVE AN ACCOUNT?{" "}
            <Link href="/signin" className="text-pokedex-red hover:text-red-400">
              SIGN IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
