'use client'

import { FaTelegramPlane, FaInstagram, FaDiscord } from 'react-icons/fa'

interface SocialsProps {
  socials: {
    telegram?: string
    instagram?: string
    discord?: string
  }
}

export function SocialLinks({ socials }: SocialsProps) {
  if (!socials || (!socials.telegram && !socials.instagram && !socials.discord)) {
    return <p className="text-gray-400 text-sm">нет данных</p>
  }

  return (
    <div className="flex space-x-4 mt-2">
      {socials.telegram && (
        <a
          href={socials.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-500 transition"
          title="Telegram"
        >
          <FaTelegramPlane size={24} />
        </a>
      )}
      {socials.instagram && (
        <a
          href={socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-400 hover:text-pink-500 transition"
          title="Instagram"
        >
          <FaInstagram size={24} />
        </a>
      )}
      {socials.discord && (
        <a
          href={socials.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-500 transition"
          title="Discord"
        >
          <FaDiscord size={24} />
        </a>
      )}
    </div>
  )
}
