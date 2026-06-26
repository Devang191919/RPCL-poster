import { motion } from 'framer-motion'

export function Hero() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="px-1 text-center"
    >
      <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase sm:text-sm sm:tracking-[0.3em]">
        RPCL Season 3
      </p>
      <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        Tournament{' '}
        <span className="bg-gradient-to-r from-[#D4AF37] to-[#f0d060] bg-clip-text text-transparent">
          Invitation Poster
        </span>
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:mt-4 sm:text-lg">
        Upload your photo and name — download an Instagram Story poster (1080×1920)
        for WhatsApp Status and social media.
      </p>
    </motion.header>
  )
}
