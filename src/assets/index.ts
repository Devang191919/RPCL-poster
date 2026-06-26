import rpclSeason3Logo from './rpcl-season3-logo.svg'
import team1 from './teams/team-1.svg'
import team2 from './teams/team-2.svg'
import team3 from './teams/team-3.svg'
import team4 from './teams/team-4.svg'
import team5 from './teams/team-5.svg'
import team6 from './teams/team-6.svg'
import team7 from './teams/team-7.svg'
import team8 from './teams/team-8.svg'
import sponsorTitle from './sponsors/title.svg'
import sponsorCosponsor1 from './sponsors/cosponsor1.svg'
import sponsorTrophy from './sponsors/trophy.svg'
import partnerEvent from './partners/event.svg'
import partnerDrink from './partners/drink.svg'
import partnerDj from './partners/dj.svg'
import partnerBanner from './partners/banner.svg'
import {
  MAIN_TITLE_SPONSOR_PATH,
  sponsorRow3,
  sponsorRow4,
} from '../config/sponsors'

export { rpclSeason3Logo }

export const defaultTeamLogos = [
  team1, team2, team3, team4, team5, team6, team7, team8,
] as const

export const defaultMainTitleLogo = sponsorTitle

export const defaultSponsorRow3 = [
  sponsorCosponsor1,
  sponsorTrophy,
] as const

export const defaultSponsorRow4 = [
  partnerEvent,
  partnerDrink,
  partnerDj,
  partnerBanner,
] as const

export const TEAM_LOGO_URLS = Array.from(
  { length: 8 },
  (_, i) => `/teams/team-${i + 1}.png`,
)

async function tryLoadImage(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(url)
    img.onerror = () => resolve(null)
    img.src = url
  })
}

export async function loadTeamLogos(): Promise<string[]> {
  const results = await Promise.all(TEAM_LOGO_URLS.map(tryLoadImage))
  return results.map((url, i) => url ?? defaultTeamLogos[i])
}

export async function loadMainTitleLogo(): Promise<string> {
  return (await tryLoadImage(MAIN_TITLE_SPONSOR_PATH)) ?? defaultMainTitleLogo
}

export async function loadSponsorRow3(): Promise<string[]> {
  const results = await Promise.all(sponsorRow3.map((s) => tryLoadImage(s.publicPath)))
  return results.map((url, i) => url ?? defaultSponsorRow3[i])
}

export async function loadSponsorRow4(): Promise<string[]> {
  const results = await Promise.all(sponsorRow4.map((s) => tryLoadImage(s.publicPath)))
  return results.map((url, i) => url ?? defaultSponsorRow4[i])
}

export async function loadSeason3Logo(): Promise<string> {
  return (await tryLoadImage('/rpcl-season3-logo.png')) ?? rpclSeason3Logo
}

export type LoadedPosterAssets = {
  teamLogos: string[]
  mainTitleLogo: string
  sponsorRow3: string[]
  sponsorRow4: string[]
  season3LogoUrl: string
}

export async function loadAllPosterAssets(): Promise<LoadedPosterAssets> {
  const [teamLogos, mainTitleLogo, sponsorRow3Logos, sponsorRow4Logos, season3LogoUrl] =
    await Promise.all([
      loadTeamLogos(),
      loadMainTitleLogo(),
      loadSponsorRow3(),
      loadSponsorRow4(),
      loadSeason3Logo(),
    ])
  return {
    teamLogos,
    mainTitleLogo,
    sponsorRow3: sponsorRow3Logos,
    sponsorRow4: sponsorRow4Logos,
    season3LogoUrl,
  }
}
