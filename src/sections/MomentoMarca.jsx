import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal.jsx'
import BadgesLojas from '../components/BadgesLojas.jsx'

// CTA final da home — "assinar-primeiro": leva à contratação (/assinar) e ao
// download. Substituiu a antiga lista de espera ("cadastros fechados"), que era
// linguagem de pré-lançamento e travava a conversão.

export default function MomentoMarca() {
  return (
    <section id="comecar" className="relative overflow-hidden bg-noite">
      <motion.img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
        alt="Amanhecer dourado sobre montanhas, com névoa suave no vale"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-noite via-noite/40 to-noite" />

      <div className="relative px-6 py-40 md:px-12 md:py-64">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-serif text-[clamp(2.75rem,9vw,8rem)] font-light lowercase leading-none tracking-tight text-dourado">
              inspirar.app
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 max-w-xl">
              <p className="font-serif text-2xl font-light leading-snug text-creme md:text-3xl">
                Comece hoje a sua caminhada com Deus.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-creme/60">
                Assine, baixe o app e comece agora — a partir de{' '}
                <strong className="text-creme/80">R$ 8,32/mês</strong> no plano anual.
              </p>

              <div className="mt-8">
                <a
                  href="#planos"
                  className="inline-block rounded-full bg-dourado px-8 py-4 text-center text-sm font-medium tracking-wide text-noite transition-[filter] duration-300 hover:brightness-110"
                >
                  Assinar agora →
                </a>
              </div>

              <p className="mt-6 text-xs tracking-wide text-creme/50">
                Já disponível nas duas lojas · cancele quando quiser
              </p>
              <div className="mt-3">
                <BadgesLojas className="h-12" center={false} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
