"use client";

import { signOutAction } from "@/app/actions/profile";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="w-full font-pixel text-[9px] py-3 bg-transparent text-red-500 border-2 border-red-900 hover:border-red-600 tap-target"
      >
        SIGN OUT
      </button>
    </form>
  );
}
