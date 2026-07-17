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
  // O className é a CAIXA (altura + aspect vindos do BadgesLojas); a img preenche
  // com object-contain, centralizada. Assim a badge fica com tamanho idêntico ao
  // da App Store mesmo tendo proporção diferente (evita distorcer o selo oficial).
  return (
    <a href={href} className={`inline-flex items-center justify-center ${className}`}>
      <img
        src="/badges/google-play.png"
        alt="Disponível no Google Play"
        loading="lazy"
        className="max-h-full max-w-full object-contain"
      />
    </a>
  )
}
