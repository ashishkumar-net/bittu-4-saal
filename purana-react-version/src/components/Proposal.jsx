import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Clock,
  Heart,
  HeartHandshake,
  Lock,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import Confetti from './Confetti'
import { config } from '../config'

const ease = [0.22, 1, 0.36, 1]

const waLink = config.whatsappNumber
  ? `https://wa.me/${config.whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
      config.whatsappMessage
    )}`
  : `https://wa.me/?text=${encodeURIComponent(config.whatsappMessage)}`

export default function Proposal() {
  const [opened, setOpened] = useState(false)
  const [fire, setFire] = useState(0)
  const [answer, setAnswer] = useState(null) // 'yes' | 'time'
  const [dodge, setDodge] = useState({ x: 0, y: 0 })
  const reduce = useReducedMotion()

  const sayYes = () => {
    setAnswer('yes')
    setFire((f) => f + 1)
    window.setTimeout(() => setFire((f) => f + 1), 500)
    window.setTimeout(() => setFire((f) => f + 1), 1100)
  }

  const needTime = () => {
    setAnswer('time')
  }

  return (
    <section id="the-question" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          icon={Sparkles}
          eyebrow="the question alka gets to answer"
          title={
            <>
              One question for Alka, <span className="italic text-rose/85">sealed</span>
            </>
          }
          subtitle="Sir Ashish is not asking Alka to forget four years — he is asking for a new chapter after them. Everything above was memory and honesty. This part is not a demand; it is a door, left open, with no lock on your side."
        />

        <div className="relative mt-14">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,154,134,0.16),transparent_70%)] blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease }}
            className="glass relative overflow-hidden px-5 py-10 sm:px-10 sm:py-14"
          >
            <AnimatePresence mode="wait" initial={false}>
              {!opened ? (
                <motion.div
                  key="locked"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease }}
                  className="flex flex-col items-center text-center"
                >
                  <button
                    type="button"
                    onClick={() => setOpened(true)}
                    aria-label="Open the sealed envelope"
                    className="group relative block w-full max-w-md cursor-pointer outline-none"
                  >
                    <div className="relative aspect-[3/2] w-full [perspective:1200px]">
                      {/* body */}
                      <div
                        className="absolute inset-0 rounded-[26px] border border-white/12 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-soft group-hover:-translate-y-1.5"
                        style={{
                          background:
                            'linear-gradient(155deg, rgba(28,38,74,0.95), rgba(10,16,41,0.98) 55%, rgba(20,17,32,0.98))',
                        }}
                      >
                        <div className="absolute inset-0 rounded-[26px] bg-[radial-gradient(120%_120%_at_50%_-20%,rgba(227,154,134,0.18),transparent_60%)]" />
                        {/* inner triangle fold lines */}
                        <div className="absolute inset-0 overflow-hidden rounded-[26px]">
                          <div className="absolute inset-x-0 top-0 h-[62%] origin-top [clip-path:polygon(0_0,100%_0,50%_100%)] bg-gradient-to-b from-white/[0.09] to-transparent" />
                          <div className="absolute bottom-0 left-0 h-[58%] w-1/2 origin-bottom-right bg-gradient-to-tr from-white/[0.05] to-transparent [clip-path:polygon(0_0,100%_100%,0_100%)]" />
                          <div className="absolute bottom-0 right-0 h-[58%] w-1/2 bg-gradient-to-tl from-white/[0.04] to-transparent [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
                        </div>
                      </div>

                      {/* wax seal */}
                      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
                        <span className="absolute -inset-6 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(246,207,174,0.35),transparent_70%)]" />
                        <span
                          className="relative grid h-[70px] w-[70px] place-items-center rounded-full transition-transform duration-500 ease-soft group-hover:scale-110 sm:h-[82px] sm:w-[82px]"
                          style={{
                            background:
                              'conic-gradient(from 200deg, #f3b7ad, #e8a8a0, #c47f7c, #e8a8a0, #f6cdc5, #e8a8a0)',
                            boxShadow:
                              '0 18px 40px -16px rgba(227,154,134,0.9), inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -4px 8px rgba(120,50,55,0.55)',
                          }}
                        >
                          <span className="absolute inset-[6px] rounded-full border border-white/30 opacity-50" />
                          <Heart
                            className="relative h-7 w-7 text-[#5e2a2c] sm:h-8 sm:w-8"
                            fill="currentColor"
                            strokeWidth={0}
                          />
                        </span>
                      </div>

                      {/* tiny label */}
                      <span className="absolute bottom-4 left-0 right-0 text-center text-[9px] uppercase tracking-[0.32em] text-cream/30">
                        for alka’s eyes only
                      </span>
                    </div>

                    <span className="mt-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-rose/70 transition-colors duration-500 group-hover:text-rose">
                      <Lock className="h-3 w-3" />
                      tap the seal to open
                    </span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="opened"
                  initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, ease }}
                  className="relative flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease, delay: 0.1 }}
                    className="relative"
                  >
                    <span className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(227,154,134,0.28),transparent_70%)] blur-xl" />
                    <Heart
                      className="relative h-14 w-14 animate-float-slow text-rose drop-shadow-[0_0_24px_rgba(227,154,134,0.55)]"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  </motion.div>

                  <p className="mt-8 text-[10px] uppercase tracking-[0.32em] text-cream/40">
                    the only question that ever mattered
                  </p>

                  <h3 className="mt-4 max-w-2xl font-serif text-[clamp(2rem,5.4vw,3.6rem)] font-light leading-[1.08] text-cream">
                    Can Alka and Sir Ashish start a brand new chapter,{' '}
                    <span className="text-gradient-rose italic">together?</span>
                  </h3>

                  <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-cream/55 sm:text-[15px]">
                    Not the old one, patched over. A new one — for Alka and Ashish, with two people
                    who finally learned how to listen. And if your answer is not yet, Bittu, that is
                    an answer I will respect completely.
                  </p>

                  <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={sayYes}
                      className="btn-primary group text-[13.5px] sm:text-sm"
                    >
                      <Heart
                        className="h-4 w-4 transition-transform duration-500 group-hover:scale-125"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                      Yes, Let’s Begin Again ❤️
                    </button>

                    <motion.button
                      type="button"
                      onClick={needTime}
                      onMouseEnter={() => {
                        if (reduce) return
                        setDodge({
                          x: (Math.random() - 0.5) * 26,
                          y: (Math.random() - 0.5) * 16,
                        })
                      }}
                      onMouseLeave={() => setDodge({ x: 0, y: 0 })}
                      animate={dodge}
                      transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                      className="btn-ghost group text-[13.5px] sm:text-sm"
                    >
                      <Clock className="h-4 w-4 text-lilac/80 transition-transform duration-500 group-hover:rotate-12" />
                      Take Your Time
                    </motion.button>
                  </div>

                  <AnimatePresence mode="wait">
                    {answer === 'time' ? (
                      <motion.div
                        key="time"
                        initial={{ opacity: 0, y: 16, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.6, ease }}
                        className="w-full overflow-hidden"
                      >
                        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-lilac/20 bg-lilac/[0.05] p-6 text-left backdrop-blur-md">
                          <div className="flex items-start gap-3">
                            <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-lilac/80" strokeWidth={1.5} />
                            <div>
                              <p className="font-serif text-xl italic leading-snug text-cream/90">
                                Take all the time you need, my heart is always ready for you.
                              </p>
                              <p className="mt-3 text-[13.5px] leading-relaxed text-cream/55">
                                Alka, no follow-ups. No deadlines. No pressure dressed up as love.
                                I would rather wait a lifetime with respect than rush you into
                                something half-sure. Whenever — or if ever — you want to talk,
                                Sir Ashish will be here.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => {
                      setOpened(false)
                      setAnswer(null)
                    }}
                    className="mt-8 text-[10px] uppercase tracking-[0.26em] text-cream/25 transition-colors hover:text-cream/50"
                  >
                    seal it back
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <Confetti fire={fire} />

      {/* Yes — response modal */}
      <AnimatePresence>
        {answer === 'yes' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setAnswer(null)}
            className="fixed inset-0 z-[92] flex items-center justify-center bg-[#120609]/80 p-4 backdrop-blur-xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Thank you"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.6, ease }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative w-full max-w-lg overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-12"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(227,154,134,0.2),transparent_65%)]"
              />
              <button
                type="button"
                onClick={() => setAnswer(null)}
                aria-label="Close"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-cream/50 transition-colors hover:text-cream"
              >
                <X className="h-4 w-4" />
              </button>

              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 160, damping: 12 }}
                className="relative mx-auto grid h-16 w-16 place-items-center rounded-full"
                style={{
                  background: 'linear-gradient(140deg,#f8d3cb,#e8a8a0 55%,#d9b382)',
                  boxShadow: '0 20px 50px -18px rgba(227,154,134,0.9)',
                }}
              >
                <Heart className="h-7 w-7 text-midnight/70" fill="currentColor" strokeWidth={0} />
              </motion.div>

              <h3 className="relative mt-6 font-serif text-3xl font-light leading-tight text-cream sm:text-4xl">
                Alka, you just made my whole world
                <span className="text-gradient-rose italic"> soft again.</span>
              </h3>
              <p className="relative mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-cream/60">
                Alka, thank you for reading every word — and for giving us a chance. I promise you
                patience, honesty, and the kind of love that listens. Say the word, and the first
                conversation is on me. — Sir Ashish
              </p>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary relative mt-8 w-full text-[13.5px] sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                Say it on WhatsApp
              </a>

              <p className="relative mt-4 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-cream/30">
                <Send className="h-2.5 w-2.5" />
                one message, no pressure
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
