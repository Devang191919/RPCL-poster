export type PosterSponsorSlot = {
  id: string
  /** Role label e.g. Co-Sponsor, Event Partner */
  label: string
  /** Company / brand name shown below the logo */
  name: string
  publicPath: string
}

export const titleSponsorSlot = {
  label: 'Title Sponsor',
  name: 'MEGHJI SOLAR',
  publicPath: '/sponsors/title.png',
} as const

export const MAIN_TITLE_SPONSOR_PATH = titleSponsorSlot.publicPath

export const sponsorRow3: PosterSponsorSlot[] = [
  {
    id: 'cosponsor',
    label: 'Co-Sponsor',
    name: 'Co-Sponsor Name',
    publicPath: '/sponsors/cosponsor1.png',
  },
  {
    id: 'trophy',
    label: 'Trophy Sponsor',
    name: 'Trophy Sponsor Name',
    publicPath: '/sponsors/trophy.png',
  },
]

export const sponsorRow4: PosterSponsorSlot[] = [
  {
    id: 'event',
    label: 'Event Partner',
    name: 'Event Partner Name',
    publicPath: '/partners/event.png',
  },
  {
    id: 'drink',
    label: 'Drink Partner',
    name: 'Drink Partner Name',
    publicPath: '/partners/drink.png',
  },
  {
    id: 'dj',
    label: 'DJ Partner',
    name: 'DJ Partner Name',
    publicPath: '/partners/dj.png',
  },
  {
    id: 'banner',
    label: 'Banner Partner',
    name: 'Banner Partner Name',
    publicPath: '/partners/banner.png',
  },
]
