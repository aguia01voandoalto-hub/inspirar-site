import { motion } from 'framer-motion'

// Entrada padrão das seções: fade-up calmo, uma única vez.
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

// Imagem que entra com leve escala 1.02 → 1.0.
export function RevealImage({ src, alt, className = '', imgClassName = '' }) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={{ scale: 1.02 }}
        whileInView={{ scale: 1 }}
        whileHover={{ scale: 1.03 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
    </motion.div>
  )
}
