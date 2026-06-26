const GUJARATI_RE = /[\u0A80-\u0AFF]/

export function isGujaratiName(name: string): boolean {
  return GUJARATI_RE.test(name)
}

export function getPosterNameFontFamily(name: string): string {
  return isGujaratiName(name)
    ? "'Noto Sans Gujarati', sans-serif"
    : "'Playfair Display', Georgia, serif"
}

/** Sizes tuned for the center name box (~520px wide) */
export function getPosterNameFontSize(name: string): number {
  const len = name.length

  if (isGujaratiName(name)) {
    if (len <= 12) return 38
    if (len <= 22) return 32
    if (len <= 32) return 26
    return 22
  }

  if (len <= 8) return 54
  if (len <= 14) return 46
  if (len <= 22) return 38
  if (len <= 30) return 32
  return 26
}

/** Latin names: Title Case. Gujarati: as entered. */
export function formatPosterName(name: string): string {
  if (isGujaratiName(name)) return name

  return name
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function getPosterNameLetterSpacing(name: string): string {
  return isGujaratiName(name) ? '0.01em' : '0.03em'
}
