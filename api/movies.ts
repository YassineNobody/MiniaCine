const BETASERIES_URL = 'https://api.betaseries.com/movies/search'

export default {
  async fetch(request: Request) {
    if (request.method !== 'GET') {
      return Response.json(
        { message: 'Méthode non autorisée.' },
        { status: 405, headers: { Allow: 'GET' } },
      )
    }

    const apiKey = process.env.TOKEN_API
    const query = new URL(request.url).searchParams.get('query')?.trim()

    if (!apiKey) {
      return Response.json(
        { message: 'La clé BetaSeries est absente du serveur.' },
        { status: 500 },
      )
    }

    if (!query) {
      return Response.json(
        { message: 'Le nom du film est obligatoire.' },
        { status: 400 },
      )
    }

    if (query.length > 100) {
      return Response.json(
        { message: 'La recherche est trop longue.' },
        { status: 400 },
      )
    }

    const betaSeriesUrl = new URL(BETASERIES_URL)
    betaSeriesUrl.searchParams.set('title', query)
    betaSeriesUrl.searchParams.set('locale', 'fr')

    try {
      const response = await fetch(betaSeriesUrl, {
        headers: {
          'X-BetaSeries-Key': apiKey,
          'X-BetaSeries-Version': '3.0',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return Response.json(
          { message: 'BetaSeries a refusé la recherche.' },
          { status: response.status },
        )
      }

      return Response.json(data, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      })
    } catch {
      return Response.json(
        { message: 'BetaSeries est momentanément indisponible.' },
        { status: 502 },
      )
    }
  },
}
