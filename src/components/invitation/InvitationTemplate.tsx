import { memo, type CSSProperties } from 'react'
import {
  tournamentConfig,
  INVITATION_WIDTH,
  INVITATION_HEIGHT,
} from '../../config/tournament'
import { sponsorRow3, sponsorRow4, titleSponsorSlot } from '../../config/sponsors'
import { deityConfig, POSTER_FRAME_INNER_INSET, POSTER_FRAME_OUTER_INSET } from '../../config/deities'
import { teamNames } from '../../config/teams'
import {
  formatPosterName,
  getPosterNameFontFamily,
  getPosterNameFontSize,
  getPosterNameLetterSpacing,
} from '../../utils/posterTypography'
import {
  defaultTeamLogos,
  defaultMainTitleLogo,
  defaultSponsorRow3,
  defaultSponsorRow4,
  rpclSeason3Logo,
} from '../../assets'
import chamundaFallback from '../../assets/deities/chamunda-maa.svg'
import koylaveerFallback from '../../assets/deities/koylaveer-dada.svg'
import { CenterCricketDecor } from './CricketDecorations'

type InvitationTemplateProps = {
  name: string
  photoUrl: string | null
  teamLogos?: string[]
  teamNamesList?: readonly string[]
  mainTitleLogo?: string
  sponsorRow3Logos?: string[]
  sponsorRow4Logos?: string[]
  season3LogoUrl?: string
  deityLeftUrl?: string
  deityRightUrl?: string
}

const TEAM_COL_W = 228
const PHOTO_MAX = 272
const PHOTO_INNER = PHOTO_MAX - 16
const TEAM_LOGO_SIZE = TEAM_COL_W - 10
const TEAM_LOGO_IMG = TEAM_LOGO_SIZE - 28

const GOLD = '#f5c518'
const GOLD_LIGHT = '#ffe566'
const GOLD_DARK = '#c9a012'
const CONTENT_PAD = POSTER_FRAME_INNER_INSET + 5
const DEITY_IMG = 96

const sponsorLogoWrapStyle: CSSProperties = {
  background: 'transparent',
  border: 'none',
  boxShadow: 'none',
  padding: 4,
}

function PosterInnerFrame() {
  const outer = POSTER_FRAME_OUTER_INSET

  return (
    <>
      {/* Outermost edge — thin sharp frame at poster edge */}
      {/* <div
        className="pointer-events-none absolute"
        style={{
          inset: 4,
          borderRadius: 4,
          border: `2px solid ${GOLD_DARK}`,
          zIndex: 5,
        }}
      /> */}
      {/* Outer border — rectangular gold band */}
      <div
        className="pointer-events-none absolute"
        style={{
          inset: outer,
          borderRadius: 8,
          border: `3px solid ${GOLD}`,
          boxShadow: `0 0 24px rgba(245,197,24,0.35)`,
          zIndex: 5,
        }}
      />
      {/* Inner border — rounded, clearly separated from outer */}
      <div
        className="pointer-events-none absolute"
        style={{
          inset: 30,
          borderRadius: 22,
          border: `2px solid ${GOLD_LIGHT}`,
          boxShadow: `
            inset 0 0 40px rgba(245,197,24,0.12),
            0 0 18px rgba(245,197,24,0.22)
          `,
          zIndex: 5,
        }}
      />
      {/* Inner fine accent line */}
      {/* <div
        className="pointer-events-none absolute"
        style={{
          inset: innerFine,
          borderRadius: 16,
          border: '1px solid rgba(255,230,160,0.45)',
          zIndex: 5,
        }}
      /> */}
    </>
  )
}

function DeityCorner({ imageUrl, label }: { imageUrl: string; label: string }) {
  return (
    <div
      className="flex shrink-0 flex-col items-center"
      style={{ width: DEITY_IMG + 16, marginTop: 2 }}
    >
      <div
        className="overflow-hidden rounded-lg"
        style={{
          width: DEITY_IMG,
          height: DEITY_IMG,
          border: `2px solid ${GOLD}`,
          boxShadow: `0 0 16px ${GOLD}66, inset 0 0 12px rgba(255,255,255,0.08)`,
          background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(60,20,100,0.5))',
        }}
      >
        <img
          src={imageUrl}
          alt={label}
          crossOrigin="anonymous"
          width={DEITY_IMG}
          height={DEITY_IMG}
          style={{ width: DEITY_IMG, height: DEITY_IMG, objectFit: 'cover', display: 'block' }}
        />
      </div>
      <p
        className="text-center"
        style={{
          marginTop: 5,
          fontFamily: "'Noto Sans Gujarati', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: GOLD_LIGHT,
          lineHeight: 1.25,
          textShadow: '0 1px 4px rgba(0,0,0,0.65)',
        }}
      >
        {label}
      </p>
    </div>
  )
}

function PosterBackground() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(165deg, #0d0221 0%, #1e0a4a 18%, #4a148c 42%, #6a1b9a 58%, #311b92 75%, #12082e 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 50% at 50% 0%, rgba(236,72,153,0.45) 0%, transparent 55%),
            radial-gradient(ellipse 70% 40% at 0% 50%, rgba(99,102,241,0.35) 0%, transparent 50%),
            radial-gradient(ellipse 70% 40% at 100% 55%, rgba(168,85,247,0.4) 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(88,28,135,0.55) 0%, transparent 60%)
          `,
        }}
      />
      {[20, 40, 60, 80].map((pct) => (
        <div
          key={pct}
          className="absolute top-0"
          style={{
            left: `${pct}%`,
            width: 140,
            height: 520,
            transform: 'translateX(-50%)',
            background:
              'linear-gradient(180deg, rgba(255,240,180,0.22) 0%, rgba(255,220,100,0.08) 35%, transparent 100%)',
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(5,0,20,0.65) 100%)',
        }}
      />
    </div>
  )
}

function SponsorBox({
  label,
  name,
  logo,
  height,
}: {
  label: string
  name: string
  logo: string
  height: number
}) {
  return (
    <div className="flex flex-1 flex-col items-center" style={{ minWidth: 0 }}>
      <p
        style={{
          fontSize: 11,
          color: GOLD_LIGHT,
          fontWeight: 700,
          textTransform: 'uppercase',
          textAlign: 'center',
          lineHeight: 1.05,
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        }}
      >
        {label}
      </p>
      <div
        className="flex w-full items-center justify-center rounded-lg"
        style={{
          height,
          minHeight: height,
          marginTop: 5,
          ...sponsorLogoWrapStyle,
        }}
      >
        <img
          src={logo}
          alt={name}
          crossOrigin="anonymous"
          style={{ maxWidth: '98%', maxHeight: '98%', objectFit: 'contain', display: 'block' }}
        />
      </div>
      <p
        style={{
          marginTop: 8,
          fontSize: 14,
          fontWeight: 800,
          color: GOLD,
          textAlign: 'center',
          lineHeight: 1.15,
          maxWidth: '100%',
          wordBreak: 'break-word',
          padding: '0 2px',
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        }}
      >
        {name}
      </p>
    </div>
  )
}

function TeamCell({ logo, teamName }: { logo: string; teamName: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        minHeight: 0,
        padding: '1px 0',
      }}
    >
      <div
        className="flex items-center justify-center rounded-full bg-white"
        style={{
          width: TEAM_LOGO_SIZE,
          height: TEAM_LOGO_SIZE,
          border: `3px solid ${GOLD}`,
          boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
          flexShrink: 0,
        }}
      >
        <img
          src={logo}
          alt={teamName}
          crossOrigin="anonymous"
          width={TEAM_LOGO_IMG}
          height={TEAM_LOGO_IMG}
          style={{ width: TEAM_LOGO_IMG, height: TEAM_LOGO_IMG, objectFit: 'contain', display: 'block' }}
        />
      </div>
      <p
        style={{
          marginTop: 4,
          fontSize: 16,
          fontWeight: 800,
          color: GOLD_LIGHT,
          textAlign: 'center',
          lineHeight: 1.05,
          maxWidth: TEAM_COL_W - 2,
          wordBreak: 'break-word',
          textShadow: '0 1px 4px rgba(0,0,0,0.7)',
          flexShrink: 0,
        }}
      >
        {teamName}
      </p>
    </div>
  )
}

function InvitationTemplateComponent({
  name,
  photoUrl,
  teamLogos = [...defaultTeamLogos],
  teamNamesList = teamNames,
  mainTitleLogo = defaultMainTitleLogo,
  sponsorRow3Logos = [...defaultSponsorRow3],
  sponsorRow4Logos = [...defaultSponsorRow4],
  season3LogoUrl = rpclSeason3Logo,
  deityLeftUrl = chamundaFallback,
  deityRightUrl = koylaveerFallback,
}: InvitationTemplateProps) {
  const displayName = name === 'Your Name' ? '' : name
  const formattedName = displayName ? formatPosterName(displayName) : ''
  const nameSize = displayName ? getPosterNameFontSize(displayName) : 42
  const leftTeams = teamLogos.slice(0, 4)
  const rightTeams = teamLogos.slice(4, 8)
  const leftNames = teamNamesList.slice(0, 4)
  const rightNames = teamNamesList.slice(4, 8)

  return (
    <div
      data-poster-export
      style={{
        position: 'relative',
        width: INVITATION_WIDTH,
        height: INVITATION_HEIGHT,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: 'hidden',
      }}
    >
      <PosterBackground />
      <PosterInnerFrame />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: CONTENT_PAD,
          boxSizing: 'border-box',
          gap: 6,
          overflow: 'hidden',
        }}
      >
        {/* Header — deities left/right, titles center */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
            flexShrink: 0,
            gap: 4,
          }}
        >
          <DeityCorner imageUrl={deityLeftUrl} label={deityConfig.left.labelGujarati} />

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 0 }}>
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              padding: 4,
              background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD_DARK})`,
              boxShadow: `0 0 24px ${GOLD}88`,
            }}
          >
            <img
              src={season3LogoUrl}
              alt="RPCL"
              crossOrigin="anonymous"
              width={68}
              height={68}
              style={{ borderRadius: '50%', background: '#1a0533', display: 'block' }}
            />
          </div>

          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 48,
              color: '#fff',
              letterSpacing: '0.1em',
              lineHeight: 1,
              textShadow: '0 0 20px rgba(168,85,247,0.8), 0 3px 8px rgba(0,0,0,0.6)',
              textAlign: 'center',
            }}
          >
            {tournamentConfig.titleLine1}
          </h1>
          <p
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 26,
              color: GOLD_LIGHT,
              letterSpacing: '0.14em',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            {tournamentConfig.titleLine2}
          </p>
          <p
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: GOLD,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            {tournamentConfig.titleSponsorName}
          </p>
          </div>

          <DeityCorner imageUrl={deityRightUrl} label={deityConfig.right.labelGujarati} />
        </div>

        {/* Title sponsor — logo with name below */}
        <div className="flex w-full shrink-0 flex-col items-center" style={{ gap: 0 }}>
          <p
            style={{
              fontSize: 12,
              color: GOLD_LIGHT,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {titleSponsorSlot.label}
          </p>
          <div
            className="flex w-full items-center justify-center rounded-xl"
            style={{
              marginTop: 5,
              height: 165,
              ...sponsorLogoWrapStyle,
            }}
          >
            <img
              src={mainTitleLogo}
              alt={titleSponsorSlot.name}
              crossOrigin="anonymous"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
            />
          </div>
          <p
            style={{
              marginTop: 8,
              fontSize: 18,
              fontWeight: 800,
              color: GOLD,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            {titleSponsorSlot.name}
          </p>
        </div>

        <div className="mt-1 flex w-full shrink-0 gap-2" style={{ minHeight: 148 }}>
          {sponsorRow3.map((slot, i) => (
            <SponsorBox
              key={slot.id}
              label={slot.label}
              name={slot.name}
              logo={sponsorRow3Logos[i]}
              height={96}
            />
          ))}
        </div>

        <div className="mt-1 flex w-full shrink-0 gap-2" style={{ minHeight: 142 }}>
          {sponsorRow4.map((slot, i) => (
            <SponsorBox
              key={slot.id}
              label={slot.label}
              name={slot.name}
              logo={sponsorRow4Logos[i]}
              height={88}
            />
          ))}
        </div>

        {/* Main body — photo row 1 only; text spread across rows 2–4 */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: `${TEAM_COL_W}px 1fr ${TEAM_COL_W}px`,
            gridTemplateRows: '1.05fr 0.95fr 1fr 1.15fr',
            width: '100%',
            minHeight: 0,
            gap: 3,
            position: 'relative',
          }}
        >
          {/* Cricket decor layer — fills center column empty space */}
          <div
            style={{
              gridColumn: 2,
              gridRow: '1 / 5',
              position: 'relative',
              minHeight: 0,
            }}
          >
            <CenterCricketDecor photoSize={PHOTO_MAX} />
          </div>

          {leftTeams.map((logo, i) => (
            <div key={`l-${i}`} style={{ gridColumn: 1, gridRow: i + 1, minHeight: 0 }}>
              <TeamCell logo={logo} teamName={leftNames[i]} />
            </div>
          ))}

          {rightTeams.map((logo, i) => (
            <div key={`r-${i}`} style={{ gridColumn: 3, gridRow: i + 1, minHeight: 0 }}>
              <TeamCell logo={logo} teamName={rightNames[i]} />
            </div>
          ))}

          {/* Photo — row 1 only, fixed max size */}
          <div
            style={{
              gridColumn: 2,
              gridRow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              className="rounded-full p-2"
              style={{
                width: PHOTO_MAX,
                height: PHOTO_MAX,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_DARK})`,
                boxShadow: `0 0 28px ${GOLD}99, 0 0 50px rgba(168,85,247,0.35)`,
              }}
            >
              <div
                className="overflow-hidden rounded-full"
                style={{ width: PHOTO_INNER, height: PHOTO_INNER }}
              >
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={displayName || 'Player'}
                    crossOrigin="anonymous"
                    width={PHOTO_INNER}
                    height={PHOTO_INNER}
                    style={{
                      width: PHOTO_INNER,
                      height: PHOTO_INNER,
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #4c1d95, #7c3aed)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.5" width="72" height="72" opacity="0.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          

          {/* Gujarati message + venue — row 2 */}
          <div
            style={{
              gridColumn: 2,
              gridRow: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 0,
              padding: '0 4px',
              gap: 8,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <p
              className="text-center"
              style={{
                fontFamily: "'Noto Sans Gujarati', sans-serif",
                fontSize: 28,
                color: GOLD_LIGHT,
                fontWeight: 700,
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              {tournamentConfig.gujaratiMessage}
            </p>
            <p
              className="w-full text-center"
              style={{
                fontFamily: "'Noto Sans Gujarati', sans-serif",
                fontSize: 24,
                color: GOLD_LIGHT,
                fontWeight: 700,
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              {tournamentConfig.gujaratiVenueLabel} : {tournamentConfig.gujaratiVenue}
            </p>
          </div>

          {/* Name — row 3 */}
          <div
            style={{
              gridColumn: 2,
              gridRow: 2,
              display: 'flex',
              alignItems: 'center',
              minHeight: 0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              className="w-full rounded-lg text-center"
              style={{
                background: 'rgba(13,2,33,0.75)',
                border: `2px solid ${GOLD}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
                padding: '14px 10px',
                minHeight: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {displayName ? (
                <p
                  style={{
                    fontFamily: getPosterNameFontFamily(displayName),
                    fontSize: nameSize,
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: getPosterNameLetterSpacing(displayName),
                    lineHeight: 1.2,
                    textShadow: `0 2px 8px rgba(0,0,0,0.5), 0 0 20px ${GOLD}88`,
                    wordBreak: 'break-word',
                    padding: '0 8px',
                    margin: 0,
                  }}
                >
                  {formattedName}
                </p>
              ) : (
                <p
                  style={{
                    color: '#e9d5ff',
                    fontSize: 22,
                    fontStyle: 'italic',
                    fontFamily: "'Inter', sans-serif",
                    margin: 0,
                  }}
                >
                  Enter Your Name
                </p>
              )}
            </div>
          </div>

          {/* Date + footer — row 4 */}
          <div
            style={{
              gridColumn: 2,
              gridRow: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: 0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              className="w-full rounded-lg py-4 text-center"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: `2px solid rgba(245,197,24,0.5)`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <p style={{ color: GOLD, fontSize: 18, fontWeight: 700, letterSpacing: '0.06em' }}>
                {tournamentConfig.dateLabel}
              </p>
              <p
                style={{
                  color: '#fff',
                  fontSize: 30,
                  fontFamily: "'Bebas Neue', sans-serif",
                  lineHeight: 1.1,
                  marginTop: 4,
                }}
              >
                {tournamentConfig.date}
              </p>
              <p style={{ color: GOLD_LIGHT, fontSize: 22, marginTop: 6, fontWeight: 600 }}>
                Time : {tournamentConfig.time}
              </p>
              
              <p
                style={{
                  color: GOLD_LIGHT,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  marginTop: 8,
                }}
              >
                {tournamentConfig.footerLine1.toUpperCase()}
              </p>
              <p
                style={{
                  color: GOLD,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  marginTop: 4,
                }}
              >
                {tournamentConfig.footerLine2.toUpperCase()}
              </p>
              
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
    
  )
}

export const InvitationTemplate = memo(InvitationTemplateComponent)
