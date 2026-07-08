// Selo oficial "Baixar na App Store" (badge pt-BR da Apple, servido local).
const APP_STORE = 'https://apps.apple.com/br/app/inspirar-app/id6783974266'

// Com indicação (refSlug), passa antes pelo app web para gravar o cookie de
// atribuição. No iPhone, quem usa o app web (PWA) mantém o rastro; só o
// download NATIVO pela App Store continua cego (limitação da loja — Fase 2).
export default function BadgeApple({ className = 'h-14', refSlug = null }) {
  const href = refSlug ? `https://app.inspirar.app/?ref=${refSlug}` : APP_STORE
  return (
    <a href={href} className="inline-block">
      <img
        src="/badges/app-store.svg"
        alt="Baixar na App Store"
        loading="lazy"
        className={`w-auto ${className}`}
      />
    </a>
  )
}
