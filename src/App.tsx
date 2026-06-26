import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  loadAllPosterAssets,
  rpclSeason3Logo,
  defaultTeamLogos,
  defaultMainTitleLogo,
  defaultSponsorRow3,
  defaultSponsorRow4,
  defaultDeityLeft,
  defaultDeityRight,
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
import { PreviewNavigateButton } from './components/forms/PreviewNavigateButton'
import { BackToEditButton } from './components/forms/BackToEditButton'
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
  deityLeftUrl: defaultDeityLeft,
  deityRightUrl: defaultDeityRight,
}

const LG_BREAKPOINT = 1024

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
  const [showMobilePreview, setShowMobilePreview] = useState(false)

  const isFormReady = Boolean(photoUrl && name.trim())

  useEffect(() => {
    loadAllPosterAssets().then(setAssets)
    document.fonts.ready.catch(() => {})
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= LG_BREAKPOINT) {
        setShowMobilePreview(false)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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

  const goToPreview = useCallback(() => {
    if (!isFormReady) return
    setShowMobilePreview(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [isFormReady])

  const backToForm = useCallback(() => {
    setShowMobilePreview(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const posterProps = {
    name: displayName,
    photoUrl,
    teamLogos: assets.teamLogos,
    mainTitleLogo: assets.mainTitleLogo,
    sponsorRow3Logos: assets.sponsorRow3,
    sponsorRow4Logos: assets.sponsorRow4,
    season3LogoUrl: assets.season3LogoUrl,
    deityLeftUrl: assets.deityLeftUrl,
    deityRightUrl: assets.deityRightUrl,
  }

  const showFormPanel = !showMobilePreview
  const showPreviewPanel = showMobilePreview

  return (
    <div className="page-bg-pattern relative isolate z-0 min-h-screen min-h-dvh overflow-x-hidden">
      <div className="mx-auto w-full max-w-7xl min-w-0 px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-6 lg:px-8">
        <Navbar />
        <div className="mt-5 space-y-6 sm:mt-8 sm:space-y-8">
          {showFormPanel && <Hero />}
          <ErrorAlert message={activeError} onDismiss={dismissError} />

          <div className="grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-12">
            {/* Step 1 — photo & name (mobile/tablet first; desktop left column) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`min-w-0 space-y-4 sm:space-y-6 ${showFormPanel ? 'block' : 'hidden'} lg:block`}
            >
              <UploadCard
                photoUrl={photoUrl}
                isProcessing={isProcessing}
                onFileSelect={handleFile}
                onClear={clearPhoto}
              />
              <NameInput value={name} onChange={setName} />
              <div className="lg:hidden">
                <PreviewNavigateButton onClick={goToPreview} disabled={!isFormReady} />
                {!isFormReady && (
                  <p className="mt-2 text-center text-xs text-white/40">
                    Add photo and name to preview your poster
                  </p>
                )}
              </div>
            </motion.div>

            {/* Step 2 — preview + single download button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`min-w-0 ${showPreviewPanel ? 'block' : 'hidden'} lg:block lg:sticky lg:top-6 lg:self-start`}
            >
              <div className="lg:hidden">
                <BackToEditButton onClick={backToForm} />
              </div>
              <GlassCard gold className="p-3 sm:p-6">
                <h2 className="mb-3 text-center text-base font-semibold text-white sm:mb-4 sm:text-lg">
                  {showMobilePreview ? 'Your Poster Preview' : 'Live Preview'}
                </h2>
                <InvitationPreview {...posterProps} />
                <div className="mt-4 sm:mt-6">
                  <DownloadButton
                    ref={downloadBtnRef}
                    onClick={handleDownload}
                    isDownloading={isDownloading}
                    disabled={!isFormReady}
                  />
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>

      <div
        aria-hidden="true"
        ref={exportRef}
        className="pointer-events-none"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: INVITATION_WIDTH,
          height: INVITATION_HEIGHT,
          opacity: 0,
          visibility: 'hidden',
          overflow: 'hidden',
          clipPath: 'inset(100%)',
          zIndex: -9999,
        }}
      >
        <InvitationTemplate {...posterProps} />
      </div>
    </div>
  )
}

export default App
