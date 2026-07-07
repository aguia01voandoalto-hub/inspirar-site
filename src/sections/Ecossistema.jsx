import { Reveal } from '../components/Reveal.jsx'

// A REVELAÇÃO da amplitude. Os 3 cards de CardsDeUso são os heróis emocionais;
// aqui mostramos que o inspirar.app é um ECOSSISTEMA — resolve a percepção de
// "só 3 funcionalidades" que subvaloriza o app. Copy VERIFICADA no banco/código
// (números reais; privacidade do Caderno corrigida — nada de "nunca vai pra
// nuvem", que seria falso).

// Ícones de linha minimalistas (herdam a cor via currentColor = dourado).
const Icone = ({ d, extra }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d={d} />
    {extra}
  </svg>
)

const FEATURES = [
  {
    nome: 'Caderno com Deus',
    desc: 'Um método, não um diário. Você define seus focos e o conteúdo cresce com você — visível só para você, nunca alimenta IA.',
    icone: (
      <Icone
        d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
        extra={<><path d="M14 3v5h5" /><path d="M8 13h6M8 17h4" /></>}
      />
    ),
  },
  {
    nome: 'Espaço de Adoração',
    desc: 'Quatro modos de encontro — cada um com voz, som ambiente e atmosfera próprios. Você escolhe como quer esse momento.',
    icone: (
      <Icone
        d="M9 18V6l10-2v12"
        extra={<><circle cx="6" cy="18" r="3" /><circle cx="16" cy="16" r="3" /></>}
      />
    ),
  },
  {
    nome: 'Comunidades',
    desc: 'Grupos com moderação, pedidos de oração e desafios com etapas reais. Porque fé não foi feita para ser vivida sozinho.',
    icone: (
      <Icone
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        extra={<><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>}
      />
    ),
  },
  {
    nome: 'Estudos Bíblicos',
    desc: 'Quatro jornadas completas, aula após aula, em sequência. Você não decide o que estudar — só aparece e avança.',
    icone: (
      <Icone
        d="M22 10 12 5 2 10l10 5 10-5z"
        extra={<><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5" /></>}
      />
    ),
  },
  {
    nome: 'Bíblia Completa',
    desc: 'A Bíblia inteira em 3 traduções, dentro do mesmo app. Sem anúncio no meio, sem distração.',
    icone: (
      <Icone
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
        extra={<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />}
      />
    ),
  },
  {
    nome: 'Streak & Ranking',
    desc: 'Cada dia de encontro com Deus conta. A sequência não some quando você fecha o app — constância que vira compromisso.',
    icone: (
      <Icone d="M12 2c1 4-2 5-2 8a4 4 0 0 0 8 0c0-1-.5-2-1-3 2 1 3 3 3 6a7 7 0 1 1-14 0c0-4 4-6 6-11z" />
    ),
  },
  {
    nome: 'Sons & Modo Sono',
    desc: 'Ambientes para orar, estudar e dormir. O dia começa com Deus — e termina com Ele também.',
    icone: <Icone d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  },
  {
    nome: 'Lembretes no tempo certo',
    desc: 'Notificações que aparecem na hora certa, com o que você mesmo escolheu priorizar — que lembram, não que incomodam.',
    icone: (
      <Icone
        d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
        extra={<path d="M13.7 21a2 2 0 0 1-3.4 0" />}
      />
    ),
  },
]

const PROVAS = [
  'A Bíblia em 3 traduções',
  '209 versículos mapeados por emoção',
  '4 modos de adoração',
  '+40 mil lembretes entregues',
]

export default function Ecossistema() {
  return (
    <section className="bg-creme px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
            Muito além de 3 telas
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-3xl font-light leading-snug text-roxo md:text-5xl">
            Um ecossistema inteiro{' '}
            <em className="text-dourado">para a sua fé.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-roxo/70">
            As três telas acima são só o começo. Veja tudo o que vem junto — em
            um único lugar, sem anúncios e sem distração.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.nome} delay={(i % 4) * 0.08}>
              <div className="flex h-full flex-col border-t border-roxo/15 pt-5">
                <span className="text-dourado">{f.icone}</span>
                <h3 className="mt-4 font-serif text-xl font-light text-roxo">
                  {f.nome}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-roxo/65">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Faixa de provas — números reais, verificados no banco */}
        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-3xl border border-roxo/10 bg-white/60 px-8 py-6 text-center">
            {PROVAS.map((p, i) => (
              <span key={p} className="flex items-center gap-3">
                {i > 0 && <span className="hidden text-dourado/50 sm:inline">·</span>}
                <span className="text-sm font-medium text-roxo/80">{p}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
