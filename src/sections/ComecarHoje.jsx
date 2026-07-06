import { Reveal } from '../components/Reveal.jsx'
import BadgesLojas from '../components/BadgesLojas.jsx'

// Seção de conversão da home ("assinar-primeiro"): mostra o caminho em 3
// passos e os planos com âncora de preço, levando pra /assinar — onde vive o
// checkout de verdade. Mantém a home leve; a decisão detalhada fica na landing.
const PASSOS = [
  {
    n: '01',
    t: 'Assine',
    d: 'Escolha o plano e pague por Pix, boleto ou cartão. Leva 1 minuto.',
  },
  {
    n: '02',
    t: 'Baixe o app',
    d: 'Baixe grátis na Google Play ou na App Store e entre na sua conta.',
  },
  {
    n: '03',
    t: 'Comece a caminhar',
    d: 'Entre com o mesmo e-mail da assinatura — seu acesso já estará ativo.',
  },
]

// Cards levam DIRETO pro checkout (sessão criada no backend — Checkout Asaas
// com a cara do produto). Menos passos = mais conversão; /assinar segue viva
// pra quem precisa de mais contexto (rodapé, campanhas).
const CHECKOUT = (plano) => `https://app.inspirar.app/api/public/checkout/${plano}`

// Anual no CENTRO (center-stage effect), equivalente mensal como herói e
// âncora do mensal riscada nos planos longos — mesmo padrão da /assinar.
// Cartão (recorrente) é o caminho principal; Pix é o link clássico (cobrança
// por período, renovação manual — limitação do Asaas, Pix não tem débito auto).
const PLANOS = [
  { id: 'mensal', nome: 'Mensal', mes: 'R$ 29,90', ancora: null, detalhe: 'cobrado mês a mês', badge: null, destaque: false, pix: 'https://www.asaas.com/c/60rmms1mwxa6cv2w' },
  { id: 'anual', nome: 'Anual', mes: 'R$ 14,90', ancora: 'R$ 29,90', detalhe: 'cobrado R$ 178,80 uma vez por ano', badge: 'melhor valor · economize 50%', destaque: true, pix: 'https://www.asaas.com/c/yx5kbq02kpb3pgo3' },
  { id: 'trimestral', nome: 'Trimestral', mes: 'R$ 21,90', ancora: 'R$ 29,90', detalhe: 'cobrado R$ 65,70 a cada 3 meses', badge: null, destaque: false, pix: 'https://www.asaas.com/c/odskxxbftl66lug9' },
]

export default function ComecarHoje() {
  return (
    <section id="planos" className="bg-creme px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
            Comece hoje
          </p>
          <h2 className="mt-6 max-w-2xl font-serif text-3xl font-light leading-snug text-roxo md:text-5xl">
            Do primeiro clique à primeira oração,{' '}
            <em className="text-dourado">em minutos.</em>
          </h2>
        </Reveal>

        {/* 3 passos */}
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {PASSOS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.12}>
              <div className="border-t border-roxo/15 pt-6">
                <p className="font-serif text-4xl font-light text-dourado">{p.n}</p>
                <h3 className="mt-4 font-serif text-2xl font-light text-roxo">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-roxo/70">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Planos (âncora) */}
        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {PLANOS.map((p) => (
              <div
                key={p.nome}
                className={`relative flex flex-col rounded-3xl border p-6 text-center transition-shadow hover:shadow-lg ${
                  p.destaque
                    ? 'border-dourado/60 bg-white shadow-md md:-translate-y-2 md:scale-[1.03]'
                    : 'border-roxo/15 bg-white/60'
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-dourado px-3 py-1 text-[0.65rem] font-medium tracking-widest text-noite uppercase">
                    {p.badge}
                  </span>
                )}
                <p className="font-serif text-lg font-light text-roxo">{p.nome}</p>
                <p className={`mt-2 text-xs text-roxo/50 ${p.ancora ? '' : 'invisible'}`}>
                  de <span className="line-through">{p.ancora || 'R$ 00,00'}</span> por
                </p>
                <p className="mt-1 font-serif text-4xl font-light leading-none text-roxo">
                  {p.mes}
                  <span className="text-base text-roxo/60">/mês</span>
                </p>
                <p className="mt-2 text-xs text-roxo/55">{p.detalhe}</p>
                <a
                  href={CHECKOUT(p.id)}
                  className={`mt-5 block w-full rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-[filter] duration-300 ${
                    p.destaque
                      ? 'bg-roxo text-creme hover:brightness-125'
                      : 'border border-roxo/30 text-roxo hover:bg-roxo/5'
                  }`}
                >
                  Assinar no cartão →
                </a>
                <a
                  href={p.pix}
                  className="mt-2 text-xs text-roxo/60 underline decoration-dourado/60 underline-offset-4 hover:text-roxo hover:decoration-dourado"
                >
                  ou pagar com Pix
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 text-center">
            <a
              href="/assinar"
              className="inline-block rounded-full bg-roxo px-8 py-4 text-sm font-medium tracking-wide text-creme transition-[filter] duration-300 hover:brightness-125"
            >
              Ver planos e assinar →
            </a>
            <p className="mt-4 text-xs text-roxo/55">
              ⚡ No cartão, renova sozinho · no Pix, você renova a cada período ·
              cancele quando quiser
            </p>
            <p className="mt-2 text-xs text-roxo/55">
              🎁 É pra dar de presente?{' '}
              <a href="/presente" className="underline decoration-dourado/60 underline-offset-2 hover:text-roxo">
                Veja os planos de presente →
              </a>
            </p>
            <div className="mt-6">
              <BadgesLojas className="h-12" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
