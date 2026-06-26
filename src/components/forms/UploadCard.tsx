import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ImagePlus, Loader2, X } from 'lucide-react'
import { ACCEPTED_IMAGE_TYPES } from '../../utils/imageValidation'
import { GlassCard } from '../ui/GlassCard'

type UploadCardProps = {
  photoUrl: string | null
  isProcessing: boolean
  onFileSelect: (file: File) => void
  onClear: () => void
}

export function UploadCard({
  photoUrl,
  isProcessing,
  onFileSelect,
  onClear,
}: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0]
      if (file) onFileSelect(file)
    },
    [onFileSelect],
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  return (
    <GlassCard>
      <h2 className="mb-1 text-base font-semibold text-white sm:text-lg">Profile Photo</h2>
      <p className="mb-4 text-sm text-white/50">
        JPG, PNG, or WEBP — max 10MB
      </p>

      <motion.div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => !photoUrl && inputRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 transition-colors sm:px-6 sm:py-10 ${
          isDragging
            ? 'border-[#D4AF37] bg-[#D4AF37]/10'
            : 'border-white/20 hover:border-[#D4AF37]/50 hover:bg-white/5'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {isProcessing ? (
          <Loader2 className="h-10 w-10 animate-spin text-[#D4AF37]" />
        ) : photoUrl ? (
          <div className="relative">
            <img
              src={photoUrl}
              alt="Preview"
              className="h-32 w-32 rounded-full object-cover ring-2 ring-[#D4AF37]/50"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClear()
              }}
              className="absolute -top-1 -right-1 rounded-full bg-red-500/80 p-1 hover:bg-red-500"
              aria-label="Remove photo"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        ) : (
          <>
            <ImagePlus className="mb-3 h-10 w-10 text-[#D4AF37]/70" />
            <p className="text-sm font-medium text-white/80">
              Drag & drop your photo here
            </p>
            <p className="mt-1 text-xs text-white/40">or click to browse</p>
          </>
        )}
      </motion.div>
    </GlassCard>
  )
}
