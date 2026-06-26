export function getDownloadFilename(name: string): string {
  const sanitized = name
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')

  return `RPCL_Season3_${sanitized || 'Guest'}.png`
}
