import { Reveal } from '../components/Reveal.jsx'

// Iniciais para quem não tem foto (ex.: "Rerison Rodrigo" → "RR").
function iniciais(nome) {
  const partes = nome.trim().split(/\s+/)
  return (partes[0][0] + (partes[1]?.[0] ?? '')).toUpperCase()
}

const DEPOIMENTOS = [
  {
    nome: 'Laura Yane',
    cidade: 'Brasília, DF',
    texto:
      'Acordo, abro o inspirar.app e o dia muda de tom. Virou o meu primeiro café da manhã.',
    data: 'No inspirar.app desde 2025',
    foto: '/prints/laura-yane.jpg',
  },
  {
    nome: 'Rerison Rodrigo',
    cidade: 'Cuiabá, MT',
    texto:
      'O aplicativo hoje faz parte da minha rotina, faço questão de usar todos os dias.',
    data: 'No inspirar.app desde 2025',
    foto: '/prints/rerison-rodrigo.jpg',
  },
  {
    nome: 'Makely Babora',
    cidade: 'Cuiabá, MT',
    texto:
      'Ao chegar na academia, a primeira coisa que faço é ouvir os áudios do dia. Não começo o dia sem o inspirar.app.',
    data: 'No inspirar.app desde 2025',
    foto: '/prints/makely-babora.jpg',
  },
]

export default function Depoimentos({
  kicker = 'Quem já caminha com a gente',
  titulo = 'Histórias de quem mudou o tom dos seus dias.',
}) {
  return (
    <section
      id="depoimentos"
      className="relative overflow-hidden bg-noite px-6 pb-36 md:px-12 md:pb-60"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_15%,rgba(201,168,95,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
            {kicker}
          </p>
          <h2 className="mt-6 max-w-2xl font-serif text-3xl font-light leading-snug text-creme md:text-5xl">
            {titulo}
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-14 md:grid-cols-3 md:gap-10">
          {DEPOIMENTOS.map((d, i) => (
            <Reveal
              key={d.nome}
              delay={i * 0.15}
              className={i === 1 ? 'md:mt-14' : i === 2 ? 'md:mt-28' : ''}
            >
              <article className="border-t border-dourado/40 pt-8">
                <p
                  aria-hidden="true"
                  className="font-serif text-6xl leading-none text-dourado/60"
                >
                  “
                </p>
                <blockquote className="mt-2 font-serif text-xl font-light italic leading-relaxed text-creme md:text-2xl">
                  {d.texto}
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  {d.foto ? (
                    <img
                      src={d.foto}
                      alt={`Foto de ${d.nome}`}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover ring-1 ring-dourado/40"
                    />
                  ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-dourado/15 text-sm font-medium text-dourado ring-1 ring-dourado/40">
                      {iniciais(d.nome)}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-medium text-creme">{d.nome}</p>
                    <p className="text-xs text-creme/50">{d.cidade}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs tracking-wide text-creme/40">
                  {d.data}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
