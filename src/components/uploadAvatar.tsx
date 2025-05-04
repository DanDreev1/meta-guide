'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { UserCircle, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/lib/cropImage'
import Modal from './ui/Modal'

export function AvatarUploader({ userId, initialUrl }: { userId: string; initialUrl?: string }) {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialUrl || null)
  const [uploading, setUploading] = useState(false)
  const [showCropper, setShowCropper] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      toast.error('Файл слишком большой. Максимум 5MB.')
      return
    }

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      if (reader.result) {
        setImageSrc(reader.result.toString())
        setShowCropper(true)
      }
    })
    reader.readAsDataURL(file)
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const uploadCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels || uploading) return
  
    setUploading(true)
  
    const MAX_RETRIES = 3
    let attempt = 0
    let success = false
  
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
    const fileName = 'avatar.png'
    const filePath = `avatars/${userId}/${fileName}`
  
    while (attempt < MAX_RETRIES && !success) {
      try {
        // Удаляем старую аватарку (если есть)
        await supabase.storage.from('avatars').remove([
          `avatars/${userId}/avatar.png`,
          `avatars/${userId}/avatar.jpg`,
          `avatars/${userId}/avatar.jpeg`,
          `avatars/${userId}/avatar.webp`,
        ])
  
        // Загружаем новую аватарку
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, croppedBlob, {
            cacheControl: '3600',
            upsert: true,
            contentType: 'image/png',
          })
  
        if (uploadError) {
          throw uploadError
        }
  
        // Получаем ссылку
        const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
        if (!data?.publicUrl) {
            throw new Error('Не удалось получить ссылку на новый аватар')
        }

        const uniqueAvatarUrl = `${data.publicUrl}?t=${Date.now()}`

        // Обновляем user_metadata
        const { error: updateError } = await supabase.auth.updateUser({
            data: { avatar_url: uniqueAvatarUrl },
        })

        if (updateError) {
            throw updateError
        }

        setAvatarUrl(uniqueAvatarUrl)
        setIsImageLoading(true)
        toast.success('Аватар успешно обновлен!')
        
        success = true
      } catch (error: any) {
        console.error(`Попытка ${attempt + 1} не удалась:`, error.message)
        attempt++
  
        if (attempt >= MAX_RETRIES) {
          toast.error('Не удалось загрузить аватарку. Попробуйте позже.')
        } else {
          toast('Ошибка загрузки, пробуем снова...', { icon: '🔄' })
        }
      }
    }
  
    setUploading(false)
    setShowCropper(false)
  }  

  return (
    <>
      <div
        className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-400 bg-gray-700
                   flex items-center justify-center cursor-pointer group transition-all duration-300 hover:border-indigo-400"
        onClick={handleAvatarClick}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${isImageLoading ? 'blur-sm' : 'blur-0'}`}
            onLoad={() => setIsImageLoading(false)}
          />        
        ) : (
          <UserCircle className="text-gray-400 w-16 h-16 transition-transform duration-300 group-hover:scale-110" />
        )}

        {!uploading && (
          <div
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          >
            <span className="text-white text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              Изменить
            </span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Кроппер */}
      {showCropper && imageSrc && (
        <Modal onClose={() => setShowCropper(false)}>
          <div className="relative w-[90vw] max-w-[400px] h-[400px] bg-gray-900 rounded-lg overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              objectFit="cover"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={uploadCroppedImage}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Сохранить
            </button>
            <button
              onClick={() => setShowCropper(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Отмена
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}