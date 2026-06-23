import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal.jsx'
import ListaEspera from '../components/ListaEspera.jsx'

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
            <ListaEspera />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
