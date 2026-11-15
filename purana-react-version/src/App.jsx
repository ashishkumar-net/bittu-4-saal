import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import AmbientBackground from './components/AmbientBackground'
import ScrollProgress from './components/ScrollProgress'
import MusicPlayer from './components/MusicPlayer'
import Hero from './components/Hero'
import MemoryLane from './components/MemoryLane'
import Gallery from './components/Gallery'
import Letter from './components/Letter'
import Promises from './components/Promises'
import Proposal from './components/Proposal'
import Closing from './components/Closing'
import Footer from './components/Footer'

export default function App() {
  const [intro, setIntro] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 2300)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <AmbientBackground />
      <ScrollProgress />

      <AnimatePresence>
        {intro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-[#1a0b10]"
            onClick={() => setIntro(false)}
            aria-hidden
          >
            <div className="flex flex-col items-center px-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <span className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(227,154,134,0.3),transparent_70%)] blur-2xl" />
                <Heart
                  className="relative h-10 w-10 animate-pulse-glow text-rose/90"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.35 }}
                className="mt-7 font-serif text-2xl font-light italic text-cream/75 sm:text-3xl"
              >
                Bittu ke liye.
              </motion.p>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-5 text-[9px] uppercase tracking-[0.36em] text-cream/30"
              >
                ashish &amp; bittu · 4 saal · ek pavitr bandhan
              </motion.span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative z-10">
        <main>
          <Hero />
          <MemoryLane />
          <Gallery />

          <div className="mx-auto max-w-5xl px-8">
            <div className="glow-divider" />
          </div>

          <Letter />
          <Promises />
          <Proposal />
          <Closing />
        </main>
        <Footer />
      </div>

      <MusicPlayer />
    </>
  )
}
