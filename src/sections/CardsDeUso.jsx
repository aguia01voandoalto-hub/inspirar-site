import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ITENS = [
  {
    nome: 'Diário de Emoções',
    arte: '/prints/card-diario-de-emocoes.jpg',
    alt: 'Diário de Emoções — a Palavra que te encontra exatamente onde você está',
  },
  {
    nome: 'Palavra Diária',
    arte: '/prints/card-palavra-diaria.jpg',
    alt: 'Palavra Diária — sinta e compartilhe a palavra de Deus diariamente',
  },
  {
    nome: 'Mural de Orações',
    arte: '/prints/card-mural-de-oracoes.jpg',
    alt: 'Mural de Orações — tenha com quem contar nos momentos de maior necessidade',
  },
]

// Cada arte desliza de fora da tela (direita) até a sua posição,
// uma após a outra. No trecho final as três ficam alinhadas juntas.
const JANELAS = [
  [0.05, 0.3],
  [0.3, 0.55],
  [0.55, 0.8],
]

function Carta({ item, progress, janela }) {
  const x = useTransform(progress, janela, ['115vw', '0vw'])

  return (
    <motion.div style={{ x }}>
      <img
        src={item.arte}
        alt={item.alt}
        loading="lazy"
        className="mx-auto max-h-[60svh] w-auto max-w-full rounded-2xl shadow-[0_24px_70px_-18px_rgba(0,0,0,0.85)] ring-1 ring-creme/15 md:rounded-3xl"
      />
    </motion.div>
  )
}

export default function CardsDeUso() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="funcionalidades"
      ref={ref}
      className="relative h-[300vh] bg-noite"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-8 overflow-hidden md:gap-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(201,168,95,0.16),transparent_70%)]" />

        <div className="relative px-6 text-center">
          <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
            O que vive dentro do app
          </p>
          <h2 className="mt-5 max-w-3xl font-serif text-3xl font-light leading-snug text-creme md:text-5xl">
            Feito para a sua{' '}
            <em className="text-dourado">caminhada com Deus.</em>
          </h2>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-3 items-center gap-3 px-4 md:gap-8 md:px-12">
          {ITENS.map((item, i) => (
            <Carta
              key={item.nome}
              item={item}
              progress={scrollYProgress}
              janela={JANELAS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
