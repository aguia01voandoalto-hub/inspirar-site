import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal.jsx'

export default function FraseGigante() {
  return (
    <section className="relative overflow-hidden bg-noite">
      <motion.img
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
        alt="Raios de sol dourados atravessando montanhas ao amanhecer"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-noite via-noite/40 to-noite" />

      <div className="relative px-6 py-44 md:px-12 md:py-72">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-serif text-4xl font-light leading-[1.15] text-creme md:text-6xl lg:text-7xl">
              Para quem quer{' '}
              <span className="text-dourado">crescer na fé,</span>
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 font-serif text-4xl font-light leading-[1.15] text-creme md:mt-10 md:text-right md:text-6xl lg:text-7xl">
              não para quem quer mais uma rede social.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
