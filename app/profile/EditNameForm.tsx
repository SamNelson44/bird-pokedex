"use client";

import { useActionState } from "react";
import { updateNameAction } from "@/app/actions/profile";

export default function EditNameForm({ currentName }: { currentName: string }) {
  const [message, formAction, isPending] = useActionState(updateNameAction, "");

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input
        name="name"
        type="text"
        defaultValue={currentName}
        maxLength={32}
        required
        className="bg-black border-2 border-gray-700 text-white font-pixel px-3 py-2 focus:outline-none focus:border-pokedex-red w-full"
        style={{ fontSize: "16px" }}
      />
      {message && message !== "success" && (
        <p className="font-pixel text-[7px] text-red-400">⚠ {message}</p>
      )}
      {message === "" && !isPending && (
        <span /> // cleared after save
      )}
      <button
        type="submit"
        disabled={isPending}
        className="font-pixel text-[9px] py-2 px-4 bg-pokedex-red text-white border-2 border-pokedex-darkred disabled:opacity-50 tap-target"
      >
        {isPending ? "SAVING..." : "SAVE NAME"}
      </button>
    </form>
  );
}
