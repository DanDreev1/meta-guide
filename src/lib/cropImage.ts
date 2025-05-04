import { Area } from 'react-easy-crop'

export default function getCroppedImg(imageSrc: string, croppedAreaPixels: Area): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageSrc
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = croppedAreaPixels.width
      canvas.height = croppedAreaPixels.height
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Ошибка создания canvas'))
        return
      }

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      )

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Ошибка при создании Blob'))
        }
      }, 'image/png')
    }
    image.onerror = (error) => {
      reject(error)
    }
  })
}