import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { inject } from '@vercel/analytics'
import './index.css'
import App from './App.jsx'

// Vercel Web Analytics — mede visitas por página, origem e dispositivo (sem
// cookie/banner). Precisa estar LIGADO no painel do Vercel (Analytics → Enable).
// Roda só no cliente; não mede /baixar (redirect não carrega página).
inject()

const arvore = (
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>
)

const raiz = document.getElementById('root')

// Se o HTML já veio pré-renderizado (SSG), hidrata; senão, renderiza do zero.
if (raiz.hasChildNodes()) {
  hydrateRoot(raiz, arvore)
} else {
  createRoot(raiz).render(arvore)
}
