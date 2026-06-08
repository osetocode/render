// ROOT

import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(import.meta.url)
export const root = path.dirname(__dirname)

// VARIABLES DE ENTORNO

import { config } from 'dotenv'
config()

export const PORT = Number(process.env.PORT)
export const DOMAIN = process.env.DOMAIN
export const SUPABASE_URL = process.env.SUPABASE_URL
export const SUPABASE_KEY = process.env.SUPABASE_KEY
export const ENVIRONMENT = process.env.ENVIRONMENT || 'production'
export const USER_KEY_ADMIN = process.env.USER_KEY_ADMIN