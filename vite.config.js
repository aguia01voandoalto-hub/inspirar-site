import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// No dev, deixa /pais e /presente servirem seus .html (em produção o Vercel
// faz isso via cleanUrls).
const cleanUrls = {
  name: 'clean-urls',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const caminho = (req.url || '').split('?')[0]
      if (caminho === '/pais' || caminho === '/pais/') req.url = '/pais.html'
      if (caminho === '/presente' || caminho === '/presente/') req.url = '/presente.html'
      // Blog: índice e posts (/blog, /blog/<slug>) servem o mesmo entry; o
      // cliente resolve o conteúdo pela URL (em dev, busca no Supabase).
      if (caminho === '/blog' || caminho === '/blog/' || caminho.startsWith('/blog/')) {
        req.url = '/blog.html'
      }
      next()
    })
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), cleanUrls],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        pais: fileURLToPath(new URL('./pais.html', import.meta.url)),
        presente: fileURLToPath(new URL('./presente.html', import.meta.url)),
        blog: fileURLToPath(new URL('./blog.html', import.meta.url)),
      },
    },
  },
})
