import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://esbkddgvwpzxdmrklgqv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzYmtkZGd2d3B6eGRtcmtsZ3F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0ODM0OTAsImV4cCI6MjEwODA1OTQ5MH0.OkmvFzdpl5CAICuLXEr8-z49EmtAE7YgWC4FLf0Hflo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
