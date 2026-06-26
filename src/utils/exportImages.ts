const IMAGE_WAIT_MS = 8_000
const INLINE_IMAGE_MS = 6_000

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => window.setTimeout(() => resolve(fallback), ms)),
  ])
}

/** Wait until all images in the poster are decoded and ready for canvas capture */
export async function waitForPosterImages(container: HTMLElement): Promise<void> {
  const images = Array.from(container.querySelectorAll('img'))

  await Promise.all(
    images.map(async (img) => {
      if (!img.complete) {
        await withTimeout(
          new Promise<void>((resolve) => {
            const done = () => resolve()
            img.addEventListener('load', done, { once: true })
            img.addEventListener('error', done, { once: true })
          }),
          IMAGE_WAIT_MS,
          undefined,
        )
      }

      if (typeof img.decode === 'function') {
        await withTimeout(img.decode().catch(() => {}), 3_000, undefined)
      }
    }),
  )
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

async function imageToDataUrl(src: string): Promise<string | null> {
  if (src.startsWith('data:')) return src

  try {
    const response = await withTimeout(fetch(src), INLINE_IMAGE_MS, null)
    if (!response || !response.ok) throw new Error(`HTTP ${response?.status ?? 'timeout'}`)
    return blobToDataUrl(await response.blob())
  } catch {
    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'

      await withTimeout(
        new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = () => reject(new Error(`Failed to load ${src}`))
          img.src = src
        }),
        INLINE_IMAGE_MS,
        undefined,
      )

      if (!img.naturalWidth && !img.naturalHeight) return null

      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth || 1
      canvas.height = img.naturalHeight || 1
      const ctx = canvas.getContext('2d')
      if (!ctx) return null

      ctx.drawImage(img, 0, 0)
      return canvas.toDataURL('image/png')
    } catch {
      return null
    }
  }
}

/** Inline images as data URLs so export never fails on CORS / blob URLs */
export async function inlinePosterImages(container: HTMLElement): Promise<void> {
  const images = Array.from(container.querySelectorAll('img'))

  await Promise.all(
    images.map(async (img) => {
      const src = img.currentSrc || img.src
      if (!src || src.startsWith('data:')) return

      const dataUrl = await imageToDataUrl(src)
      if (!dataUrl) return

      img.src = dataUrl
      if (typeof img.decode === 'function') {
        await withTimeout(img.decode().catch(() => {}), 3_000, undefined)
      }
    }),
  )
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

export async function flushPosterLayout(): Promise<void> {
  await nextFrame()
  await nextFrame()
}

/** Move export shell off-screen but fully painted (opacity 0 breaks html-to-image) */
export function prepareShellForCapture(shell: HTMLElement): () => void {
  const prev = shell.getAttribute('style') ?? ''

  shell.style.position = 'fixed'
  shell.style.left = '0'
  shell.style.top = '0'
  shell.style.width = `${shell.scrollWidth || 1080}px`
  shell.style.height = `${shell.scrollHeight || 1920}px`
  shell.style.opacity = '1'
  shell.style.zIndex = '2147483647'
  shell.style.pointerEvents = 'none'
  shell.style.overflow = 'hidden'
  shell.style.transform = 'translateX(-200vw)'
  shell.style.visibility = 'visible'

  return () => {
    if (prev) shell.setAttribute('style', prev)
    else shell.removeAttribute('style')
  }
}

export async function preparePosterForExport(container: HTMLElement): Promise<void> {
  await withTimeout(document.fonts.ready, 10_000, undefined)
  await waitForPosterImages(container)
  await inlinePosterImages(container)
  await flushPosterLayout()
}
