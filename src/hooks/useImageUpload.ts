import { useCallback, useEffect, useRef, useState } from 'react'
import { compressImageIfNeeded } from '../utils/imageCompression'
import { validateImageFile } from '../utils/imageValidation'

export function useImageUpload() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const photoUrlRef = useRef<string | null>(null)

  const revokeCurrentUrl = useCallback(() => {
    if (photoUrlRef.current?.startsWith('blob:')) {
      URL.revokeObjectURL(photoUrlRef.current)
    }
    photoUrlRef.current = null
  }, [])

  const handleFile = useCallback(
    async (file: File) => {
      setError(null)

      const validation = validateImageFile(file)
      if (!validation.valid) {
        setError(validation.error)
        return
      }

      setIsProcessing(true)
      try {
        revokeCurrentUrl()
        const url = await compressImageIfNeeded(file)
        photoUrlRef.current = url
        setPhotoUrl(url)
      } catch {
        setError('Could not process the image. Please try another file.')
      } finally {
        setIsProcessing(false)
      }
    },
    [revokeCurrentUrl],
  )

  const clearPhoto = useCallback(() => {
    revokeCurrentUrl()
    setPhotoUrl(null)
    setError(null)
  }, [revokeCurrentUrl])

  useEffect(() => {
    return () => revokeCurrentUrl()
  }, [revokeCurrentUrl])

  return {
    photoUrl,
    isProcessing,
    error,
    setError,
    handleFile,
    clearPhoto,
  }
}
