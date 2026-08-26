import axios from 'axios'

import type { BetaSeriesSearchResponse } from '../types/betaseries'

export async function searchMovies(query: string) {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return []
  }

  const response = await axios.get<BetaSeriesSearchResponse>('/api/movies', {
    params: { query: trimmedQuery },
  })

  if (response.data.errors.length > 0) {
    throw new Error(response.data.errors[0].text)
  }

  return response.data.movies
}
