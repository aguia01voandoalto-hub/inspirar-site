// Selo oficial "Disponível no Google Play" (badge pt-BR do Google, servido
// local em /badges/). Prova de confiança: o app é real, revisado e publicado.
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=app.inspirar'

export default function BadgePlay({ className = 'h-14' }) {
  return (
    <a href={PLAY_STORE} className="inline-block">
      <img
        src="/badges/google-play.png"
        alt="Disponível no Google Play"
        loading="lazy"
        className={`w-auto ${className}`}
      />
    </a>
  )
}
