import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabaseUrl = "https://ocxtlslcgxgcxjggjgdr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jeHRsc2xjZ3hnY3hqZ2dqZ2RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NTU1MTIsImV4cCI6MjA1MzAzMTUxMn0.E7r9U4gyHmXlLyT7egdM0vDboPrzk2C8gXXJa0vRFPQ";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
