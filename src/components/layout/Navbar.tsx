import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between rounded-2xl px-4 py-3 sm:px-6 sm:py-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/20">
          <Trophy className="h-5 w-5 text-[#D4AF37]" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-base font-bold text-white sm:text-lg">RPCL</p>
          <p className="truncate text-[11px] text-white/50 sm:text-xs">Season 3 Invitation</p>
        </div>
      </div>
      <p className="hidden text-sm text-white/40 sm:block">
        Official player announcement poster
      </p>
    </motion.nav>
  )
}
