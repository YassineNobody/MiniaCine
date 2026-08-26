import type { BetaSeriesMovie } from '../../types/betaseries'
import { DownloadButton } from '../DownloadButton/DownloadButton'

interface MovieCardProps {
  movie: BetaSeriesMovie
}

export function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster

  return (
    <article className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm transition hover:-translate-y-1 hover:border-slate-700">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Affiche de ${movie.title}`}
          className="aspect-[2/3] w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-[2/3] items-center justify-center bg-slate-800 p-4 text-center text-sm text-slate-500">
          Aucune image
        </div>
      )}

      <div className="flex items-center justify-between gap-3 p-4">
        <h2 className="min-w-0 truncate text-sm font-semibold text-slate-100" title={movie.title}>
          {movie.title}
        </h2>
        {imageUrl && <DownloadButton imageUrl={imageUrl} title={movie.title} />}
      </div>
    </article>
  )
}
