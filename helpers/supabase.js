import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabaseUrl = "https://olmdgcdchqbpgmkkmvnk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sbWRnY2RjaHFicGdta2ttdm5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzY4NTgsImV4cCI6MjA1Mzc1Mjg1OH0.njL_mjOsx7krTp-h1rnL0C9rHxvFVchYyaVzHS4fTHc";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
