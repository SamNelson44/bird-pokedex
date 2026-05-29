"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

export async function loginAction(
  _prevState: string,
  formData: FormData
): Promise<string> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/pokedex",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Invalid email or password";
    }
    throw error; // re-throw so the redirect to /pokedex goes through
  }
  return "";
}

export async function registerAction(
  _prevState: string,
  formData: FormData
): Promise<string> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const name = (formData.get("name") as string)?.trim();

  if (!email || !password) return "Email and password are required";
  if (password.length < 6) return "Password must be at least 6 characters";

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) return "An account with that email already exists";

  const password_hash = await bcrypt.hash(password, 12);
  const { error } = await supabase.from("users").insert({
    email,
    password_hash,
    name: name || email.split("@")[0],
  });

  if (error) return "Failed to create account";

  redirect("/signin");
}
