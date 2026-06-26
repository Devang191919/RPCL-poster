import { motion } from 'framer-motion'
import { DownloadButton } from '../forms/DownloadButton'

export function Hero() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-center"
    >
      <p className="mb-2 text-sm font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
        RPCL Season 3
      </p>
      <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        Tournament{' '}
        <span className="bg-gradient-to-r from-[#D4AF37] to-[#f0d060] bg-clip-text text-transparent">
          Invitation Poster
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base text-white/60 sm:text-lg">
        Upload your photo and name — download an Instagram Story poster (1080×1920)
        for WhatsApp Status and social media.
      </p>
      <DownloadButton
      onClick={() => {}} isDownloading={false} disabled={false} />
    </motion.header>
  )
}
