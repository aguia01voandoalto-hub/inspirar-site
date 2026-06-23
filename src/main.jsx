import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'

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
