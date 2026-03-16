import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Add them to your .env file.'
  );
}

// Single Supabase client used across Auth, Database, and Storage.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Centralized app constants from environment variables.
export const SONG_BUCKET = import.meta.env.VITE_SUPABASE_SONG_BUCKET || 'song-pdfs';
export const MAX_PDF_MB = Number(import.meta.env.VITE_MAX_PDF_MB || 15);
