import BadgePlay from './BadgePlay.jsx'
import BadgeApple from './BadgeApple.jsx'

// Os dois selos oficiais lado a lado — o app está nas duas lojas (Google Play
// desde jul/2026, App Store aprovada em 4/7/2026).
export default function BadgesLojas({ className = 'h-12', center = true, refSlug = null }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${center ? 'justify-center' : ''}`}>
      <BadgePlay className={className} refSlug={refSlug} />
      <BadgeApple className={className} refSlug={refSlug} />
    </div>
  )
}
