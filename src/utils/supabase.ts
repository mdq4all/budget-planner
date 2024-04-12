
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://ansxknxtjbwxqeiggtpe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuc3hrbnh0amJ3eHFlaWdndHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzOTQzNTgsImV4cCI6MjAyNjk3MDM1OH0.UmDbaxwzgNhEYKAbNiSOpNFGvTzeLLw4lHU6KJKiosI')