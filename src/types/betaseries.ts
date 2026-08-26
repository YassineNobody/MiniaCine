export interface BetaSeriesMovie {
  id: number
  title: string
  original_title: string | null
  release_date: string | null
  poster: string | null
}

export interface BetaSeriesError {
  code: number
  text: string
}

export interface BetaSeriesSearchResponse {
  movies: BetaSeriesMovie[]
  errors: BetaSeriesError[]
}
