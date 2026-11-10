import { createClient } from '@supabase/supabase-js';// responsavel em criar a conexão entre o nosso React ↔ Supabase

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;//“Vite, me dá o valor que eu coloquei em VITE_SUPABASE_URL.”
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);












//goat: supabase