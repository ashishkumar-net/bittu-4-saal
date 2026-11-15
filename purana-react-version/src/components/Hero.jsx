import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Heart, Mail, Sparkles } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
}

const item = {
  hidden: { opacity: 0, y: 34, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease },
  },
}

const floaters = [
  { left: '8%', top: '24%', size: 18, delay: 0, duration: 9, opacity: 0.28 },
  { left: '18%', top: '68%', size: 11, delay: 2.4, duration: 11, opacity: 0.2 },
  { left: '84%', top: '30%', size: 22, delay: 1.2, duration: 10, opacity: 0.24 },
  { left: '73%', top: '72%', size: 14, delay: 3.1, duration: 12, opacity: 0.18 },
  { left: '92%', top: '55%', size: 9, delay: 0.7, duration: 8, opacity: 0.26 },
  { left: '5%', top: '48%', size: 12, delay: 4, duration: 13, opacity: 0.16 },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-28 pt-28 sm:px-8"
    >
      {/* soft halo behind the words */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,154,134,0.16),rgba(230,184,120,0.06)_45%,transparent_70%)] blur-2xl"
      />

      {/* giant heart outline */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <Heart
          strokeWidth={0.35}
          className="h-[34rem] w-[34rem] text-rose/[0.09] sm:h-[44rem] sm:w-[44rem]"
        />
      </motion.div>

      {/* drifting hearts */}
      {!reduce &&
        floaters.map((f, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute hidden sm:block"
            style={{ left: f.left, top: f.top, opacity: f.opacity }}
            animate={{ y: [0, -22, 0], x: [0, 8, 0], rotate: [0, 8, 0] }}
            transition={{
              duration: f.duration,
              delay: f.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart
              className="text-rose"
              style={{ width: f.size, height: f.size }}
              strokeWidth={1.2}
              fill="currentColor"
            />
          </motion.span>
        ))}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <motion.div variants={item} className="eyebrow">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose" />
          </span>
ashish & bittu · 4 saal · ek pavitr bandhan
        </motion.div>

        <h1 className="mt-8 font-serif text-[clamp(2.75rem,8vw,5.6rem)] font-light leading-[0.95] tracking-[-0.02em]">
          <motion.span variants={item} className="block text-cream/95">
            4 Saal,
          </motion.span>
          <motion.span variants={item} className="block text-cream/80 italic">
            Anmol Yaadein,
          </motion.span>
          <motion.span
            variants={item}
            className="text-gradient-rose block animate-shimmer pb-2 pr-2"
          >
            Ek Pavitr Bandhan.
          </motion.span>
        </h1>

        <motion.p
          variants={item}
          className="mt-7 font-script text-[clamp(1.7rem,4.6vw,2.8rem)] leading-none text-rose/80"
        >
          Sir Ashish &amp; Alka (Bittu)
        </motion.p>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-[14.5px] leading-relaxed text-cream/60 sm:text-[16.5px]"
        >
          Chaar saal, anginat yaadein, aur ek hi dil — jo aaj bhi sirf tumhara hai. Kashi ke
          ghaton se Sonbhadra ki mitti tak, Dala ki pahadiyon se un raaton tak jab tum bimaar
          thi — har pal mein meri Bittu thi. Duniya jeetne ki koi khwahish nahi rahi; bas tumhari
          hansi aur tumhara sukoon chahiye tha, aur wahi aaj bhi chahiye.
        </motion.p>

        <motion.div variants={item} className="mt-8 w-full max-w-lg">
          <p className="font-serif text-lg italic leading-snug text-rose/75 sm:text-xl">
            “Mere mehboob qayamat hogi, aaj ruswa teri galiyon mein mohabbat hogi…”
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-cream/30">
            Meri mohabbat aaj bhi wahi hai — bina kisi shart ke, sirf tumhare naam
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <button type="button" onClick={() => scrollTo('safar')} className="btn-primary group">
            <Heart className="h-4 w-4 transition-transform duration-500 group-hover:scale-125" fill="currentColor" strokeWidth={0} />
            Hamara safar dekho
          </button>
          <button type="button" onClick={() => scrollTo('letters')} className="btn-ghost group">
            <Mail className="h-4 w-4 text-rose/80 transition-transform duration-500 group-hover:-rotate-6" />
            Dil ki baat padho
          </button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-12 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-cream/30 sm:gap-5"
        >
          <span>ashish</span>
          <span className="h-1 w-1 rounded-full bg-rose/40" />
          <span>4 saal · 1,461 din</span>
          <span className="h-1 w-1 rounded-full bg-rose/40" />
          <span>bittu</span>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollTo('safar')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        aria-label="Hamara safar dekho"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/35 transition-colors hover:text-rose/80 sm:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.32em]">dheere se scroll karo</span>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="h-4 w-4" strokeWidth={1.4} />
        </motion.span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 right-5 hidden items-center gap-2 text-[9px] uppercase tracking-[0.28em] text-cream/25 lg:flex"
      >
        <Sparkles className="h-3 w-3 text-gold/60" />
chaar saal · ek hi dua
      </motion.div>
    </section>
  )
}
