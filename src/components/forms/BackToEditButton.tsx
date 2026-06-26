import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

type BackToEditButtonProps = {
  onClick: () => void
}

export function BackToEditButton({ onClick }: BackToEditButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="mb-4 flex min-h-[44px] touch-manipulation items-center gap-2 rounded-lg px-1 text-sm font-medium text-white/70 transition-colors hover:text-white"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to edit photo & name
    </motion.button>
  )
}
