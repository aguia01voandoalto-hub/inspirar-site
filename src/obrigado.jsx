import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import PaginaObrigado from './pages/PaginaObrigado.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <PaginaObrigado />
    </MotionConfig>
  </StrictMode>,
)
