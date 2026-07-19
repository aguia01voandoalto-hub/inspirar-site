import { motion } from 'framer-motion'

const PALAVRAS = 'Não deixe o barulho do mundo silenciar a voz do Pai.'.split(' ')

const container = {
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.5 } },
}

const palavra = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-noite">
      <motion.img
        src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2000&q=80"
        alt="Luz dourada do amanhecer atravessando um campo"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
      {/* Legibilidade: degradê vertical mais forte no meio (onde o texto senta no
          desktop) + scrim horizontal do lado do texto. O lado direito segue mais
          claro, preservando o dourado do amanhecer. */}
      <div className="absolute inset-0 bg-gradient-to-b from-noite/75 via-noite/45 to-noite/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-noite/80 via-noite/30 to-transparent" />

      <header className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img
            src="/logo.png"
            alt="inspirar.app"
            className="h-9 w-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] md:h-11"
          />
        </motion.a>
        <motion.a
          href="#planos"
          className="rounded-full bg-dourado px-5 py-2.5 text-xs font-medium tracking-widest text-noite uppercase transition-[filter] duration-300 hover:brightness-110"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Começar
        </motion.a>
      </header>

      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-20 md:justify-center md:px-12 md:pb-0">
        <div className="max-w-3xl">
          <motion.h1
            className="font-serif text-5xl font-light leading-[1.08] text-creme [text-shadow:0_2px_22px_rgba(0,0,0,0.8)] md:text-7xl"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {PALAVRAS.map((p, i) => (
              <motion.span key={i} variants={palavra} className="mr-[0.28em] inline-block">
                {p}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-8 max-w-md text-base leading-relaxed text-creme [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 2.2 }}
          >
            O seu refúgio espiritual está a um toque de distância.
          </motion.p>

          <motion.a
            href="#planos"
            className="mt-10 inline-block rounded-full bg-dourado px-8 py-4 text-sm font-medium tracking-wide text-noite transition-[filter] duration-300 hover:brightness-110"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 2.5 }}
          >
            Começar minha jornada
          </motion.a>
        </div>
      </div>
    </section>
  )
}
