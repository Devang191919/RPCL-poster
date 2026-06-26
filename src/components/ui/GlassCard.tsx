import type { ReactNode } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
  gold?: boolean
}

export function GlassCard({ children, className = '', gold = false }: GlassCardProps) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 ${gold ? 'glass-card-gold' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
