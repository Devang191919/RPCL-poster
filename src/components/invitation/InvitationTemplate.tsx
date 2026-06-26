import { memo } from 'react'
import {
  tournamentConfig,
  INVITATION_WIDTH,
  INVITATION_HEIGHT,
} from '../../config/tournament'
import { sponsorRow3, sponsorRow4, titleSponsorSlot } from '../../config/sponsors'
import { teamNames } from '../../config/teams'
import { getPosterNameFontSize } from '../../utils/posterTypography'
import {
  defaultTeamLogos,
  defaultMainTitleLogo,
  defaultSponsorRow3,
  defaultSponsorRow4,
  rpclSeason3Logo,
} from '../../assets'
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
}

const TEAM_COL_W = 228
const PHOTO_MAX = 272
const PHOTO_INNER = PHOTO_MAX - 16
const TEAM_LOGO_SIZE = TEAM_COL_W - 10
const TEAM_LOGO_IMG = TEAM_LOGO_SIZE - 28

const GOLD = '#f5c518'
const GOLD_LIGHT = '#ffe566'
const GOLD_DARK = '#c9a012'

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
      <div className="absolute inset-3 rounded-2xl" style={{ border: `3px solid ${GOLD}`, opacity: 0.85 }} />
      <div className="absolute inset-6 rounded-xl" style={{ border: `1px solid rgba(245,197,24,0.45)` }} />
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
          background: 'linear-gradient(145deg, rgba(255,255,255,0.97), rgba(255,248,220,0.95))',
          border: `2px solid ${GOLD}`,
          padding: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
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
}: InvitationTemplateProps) {
  const displayName = name === 'Your Name' ? '' : name
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

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          boxSizing: 'border-box',
          gap: 6,
        }}
      >
        {/* Header — compact top */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, gap: 4 }}>
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
              width={72}
              height={72}
              style={{ borderRadius: '50%', background: '#1a0533', display: 'block' }}
            />
          </div>

          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 52,
              color: '#fff',
              letterSpacing: '0.1em',
              lineHeight: 1,
              textShadow: '0 0 20px rgba(168,85,247,0.8), 0 3px 8px rgba(0,0,0,0.6)',
            }}
          >
            {tournamentConfig.titleLine1}
          </h1>
          <p
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 28,
              color: GOLD_LIGHT,
              letterSpacing: '0.14em',
              lineHeight: 1,
            }}
          >
            {tournamentConfig.titleLine2}
          </p>
          <p
            style={{
              fontSize: 30,
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
              background: 'linear-gradient(145deg, #fff, #fff8e0)',
              border: `3px solid ${GOLD}`,
              padding: 10,
              boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
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

          {/* Gujarati — row 2 */}
          <div
            style={{
              gridColumn: 2,
              gridRow: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 0,
              padding: '0 4px',
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
              }}
            >
              {tournamentConfig.gujaratiMessage}
            </p>
          </div>

          {/* Name — row 3 */}
          <div
            style={{
              gridColumn: 2,
              gridRow: 3,
              display: 'flex',
              alignItems: 'center',
              minHeight: 0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              className="w-full rounded-lg py-3 text-center"
              style={{
                background: 'rgba(13,2,33,0.75)',
                border: `2px solid ${GOLD}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
              }}
            >
              {displayName ? (
                <p
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: nameSize,
                    color: '#fff',
                    letterSpacing: '0.06em',
                    lineHeight: 1.05,
                    textShadow: `0 0 16px ${GOLD}`,
                    wordBreak: 'break-word',
                    padding: '0 6px',
                  }}
                >
                  {displayName.toUpperCase()}
                </p>
              ) : (
                <p style={{ color: '#e9d5ff', fontSize: 24, fontStyle: 'italic' }}>Enter Your Name</p>
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
              <p
                style={{
                  color: '#fff',
                  fontSize: 26,
                  fontFamily: "'Bebas Neue', sans-serif",
                  marginTop: 6,
                  lineHeight: 1.1,
                }}
              >
                {tournamentConfig.venue.toUpperCase()}
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
