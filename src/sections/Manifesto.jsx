import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'

const FRASE_1 =
  'Nos recusamos a aceitar uma rotina onde não sobra espaço para Deus.'.split(
    ' ',
  )

function Palavra({ progress, range, children }) {
  const opacity = useTransform(progress, range, [1, 0])
  const blur = useTransform(progress, range, ['blur(0px)', 'blur(12px)'])
  const y = useTransform(progress, range, ['0em', '-0.7em'])
  return (
    <motion.span
      style={{ opacity, filter: blur, y }}
      className="mr-[0.28em] inline-block"
    >
      {children}
    </motion.span>
  )
}

export default function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Frase 1 entra visível; ao rolar, as palavras se desintegram da última
  // para a primeira. A frase 2 só entra após uma pausa com a tela vazia.
  const INICIO_SAIDA = 0.18
  const FIM_SAIDA = 0.44
  const passo = (FIM_SAIDA - INICIO_SAIDA) / FRASE_1.length

  const saida1 = useTransform(scrollYProgress, [0.5, 0.54], [1, 0])

  // Frase 2: entra e fica fixa na tela até a seção liberar a rolagem.
  const opacidade2 = useTransform(scrollYProgress, [0.6, 0.68], [0, 1])
  const subida2 = useTransform(scrollYProgress, [0.6, 0.68], ['24px', '0px'])

  // Trava: depois que a frase 2 aparece, ela permanece mesmo que a rolagem
  // volte um pouco. Só destrava no início da seção, para rever o efeito.
  const [travada, setTravada] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= 0.7) setTravada(true)
    else if (v <= 0.05) setTravada(false)
  })

  return (
    <section id="manifesto" ref={ref} className="relative h-[300vh] bg-creme">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <motion.p
          style={{ opacity: travada ? 0 : saida1 }}
          className="absolute max-w-5xl px-6 text-center font-serif text-4xl font-light leading-[1.15] text-roxo md:px-12 md:text-6xl lg:text-7xl"
        >
          {FRASE_1.map((t, i) => {
            const ordem = FRASE_1.length - 1 - i
            return (
              <Palavra
                key={i}
                progress={scrollYProgress}
                range={[
                  INICIO_SAIDA + ordem * passo,
                  INICIO_SAIDA + (ordem + 2) * passo,
                ]}
              >
                {t}
              </Palavra>
            )
          })}
        </motion.p>

        <motion.p
          style={{
            opacity: travada ? 1 : opacidade2,
            y: travada ? '0px' : subida2,
          }}
          className="absolute max-w-5xl px-6 text-center font-serif text-4xl font-light leading-[1.15] text-roxo md:px-12 md:text-6xl lg:text-7xl"
        >
          Apresentamos o <em>inspirar.app</em> — um jeito mais leve, mais
          humano, de caminhar com Deus todos os dias.
        </motion.p>
      </div>
    </section>
  )
}
