import { diaDosPaisAtivo } from '../lib/campanhas.js'

// Barra fina de campanha no topo do site (uma oferta por vez — nunca duas).
// Até 9/8: Dia dos Pais → /pais. Depois: presente evergreen → /presente.
// Não usar nas próprias páginas de presente (contexto redundante).
export default function BarraAnuncio() {
  const pais = diaDosPaisAtivo()
  const href = pais ? '/pais' : '/presente'
  const texto = pais
    ? '🎁 Dia dos Pais: presenteie 12 meses por 12× R$ 14,90 · só até 9/8'
    : '🎁 Presenteie alguém que você ama com 12 meses de inspirar.app'

  return (
    <a
      href={href}
      className="block bg-dourado px-4 py-2.5 text-center text-xs font-medium tracking-wide text-noite transition-[filter] hover:brightness-110 md:text-sm"
    >
      {texto} <span className="ml-1 font-semibold underline underline-offset-2">Ver →</span>
    </a>
  )
}
