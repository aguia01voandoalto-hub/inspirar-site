import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import PaginaPresente from './pages/PaginaPresente.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <PaginaPresente />
    </MotionConfig>
  </StrictMode>,
)
