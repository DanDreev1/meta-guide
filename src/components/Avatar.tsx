import { useState } from 'react'
import { UserCircle } from 'lucide-react'

export function Avatar({ src, alt }: { src?: string; alt?: string }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-400 bg-gray-700 flex items-center justify-center
                    transition-all duration-300 hover:border-indigo-400 hover:scale-105 cursor-pointer">
      {!imgError && src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <UserCircle className="text-gray-400 w-12 h-12" />
      )}
    </div>
  )
}