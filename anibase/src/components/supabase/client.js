import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://snekiyjxuigegtakzwzw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZWtpeWp4dWlnZWd0YWt6d3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2NzA2MzUsImV4cCI6MjA0MTI0NjYzNX0.O8-aLPaAl68HqhR6D-eOXR6-KHH6g-IoMAfpDKgcpiM";
export const supabase = createClient(supabaseUrl, supabaseKey);
