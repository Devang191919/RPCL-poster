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
}

function InvitationPreviewComponent(props: InvitationPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const updateScale = () => {
      setScale(Math.min(container.clientWidth / INVITATION_WIDTH, 0.42))
    }
    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ height: INVITATION_HEIGHT * scale }}
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
      <p className="mt-3 text-xs text-white/40">Preview — final download is {POST_FORMAT_LABEL}</p>
    </div>
  )
}

export const InvitationPreview = memo(InvitationPreviewComponent)
