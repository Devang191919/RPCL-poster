import { useCallback, useState } from 'react'
import { sanitizeName, MAX_NAME_LENGTH } from '../utils/nameValidation'

export function useInvitationState() {
  const [name, setNameRaw] = useState('')

  const setName = useCallback((value: string) => {
    if (value.length <= MAX_NAME_LENGTH) {
      setNameRaw(value)
    }
  }, [])

  const displayName = sanitizeName(name) || 'Your Name'

  return {
    name,
    setName,
    displayName,
    sanitizedName: sanitizeName(name),
  }
}
