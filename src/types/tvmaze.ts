export interface TvMazeSearchResult {
  score: number
  show: TvMazeShow
}

export interface TvMazeShow {
  id: number
  url: string
  name: string
  type: string
  language: string | null
  genres: string[]
  status: string
  runtime: number | null
  averageRuntime: number | null
  premiered: string | null
  ended: string | null
  officialSite: string | null
  schedule: TvMazeSchedule
  rating: TvMazeRating
  weight: number
  network: TvMazeChannel | null
  webChannel: TvMazeChannel | null
  dvdCountry: TvMazeCountry | null
  externals: TvMazeExternals
  image: TvMazeImage | null
  summary: string | null
  updated: number
  _links: TvMazeLinks
}

export interface TvMazeImage {
  medium: string
  original: string
}

export interface TvMazeSchedule {
  time: string
  days: string[]
}

export interface TvMazeRating {
  average: number | null
}

export interface TvMazeCountry {
  name: string
  code: string
  timezone: string
}

export interface TvMazeChannel {
  id: number
  name: string
  country: TvMazeCountry | null
  officialSite: string | null
}

export interface TvMazeExternals {
  tvrage: number | null
  thetvdb: number | null
  imdb: string | null
}

export interface TvMazeLinks {
  self: TvMazeLink
  previousepisode?: TvMazeLink
  nextepisode?: TvMazeLink
}

export interface TvMazeLink {
  href: string
  name?: string
}
