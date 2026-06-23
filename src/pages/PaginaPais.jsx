import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal.jsx'
import Depoimentos from '../sections/Depoimentos.jsx'
import Footer from '../sections/Footer.jsx'

// Link de pagamento do Asaas (gerado no admin). Enquanto não estiver pronto,
// o botão rola até a oferta. Trocar por href real quando o Asaas estiver ligado.
const CHECKOUT_12M = 'https://www.asaas.com/c/xg5omvlbty3cb8s9' // Pix / boleto / à vista
const CHECKOUT_12M_CARD = 'https://www.asaas.com/c/4id1yeh8e72qevnb' // cartão até 12×
const CHECKOUT_3M = 'https://www.asaas.com/c/ph4kd55p80ov3dvf' // Pix / boleto / à vista
const CHECKOUT_3M_CARD = 'https://www.asaas.com/c/5xnpiy75804vi38o' // cartão até 3×
const CTA_TEXTO = 'Quero presentear →'

const FIM_OFERTA = new Date('2026-08-10T00:00:00-03:00')

function useContagem() {
  const [restante, setRestante] = useState(() => FIM_OFERTA - new Date())
  useEffect(() => {
    const t = setInterval(() => setRestante(FIM_OFERTA - new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const seg = Math.max(0, Math.floor(restante / 1000))
  return {
    encerrada: restante <= 0,
    dias: Math.floor(seg / 86400),
    horas: Math.floor((seg % 86400) / 3600),
    min: Math.floor((seg % 3600) / 60),
    seg: seg % 60,
  }
}

function Contagem({ claro = false }) {
  const c = useContagem()
  if (c.encerrada) return null
  const cor = claro ? 'text-roxo' : 'text-creme'
  const sub = claro ? 'text-roxo/60' : 'text-creme/70'
  const Bloco = ({ n, l }) => (
    <div className="flex flex-col items-center">
      <span className={`font-serif text-3xl tabular-nums md:text-4xl ${cor}`}>
        {String(n).padStart(2, '0')}
      </span>
      <span className={`mt-1 text-[0.65rem] font-medium tracking-[0.15em] uppercase ${sub}`}>
        {l}
      </span>
    </div>
  )
  return (
    <div>
      <p className={`mb-2 text-xs font-medium tracking-[0.2em] uppercase ${sub}`}>
        Oferta termina em
      </p>
      <div className="flex items-start gap-5 md:gap-7">
        <Bloco n={c.dias} l="dias" />
        <Bloco n={c.horas} l="horas" />
        <Bloco n={c.min} l="min" />
        <Bloco n={c.seg} l="seg" />
      </div>
    </div>
  )
}

function VideoFundo({ src }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.muted = true
    el.loop = false
    // Toca uma vez ao entrar na tela e para no final; só repete quando o
    // hero sai de vista e reaparece (cruza o limiar de visibilidade de novo).
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

// Símbolo de presente em line-art que se "desenha" ao entrar na tela,
// com um brilho dourado pulsante. Mesmo estilo dos ícones do site.
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

// Os CTAs gerais levam à seção de oferta — lá o pai escolhe Pix à vista ou
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

// Barra de CTA fixa no rodapé do celular — aparece depois do hero, para o
// botão estar sempre a um toque durante o scroll longo.
function BarraFixa() {
  const [visivel, setVisivel] = useState(false)
  useEffect(() => {
    const aoRolar = () =>
      setVisivel(window.scrollY > window.innerHeight * 0.85)
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

export default function PaginaPais() {
  return (
    <main className="bg-creme">
      {/* 1. HERO */}
      <section className="relative flex min-h-svh flex-col overflow-hidden bg-noite">
        <VideoFundo src="/videos/pais-ideia.mp4" />
        <div className="absolute inset-0 bg-gradient-to-br from-noite/90 via-noite/65 to-noite/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-noite via-transparent to-transparent" />

        <header className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
          <a href="/">
            <img src="/logo.png" alt="inspirar.app" className="h-9 w-auto md:h-10" />
          </a>
          <span className="rounded-full bg-dourado/15 px-4 py-2 text-xs font-medium tracking-widest text-dourado uppercase">
            Dia dos Pais
          </span>
        </header>

        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-16 md:px-12">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-dourado uppercase">
              🎁 Oferta só até 9 de agosto
            </p>
            <h1 className="mt-5 font-serif text-5xl font-light leading-[1.05] text-creme md:text-7xl">
              O presente que ele vai abrir{' '}
              <em className="text-dourado">todo dia.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed font-light text-creme [text-shadow:0_2px_12px_rgba(0,0,0,0.8)] md:text-2xl">
              Devocional, áudios e oração no inspirar.app — todos os dias, o ano
              inteiro.
            </p>

            <div className="mt-9">
              <BotaoCTA className="text-base" />
              <p className="mt-4 text-base text-creme">
                <strong className="text-dourado">12× de R$ 14,90</strong> · entrega
                digital na hora
              </p>
            </div>

            <div className="mt-10">
              <Contagem />
            </div>
          </div>
        </div>
      </section>

      {/* A IDEIA — sugere o ritual: assinatura + caderno físico */}
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
              Já imaginou o presente perfeito para aquele pai especial?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-roxo/80">
              Você assina o inspirar.app para ele. Com as suas mãos, prepara um
              caderno — simples, bonito, escolhido com carinho. E no Dia dos
              Pais entrega os dois juntos: o caderno que ele segura e o
              inspirar.app que caminha com ele todo dia.
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

      {/* 2. O RITUAL — foto do pai com o caderno como fundo */}
      <section className="relative overflow-hidden bg-noite px-6 py-24 md:px-12 md:py-36">
        <img
          src="/prints/pais-hero.jpg"
          alt="Pai sorrindo enquanto escreve em um caderno, à luz da janela"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
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
                d: '12 meses de inspirar.app para ele. Paga por Pix ou cartão, em 1 minuto.',
              },
              {
                n: '02',
                t: 'Recebe o cartão-presente',
                d: 'Assim que você paga, o cartão digital aparece na tela na hora, com o código de acesso.',
              },
              {
                n: '03',
                t: 'Entrega do seu jeito',
                d: 'Manda o cartão pra ele, ou imprime e coloca num caderno seu. O gesto físico é seu — e fica lindo.',
              },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 0.15}>
                <div className="border-t border-creme/20 pt-6">
                  <p className="font-serif text-4xl font-light text-dourado">
                    {p.n}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl font-light text-creme">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-creme/75">
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Esclarecimento, com carinho: o caderno é o seu gesto */}
          <Reveal delay={0.2}>
            <div className="mt-12 rounded-2xl border border-creme/20 bg-noite/50 p-6 text-sm leading-relaxed text-creme/80 backdrop-blur-sm md:p-7">
              <strong className="text-creme">O caderno é o seu carinho.</strong>{' '}
              Ele nasce das suas mãos e fica por sua conta — escolha um que
              combine com ele. Da nossa parte vai o que floresce dentro do
              caderno: o acesso ao inspirar.app, que aparece na tela na hora do
              pagamento. Nada é enviado pelo correio, e o{' '}
              <strong className="text-creme">Caderno com Deus</strong> também vive
              dentro do app, para ele escrever e orar à mão pelo celular.
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. O QUE O PAI RECEBE */}
      <section className="relative overflow-hidden bg-noite px-6 py-24 md:px-12 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(201,168,95,0.14),transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
              Dentro do presente
            </p>
            <h2 className="mt-6 max-w-2xl font-serif text-3xl font-light leading-snug text-creme md:text-5xl">
              Cinco minutos por dia que mudam o tom do dia inteiro.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {[
              {
                t: 'Caderno com Deus',
                d: 'Um espaço para ele escrever, orar e ouvir a Deus à mão.',
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
                d: 'Para ele saber que ninguém caminha sozinho.',
              },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 0.1}>
                <div className="flex gap-5 border-t border-dourado/30 pt-6">
                  <span className="font-serif text-2xl text-dourado">✦</span>
                  <div>
                    <h3 className="font-serif text-2xl font-light text-creme">
                      {f.t}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-creme/70">
                      {f.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA do meio (muito scroll até o preço) */}
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

      {/* 4. DEPOIMENTOS (reais, na ótica de quem presenteia) */}
      <Depoimentos
        kicker="Por que presentear"
        titulo="Quem já vive isso não começa o dia sem."
      />

      {/* 5. OFERTA */}
      <section id="oferta" className="bg-creme px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
              Oferta de Dia dos Pais
            </p>
            <h2 className="mt-6 font-serif text-3xl font-light leading-snug text-roxo md:text-5xl">
              Um presente que dura o ano todo.
            </h2>
            {/* Âncora visível */}
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-roxo/70">
              Um presente de Dia dos Pais custa, em média,{' '}
              <strong className="text-roxo">R$ 150 a R$ 300</strong>. Este custa{' '}
              <strong className="text-roxo">R$ 14,90 por mês</strong> — e dura o
              ano inteiro.
            </p>
          </Reveal>

          {/* Card herói: lidera com a parcela */}
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
                menos de <strong className="text-roxo">R$ 0,50 por dia</strong> · o preço de 1 café
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
                  Promo até 9/8
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
                ⚡ <strong className="text-roxo">Pix ou boleto</strong> à vista — acesso na hora
              </p>
              <div className="mt-5 border-t border-roxo/10 pt-5">
                <Garantias claro />
              </div>
              <p className="mt-4 text-xs text-roxo/50">
                Quem receber não precisa ter conta — ele cria na hora, com o código.
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

      {/* 6. BÔNUS + URGÊNCIA */}
      <section className="bg-noite px-6 py-16 md:px-12">
        <Reveal className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-dourado/30 px-8 py-10 text-center md:flex-row md:justify-between md:text-left">
            <p className="font-serif text-xl font-light leading-relaxed text-creme md:text-2xl">
              Presenteie até <span className="text-dourado">9 de agosto</span> e
              ganhe a trilha <em className="text-dourado">Jornada do Pai</em> + o{' '}
              <span className="text-dourado">13º mês de presente</span>: um mês a
              mais para cobrir o seu tempo de preparo — 13 meses pelo preço de 12.
            </p>
            <div className="shrink-0">
              <Contagem />
            </div>
          </div>
        </Reveal>
      </section>

      {/* 7. FAQ */}
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
                p: 'E se ele ainda não tiver conta no inspirar.app?',
                r: 'Sem problema. O código do presente cria a conta dele na hora do resgate.',
              },
              {
                p: 'Como eu entrego, já que é digital?',
                r: 'Assim que você paga, o cartão-presente aparece na tela, com o código. Você imprime e coloca num caderno seu, ou manda o link de resgate direto pra ele. Nada é enviado pelo correio.',
              },
              {
                p: 'E se ele não for muito de tecnologia?',
                r: 'O app é simples: ele abre, lê a palavra do dia e ouve o áudio. Em poucos toques.',
              },
              {
                p: 'Quais as formas de pagamento?',
                r: 'Pix (acesso na hora) ou cartão em até 12×.',
              },
              {
                p: 'Posso comprar em cima da hora?',
                r: 'Pode — é digital e, no Pix, o acesso sai na hora. Mas o presente fica ainda mais especial com um tempinho de preparo: imprima o cartão antes, escolha o caderno e escreva um recado à mão, sem pressa. E para a correria nunca atrapalhar, nesta oferta toda assinatura de 12 meses ganha o 13º mês de presente — esse mês a mais cobre justamente o intervalo entre a sua compra e o dia em que ele começa de verdade. Comprando com antecedência para caprichar, ou em cima da hora, ele não perde um dia sequer.',
              },
            ].map((f) => (
              <details key={f.p} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-roxo">
                  {f.p}
                  <span className="ml-4 text-dourado transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-roxo/70">
                  {f.r}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="bg-noite px-6 py-24 text-center md:px-12 md:py-36">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-light leading-snug text-creme md:text-5xl">
            Neste Dia dos Pais, dê a ele mais que um presente.{' '}
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
