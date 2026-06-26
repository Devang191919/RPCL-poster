import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'

type PreviewNavigateButtonProps = {
  onClick: () => void
  disabled?: boolean
}

export function PreviewNavigateButton({ onClick, disabled }: PreviewNavigateButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className="flex w-full min-h-[48px] touch-manipulation items-center justify-center gap-2 rounded-xl border-2 border-[#D4AF37]/60 bg-[#D4AF37]/15 px-4 py-3.5 text-base font-semibold text-[#f0d060] transition-opacity disabled:cursor-not-allowed disabled:opacity-40 sm:text-lg"
    >
      <Eye className="h-5 w-5" />
      Preview Poster
    </motion.button>
  )
}
