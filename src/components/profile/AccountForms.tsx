'use client'

import { useState, ChangeEvent, FormEvent, useRef } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import { AvatarUploader } from '../uploadAvatar'

export type User = {
  id: string
  email: string
  phone?: string
  user_metadata: {
    full_name?: string
    avatar_url?: string
    socials?: Record<string, string>
  }
}

type LocalUser = {
    id: string;
    email?: string;
    user_metadata: Record<string, any>;
    phone?: string;
    avatar_url?: string;
}

// --- ProfileForm: изменение аватарки и ника ---
export function ProfileForm({
  user,
  supabase,
  onClose,
}: {
  user: LocalUser
  supabase: SupabaseClient<any, 'public', any>
  onClose: () => void
}) {
  const [fullName, setFullName] = useState(user.user_metadata.full_name || '')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let avatarUrl = user.user_metadata.avatar_url || ''
    if (file) {
      const ext = file.name.split('.').pop()
      const fileName = `${user.id}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })
      if (uploadError) {
        setLoading(false)
        alert(uploadError.message)
        return
      }
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName)
      avatarUrl = data.publicUrl
    }

    const { error: updateError } = await supabase.auth.updateUser({
      data: { full_name: fullName, avatar_url: avatarUrl },
    })
    setLoading(false)
    if (updateError) {
      alert(updateError.message)
    } else {
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div>
        <label className="block text-sm font-medium">Никнейм</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
        />
      </div>
      <div className='mb-5'>
        <label className="block text-sm font-medium text-white mb-3">Аватарка</label>
        <AvatarUploader userId={user.id} initialUrl={user.user_metadata.avatar_url} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
      >
        {loading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </form>
  )
}

// --- InfoForm: изменение email, телефона, соцсетей ---
export function InfoForm({
  user,
  supabase,
  onClose,
}: {
  user: LocalUser
  supabase: SupabaseClient<any, 'public', any>
  onClose: () => void
}) {
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone || '')
  const [instagram, setInstagram] = useState(user.user_metadata.socials?.instagram || '')
  const [telegram, setTelegram] = useState(user.user_metadata.socials?.telegram || '')
  const [discord, setDiscord] = useState(user.user_metadata.socials?.discord || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      email,
      phone,
      data: { socials: { instagram, telegram, discord } },
    })
    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-white">Телефон:</p>
        <p className="text-md text-gray-300">
            В данный момент функция недоступна
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium">Instagram</label>
        <input
          type="url"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
          placeholder="https://instagram.com/ваше_имя"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Telegram</label>
        <input
          type="url"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
          placeholder="https://t.me/ваше_имя"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Discord</label>
        <input
          type="url"
          value={discord}
          onChange={(e) => setDiscord(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
          placeholder="https://discord.com/users/ваш_ID"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
      >
        {loading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </form>
  )
}

// --- PasswordForm: изменение пароля ---
export function PasswordForm({
  supabase,
  onClose,
}: {
  supabase: SupabaseClient<any, 'public', any>
  onClose: () => void
}) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div>
        <label className="block text-sm font-medium">Новый пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
      >
        {loading ? 'Сохранение...' : 'Сменить пароль'}
      </button>
    </form>
  )
}
