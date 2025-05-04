// src/lib/supabaseServer.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function createServerSupabase() {
  const cookieStore = await cookies()

  return createServerClient(
    URL,
    KEY,
    {
      cookies: {
        // только читаем куки из запроса, больше ничего не пишем
        getAll: () =>
          cookieStore
            .getAll()
            .map((c) => ({ name: c.name, value: c.value })),
      },
    }
  )
}