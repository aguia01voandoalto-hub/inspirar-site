import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import { BlogIndex, BlogPost } from './pages/Blog.jsx'

// Gera o HTML estático da home para injetar no index.html durante o build.
export function render() {
  return renderToString(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </StrictMode>,
  )
}

// Gera o HTML estático de uma página de blog (índice ou post). `dados` vem do
// prerender.js, que buscou os posts publicados no Supabase no momento do build.
export function renderBlog(dados) {
  const filho =
    dados.tipo === 'post' ? (
      <BlogPost post={dados.post} />
    ) : (
      <BlogIndex
        posts={dados.posts || []}
        pagina={dados.pagina || 1}
        totalPaginas={dados.totalPaginas || 1}
      />
    )
  return renderToString(
    <StrictMode>
      <MotionConfig reducedMotion="user">{filho}</MotionConfig>
    </StrictMode>,
  )
}
