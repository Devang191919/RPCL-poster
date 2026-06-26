import { sanitizeName, MAX_NAME_LENGTH } from '../utils/nameValidation'

export function getPosterNameFontSize(name: string): number {
  const len = name.length
  if (len <= 12) return 72
  if (len <= 20) return 58
  if (len <= 30) return 48
  if (len <= 35) return 40
  return 34
}

export { sanitizeName, MAX_NAME_LENGTH }
