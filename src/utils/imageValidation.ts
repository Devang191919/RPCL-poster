const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 10 * 1024 * 1024

export type ImageValidationResult =
  | { valid: true }
  | { valid: false; error: string }

export function validateImageFile(file: File): ImageValidationResult {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a JPG, PNG, or WEBP image.',
    }
  }

  if (file.size > MAX_SIZE_BYTES) {
    return {
      valid: false,
      error: 'Image is too large. Maximum size is 10MB.',
    }
  }

  return { valid: true }
}

export const ACCEPTED_IMAGE_TYPES =
  '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp'
