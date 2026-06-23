import { Reveal } from '../components/Reveal.jsx'

const PILARES = [
  {
    titulo: 'Devocional diário',
    frase: 'Comece o dia ancorado na Palavra.',
    icone: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className="h-10 w-10">
        <path d="M14 32a10 10 0 0 1 20 0" />
        <line x1="6" y1="32" x2="42" y2="32" />
        <line x1="24" y1="10" x2="24" y2="16" />
        <line x1="10" y1="17" x2="14" y2="21" />
        <line x1="38" y1="17" x2="34" y2="21" />
      </svg>
    ),
  },
  {
    titulo: 'Mural de Orações',
    frase: 'Interceda e seja intercedido.',
    icone: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <path d="M10 10h28a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H22l-8 8v-8h-4a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2Z" />
        <path d="M24 25s-5.5-3.2-5.5-6.8c0-1.8 1.4-3.2 3.1-3.2 1 0 1.9.5 2.4 1.3.5-.8 1.4-1.3 2.4-1.3 1.7 0 3.1 1.4 3.1 3.2C29.5 21.8 24 25 24 25Z" />
      </svg>
    ),
  },
  {
    titulo: 'Jornada da Fé',
    frase: 'Constância que aproxima.',
    icone: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <path d="M8 40c10 0 11-9 19-12" strokeDasharray="2.5 4.5" />
        <circle cx="8" cy="40" r="2.5" />
        <path d="M34 26s-6-5.4-6-10a6 6 0 0 1 12 0c0 4.6-6 10-6 10Z" />
        <circle cx="34" cy="15.5" r="1.75" />
      </svg>
    ),
  },
]

export default function Apresentacao() {
  return (
    <section id="funcionalidades" className="bg-creme px-6 pb-32 md:px-12 md:pb-52">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-roxo/60 uppercase">
            Apresentando o inspirar.app
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-3xl font-light leading-snug text-roxo md:text-5xl">
            Alguns minutos por dia que mudam o seu dia inteiro.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-14 sm:grid-cols-3 md:mt-28">
          {PILARES.map((p, i) => (
            <Reveal key={p.titulo} delay={i * 0.15}>
              <div className="text-roxo">{p.icone}</div>
              <h3 className="mt-6 text-lg font-normal text-roxo">{p.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-roxo/60">
                {p.frase}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
