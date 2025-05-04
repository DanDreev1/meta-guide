// components/auth/LoginForm.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      // токен теперь в HttpOnly-куках, middleware увидит сессию
      router.push('/guides'); // или router.refresh()
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Войти
      </button>
    </form>
  );
}
