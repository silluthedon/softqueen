import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://enheyezvlxzoqhjuyfhf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuaGV5ZXp2bHh6b3FoanV5ZmhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDYyMzYsImV4cCI6MjA2NzQ4MjIzNn0.TNQY344bZJbjUzvwjqNfHMNGU5yZokvoqRlzpDACc50';
export const supabase = createClient(supabaseUrl, supabaseKey);