import type { TvMazeShow } from '../../types/tvmaze'
import { DownloadButton } from '../DownloadButton/DownloadButton'

interface MovieCardProps {
  movie: TvMazeShow
}

export function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.image?.original ?? movie.image?.medium

  return (
    <article className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm transition hover:-translate-y-1 hover:border-slate-700">
      {movie.image ? (
        <img
          src={movie.image.medium}
          alt={`Affiche de ${movie.name}`}
          className="aspect-[2/3] w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-[2/3] items-center justify-center bg-slate-800 p-4 text-center text-sm text-slate-500">
          Aucune image
        </div>
      )}

      <div className="flex items-center justify-between gap-3 p-4">
        <h2 className="min-w-0 truncate text-sm font-semibold text-slate-100" title={movie.name}>
          {movie.name}
        </h2>
        {imageUrl && <DownloadButton imageUrl={imageUrl} title={movie.name} />}
      </div>
    </article>
  )
}
