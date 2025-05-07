import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wrqzivitvxlspwnzfrkz.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndycXppdml0dnhsc3B3bnpmcmt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NDgwNzgsImV4cCI6MjA2MjEyNDA3OH0.qY6wzigG9-DgUT4WsV9neWIbqbMK13QVn_n77oAvuYQ'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase
