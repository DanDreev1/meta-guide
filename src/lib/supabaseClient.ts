// src/lib/supabaseClient.ts
import { createBrowserClient } from '@supabase/ssr'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Этим пользуемся в Client Components (LoginForm, RegisterForm…)
export const supabase = createBrowserClient(URL, KEY)
