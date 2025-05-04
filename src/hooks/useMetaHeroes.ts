// lib/hooks/useMetaHeroes.ts
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useMetaHeroes(rank: string) {
  const [heroes, setHeroes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!rank) return

    const fetchHeroes = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('meta_heroes')
        .select('*')
        .eq('rank', rank)

      if (error) {
        console.error('Ошибка при загрузке героев:', error)
      } else {
        setHeroes(data)
      }

      setLoading(false)
    }

    fetchHeroes()
  }, [rank])

  return { heroes, loading }
}
