"use client";

import { useActionState } from "react";
import { updatePasswordAction } from "@/app/actions/profile";

export default function ChangePasswordForm() {
  const [message, formAction, isPending] = useActionState(updatePasswordAction, "");

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {[
        { name: "current_password", label: "CURRENT PASSWORD", autoComplete: "current-password" },
        { name: "new_password", label: "NEW PASSWORD", autoComplete: "new-password" },
        { name: "confirm_password", label: "CONFIRM NEW PASSWORD", autoComplete: "new-password" },
      ].map(({ name, label, autoComplete }) => (
        <div key={name} className="flex flex-col gap-1">
          <label className="font-pixel text-[7px] text-gray-500">{label}</label>
          <input
            name={name}
            type="password"
            required
            minLength={name === "current_password" ? 1 : 6}
            autoComplete={autoComplete}
            className="bg-black border-2 border-gray-700 text-white font-pixel px-3 py-2 focus:outline-none focus:border-pokedex-red w-full"
            style={{ fontSize: "16px" }}
          />
        </div>
      ))}

      {message && message !== "success" && (
        <p className="font-pixel text-[7px] text-red-400">⚠ {message}</p>
      )}
      {message === "success" && (
        <p className="font-pixel text-[7px] text-pokedex-common">✓ PASSWORD UPDATED</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="font-pixel text-[9px] py-2 px-4 bg-gray-800 text-gray-300 border-2 border-gray-600 hover:border-gray-400 disabled:opacity-50 tap-target"
      >
        {isPending ? "UPDATING..." : "UPDATE PASSWORD"}
      </button>
    </form>
  );
}
