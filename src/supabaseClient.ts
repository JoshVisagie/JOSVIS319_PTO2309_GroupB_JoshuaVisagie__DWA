import { createClient } from "@supabase/supabase-js";


export const supabase = createClient(
    "https://erabqfmktwgyazauewro.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYWJxZm1rdHdneWF6YXVld3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MTMxOTEsImV4cCI6MjA0MTM4OTE5MX0.H-oeI-ULMFiMZDy72X0BYKhCThxFZnY25wgaPBST5Jk"
  );