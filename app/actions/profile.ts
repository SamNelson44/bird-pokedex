"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { auth, signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function updateNameAction(
  _prevState: string,
  formData: FormData
): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) return "Not authenticated";

  const name = (formData.get("name") as string)?.trim();
  if (!name) return "Name cannot be empty";
  if (name.length > 32) return "Name must be 32 characters or less";

  const { error } = await supabase
    .from("users")
    .update({ name })
    .eq("id", session.user.id);

  if (error) return "Failed to update name";

  revalidatePath("/profile");
  return "";
}

export async function updatePasswordAction(
  _prevState: string,
  formData: FormData
): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) return "Not authenticated";

  const current = formData.get("current_password") as string;
  const next = formData.get("new_password") as string;
  const confirm = formData.get("confirm_password") as string;

  if (!current || !next || !confirm) return "All fields are required";
  if (next.length < 6) return "New password must be at least 6 characters";
  if (next !== confirm) return "New passwords do not match";

  const { data: user } = await supabase
    .from("users")
    .select("password_hash")
    .eq("id", session.user.id)
    .single();

  if (!user) return "User not found";

  const valid = await bcrypt.compare(current, user.password_hash);
  if (!valid) return "Current password is incorrect";

  const password_hash = await bcrypt.hash(next, 12);
  const { error } = await supabase
    .from("users")
    .update({ password_hash })
    .eq("id", session.user.id);

  if (error) return "Failed to update password";

  revalidatePath("/profile");
  return "success";
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
  redirect("/");
}
