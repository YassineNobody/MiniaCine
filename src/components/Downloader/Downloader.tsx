import type { TvMazeSearchResult } from '../../types/tvmaze'
import { MovieCard } from '../MovieCard/MovieCard'

interface DownloaderProps {
  results: TvMazeSearchResult[]
}

export function Downloader({ results }: DownloaderProps) {
  if (results.length === 0) {
    return null
  }

  return (
    <section
      aria-label="Résultats de la recherche"
      className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {results.map(({ show }) => (
        <MovieCard key={show.id} movie={show} />
      ))}
    </section>
  )
}
