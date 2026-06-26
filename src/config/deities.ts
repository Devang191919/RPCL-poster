/** Top-corner deity images — replace PNGs in public/deities/ with your photos */
export const deityConfig = {
  left: {
    id: 'chamunda-maa',
    publicPath: '/deities/chamunda-maa.png',
    labelGujarati: 'જય ચામુંડા માં',
  },
  right: {
    id: 'koylaveer-dada',
    publicPath: '/deities/koylaveer-dada.png',
    labelGujarati: 'જય કોયલાવીર દાદા',
  },
} as const

/** Poster frame insets (px from canvas edge) */
export const POSTER_FRAME_OUTER_INSET = 10
export const POSTER_FRAME_INNER_INSET = 38
/** @deprecated use POSTER_FRAME_INNER_INSET */
export const POSTER_FRAME_INSET = POSTER_FRAME_INNER_INSET
