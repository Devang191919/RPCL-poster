const MAX_NAME_LENGTH = 40

export function sanitizeName(raw: string): string {
  return raw.replace(/\s+/g, ' ').trim()
}

export function validateName(name: string): string | null {
  const sanitized = sanitizeName(name)

  if (!sanitized) {
    return 'Please enter your name before downloading.'
  }

  if (sanitized.length > MAX_NAME_LENGTH) {
    return `Name must be ${MAX_NAME_LENGTH} characters or fewer.`
  }

  return null
}

export function getNameFontSize(name: string): number {
  const len = name.length
  if (len <= 15) return 72
  if (len <= 25) return 56
  if (len <= 35) return 44
  return 36
}

export { MAX_NAME_LENGTH }
