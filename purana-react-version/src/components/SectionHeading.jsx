import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function SectionHeading({ eyebrow, title, subtitle, icon: Icon, align = 'center' }) {
  const centred = align === 'center'
  return (
    <div className={centred ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease }}
        className={centred ? 'flex justify-center' : ''}
      >
        <span className="eyebrow">
          {Icon ? <Icon className="h-3 w-3 text-rose/80" strokeWidth={2} /> : null}
          {eyebrow}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease, delay: 0.08 }}
        className="mt-6 font-serif text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.05] tracking-tight text-cream"
      >
        {title}
      </motion.h2>

      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease, delay: 0.16 }}
          className={`mt-5 text-[14.5px] leading-relaxed text-cream/50 sm:text-base ${centred ? 'mx-auto max-w-xl' : ''}`}
        >
          {subtitle}
        </motion.p>
      ) : null}

      <motion.div
        initial={{ opacity: 0, scaleX: 0.4 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease, delay: 0.2 }}
        className={`glow-divider mt-7 w-24 ${centred ? 'mx-auto' : ''}`}
      />
    </div>
  )
}
