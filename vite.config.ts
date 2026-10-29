import { copyFileSync } from 'fs';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const repoBase = '/MarkerSpace/'

/** GitHub Pages has no SPA fallback, so unknown paths serve 404.html. */
function githubPagesSpaFallback(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist')
      copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? repoBase : '/',
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
