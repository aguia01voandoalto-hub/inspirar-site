// Selo oficial "Disponível no Google Play" (badge pt-BR do Google, servido
// local em /badges/). Prova de confiança: o app é real, revisado e publicado.
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=app.inspirar'

// Quando há indicação (refSlug), o download passa PRIMEIRO pelo app web
// (app.inspirar.app/?ref=slug) para gravar o cookie de atribuição de 90 dias
// antes de instalar — assim quem "só baixa" (sem assinar agora) continua
// creditando o embaixador se assinar depois. No Android o app (TWA) divide o
// mesmo Chrome, então o cookie sobrevive à instalação. Sem ref, vai direto à loja.
export default function BadgePlay({ className = 'h-14', refSlug = null }) {
  const href = refSlug ? `https://app.inspirar.app/?ref=${refSlug}` : PLAY_STORE
  return (
    <a href={href} className="inline-block">
      <img
        src="/badges/google-play.png"
        alt="Disponível no Google Play"
        loading="lazy"
        className={`w-auto ${className}`}
      />
    </a>
  )
}
