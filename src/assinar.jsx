import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import PaginaAssinar from './pages/PaginaAssinar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <PaginaAssinar />
    </MotionConfig>
  </StrictMode>,
)
