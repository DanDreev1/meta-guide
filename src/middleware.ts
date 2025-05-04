// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  // 1) Готовим response, в который будем писать куки
  const res = NextResponse.next()

  // 2) Подключаем Supabase-SSR, даём ему геттер входящих куки
  //    и сеттер новых (через res.cookies.set)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () =>
          req.cookies.getAll().map((c) => ({ name: c.name, value: c.value })),
        setAll: (newCookies) =>
          newCookies.forEach(({ name, value }) => {
            // Здесь мы пушим куки **в ответ**, а не в запрос
            res.cookies.set(name, value)
          }),
      },
    }
  )

  // 3) Проверяем пользователя
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 4) Если нет — редиректим на /profile
  if (!user) {
    return NextResponse.redirect(new URL('/profile', req.url))
  }

  // 5) Иначе возвращаем response (с обновлёнными куки, если были рефреши)
  return res
}

export const config = {
    matcher: ['/guides/:path*', '/profile/private/:path*', '/meta/:path*'],
} 