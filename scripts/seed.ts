/**
 * Run once to populate the species table in Supabase.
 * Usage: npx tsx scripts/seed.ts
 */
import { createClient } from "@supabase/supabase-js";
import { LA_SPECIES } from "../lib/species-data";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log(`Seeding ${LA_SPECIES.length} species...`);

  const rows = LA_SPECIES.map((s) => ({
    name: s.name,
    scientific_name: s.scientific_name,
    description: s.description,
    habitat: s.habitat,
    rarity: s.rarity,
    fun_facts: s.fun_facts,
    image_url: s.image_url,
    aliases: s.aliases,
    pokedex_number: s.pokedex_number,
  }));

  const { error } = await supabase
    .from("species")
    .upsert(rows, { onConflict: "name" });

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log("✓ Species seeded successfully!");
}

seed();
