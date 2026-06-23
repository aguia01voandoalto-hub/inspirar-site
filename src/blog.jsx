import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import { BlogIndex, BlogPost } from './pages/Blog.jsx'
import { fetchIndex, fetchPost } from './blog/clientData.js'

const raiz = document.getElementById('root')

const envolver = (filho) => (
  <StrictMode>
    <MotionConfig reducedMotion="user">{filho}</MotionConfig>
  </StrictMode>
)

// 1) Prerenderizado (prod): dados embutidos pelo prerender.js → hidrata.
const embutido = typeof window !== 'undefined' ? window.__BLOG__ : null
if (embutido) {
  const arvore = envolver(
    embutido.tipo === 'post' ? (
      <BlogPost post={embutido.post} />
    ) : (
      <BlogIndex
        posts={embutido.posts || []}
        pagina={embutido.pagina || 1}
        totalPaginas={embutido.totalPaginas || 1}
      />
    ),
  )
  if (raiz.hasChildNodes()) hydrateRoot(raiz, arvore)
  else createRoot(raiz).render(arvore)
} else {
  // 2) Sem prerender (dev / hit direto): resolve pela URL e busca no Supabase.
  const root = createRoot(raiz)
  const slug = (() => {
    const m = window.location.pathname.match(/^\/blog\/([^/]+)\/?$/)
    return m ? decodeURIComponent(m[1]) : null
  })()

  if (slug) {
    fetchPost(slug).then((post) => root.render(envolver(<BlogPost post={post} />)))
  } else {
    fetchIndex().then((posts) => root.render(envolver(<BlogIndex posts={posts} />)))
  }
}
