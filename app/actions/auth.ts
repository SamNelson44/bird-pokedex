"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

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
    // AuthError = wrong credentials; anything else is a redirect or real error
    if (error instanceof AuthError) {
      return "Invalid email or password";
    }
    throw error; // re-throw so the redirect to /pokedex goes through
  }
  return "";
}
