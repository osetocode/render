import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'

config()
// VARIABLES DE ENTORNO
const __dirname = fileURLToPath(import.meta.url)
export const ROOT = path.dirname(__dirname)

export const {
  DOMAIN,
  SUPABASE_URL,
  SUPABASE_KEY,
  ENVIRONMENT = 'production',
  USER_KEY_ADMIN
} = process.env

export const PORT = Number(process.env.PORT ?? 3000) // solo esto lo exportamos como Number 