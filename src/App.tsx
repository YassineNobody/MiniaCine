
import { useState } from 'react'

import { searchShows } from './api/tvmaze'
import { Downloader } from './components/Downloader/Downloader'
import { SearchForm } from './components/Form/SearchForm'
import type { TvMazeSearchResult } from './types/tvmaze'

function App() {
  const [results, setResults] = useState<TvMazeSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(query: string) {
    setIsLoading(true)
    setError(null)

    try {
      setResults(await searchShows(query))
    } catch {
      setResults([])
      setError('La recherche a échoué. Réessaie dans quelques instants.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0d1117] px-5 py-12 text-slate-100">
      <header className="mx-auto mb-9 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">Mini Ciné</h1>
        <p className="mt-3 text-sm text-slate-400">
          Recherche une série et télécharge son affiche.
        </p>
      </header>
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      {error && <p className="mt-6 text-center text-rose-400">{error}</p>}
      <Downloader results={results} />
    </main>
  )
}

export default App
