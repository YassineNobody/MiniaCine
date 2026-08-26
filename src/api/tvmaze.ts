import axios from 'axios'

import type { TvMazeSearchResult } from '../types/tvmaze'

const TVMAZE_URL = 'https://api.tvmaze.com/search/shows'

export async function searchShows(query: string): Promise<TvMazeSearchResult[]> {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return []
  }

  const response = await axios.get<TvMazeSearchResult[]>(TVMAZE_URL, {
    params: { q: trimmedQuery },
  })

  return response.data
}
