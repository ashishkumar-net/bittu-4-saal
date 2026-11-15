import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Pause, Play, Volume2, VolumeX, Music2 } from 'lucide-react'
import { AmbientEngine } from '../lib/audioEngine'
import { config } from '../config'

function Equalizer({ playing }) {
  const bars = [0, 1, 2, 3]
  return (
    <div className="flex h-4 items-end gap-[3px]" aria-hidden>
      {bars.map((b) => (
        <span
          key={b}
          className="w-[2px] rounded-full bg-rose/80"
          style={{
            height: '100%',
            animation: playing ? `equalize 1.15s ease-in-out ${b * 0.16}s infinite` : 'none',
            transform: playing ? undefined : 'scaleY(0.22)',
            opacity: playing ? 0.9 : 0.4,
            transition: 'transform .4s ease, opacity .4s ease',
          }}
        />
      ))}
    </div>
  )
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [mode, setMode] = useState('ambient')
  const [volume, setVolume] = useState(0.6)
  const [muted, setMuted] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const [hidden, setHidden] = useState(false)

  const engine = useMemo(() => (typeof window === 'undefined' ? null : new AmbientEngine()), [])

  useEffect(() => {
    const audio = new Audio()
    audio.src = config.songUrl
    audio.loop = true
    audio.preload = 'metadata'
    audio.volume = 0.72

    const ready = () => setMode('file')
    const failed = () => setMode('ambient')

    audio.addEventListener('loadedmetadata', ready)
    audio.addEventListener('canplay', ready)
    audio.addEventListener('error', failed)
    audio.load()

    // Keep a handle for the toggle without re-rendering
    MusicPlayer._audio = audio

    return () => {
      audio.removeEventListener('loadedmetadata', ready)
      audio.removeEventListener('canplay', ready)
      audio.removeEventListener('error', failed)
      audio.pause()
      audio.src = ''
      MusicPlayer._audio = null
      if (engine) engine.dispose()
    }
  }, [engine])

  useEffect(() => {
    const audio = MusicPlayer._audio
    if (audio) audio.volume = muted ? 0 : 0.72
    if (engine) engine.setVolume(muted ? 0 : volume)
  }, [volume, muted, engine])

  // Gallery ne apna gaana shuru kiya? Toh yeh player chup ho jaye.
  useEffect(() => {
    const pauseSiteMusic = () => {
      if (MusicPlayer._audio) MusicPlayer._audio.pause()
      if (engine) engine.stop()
      setPlaying(false)
    }
    window.addEventListener('bittu:youtube-play', pauseSiteMusic)
    return () => window.removeEventListener('bittu:youtube-play', pauseSiteMusic)
  }, [engine])

  // Gallery ke apne gaane hain — wahan yeh player raasta na roke.
  useEffect(() => {
    const onGallery = (event) => setHidden(Boolean(event.detail))
    window.addEventListener('bittu:gallery-inview', onGallery)
    return () => window.removeEventListener('bittu:gallery-inview', onGallery)
  }, [])

  const toggle = async () => {
    if (playing) {
      if (mode === 'file' && MusicPlayer._audio) MusicPlayer._audio.pause()
      if (engine) engine.stop()
      setPlaying(false)
      return
    }

    window.dispatchEvent(new Event('bittu:site-music-play'))

    if (mode === 'file' && MusicPlayer._audio) {
      try {
        await MusicPlayer._audio.play()
        setPlaying(true)
        return
      } catch {
        setMode('ambient')
      }
    }

    if (engine) {
      engine.setVolume(muted ? 0 : volume)
      const ok = await engine.start()
      if (ok) setPlaying(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? 30 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: hidden ? 'none' : 'auto' }}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-0 right-0 z-[60] flex justify-center px-4 sm:left-auto sm:right-6 sm:justify-end sm:px-0"
    >
      <div className="flex w-full max-w-[25rem] items-center gap-3 rounded-full border border-white/10 bg-midnight-900/75 p-2 pr-3 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:w-auto sm:max-w-none sm:pr-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause music' : 'Play music'}
          aria-pressed={playing}
          className="group relative grid h-11 w-11 shrink-0 place-items-center rounded-full text-midnight transition-transform duration-500 ease-soft hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(130deg,#f8d3cb,#e8a8a0 55%,#d9b382)',
            boxShadow: '0 8px 26px -8px rgba(227,154,134,0.8), inset 0 1px 0 rgba(255,255,255,0.55)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={playing ? 'pause' : 'play'}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.22 }}
              className="grid place-items-center"
            >
              {playing ? (
                <Pause className="h-[18px] w-[18px]" fill="currentColor" strokeWidth={0} />
              ) : (
                <Play className="ml-[2px] h-[18px] w-[18px]" fill="currentColor" strokeWidth={0} />
              )}
            </motion.span>
          </AnimatePresence>
          {playing ? (
            <span className="pointer-events-none absolute inset-0 animate-ping rounded-full border border-rose/40" />
          ) : null}
        </button>

        <div className="min-w-0 flex-1 sm:flex-none">
          <p className="truncate font-serif text-[15px] leading-tight text-cream/90">
            {config.songTitle}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] text-cream/40">
            {mode === 'file' ? (
              <Music2 className="h-2.5 w-2.5" />
            ) : (
              <Heart className="h-2.5 w-2.5" />
            )}
            {mode === 'file' ? 'our song' : 'soft instrumental'}
          </p>
        </div>

        <Equalizer playing={playing} />

        <div className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => setShowVolume((v) => !v)}
            aria-label="Volume"
            className="grid h-8 w-8 place-items-center rounded-full text-cream/50 transition-colors hover:bg-white/5 hover:text-cream/90"
          >
            {muted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>

          <AnimatePresence>
            {showVolume ? (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-full right-0 mb-3 w-44 rounded-2xl border border-white/10 bg-midnight-900/95 p-3 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-cream/45">
                    Volume
                  </span>
                  <button
                    type="button"
                    onClick={() => setMuted((m) => !m)}
                    className="text-[10px] uppercase tracking-[0.18em] text-rose/70 hover:text-rose"
                  >
                    {muted ? 'Unmute' : 'Mute'}
                  </button>
                </div>
                <input
                  aria-label="Music volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={muted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value))
                    if (muted) setMuted(false)
                  }}
                  className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-rose"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
