import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL , SUPABASE_KEY } from './config.js'

const pool = createClient(SUPABASE_URL, SUPABASE_KEY)

export default pool