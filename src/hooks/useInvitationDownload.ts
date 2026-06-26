import { useCallback, useState } from 'react'
import { flushSync } from 'react-dom'
import { toBlob, toCanvas, toPng } from 'html-to-image'
import confetti from 'canvas-confetti'
import {
  INVITATION_HEIGHT,
  INVITATION_WIDTH,
} from '../config/tournament'
import { getDownloadFilename } from '../utils/downloadFilename'
import {
  preparePosterForExport,
  prepareShellForCapture,
} from '../utils/exportImages'
import { sanitizeName, validateName } from '../utils/nameValidation'

const EXPORT_TIMEOUT_MS = 45_000

function waitForPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error(message)), ms)
    promise
      .then((value) => {
        window.clearTimeout(timer)
        resolve(value)
      })
      .catch((error) => {
        window.clearTimeout(timer)
        reject(error)
      })
  })
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(',')
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/png'
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new Blob([bytes], { type: mime })
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas export failed'))),
      'image/png',
      1,
    )
  })
}

function triggerFileDownload(blob: Blob, filename: string): void {
  const nav = window.navigator as Navigator & {
    msSaveOrOpenBlob?: (blob: Blob, name: string) => boolean
  }

  if (typeof nav.msSaveOrOpenBlob === 'function') {
    nav.msSaveOrOpenBlob(blob, filename)
    return
  }

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.rel = 'noopener'
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

const exportOptions = {
  width: INVITATION_WIDTH,
  height: INVITATION_HEIGHT,
  pixelRatio: 1,
  cacheBust: true,
  skipFonts: false,
  backgroundColor: '#1e0a4a',
} as const

async function renderPosterBlob(node: HTMLElement): Promise<Blob> {
  try {
    const canvas = await toCanvas(node, exportOptions)
    const blob = await canvasToBlob(canvas)
    if (blob.size > 0) return blob
  } catch {
    // fall through to blob/png helpers
  }

  const blob = await toBlob(node, exportOptions)
  if (blob && blob.size > 0) return blob

  const dataUrl = await toPng(node, exportOptions)
  if (!dataUrl) throw new Error('Export produced empty image')

  return dataUrlToBlob(dataUrl)
}

export function useInvitationDownload() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const download = useCallback(
    async (
      exportRef: React.RefObject<HTMLDivElement | null>,
      name: string,
      photoUrl: string | null,
      triggerElement?: HTMLElement | null,
    ) => {
      setError(null)

      const nameError = validateName(name)
      if (nameError) {
        setError(nameError)
        return false
      }

      if (!photoUrl) {
        setError('Please upload your photo before downloading.')
        return false
      }

      const shell = exportRef.current
      const node = shell?.querySelector('[data-poster-export]') as HTMLElement | null
      if (!shell || !node) {
        setError('Could not generate invitation. Please try again.')
        return false
      }

      flushSync(() => setIsDownloading(true))
      await waitForPaint()

      let restoreShell: (() => void) | null = null

      try {
        restoreShell = prepareShellForCapture(shell)
        await waitForPaint()

        await withTimeout(
          preparePosterForExport(node),
          EXPORT_TIMEOUT_MS,
          'Preparing poster timed out. Please try again.',
        )

        const blob = await withTimeout(
          renderPosterBlob(node),
          EXPORT_TIMEOUT_MS,
          'Image export timed out. Please try again.',
        )

        if (blob.size < 1_000) {
          throw new Error('Export produced an empty file')
        }

        const filename = getDownloadFilename(sanitizeName(name))
        triggerFileDownload(blob, filename)

        const rect = triggerElement?.getBoundingClientRect()
        confetti({
          particleCount: 80,
          spread: 60,
          origin: {
            x: rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5,
            y: rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5,
          },
          colors: ['#D4AF37', '#a855f7', '#f0d060', '#ffffff'],
        })

        return true
      } catch (err) {
        console.error('Poster export failed:', err)
        const message =
          err instanceof Error && err.message.includes('timed out')
            ? err.message
            : 'Download failed. Please try again.'
        setError(message)
        return false
      } finally {
        restoreShell?.()
        setIsDownloading(false)
      }
    },
    [],
  )

  return { download, isDownloading, error, setError }
}
