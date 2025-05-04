// app/profile/page.tsx
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { createServerSupabase } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/profile/account')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-md p-8 bg-gray-700 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-white mb-6">
            Добро пожаловать
          </h2>
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-200">Войти</h3>
              <LoginForm />
            </div>
            <hr className="border-gray-500" />
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-200">Регистрация</h3>
              <RegisterForm />
            </div>
          </div>
        </div>
    </div>
  )
}