import { useId } from 'react'

const GOLD = '#f5c518'
const GOLD_LIGHT = '#ffe566'
const GOLD_DARK = '#c9a012'

type DecorProps = {
  size?: number
  opacity?: number
  idPrefix?: string
}

export function CricketTrophy({ size = 80, opacity = 0.92, idPrefix = 't' }: DecorProps) {
  const cup = `${idPrefix}-cup`
  const base = `${idPrefix}-base`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={cup} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={GOLD_LIGHT} />
          <stop offset="50%" stopColor={GOLD} />
          <stop offset="100%" stopColor={GOLD_DARK} />
        </linearGradient>
        <linearGradient id={base} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={GOLD} />
          <stop offset="100%" stopColor="#8a6910" />
        </linearGradient>
      </defs>
      <path
        d="M22 18h36l-4 28c-1 8-8 14-16 14s-15-6-16-14L22 18z"
        fill={`url(#${cup})`}
        stroke={GOLD_DARK}
        strokeWidth="1.5"
      />
      <path d="M18 22h8c2 10 2 18 0 24-4 2-8 2-12 0-2-6-2-14 0-24h4z" fill={`url(#${cup})`} opacity="0.85" />
      <path d="M54 22h8c2 10 2 18 0 24-4 2-8 2-12 0-2-6-2-14 0-24h4z" fill={`url(#${cup})`} opacity="0.85" />
      <rect x="28" y="58" width="24" height="6" rx="2" fill={`url(#${base})`} />
      <rect x="24" y="64" width="32" height="8" rx="2" fill={`url(#${base})`} stroke={GOLD_DARK} strokeWidth="1" />
      <ellipse cx="40" cy="20" rx="14" ry="3" fill={GOLD_LIGHT} opacity="0.5" />
    </svg>
  )
}

export function CricketBat({ size = 100, opacity = 0.9, idPrefix = 'b' }: DecorProps) {
  const wood = `${idPrefix}-wood`
  const grip = `${idPrefix}-grip`
  return (
    <svg
      width={size}
      height={size * 1.35}
      viewBox="0 0 100 135"
      fill="none"
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={wood} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c896" />
          <stop offset="40%" stopColor="#c49a5c" />
          <stop offset="100%" stopColor="#8b5e2a" />
        </linearGradient>
        <linearGradient id={grip} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#2d2d44" />
        </linearGradient>
      </defs>
      <path
        d="M48 8c18 2 28 18 26 38-2 18-14 32-24 38-2 1-5 1-7 0-10-6-22-20-24-38C17 26 27 10 45 8c1 0 2 0 3 0z"
        fill={`url(#${wood})`}
        stroke="#6b4423"
        strokeWidth="1.5"
      />
      <path d="M38 95c-2 8-2 18 0 28 2 6 8 8 12 6 4-2 6-8 4-16-2-10-6-16-10-18-2-1-4 0-6 0z" fill={`url(#${grip})`} />
      <line x1="42" y1="20" x2="52" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
      <ellipse cx="48" cy="12" rx="12" ry="4" fill="rgba(255,255,255,0.12)" />
    </svg>
  )
}

export function CricketBall({ size = 56, opacity = 0.95, idPrefix = 'ball' }: DecorProps) {
  const shine = `${idPrefix}-shine`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      style={{ opacity }}
    >
      <defs>
        <radialGradient id={shine} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="70%" stopColor="#c41e1e" />
          <stop offset="100%" stopColor="#8b0000" />
        </radialGradient>
      </defs>
      <circle cx="28" cy="28" r="24" fill={`url(#${shine})`} stroke="#5c1010" strokeWidth="1.5" />
      <path
        d="M12 28c4-10 12-16 16-16s12 6 16 16c-4 10-12 16-16 16s-12-6-16-16z"
        stroke="#f5e6c8"
        strokeWidth="2"
        fill="none"
        strokeDasharray="3 2"
      />
      <ellipse cx="20" cy="18" rx="6" ry="3" fill="rgba(255,255,255,0.25)" />
    </svg>
  )
}

export function CricketStumps({ size = 70, opacity = 0.75 }: DecorProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 70 70"
      fill="none"
      style={{ opacity }}
    >
      <rect x="14" y="18" width="5" height="44" rx="2" fill="#f5deb3" stroke={GOLD_DARK} strokeWidth="1" />
      <rect x="32" y="14" width="5" height="48" rx="2" fill="#f5deb3" stroke={GOLD_DARK} strokeWidth="1" />
      <rect x="50" y="18" width="5" height="44" rx="2" fill="#f5deb3" stroke={GOLD_DARK} strokeWidth="1" />
      <rect x="10" y="60" width="50" height="4" rx="1" fill={GOLD_DARK} />
      <rect x="12" y="10" width="46" height="3" rx="1" fill={GOLD} />
    </svg>
  )
}

type CenterDecorProps = {
  photoSize: number
}

/** Fills empty space in the center column with trophy, bat & ball graphics */
export function CenterCricketDecor({ photoSize }: CenterDecorProps) {
  const uid = useId().replace(/:/g, '')
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Row 1 — around photo */}
      <div style={{ position: 'absolute', left: 4, top: '2%', transform: 'rotate(-28deg)' }}>
        <CricketBat size={88} opacity={0.88} idPrefix={`${uid}-bat1`} />
      </div>
      <div style={{ position: 'absolute', right: 6, top: '4%' }}>
        <CricketBall size={52} idPrefix={`${uid}-ball1`} />
      </div>
      <div style={{ position: 'absolute', left: '38%', bottom: '72%', transform: 'translateY(50%)' }}>
        <CricketBall size={38} opacity={0.7} idPrefix={`${uid}-ball2`} />
      </div>
      <div style={{ position: 'absolute', right: '22%', top: '18%' }}>
        <CricketTrophy size={64} opacity={0.85} idPrefix={`${uid}-trophy1`} />
      </div>

      {/* Row 2 — gujarati row sides */}
      <div style={{ position: 'absolute', left: 0, top: '38%' }}>
        <CricketBall size={44} opacity={0.8} idPrefix={`${uid}-ball3`} />
      </div>
      <div style={{ position: 'absolute', right: 2, top: '36%', transform: 'rotate(20deg)' }}>
        <CricketStumps size={58} />
      </div>

      {/* Row 3 — name row */}
      <div style={{ position: 'absolute', left: 8, top: '58%', transform: 'rotate(15deg)' }}>
        <CricketBall size={40} opacity={0.75} idPrefix={`${uid}-ball4`} />
      </div>
      <div style={{ position: 'absolute', right: 0, top: '55%', transform: 'rotate(32deg)' }}>
        <CricketBat size={72} opacity={0.82} idPrefix={`${uid}-bat2`} />
      </div>

      {/* Row 4 — date row */}
      <div style={{ position: 'absolute', left: '12%', bottom: '2%' }}>
        <CricketTrophy size={72} idPrefix={`${uid}-trophy2`} />
      </div>
      <div style={{ position: 'absolute', right: '10%', bottom: '4%' }}>
        <CricketBall size={48} opacity={0.85} idPrefix={`${uid}-ball5`} />
      </div>

      {/* Golden accent dots */}
      {[
        { left: '8%', top: '28%' },
        { right: '15%', top: '48%' },
        { left: '20%', top: '70%' },
        { right: '28%', top: '22%' },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: GOLD_LIGHT,
            boxShadow: `0 0 10px ${GOLD}`,
            opacity: 0.6,
            ...pos,
          }}
        />
      ))}

      {/* Subtle pitch oval behind photo area */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: photoSize * 0.35,
          transform: 'translateX(-50%)',
          width: photoSize + 80,
          height: photoSize * 0.35,
          borderRadius: '50%',
          border: `2px solid rgba(245,197,24,0.25)`,
          background: 'rgba(34,139,34,0.08)',
        }}
      />
    </div>
  )
}
