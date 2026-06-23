import { Reveal } from '../components/Reveal.jsx'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const ITENS = [
  {
    legenda: 'Devocionais diários',
    icone: (
      <svg viewBox="0 0 24 24" {...stroke} className="h-7 w-7">
        <path d="M12 6c-2-1.6-5-2.2-9-2.2v14.4c4 0 7 .6 9 2.2 2-1.6 5-2.2 9-2.2V3.8c-4 0-7 .6-9 2.2Z" />
        <path d="M12 6v14.4" />
      </svg>
    ),
  },
  {
    legenda: 'Bíblia completa',
    icone: (
      <svg viewBox="0 0 24 24" {...stroke} className="h-7 w-7">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" />
        <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
        <path d="M14 2v6l-2.5-2L9 8V2" />
      </svg>
    ),
  },
  {
    legenda: 'Mural de Orações',
    icone: (
      <svg viewBox="0 0 24 24" {...stroke} className="h-7 w-7">
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.6 0-3.1-.4-4.4-1.2L3 20l1.2-5.1A8.5 8.5 0 1 1 21 11.5Z" />
      </svg>
    ),
  },
  {
    legenda: 'Caderno com Deus',
    icone: (
      <svg viewBox="0 0 24 24" {...stroke} className="h-7 w-7">
        <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
      </svg>
    ),
  },
  {
    legenda: 'Jornada da Fé',
    icone: (
      <svg viewBox="0 0 24 24" {...stroke} className="h-7 w-7">
        <path d="M4 22V4" />
        <path d="M4 4h13l-2.5 4L17 12H4" />
      </svg>
    ),
  },
]

export default function PrimeiraVista() {
  return (
    <section className="bg-noite px-6 pb-36 md:px-12 md:pb-60">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-medium tracking-[0.25em] text-dourado uppercase">
            <span aria-hidden="true">✦</span> À primeira vista
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-12 grid grid-cols-2 gap-y-12 border-y border-creme/10 py-14 sm:grid-cols-3 md:grid-cols-5">
            {ITENS.map((item) => (
              <li
                key={item.legenda}
                className="flex flex-col items-start gap-4 pr-6"
              >
                <span className="text-creme/80">{item.icone}</span>
                <span className="text-xs tracking-wide text-creme/60">
                  {item.legenda}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
