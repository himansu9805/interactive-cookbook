import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vpxrwuyicncvdemklqdg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZweHJ3dXlpY25jdmRlbWtscWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5OTU3ODYsImV4cCI6MjAwNTU3MTc4Nn0.ZI9Czv_d60zt4ntqSRv3b5od0PIXhaDxxRYamOyHtT0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)