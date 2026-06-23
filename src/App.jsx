import { useEffect, useState } from 'react'
import Hero from './sections/Hero.jsx'
import Manifesto from './sections/Manifesto.jsx'
import CardsDeUso from './sections/CardsDeUso.jsx'
import FraseGigante from './sections/FraseGigante.jsx'
import Depoimentos from './sections/Depoimentos.jsx'
import CartaFundador from './sections/CartaFundador.jsx'
import MomentoMarca from './sections/MomentoMarca.jsx'
import Footer from './sections/Footer.jsx'
import PaginaLegal from './pages/PaginaLegal.jsx'

// Rotas de página usam o formato "#/rota" para não conflitar com as
// âncoras de seção ("#manifesto", "#carta" etc.).
function usePagina() {
  // Começa vazio (home) para casar com o HTML pré-renderizado no servidor;
  // o hash real é lido logo após montar, sem quebrar a hidratação.
  const [hash, setHash] = useState('')

  useEffect(() => {
    setHash(window.location.hash)
    const aoMudar = () => setHash(window.location.hash)
    window.addEventListener('hashchange', aoMudar)
    return () => window.removeEventListener('hashchange', aoMudar)
  }, [])

  return hash.startsWith('#/') ? hash.slice(2) : null
}

export default function App() {
  const pagina = usePagina()

  useEffect(() => {
    if (pagina) window.scrollTo(0, 0)
  }, [pagina])

  if (pagina === 'privacidade' || pagina === 'termos') {
    return <PaginaLegal tipo={pagina} />
  }

  return (
    <main>
      <Hero />
      <Manifesto />
      <CardsDeUso />
      <FraseGigante />
      <Depoimentos />
      <CartaFundador />
      <MomentoMarca />
      <Footer />
    </main>
  )
}
