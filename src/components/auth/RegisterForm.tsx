// components/auth/RegisterForm.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://meta-guide-taupe.vercel.app/profile',
          data: { role: 'user' }
        }
    });      
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Проверьте почту для подтверждения');
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
      >
        Регистрация
      </button>
    </form>
  );
}
