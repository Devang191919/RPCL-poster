import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  loadAllPosterAssets,
  rpclSeason3Logo,
  defaultTeamLogos,
  defaultMainTitleLogo,
  defaultSponsorRow3,
  defaultSponsorRow4,
  type LoadedPosterAssets,
} from './assets'
import { INVITATION_HEIGHT, INVITATION_WIDTH } from './config/tournament'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/layout/Hero'
import { Footer } from './components/layout/Footer'
import { InvitationPreview } from './components/invitation/InvitationPreview'
import { InvitationTemplate } from './components/invitation/InvitationTemplate'
import { UploadCard } from './components/forms/UploadCard'
import { NameInput } from './components/forms/NameInput'
import { DownloadButton } from './components/forms/DownloadButton'
import { ErrorAlert } from './components/ui/ErrorAlert'
import { GlassCard } from './components/ui/GlassCard'
import { useInvitationState } from './hooks/useInvitationState'
import { useImageUpload } from './hooks/useImageUpload'
import { useInvitationDownload } from './hooks/useInvitationDownload'

const defaultAssets: LoadedPosterAssets = {
  teamLogos: [...defaultTeamLogos],
  mainTitleLogo: defaultMainTitleLogo,
  sponsorRow3: [...defaultSponsorRow3],
  sponsorRow4: [...defaultSponsorRow4],
  season3LogoUrl: rpclSeason3Logo,
}

function App() {
  const { name, setName, displayName } = useInvitationState()
  const {
    photoUrl,
    isProcessing,
    error: uploadError,
    setError: setUploadError,
    handleFile,
    clearPhoto,
  } = useImageUpload()
  const {
    download,
    isDownloading,
    error: downloadError,
    setError: setDownloadError,
  } = useInvitationDownload()

  const exportRef = useRef<HTMLDivElement>(null)
  const downloadBtnRef = useRef<HTMLButtonElement>(null)
  const [assets, setAssets] = useState<LoadedPosterAssets>(defaultAssets)

  useEffect(() => {
    loadAllPosterAssets().then(setAssets)
    document.fonts.ready.catch(() => {})
  }, [])

  const activeError = uploadError || downloadError
  const dismissError = useCallback(() => {
    setUploadError(null)
    setDownloadError(null)
  }, [setUploadError, setDownloadError])

  const handleDownload = useCallback(async () => {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
    await download(exportRef, name, photoUrl, downloadBtnRef.current)
  }, [download, name, photoUrl])

  const posterProps = {
    name: displayName,
    photoUrl,
    teamLogos: assets.teamLogos,
    mainTitleLogo: assets.mainTitleLogo,
    sponsorRow3Logos: assets.sponsorRow3,
    sponsorRow4Logos: assets.sponsorRow4,
    season3LogoUrl: assets.season3LogoUrl,
  }

  return (
    <div className="page-bg-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Navbar />
        <div className="mt-8 space-y-8">
          <Hero />
          <ErrorAlert message={activeError} onDismiss={dismissError} />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <UploadCard photoUrl={photoUrl} isProcessing={isProcessing} onFileSelect={handleFile} onClear={clearPhoto} />
              <NameInput value={name} onChange={setName} />
              <DownloadButton
                ref={downloadBtnRef}
                onClick={handleDownload}
                isDownloading={isDownloading}
                disabled={!photoUrl || !name.trim()}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:sticky lg:top-6 lg:self-start"
            >
              <GlassCard gold className="p-4 sm:p-6">
                <h2 className="mb-4 text-center text-lg font-semibold text-white">Live Preview</h2>
                <InvitationPreview {...posterProps} />
              </GlassCard>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Export poster — rendered off-screen at full size for PNG capture */}
      <div
        aria-hidden="true"
        ref={exportRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: INVITATION_WIDTH,
          height: INVITATION_HEIGHT,
          transform: 'translateX(-200vw)',
          opacity: 1,
          zIndex: -1,
          overflow: 'hidden',
          pointerEvents: 'none',
          visibility: 'visible',
        }}
      >
        <InvitationTemplate {...posterProps} />
      </div>
    </div>
  )
}

export default App
