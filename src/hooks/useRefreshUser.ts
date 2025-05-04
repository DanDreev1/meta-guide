'use client'

import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'

export function useRefreshUser() {
  const [loading, setLoading] = useState(false)

  const refreshUser = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error('Ошибка получения юзера:', error.message)
        return null
      }

      return data.user
    } catch (err) {
      console.error('Неожиданная ошибка:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { refreshUser, loading }
}