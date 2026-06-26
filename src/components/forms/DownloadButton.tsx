import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Download, Loader2 } from 'lucide-react'

type DownloadButtonProps = {
  onClick: () => void
  isDownloading: boolean
  disabled?: boolean
}

export const DownloadButton = forwardRef<HTMLButtonElement, DownloadButtonProps>(
  function DownloadButton({ onClick, isDownloading, disabled }, ref) {
    return (
      <motion.button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled || isDownloading}
        aria-busy={isDownloading}
        aria-live="polite"
        whileHover={{ scale: disabled || isDownloading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isDownloading ? 1 : 0.98 }}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#b8941f] px-6 py-4 text-lg font-semibold text-[#0a1628] shadow-lg shadow-[#D4AF37]/20 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isDownloading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="h-5 w-5" />
            Download Invitation
          </>
        )}
      </motion.button>
    )
  },
)
