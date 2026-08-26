import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import moviesApi from './api/movies.ts'

function localMoviesApi(apiKey: string | undefined): Plugin {
  return {
    name: 'local-movies-api',
    configureServer(server) {
      server.middlewares.use('/api/movies', async (request, response) => {
        if (apiKey) {
          process.env.TOKEN_API = apiKey
        }

        const requestUrl = new URL(request.url ?? '/', 'http://localhost/api/movies/')
        const apiResponse = await moviesApi.fetch(
          new Request(requestUrl, { method: request.method }),
        )

        response.statusCode = apiResponse.status
        apiResponse.headers.forEach((value, name) => response.setHeader(name, value))
        response.end(await apiResponse.text())
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      localMoviesApi(env.TOKEN_API),
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
  }
})
