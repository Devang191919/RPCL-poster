import { motion } from 'framer-motion'
import { tournamentConfig } from '../../config/tournament'

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="border-t border-white/10 py-8 text-center"
    >
      <p className="text-sm text-white/40">
        Organized by {tournamentConfig.organizer}
      </p>
      <p className="mt-1 text-xs tracking-wider text-[#D4AF37]/50 uppercase">
        {tournamentConfig.footerLine1}
      </p>
    </motion.footer>
  )
}
