'use client'

interface RoleBadgeProps {
  role: string
}

export function RoleBadge({ role }: RoleBadgeProps) {
    
  if (role === 'admin') {
    return (
      <span className="px-2 py-1 text-xs font-bold text-red-500 bg-red-500/10 rounded">
        Админ
      </span>
    )
  }

  if (role === 'vip') {
    return (
      <span className="px-2 py-1 text-xs font-bold text-yellow-400 bg-yellow-400/10 rounded">
        VIP
      </span>
    )
  }

  // Для обычных пользователей
  return (
    <span className="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-400/10 rounded">
      Пользователь
    </span>
  )
}
