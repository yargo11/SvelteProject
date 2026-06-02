import { createClient } from "@supabase/supabase-js";

const PUBLIC_SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const PUBLIC_SUPABASE_PUBLISHABLE_KEY = import.meta.env
  .VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);
