import { User } from 'lucide-react'
import { MAX_NAME_LENGTH } from '../../utils/nameValidation'
import { GlassCard } from '../ui/GlassCard'

type NameInputProps = {
  value: string
  onChange: (value: string) => void
}

export function NameInput({ value, onChange }: NameInputProps) {
  return (
    <GlassCard>
      <h2 className="mb-1 text-lg font-semibold text-white">Your Name</h2>
      <p className="mb-4 text-sm text-white/50">
        This will appear on your invitation
      </p>

      <div className="relative">
        <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter Your Name"
          maxLength={MAX_NAME_LENGTH}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pr-4 pl-12 text-white placeholder:text-white/30 focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none"
        />
      </div>
      <p className="mt-2 text-right text-xs text-white/30">
        {value.length}/{MAX_NAME_LENGTH}
      </p>
    </GlassCard>
  )
}
