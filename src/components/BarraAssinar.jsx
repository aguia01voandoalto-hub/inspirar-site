import { useEffect, useState } from 'react'

// Barra de CTA fixa no rodapé do celular (home). Aparece depois da primeira
// dobra pra não competir com o herói. Mesmo padrão da BarraFixa do /pais.
export default function BarraAssinar() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-dourado/30 bg-noite/95 px-4 py-3 backdrop-blur transition-transform duration-300 md:hidden ${
        visivel ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="leading-tight">
          <p className="text-sm font-medium text-creme">A partir de R$ 8,32/mês</p>
          <p className="text-[0.7rem] text-creme/60">⚡ Pix · acesso na hora</p>
        </div>
        <a
          href="#planos"
          className="shrink-0 rounded-full bg-dourado px-6 py-3 text-sm font-medium text-noite"
        >
          Assinar →
        </a>
      </div>
    </div>
  )
}
