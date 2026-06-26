import { memo, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { INVITATION_HEIGHT, INVITATION_WIDTH, POST_FORMAT_LABEL } from '../../config/tournament'
import { InvitationTemplate } from './InvitationTemplate'

type InvitationPreviewProps = {
  name: string
  photoUrl: string | null
  teamLogos?: string[]
  mainTitleLogo?: string
  sponsorRow3Logos?: string[]
  sponsorRow4Logos?: string[]
  season3LogoUrl?: string
  deityLeftUrl?: string
  deityRightUrl?: string
}

function InvitationPreviewComponent(props: InvitationPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateScale = () => {
      const width = container.clientWidth
      if (width <= 0) return
      // Always fit poster width to container — no cap (fixes small phones)
      setScale(Math.min(width / INVITATION_WIDTH, 1))
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(container)
    window.addEventListener('orientationchange', updateScale)
    return () => {
      observer.disconnect()
      window.removeEventListener('orientationchange', updateScale)
    }
  }, [])

  const previewHeight = Math.ceil(INVITATION_HEIGHT * scale)

  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <div
        ref={containerRef}
        className="relative w-full min-w-0 max-w-full overflow-hidden rounded-xl sm:rounded-2xl"
        style={{ height: previewHeight }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${props.name}-${props.photoUrl}`}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-1/2 origin-top"
            style={{
              width: INVITATION_WIDTH,
              height: INVITATION_HEIGHT,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: 'top center',
            }}
          >
            <InvitationTemplate {...props} />
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-2 px-1 text-center text-[11px] text-white/40 sm:mt-3 sm:text-xs">
        Preview — final download is {POST_FORMAT_LABEL}
      </p>
    </div>
  )
}

export const InvitationPreview = memo(InvitationPreviewComponent)
