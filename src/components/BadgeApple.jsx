// Selo oficial "Baixar na App Store" (badge pt-BR da Apple, servido local).
const APP_STORE = 'https://apps.apple.com/br/app/inspirar-app/id6783974266'

export default function BadgeApple({ className = 'h-14' }) {
  return (
    <a href={APP_STORE} className="inline-block">
      <img
        src="/badges/app-store.svg"
        alt="Baixar na App Store"
        loading="lazy"
        className={`w-auto ${className}`}
      />
    </a>
  )
}
