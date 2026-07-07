import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal.jsx'
import Depoimentos from '../sections/Depoimentos.jsx'
import Footer from '../sections/Footer.jsx'

// Presente evergreen: dar o inspirar.app a alguém que você quer ver crescer
// espiritualmente. Reaproveita os MESMOS links/ofertas do Asaas e o mesmo
// fluxo de resgate da campanha de presentes. Sem ritual de caderno físico.
const CHECKOUT_12M = 'https://www.asaas.com/c/xg5omvlbty3cb8s9' // Pix / boleto / à vista
const CHECKOUT_12M_CARD = 'https://www.asaas.com/c/4id1yeh8e72qevnb' // cartão até 12×
const CHECKOUT_3M = 'https://www.asaas.com/c/ph4kd55p80ov3dvf' // Pix / boleto / à vista
const CHECKOUT_3M_CARD = 'https://www.asaas.com/c/5xnpiy75804vi38o' // cartão até 3×
const CTA_TEXTO = 'Quero presentear →'

// Os CTAs gerais levam à seção de oferta — lá a pessoa escolhe Pix à vista ou
// cartão parcelado (o Asaas não permite as duas formas no mesmo link).
function irParaOferta(e) {
  e.preventDefault()
  document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })
}

function BotaoCTA({ variante = 'dourado', className = '' }) {
  const cores =
    variante === 'roxo'
      ? 'bg-roxo text-creme hover:brightness-125'
      : 'bg-dourado text-noite hover:brightness-110'
  return (
    <a
      href="#oferta"
      onClick={irParaOferta}
      className={`inline-block rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-[filter] duration-300 ${cores} ${className}`}
    >
      {CTA_TEXTO}
    </a>
  )
}

function Pix({ claro = false }) {
  return (
    <p className={`text-sm ${claro ? 'text-roxo/70' : 'text-creme/70'}`}>
      ⚡ Pague no <strong className={claro ? 'text-roxo' : 'text-creme'}>Pix</strong>{' '}
      e o acesso vai na hora
    </p>
  )
}

function Garantias({ claro = false }) {
  const cor = claro ? 'text-roxo/70' : 'text-creme/70'
  return (
    <ul className={`flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs ${cor}`}>
      <li>✓ Não renova automático — você decide</li>
      <li>✓ Garantia de 7 dias</li>
      <li>✓ Compra segura</li>
    </ul>
  )
}

// Vídeo de fundo: toca uma vez ao entrar na tela e para no fim.
function VideoFundo({ src }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.muted = true
    el.loop = false
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.currentTime = 0
            el.play().catch(() => {})
          }
        }
      },
      { threshold: 0.45 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

// Símbolo de presente em line-art que se "desenha" ao entrar na tela.
function SimboloPresente() {
  const linha = {
    oculto: { pathLength: 0, opacity: 0 },
    visivel: { pathLength: 1, opacity: 1 },
  }
  const t = (delay) => ({ duration: 1.2, ease: 'easeInOut', delay })
  return (
    <div className="relative mx-auto mb-10 h-28 w-28 md:h-32 md:w-32">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(201,168,95,0.4),transparent_70%)] blur-xl"
        animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.9, 1.08, 0.9] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.svg
        viewBox="0 0 100 100"
        className="relative h-full w-full text-dourado"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial="oculto"
        whileInView="visivel"
        viewport={{ once: true }}
      >
        <motion.path d="M16 36 H84 V48 H16 Z" variants={linha} transition={t(0.1)} />
        <motion.path d="M23 48 H77 V84 H23 Z" variants={linha} transition={t(0.35)} />
        <motion.path d="M50 36 V84" variants={linha} transition={t(0.6)} />
        <motion.path
          d="M50 36 C44 23 27 22 33 32 C36 37 47 36 50 36 Z"
          variants={linha}
          transition={t(0.85)}
        />
        <motion.path
          d="M50 36 C56 23 73 22 67 32 C64 37 53 36 50 36 Z"
          variants={linha}
          transition={t(1.0)}
        />
      </motion.svg>
    </div>
  )
}

// Barra de CTA fixa no rodapé do celular.
function BarraFixa() {
  const [visivel, setVisivel] = useState(false)
  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-dourado/30 bg-noite/95 px-4 py-3 backdrop-blur transition-transform duration-300 md:hidden ${
        visivel ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="leading-tight">
          <p className="text-sm font-medium text-creme">12× de R$ 14,90</p>
          <p className="text-[0.7rem] text-creme/60">⚡ Pix · acesso na hora</p>
        </div>
        <a
          href="#oferta"
          onClick={irParaOferta}
          className="shrink-0 rounded-full bg-dourado px-6 py-3 text-sm font-medium text-noite"
        >
          Presentear →
        </a>
      </div>
    </div>
  )
}

export default function PaginaPresente() {
  return (
    <main className="bg-creme">
      {/* 1. HERO — sem vídeo, gradiente sagrado da marca */}
      <section className="relative flex min-h-svh flex-col overflow-hidden bg-noite">
        <VideoFundo src="/videos/presente-hero.mp4" />
        <div className="absolute inset-0 bg-gradient-to-br from-noite/90 via-noite/65 to-noite/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-noite via-transparent to-transparent" />

        <header className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
          <a href="/">
            <img src="/logo.png" alt="inspirar.app" className="h-9 w-auto md:h-10" />
          </a>
          <span className="rounded-full bg-dourado/15 px-4 py-2 text-xs font-medium tracking-widest text-dourado uppercase">
            Um presente com propósito
          </span>
        </header>

        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-16 md:px-12">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-dourado uppercase">
              🎁 Presenteie quem você ama
            </p>
            <h1 className="mt-5 font-serif text-5xl font-light leading-[1.05] text-creme md:text-7xl">
              Dê de presente uma{' '}
              <em className="text-dourado">vida espiritual mais profunda.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed font-light text-creme md:text-2xl">
              Devocional, áudios e oração no inspirar.app — caminhando com a
              pessoa que você ama, todos os dias, o ano inteiro.
            </p>

            <div className="mt-9">
              <BotaoCTA className="text-base" />
              <p className="mt-4 text-base text-creme">
                <strong className="text-dourado">12× de R$ 14,90</strong> · entrega
                digital na hora
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A IDEIA — o presente do crescimento espiritual */}
      <section className="relative overflow-hidden bg-creme px-6 py-24 md:px-12 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(201,168,95,0.08),transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <SimboloPresente />

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.span
              className="block h-px bg-dourado/50"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            />
            <span className="text-sm font-semibold tracking-[0.35em] text-dourado uppercase md:text-base">
              A ideia
            </span>
            <motion.span
              className="block h-px bg-dourado/50"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            />
          </motion.div>

          <Reveal>
            <h2 className="mt-7 font-serif text-3xl font-light leading-snug text-roxo md:text-5xl">
              Você conhece alguém que precisa de um respiro com Deus?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-roxo/80">
              Talvez um amigo começando na fé. Alguém voltando. Alguém que anda
              cansado e precisa se reaproximar. Com este presente, você coloca na
              mão dessa pessoa um caminho diário — Palavra, oração e devocional —
              que caminha junto com ela todo dia. É cuidar, de verdade, da vida
              espiritual de quem você ama.
            </p>
            <p className="mt-6 font-serif text-xl font-light italic text-roxo md:text-2xl">
              Não é só um presente. É valor, amor, crescimento e desenvolvimento
              — o ano inteiro.
            </p>
          </Reveal>

          <motion.ul
            className="mt-9 flex flex-wrap justify-center gap-3"
            initial="oculto"
            whileInView="visivel"
            viewport={{ once: true }}
            variants={{
              visivel: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
          >
            {['Valor', 'Amor', 'Crescimento', 'Desenvolvimento'].map((v) => (
              <motion.li
                key={v}
                variants={{
                  oculto: { opacity: 0, y: 12 },
                  visivel: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="rounded-full border border-dourado/40 px-5 py-2 text-sm font-medium text-roxo"
              >
                {v}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* COMO FUNCIONA — 100% digital, sem caderno físico */}
      <section className="relative overflow-hidden bg-noite px-6 py-24 md:px-12 md:py-36">
        <img
          src="/prints/presente-hero.jpg"
          alt="Pessoa sorrindo enquanto usa o inspirar.app no celular, à luz da janela"
          className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
        />
        <div className="absolute inset-0 bg-noite/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-noite via-noite/60 to-noite/60" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
              Como funciona
            </p>
            <h2 className="mt-6 max-w-2xl font-serif text-3xl font-light leading-snug text-creme md:text-5xl">
              Um gesto simples. Uma transformação que fica.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              {
                n: '01',
                t: 'Você escolhe o presente',
                d: '12 meses de inspirar.app para a pessoa que você quer abençoar. Paga por Pix ou cartão, em 1 minuto.',
              },
              {
                n: '02',
                t: 'Recebe o cartão-presente',
                d: 'Assim que você paga, o cartão digital aparece na tela na hora, com o código de acesso.',
              },
              {
                n: '03',
                t: 'Entrega do seu jeito',
                d: 'Manda o código ou o link de resgate direto pra pessoa — por WhatsApp, mensagem, do jeito que for mais bonito.',
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
        </div>
      </section>

      {/* DENTRO DO PRESENTE — recursos (mantém o Caderno com Deus) */}
      <section className="relative overflow-hidden bg-noite px-6 py-24 md:px-12 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(201,168,95,0.14),transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
              Dentro do presente
            </p>
            <h2 className="mt-6 max-w-2xl font-serif text-3xl font-light leading-snug text-creme md:text-5xl">
              Um encontro diário com Deus que muda o tom do dia inteiro.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {[
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
                d: 'Constância que aproxima, um dia de cada vez.',
              },
              {
                t: 'Mural de Orações',
                d: 'Para a pessoa saber que ninguém caminha sozinho.',
              },
            ].map((f, i) => (
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

          {/* CTA do meio */}
          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <BotaoCTA />
              <p className="mt-4 text-sm text-creme/70">
                12× de R$ 14,90 · ⚡ Pix na hora
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <Depoimentos
        kicker="Por que presentear"
        titulo="Quem já vive isso não começa o dia sem."
      />

      {/* OFERTA */}
      <section id="oferta" className="bg-creme px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
              A oferta
            </p>
            <h2 className="mt-6 font-serif text-3xl font-light leading-snug text-roxo md:text-5xl">
              Um presente que dura o ano todo.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-roxo/70">
              Um presente que realmente marca custa, fácil,{' '}
              <strong className="text-roxo">R$ 150 a R$ 300</strong>. Este custa{' '}
              <strong className="text-roxo">R$ 14,90 por mês</strong> — e acompanha
              a pessoa o ano inteiro.
            </p>
          </Reveal>

          {/* Card herói */}
          <Reveal delay={0.15}>
            <div className="relative mt-12 rounded-3xl border border-dourado/40 bg-white/60 p-8 text-center shadow-xl md:p-12">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-dourado px-4 py-1 text-xs font-medium tracking-widest text-noite uppercase">
                Melhor presente
              </span>

              <p className="mt-2 font-serif text-xl font-light text-roxo">
                Presente de 12 meses
              </p>

              {/* Âncora: o plano mensal (sem link — só referência visual) */}
              <p className="mt-5 text-sm text-roxo/55">
                No mensal sairia{' '}
                <span className="line-through">R$ 29,90/mês</span> —{' '}
                <span className="line-through">R$ 358,80</span> no ano
              </p>

              <p className="mt-4 text-sm font-medium tracking-wide text-roxo/60">
                no presente, 12× de
              </p>
              <p className="font-serif text-6xl font-light leading-none text-roxo md:text-7xl">
                R$ 14,90
              </p>
              <p className="mt-3 text-sm text-roxo/70">
                menos de <strong className="text-roxo">R$ 0,50 por dia</strong> · o
                preço de 1 café
              </p>
              <p className="mt-1 text-sm text-roxo/55">ou R$ 178,80 à vista</p>

              <div className="my-7 flex flex-wrap justify-center gap-2">
                <span className="rounded-full px-3 py-1 text-xs font-medium [background:#eaf3de] [color:#2f5610]">
                  metade do mensal · economize 50%
                </span>
                <span className="rounded-full bg-roxo/10 px-3 py-1 text-xs font-medium text-roxo">
                  economize R$ 180 no ano
                </span>
                <span className="rounded-full bg-dourado/15 px-3 py-1 text-xs font-medium [color:#9c7c38]">
                  13 meses pelo preço de 12
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={CHECKOUT_12M_CARD}
                  className="w-full rounded-full bg-roxo px-8 py-4 text-sm font-medium tracking-wide text-creme transition-[filter] duration-300 hover:brightness-125"
                >
                  Presentear · 12× de R$ 14,90 →
                </a>
                <a
                  href={CHECKOUT_12M}
                  className="w-full rounded-full border border-roxo/30 px-8 py-4 text-sm font-medium tracking-wide text-roxo transition-colors duration-300 hover:bg-roxo/5"
                >
                  Pagar à vista · R$ 178,80
                </a>
              </div>

              <p className="mt-5 text-sm text-roxo/70">
                ⚡ <strong className="text-roxo">Pix ou boleto</strong> à vista —
                acesso na hora
              </p>
              <div className="mt-5 border-t border-roxo/10 pt-5">
                <Garantias claro />
              </div>
              <p className="mt-4 text-xs text-roxo/50">
                Quem receber não precisa ter conta — ela cria na hora, com o código.
              </p>
            </div>
          </Reveal>

          {/* 3 meses — discreto */}
          <Reveal delay={0.25}>
            <p className="mt-8 text-sm text-roxo/60">
              Orçamento mais curto?{' '}
              <strong className="text-roxo">Presente de 3 meses</strong> por R$ 65,70
              {' '}— R$ 21,90/mês, ainda 27% abaixo do mensal —{' '}
              <a
                href={CHECKOUT_3M_CARD}
                className="text-roxo underline decoration-dourado/60 underline-offset-4 hover:decoration-dourado"
              >
                3× no cartão
              </a>{' '}
              ou{' '}
              <a
                href={CHECKOUT_3M}
                className="text-roxo underline decoration-dourado/60 underline-offset-4 hover:decoration-dourado"
              >
                Pix/boleto à vista
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* BÔNUS */}
      <section className="bg-noite px-6 py-16 md:px-12">
        <Reveal className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-dourado/30 px-8 py-10 text-center">
            <p className="font-serif text-xl font-light leading-relaxed text-creme md:text-2xl">
              Toda assinatura de 12 meses ganha o{' '}
              <span className="text-dourado">13º mês de presente</span> — 13 meses
              pelo preço de 12, um mês a mais pra essa caminhada começar com folga.
            </p>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-creme px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-3xl font-light leading-snug text-roxo md:text-4xl">
              Perguntas de quem vai presentear
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-roxo/15">
            {[
              {
                p: 'Vai renovar e cobrar de novo daqui a um ano?',
                r: 'Não. É um presente de 12 meses, sem renovação automática. Você decide se quer continuar depois.',
              },
              {
                p: 'E se a pessoa ainda não tiver conta no inspirar.app?',
                r: 'Sem problema. O código do presente cria a conta dela na hora do resgate.',
              },
              {
                p: 'Como eu entrego, já que é digital?',
                r: 'Assim que você paga, o cartão-presente aparece na tela, com o código. Você manda o link de resgate direto pra pessoa, por WhatsApp ou mensagem. Nada é enviado pelo correio.',
              },
              {
                p: 'Posso presentear alguém que mora longe?',
                r: 'Pode — é 100% digital. Você manda o código por mensagem pra qualquer lugar do Brasil, na hora.',
              },
              {
                p: 'E se a pessoa não for muito de tecnologia?',
                r: 'O app é simples: ela abre, lê a palavra do dia e ouve o áudio. Em poucos toques.',
              },
              {
                p: 'Quais as formas de pagamento?',
                r: 'Pix ou boleto (acesso na hora, à vista) ou cartão em até 12×.',
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
            Dê a alguém mais que um presente.{' '}
            <em className="text-dourado">Dê um caminho.</em>
          </h2>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={CHECKOUT_12M_CARD}
              className="rounded-full bg-dourado px-8 py-4 text-sm font-medium tracking-wide text-noite transition-[filter] duration-300 hover:brightness-110"
            >
              Presentear · 12× de R$ 14,90 →
            </a>
            <a
              href={CHECKOUT_12M}
              className="rounded-full border border-creme/30 px-8 py-4 text-sm font-medium tracking-wide text-creme transition-colors duration-300 hover:bg-creme/10"
            >
              Pagar à vista · R$ 178,80
            </a>
          </div>
          <div className="mt-5">
            <Pix />
          </div>
          <div className="mt-6">
            <Garantias />
          </div>
        </Reveal>
      </section>

      <Footer />
      <BarraFixa />
    </main>
  )
}
