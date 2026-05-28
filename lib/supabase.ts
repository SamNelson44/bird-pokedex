import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side client with service role key — never expose to browser
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface SpeciesRow {
  id: string;
  name: string;
  scientific_name: string;
  description: string;
  habitat: string;
  rarity: "common" | "uncommon" | "rare" | "legendary" | "unknown";
  fun_facts: string[];
  image_url: string;
  aliases: string[];
  pokedex_number: number;
}

export interface DiscoveryRow {
  id: string;
  user_id: string;
  species_id: string;
  discovered_at: string;
  photo_url: string | null;
  location_note: string | null;
}
