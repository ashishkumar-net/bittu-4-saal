import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Heart, MapPin, X, CalendarHeart } from 'lucide-react'
import { memories } from '../data/memories'
import SectionHeading from './SectionHeading'

const ease = [0.22, 1, 0.36, 1]

function MemoryCard({ memory, index }) {
  const isLeft = index % 2 === 0
  const Icon = memory.icon
  const [src, setSrc] = useState(memory.photo)
  const [open, setOpen] = useState(false)

  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-14">
      <motion.div
        initial={{ opacity: 0, y: 46 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease }}
        className={`pl-14 sm:pl-16 md:pl-0 ${
          isLeft ? 'md:col-start-1 md:pr-2' : 'md:col-start-2 md:pl-2'
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group block w-full text-left"
          aria-label={`Yaad kholo: ${memory.title}`}
        >
          <article className="glass glass-hover overflow-hidden p-2.5 sm:p-3.5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-midnight-800">
              <img
                src={src}
                alt={`Sir Ashish & Alka — ${memory.title}`}
                loading="lazy"
                onError={() => {
                  if (src !== memory.placeholder) setSrc(memory.placeholder)
                }}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.09]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/10 to-transparent opacity-85" />

              <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-midnight/60 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-cream/70 backdrop-blur-md">
                {memory.chapter}
              </span>

              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-midnight/65 px-3 py-1 text-[10px] text-cream/70 backdrop-blur-md">
                <MapPin className="h-3 w-3 text-gold/80" />
                {memory.place}
              </span>

              <span className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full border border-white/20 bg-midnight/60 text-cream opacity-0 backdrop-blur-md transition-all duration-500 ease-soft group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>

            <div className="px-2 pb-2 pt-5 sm:px-2.5">
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
                  style={{ color: memory.accent }}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                </span>
                <h3 className="font-serif text-[22px] font-light leading-tight text-cream/95 sm:text-[26px]">
                  {memory.title}
                </h3>
              </div>

              <p className="mt-3 text-[13.5px] leading-relaxed text-cream/55">{memory.text}</p>

              <p
                className="mt-4 border-l pl-3 font-serif text-[15px] italic leading-snug text-rose/70"
                style={{ borderColor: `${memory.accent}40` }}
              >
                “{memory.quote}”
              </p>
            </div>
          </article>
        </button>
      </motion.div>

      {/* timeline node */}
      <div className="absolute left-6 top-10 z-10 -translate-x-1/2 md:left-1/2">
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="relative grid h-4 w-4 place-items-center rounded-full border border-white/15 bg-midnight"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: memory.accent, boxShadow: `0 0 16px ${memory.accent}` }}
          />
          <span
            className="absolute inset-0 animate-pulse-glow rounded-full"
            style={{ boxShadow: `0 0 26px 2px ${memory.accent}55` }}
          />
        </motion.span>
      </div>

      <AnimatePresence>
        {open ? <Lightbox memory={memory} src={src} onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </div>
  )
}

function Lightbox({ memory, src, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const Icon = memory.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
      className="fixed inset-0 z-[85] flex items-center justify-center bg-[#120609]/88 p-4 backdrop-blur-xl sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={memory.title}
    >
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.55, ease }}
        onClick={(e) => e.stopPropagation()}
        className="glass relative w-full max-w-3xl overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Yaad band karo"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-midnight/70 text-cream/70 backdrop-blur-md transition-colors hover:text-cream"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative max-h-[52vh] overflow-hidden bg-midnight-800">
          <img src={src} alt={memory.title} className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2e1119] via-transparent to-transparent" />
        </div>

        <div className="p-6 sm:p-9">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.24em] text-cream/45">
            <span className="inline-flex items-center gap-1.5">
              <Icon className="h-3 w-3" style={{ color: memory.accent }} />
              {memory.chapter}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-gold/70" />
              {memory.place}
            </span>
          </div>
          <h3 className="mt-3 font-serif text-3xl font-light text-cream sm:text-4xl">
            {memory.title}
          </h3>
          <p className="mt-4 text-[14px] leading-relaxed text-cream/60">{memory.text}</p>
          <p className="mt-5 flex items-start gap-2 font-serif text-lg italic text-rose/75">
            <Heart className="mt-1 h-3.5 w-3.5 shrink-0" fill="currentColor" strokeWidth={0} />
            {memory.quote}
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-cream/30">
            <CalendarHeart className="h-3 w-3" />
            {memory.date}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function MemoryLane() {
  return (
    <section id="safar" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          icon={Heart}
          eyebrow="ashish & bittu · 4 saal · 6 padav"
          title={
            <>
              Hamara Safar, <span className="italic text-rose/85">dheere-dheere</span>
            </>
          }
          subtitle="Pehli mulaqat se lekar Kashi ke ghaton, Sonbhadra ki mitti aur Dala ki pahadiyon tak — chaar saal ka har woh pal jo mere andar aaj bhi zinda hai. Kisi card par tap karo aur us din ko thoda aur jeelo."
        />

        <div className="relative mt-16 sm:mt-20">
          <div
            aria-hidden
            className="absolute bottom-4 left-6 top-4 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-rose/25 to-transparent md:left-1/2"
          />
          <div className="space-y-16 md:space-y-24">
            {memories.map((memory, index) => (
              <MemoryCard key={memory.id} memory={memory} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
