import { useState, useEffect } from 'react'
import { Reveal } from '../components/Reveal.jsx'
import Footer from '../sections/Footer.jsx'
import BadgesLojas from '../components/BadgesLojas.jsx'
import { refDaUrl, buscarInfluenciador } from '../lib/indicacao.js'

// Página de assinatura (recorrente) do inspirar.app — o próprio usuário assina
// pra si. Diferente de /presente (pagamento único de presente com código de
// resgate): aqui são os 3 planos RECORRENTES do Asaas. Depois de pagar, a
// pessoa é levada a /obrigado (Play Store) e entra no app com o MESMO e-mail
// da assinatura — o Premium é reconhecido pela conta.
// O botão principal leva ao Checkout Asaas moderno (cartão, renova sozinho;
// sessão criada no backend com nome/imagem do produto — se a API falhar, o
// backend cai no link clássico sozinho). O link "ou pague no Pix" usa o link
// clássico, que aceita Pix/boleto (cobrança por ciclo, sem débito automático).
const CHECKOUT = (plano) => `https://app.inspirar.app/api/public/checkout/${plano}`

// Preço em "R$/mês" pra TODOS os planos (framing de equivalente mensal),
// âncora riscada do mensal nos planos longos, economia concreta em R$ e o
// plano herói (Anual) no CENTRO (center-stage effect).
const PLANOS = [
  {
    id: 'mensal',
    nome: 'Mensal',
    mes: 'R$ 29,90',
    ancora: null,
    cobranca: 'cobrado mês a mês',
    economia: null,
    nota: 'comece sem compromisso longo',
    link: CHECKOUT('mensal'),
    pix: 'https://www.asaas.com/c/60rmms1mwxa6cv2w',
    badge: null,
    destaque: false,
  },
  {
    id: 'anual',
    nome: 'Anual',
    mes: 'R$ 14,90',
    ancora: 'R$ 29,90',
    cobranca: 'cobrado R$ 178,80 uma vez por ano',
    economia: 'economize R$ 180 no ano',
    nota: 'menos de R$ 0,50 por dia — o preço de um café',
    link: CHECKOUT('anual'),
    pix: 'https://www.asaas.com/c/yx5kbq02kpb3pgo3',
    badge: 'Melhor valor · economize 50%',
    destaque: true,
  },
  {
    id: 'trimestral',
    nome: 'Trimestral',
    mes: 'R$ 21,90',
    ancora: 'R$ 29,90',
    cobranca: 'cobrado R$ 65,70 a cada 3 meses',
    economia: 'economize 27%',
    nota: 'um meio-termo tranquilo',
    link: CHECKOUT('trimestral'),
    pix: 'https://www.asaas.com/c/odskxxbftl66lug9',
    badge: null,
    destaque: false,
  },
]

const RECURSOS = [
  {
    t: 'Caderno com Deus',
    d: 'Um espaço para escrever, orar e ouvir a Deus à mão, pelo celular.',
  },
  {
    t: 'Palavra e áudios do dia',
    d: 'Para começar a manhã ancorado, mesmo na correria.',
  },
  {
    t: 'Devocional diário',
    d: 'Constância que aproxima de Deus, um dia de cada vez.',
  },
  {
    t: 'Mural de Orações',
    d: 'Para saber que você nunca caminha sozinho.',
  },
]

function irParaPlanos(e) {
  e.preventDefault()
  document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })
}

function CardPlano({ p, refSlug, bonusAnual }) {
  return (
    <div
      className={`relative flex h-full flex-col items-center rounded-3xl border p-8 text-center transition-shadow ${
        p.destaque
          ? 'border-dourado/60 bg-white shadow-xl md:-translate-y-3 md:scale-[1.04]'
          : 'border-roxo/15 bg-white/60'
      }`}
    >
      {p.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-dourado px-4 py-1 text-xs font-medium tracking-widest text-noite uppercase">
          {p.badge}
        </span>
      )}

      <p className="mt-2 font-serif text-xl font-light text-roxo">{p.nome}</p>

      {/* Âncora: o preço do mensal riscado (referência) */}
      <p className={`mt-4 text-sm text-roxo/50 ${p.ancora ? '' : 'invisible'}`}>
        de <span className="line-through">{p.ancora || 'R$ 00,00'}</span> por
      </p>

      {/* Herói do card: o equivalente MENSAL */}
      <p className="mt-1 font-serif text-6xl font-light leading-none text-roxo md:text-7xl">
        {p.mes}
        <span className="text-lg text-roxo/60">/mês</span>
      </p>
      <p className="mt-3 text-xs text-roxo/55">{p.cobranca}</p>

      {p.economia && (
        <span className="mt-4 rounded-full px-3 py-1 text-xs font-medium [background:#eaf3de] [color:#2f5610]">
          {p.economia}
        </span>
      )}

      {bonusAnual && (
        <span className="mt-2 rounded-full px-3 py-1 text-xs font-semibold [background:#f5e7c3] [color:#9a7c38]">
          🎁 13 meses pelo preço de 12
        </span>
      )}

      <p className="mt-4 text-sm text-roxo/70">{p.nota}</p>

      <div className="mt-auto w-full pt-7">
        <a
          href={refSlug ? `${p.link}?ref=${refSlug}` : p.link}
          className="block w-full rounded-full bg-roxo px-8 py-4 text-sm font-medium tracking-wide text-creme transition-[filter] duration-300 hover:brightness-125"
        >
          Assinar no cartão · renova sozinho
        </a>
        <a
          href={p.pix}
          className="mt-3 block w-full rounded-full border border-roxo/30 px-8 py-3.5 text-sm font-medium tracking-wide text-roxo transition-colors duration-300 hover:bg-roxo/5"
        >
          Pagar com Pix
        </a>
        <p className="mt-3 text-[11px] leading-snug text-roxo/50">
          No Pix, a cobrança chega a cada período e você renova manualmente.
        </p>
      </div>
    </div>
  )
}

export default function PaginaAssinar() {
  const [ref] = useState(() => refDaUrl())
  const [inf, setInf] = useState(null)
  useEffect(() => {
    if (ref) buscarInfluenciador(ref).then(setInf)
  }, [ref])

  return (
    <main className="bg-creme">
      {/* HERO */}
      <section className="relative flex min-h-svh flex-col overflow-hidden bg-noite">
        <img
          src="/prints/presente-hero.jpg"
          alt="Amanhecer dourado atravessando as montanhas"
          className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-noite/92 via-noite/70 to-noite/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-noite via-transparent to-transparent" />

        <header className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
          <a href="/">
            <img src="/logo.png" alt="inspirar.app" className="h-9 w-auto md:h-10" />
          </a>
          <span className="rounded-full bg-dourado/15 px-4 py-2 text-xs font-medium tracking-widest text-dourado uppercase">
            Assinatura
          </span>
        </header>

        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-16 md:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-medium tracking-[0.2em] text-dourado uppercase">
              Sua conexão com Deus, todos os dias
            </p>
            <h1 className="mt-5 font-serif text-5xl font-light leading-[1.05] text-creme md:text-7xl">
              Torne o inspirar.app{' '}
              <em className="text-dourado">parte da sua rotina de fé.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed font-light text-creme md:text-2xl">
              Devocional, Palavra e áudios do dia, oração e o Caderno com Deus —
              tudo em um lugar, para caminhar com Deus todos os dias.
            </p>

            <div className="mt-9">
              <a
                href="#planos"
                onClick={irParaPlanos}
                className="inline-block rounded-full bg-dourado px-8 py-4 text-base font-medium tracking-wide text-noite transition-[filter] duration-300 hover:brightness-110"
              >
                Ver planos →
              </a>
              <p className="mt-4 text-base text-creme">
                A partir de{' '}
                <strong className="text-dourado">R$ 14,90/mês</strong> no plano anual
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ RECEBE */}
      <section className="relative overflow-hidden bg-noite px-6 py-24 md:px-12 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(201,168,95,0.14),transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
              O que vive dentro do app
            </p>
            <h2 className="mt-6 max-w-2xl font-serif text-3xl font-light leading-snug text-creme md:text-5xl">
              Um encontro diário com Deus que muda o tom do dia inteiro.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {RECURSOS.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.1}>
                <div className="flex gap-5 border-t border-dourado/30 pt-6">
                  <span className="font-serif text-2xl text-dourado">✦</span>
                  <div>
                    <h3 className="font-serif text-2xl font-light text-creme">{f.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-creme/70">{f.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="bg-creme px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
              Escolha seu plano
            </p>
            <h2 className="mt-6 font-serif text-3xl font-light leading-snug text-roxo md:text-5xl">
              Um caminho diário, do seu jeito.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-roxo/70">
              Todos os planos dão acesso completo ao inspirar.app. Quanto maior o
              período, menor o valor por mês. Cancele quando quiser.
            </p>
          </Reveal>

          {inf && (
            <Reveal>
              <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-dourado/40 bg-dourado/10 px-5 py-3 text-center text-sm text-roxo">
                {inf.avatar_url && (
                  <img src={inf.avatar_url} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
                )}
                <span>
                  🎁 Indicado por <strong>{inf.display_name}</strong> — no plano anual você ganha o{' '}
                  <strong>13º mês grátis</strong> (13 meses pelo preço de 12).
                </span>
              </div>
            </Reveal>
          )}

          <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3">
            {PLANOS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.12}>
                <CardPlano p={p} refSlug={ref} bonusAnual={p.id === 'anual' && !!inf} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-8 text-center text-sm text-roxo/60">
              ⚡ Pague no <strong className="text-roxo">Pix</strong>, boleto ou
              cartão. No cartão, a assinatura renova sozinha — cancele quando quiser.
            </p>
            {ref && (
              <p className="mt-2 text-center text-sm text-roxo/60">
                Ainda não quer assinar?{' '}
                <a
                  href={`https://app.inspirar.app/?ref=${ref}`}
                  className="underline decoration-dourado/60 underline-offset-4 hover:text-roxo hover:decoration-dourado"
                >
                  Crie sua conta grátis pela indicação →
                </a>
              </p>
            )}
            <p className="mt-2 text-center text-sm text-roxo/60">
              🎁 É pra dar de presente?{' '}
              <a
                href="/presente"
                className="underline decoration-dourado/60 underline-offset-4 hover:text-roxo hover:decoration-dourado"
              >
                Veja os planos de presente →
              </a>
            </p>
            <p className="mt-2 text-center text-sm text-roxo/60">
              ✝️ Conteúdo com cuidado teológico — Pr. Pesset, Mestre em Teologia
              (PUC-Rio)
            </p>
            <div className="mt-6">
              <BadgesLojas className="h-12" refSlug={ref} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMO FUNCIONA APÓS ASSINAR */}
      <section className="relative overflow-hidden bg-noite px-6 py-24 md:px-12 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(201,168,95,0.1),transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
              Depois de assinar
            </p>
            <h2 className="mt-6 max-w-2xl font-serif text-3xl font-light leading-snug text-creme md:text-5xl">
              Em 3 passos, você já está caminhando.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              {
                n: '01',
                t: 'Você assina',
                d: 'Escolhe o plano e paga por Pix, boleto ou cartão. Leva 1 minuto.',
              },
              {
                n: '02',
                t: 'Baixa o app',
                d: 'Grátis na Google Play (Android) e na App Store (iPhone).',
              },
              {
                n: '03',
                t: 'Entra e pronto',
                d: 'Crie a conta com o MESMO e-mail da assinatura — seu Premium já estará ativo.',
              },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 0.15}>
                <div className="border-t border-creme/20 pt-6">
                  <p className="font-serif text-4xl font-light text-dourado">{p.n}</p>
                  <h3 className="mt-4 font-serif text-2xl font-light text-creme">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-creme/75">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-12 rounded-2xl border border-dourado/25 bg-dourado/5 px-6 py-4 text-center text-sm text-creme/85">
              💡 Use sempre o <strong className="text-dourado">mesmo e-mail</strong>{' '}
              na assinatura e na sua conta do app — é assim que o Premium reconhece
              você.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-creme px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-3xl font-light leading-snug text-roxo md:text-4xl">
              Perguntas frequentes
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-roxo/15">
            {[
              {
                p: 'Como eu acesso depois de pagar?',
                r: 'Baixe o inspirar.app na Google Play ou na App Store e entre com o mesmo e-mail que você usou na assinatura. Seu acesso Premium já estará liberado.',
              },
              {
                p: 'Tem no iPhone (iOS)?',
                r: 'Sim! O inspirar.app já está disponível na App Store para iPhone, além da Google Play para Android.',
              },
              {
                p: 'A assinatura renova sozinha?',
                r: 'No cartão de crédito, sim — e você pode cancelar quando quiser. No Pix ou boleto, você recebe uma nova cobrança a cada período, sem débito automático.',
              },
              {
                p: 'Quais as formas de pagamento?',
                r: 'Pix e boleto (acesso na hora, no Pix) ou cartão de crédito.',
              },
              {
                p: 'Posso trocar de plano depois?',
                r: 'Pode. É só falar com a gente que ajustamos o seu plano.',
              },
            ].map((f) => (
              <details key={f.p} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-roxo">
                  {f.p}
                  <span className="ml-4 text-dourado transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-roxo/70">{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-noite px-6 py-24 text-center md:px-12 md:py-36">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-light leading-snug text-creme md:text-5xl">
            Comece hoje a sua caminhada.{' '}
            <em className="text-dourado">Um dia de cada vez.</em>
          </h2>
          <div className="mt-10">
            <a
              href="#planos"
              onClick={irParaPlanos}
              className="inline-block rounded-full bg-dourado px-8 py-4 text-sm font-medium tracking-wide text-noite transition-[filter] duration-300 hover:brightness-110"
            >
              Ver planos →
            </a>
          </div>
          <p className="mt-5 text-sm text-creme/70">
            A partir de R$ 14,90/mês · cancele quando quiser
          </p>
        </Reveal>
      </section>

      <Footer />
    </main>
  )
}
