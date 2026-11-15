import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ImageOff,
  LayoutGrid,
  Music2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import { photos } from '../data/photos'
import { loadYouTubeApi } from '../lib/youtube'

const ease = [0.22, 1, 0.36, 1]

// Ek page par ek hi hidden YouTube player.
let sharedPlayer = null

const searchUrl = (song) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song} song`)}`

function Visualizer({ active, bars = 5, className = '' }) {
  return (
    <span className={`flex h-4 items-end gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-gradient-to-t from-gold/70 to-rose"
          style={{
            height: '100%',
            animation: active ? `equalize 1.1s ease-in-out ${i * 0.13}s infinite` : 'none',
            transform: active ? undefined : 'scaleY(0.24)',
            opacity: active ? 0.95 : 0.35,
            transition: 'transform .4s ease, opacity .4s ease',
          }}
        />
      ))}
    </span>
  )
}

function StageImage({ item }) {
  const [src, setSrc] = useState(item.photo)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setSrc(item.photo)
    setFailed(false)
  }, [item.photo])

  return (
    <>
      <img
        src={src}
        alt={`Sir Ashish & Alka — ${item.label}`}
        onError={() => {
          if (src !== item.placeholder) {
            setSrc(item.placeholder)
            setFailed(true)
          }
        }}
        className="h-full w-full object-cover"
      />
      {failed ? (
        <span className="absolute left-3 top-14 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-midnight/70 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-cream/60 backdrop-blur-md">
          <ImageOff className="h-3 w-3" />
          photo load nahi hui
        </span>
      ) : null}
    </>
  )
}

function GridModal({ index, onPick, onClose }) {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[88] overflow-y-auto bg-[#120609]/92 p-4 backdrop-blur-xl sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Saari yaadein"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease }}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="sticky top-0 z-10 -mx-2 mb-4 flex items-center justify-between gap-4 rounded-2xl bg-[#120609]/85 px-3 py-3 backdrop-blur-md">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-cream/35">yaadon ka pitara</p>
            <p className="mt-1 font-serif text-xl text-cream">
              {photos.length} photos · {photos.length} gaane
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Grid band karo"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.05] text-cream/70 transition-colors hover:text-cream"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pb-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {photos.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onPick(i)}
              className={`group relative overflow-hidden rounded-lg border text-left transition-all duration-300 ${
                i === index
                  ? 'border-rose/60 ring-1 ring-rose/30'
                  : 'border-white/10 hover:border-rose/30'
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-midnight-800">
                <img
                  src={item.photo}
                  alt={item.label}
                  loading="lazy"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = '1'
                      e.currentTarget.src = item.placeholder
                    }
                  }}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-1.5 top-1.5 rounded-full bg-midnight/70 px-2 py-0.5 text-[8px] uppercase tracking-[0.16em] text-cream/70 backdrop-blur-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {!item.available ? (
                  <span className="absolute bottom-1.5 right-1.5 rounded-full bg-midnight/75 px-1.5 py-0.5 text-[7px] uppercase tracking-[0.1em] text-cream/50 backdrop-blur-sm">
                    no track
                  </span>
                ) : null}
              </div>
              <p className="truncate px-2 py-1.5 font-serif text-[11px] leading-tight text-cream/75">
                {item.song || '—'}
              </p>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState('idle') // idle | loading | playing | paused | blocked | error | noembed | unavailable-track | unplayable
  const [muted, setMuted] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [gridOpen, setGridOpen] = useState(false)

  const stageRef = useRef(null)
  const sectionRef = useRef(null)
  const playerHostRef = useRef(null)
  const playerRef = useRef(null)
  const loadedIdRef = useRef(null)
  const wantsPlayRef = useRef(false)
  const pendingMuteRef = useRef(false)

  const current = photos[index]

  const markPlaying = useCallback(() => {
    setStatus('playing')
    window.dispatchEvent(new Event('bittu:youtube-play'))
  }, [])

  useEffect(() => {
    let disposed = false
    const host = playerHostRef.current
    if (!host) return undefined

    if (sharedPlayer) {
      playerRef.current = sharedPlayer
      loadedIdRef.current = loadedIdRef.current || photos[0].youtubeId
      setStatus(wantsPlayRef.current ? 'loading' : 'paused')
      return undefined
    }

    loadYouTubeApi()
      .then((YT) => {
        if (disposed) return
        const mount = document.createElement('div')
        host.appendChild(mount)
        playerRef.current = new YT.Player(mount, {
          height: '180',
          width: '320',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              sharedPlayer = playerRef.current
              const first = photos[0]
              if (!first.available) {
                setStatus('unavailable-track')
                return
              }
              const wanted = loadedIdRef.current || first.youtubeId
              loadedIdRef.current = wanted
              playerRef.current?.loadVideoById?.(wanted)
              setStatus(wantsPlayRef.current ? 'loading' : 'paused')
              if (wantsPlayRef.current) {
                if (pendingMuteRef.current) {
                  playerRef.current?.mute?.()
                  setMuted(true)
                } else {
                  playerRef.current?.unMute?.()
                  setMuted(false)
                }
                playerRef.current?.playVideo?.()
              }
            },
            onStateChange: (event) => {
              const state = event.data
              if (state === 1) markPlaying()
              else if (state === 2) setStatus('paused')
              else if (state === 3) setStatus('loading')
              else if (state === 0) setStatus('paused')
            },
            onError: (event) => {
              const code = event?.data
              setStatus(code === 101 || code === 150 ? 'noembed' : 'unplayable')
            },
          },
        })
      })
      .catch(() => setStatus('unavailable'))

    return () => {
      disposed = true
    }
  }, [markPlaying])

  // Site ka apna player chale toh yeh chup ho jaye.
  useEffect(() => {
    const pause = () => {
      wantsPlayRef.current = false
      try {
        playerRef.current?.pauseVideo?.()
      } catch {
        /* ignore */
      }
    }
    window.addEventListener('bittu:site-music-play', pause)
    return () => window.removeEventListener('bittu:site-music-play', pause)
  }, [])

  const stopForUnavailable = useCallback(() => {
    wantsPlayRef.current = false
    try {
      playerRef.current?.pauseVideo?.()
    } catch {
      /* ignore */
    }
    setStatus('unavailable-track')
  }, [])

  const playCurrent = useCallback(
    ({ silent = false } = {}) => {
      if (!current.available) {
        stopForUnavailable()
        return
      }

      pendingMuteRef.current = silent
      const player = playerRef.current
      if (!player || !player.loadVideoById) {
        setStatus('loading')
        wantsPlayRef.current = true
        return
      }

      if (silent) {
        player.mute?.()
        setMuted(true)
      } else {
        player.unMute?.()
        setMuted(false)
      }

      if (loadedIdRef.current === current.youtubeId) {
        player.playVideo()
      } else {
        loadedIdRef.current = current.youtubeId
        player.loadVideoById(current.youtubeId)
      }
      wantsPlayRef.current = true
      setStatus('loading')

      window.setTimeout(() => {
        const state = playerRef.current?.getPlayerState?.()
        if (state !== 1 && state !== 3) setStatus('blocked')
      }, 2000)
    },
    [current.available, current.youtubeId, stopForUnavailable]
  )

  const pauseCurrent = useCallback(() => {
    wantsPlayRef.current = false
    try {
      playerRef.current?.pauseVideo?.()
    } catch {
      /* ignore */
    }
    setStatus('paused')
  }, [])

  // Next/Previous har baar photo aur gaana dono badalta hai.
  const goTo = useCallback(
    (nextIndex) => {
      const total = photos.length
      const safe = ((nextIndex % total) + total) % total
      const item = photos[safe]
      setIndex(safe)

      if (!item.available) {
        stopForUnavailable()
        return
      }

      setStatus('loading')
      loadedIdRef.current = item.youtubeId
      wantsPlayRef.current = true
      pendingMuteRef.current = false

      const player = playerRef.current
      if (player?.loadVideoById) {
        player.unMute?.()
        setMuted(false)
        player.loadVideoById(item.youtubeId)
      }

      window.setTimeout(() => {
        const state = playerRef.current?.getPlayerState?.()
        if (state !== 1 && state !== 3) setStatus('blocked')
      }, 2000)
    },
    [stopForUnavailable]
  )

  // Pehli baar screen par aaye toh muted autoplay (browser rule).
  useEffect(() => {
    const el = stageRef.current
    if (!el || attempted) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !attempted) {
            setAttempted(true)
            wantsPlayRef.current = true
            playCurrent({ silent: true })
          }
        })
      },
      { threshold: 0.55 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [attempted, playCurrent])

  // Gallery screen par ho toh site ka chhota player chhup jaye.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return undefined
    const notify = (value) =>
      window.dispatchEvent(new CustomEvent('bittu:gallery-inview', { detail: value }))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => notify(entry.isIntersecting)),
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      notify(false)
    }
  }, [])

  // Keyboard arrows.
  useEffect(() => {
    const onKey = (e) => {
      if (gridOpen) return
      if (e.key === 'ArrowRight') goTo(index + 1)
      if (e.key === 'ArrowLeft') goTo(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, index, gridOpen])

  const togglePlay = () => {
    if (status === 'playing' || status === 'loading') pauseCurrent()
    else playCurrent()
  }

  const toggleMute = () => {
    const player = playerRef.current
    if (!player) return
    if (muted) player.unMute?.()
    else player.mute?.()
    setMuted((m) => !m)
  }

  const statusLabel =
    status === 'playing'
      ? muted
        ? 'baj raha hai · sound off'
        : 'baj raha hai'
      : status === 'loading'
        ? 'load ho raha hai…'
        : status === 'blocked'
          ? 'tap play'
          : status === 'noembed'
            ? 'sirf YouTube par chalta hai'
            : status === 'unplayable'
              ? 'load nahi hua — next try karo'
              : status === 'unavailable-track'
                ? 'track available nahi'
                : status === 'unavailable'
                  ? 'YouTube load nahi hua'
                  : 'tap play'

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          icon={Music2}
          eyebrow={`${photos.length} yaadein · ${photos.length} gaane · ek hi dil`}
          title={
            <>
              Yaadon Ki <span className="italic text-rose/85">Gallery</span>
            </>
          }
          subtitle="Har photo ka apna gaana hai. Photo badlo, gaana khud badal jayega. Play, mute, next-previous — aur grid mein saari yaadein ek saath."
        />

        <div className="relative mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease }}
            className="glass relative overflow-hidden p-2.5 sm:p-3.5"
          >
            <div
              ref={stageRef}
              className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-midnight-800 sm:aspect-[16/11]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.995 }}
                  transition={{ duration: 0.6, ease }}
                  className="absolute inset-0"
                >
                  <StageImage item={current} />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/45 to-transparent" />

              <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-midnight/65 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-cream/70 backdrop-blur-md">
                {current.label} · {index + 1}/{photos.length}
              </span>

              <button
                type="button"
                onClick={() => setGridOpen(true)}
                className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-midnight/65 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-cream/75 backdrop-blur-md transition-colors hover:text-cream"
              >
                <LayoutGrid className="h-3 w-3" />
                grid
              </button>

              <div className="absolute inset-x-0 bottom-0 px-14 pb-4 pt-4 sm:px-16 sm:pb-5">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-cream/55">
                  <Visualizer active={status === 'playing'} bars={4} />
                  {statusLabel}
                </div>

                <p className="mt-1.5 font-serif text-[17px] leading-tight text-cream sm:text-[24px]">
                  {current.song || 'Gaana ab available nahi'}
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-cream/45">
                  Track {String(index + 1).padStart(2, '0')} / {photos.length}
                  {current.date ? <span className="hidden sm:inline"> · {current.date}</span> : null}
                </p>

                {current.caption ? (
                  <p className="mt-1.5 line-clamp-2 max-w-xl font-serif text-[12px] italic leading-snug text-cream/70 sm:text-[14.5px]">
                    “{current.caption}”
                  </p>
                ) : null}

                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={status === 'playing' ? 'Gaana pause karo' : 'Gaana bajao'}
                    className="grid h-10 w-10 place-items-center rounded-full text-midnight transition-transform duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: 'linear-gradient(130deg,#f8d3cb,#e39a86 55%,#e6b878)',
                      boxShadow: '0 10px 26px -10px rgba(227,154,134,0.85)',
                    }}
                  >
                    {status === 'playing' || status === 'loading' ? (
                      <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                    ) : (
                      <Play className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => goTo(index - 1)}
                    aria-label="Pichhli yaad"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-cream/75 backdrop-blur-md transition-colors hover:text-cream"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    aria-label="Agli yaad"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-cream/75 backdrop-blur-md transition-colors hover:text-cream"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? 'Unmute' : 'Mute'}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-cream/75 backdrop-blur-md transition-colors hover:text-cream"
                  >
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>

                  {status === 'blocked' ? (
                    <button
                      type="button"
                      onClick={() => playCurrent()}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-cream/70 backdrop-blur-md transition-colors hover:text-cream"
                    >
                      <RotateCcw className="h-3 w-3" />
                      retry
                    </button>
                  ) : null}

                  {status === 'noembed' || status === 'unplayable' ? (
                    <a
                      href={`https://www.youtube.com/watch?v=${current.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-cream/70 backdrop-blur-md transition-colors hover:text-cream"
                    >
                      <ExternalLink className="h-3 w-3" />
                      YouTube par kholo
                    </a>
                  ) : null}

                  {status === 'unavailable-track' ? (
                    <a
                      href={searchUrl(current.song)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-cream/70 backdrop-blur-md transition-colors hover:text-cream"
                    >
                      <ExternalLink className="h-3 w-3" />
                      YouTube par dhoondo
                    </a>
                  ) : null}
                </div>
              </div>

            </div>
          </motion.div>

          {/* quick strip — aas-paas ki yaadein */}
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setGridOpen(true)}
              className="shrink-0 rounded-full border border-rose/25 bg-rose/[0.07] px-3.5 py-2 text-[9px] uppercase tracking-[0.18em] text-rose/80 transition-colors hover:bg-rose/[0.12]"
            >
              saari {photos.length} dekho
            </button>

            <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
              {photos
                .slice(Math.max(0, index - 2), Math.max(0, index - 2) + 9)
                .map((item, offset) => {
                  const i = Math.max(0, index - 2) + offset
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`${item.label} — ${item.song}`}
                      className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border transition-all ${
                        i === index ? 'border-rose/60 ring-1 ring-rose/30' : 'border-white/10 hover:border-rose/30'
                      }`}
                    >
                      <img
                        src={item.photo}
                        alt=""
                        loading="lazy"
                        onError={(e) => {
                          if (!e.currentTarget.dataset.fallback) {
                            e.currentTarget.dataset.fallback = '1'
                            e.currentTarget.src = item.placeholder
                          }
                        }}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  )
                })}
            </div>
          </div>

          <p className="mt-3 px-1 text-[9px] uppercase tracking-[0.14em] text-cream/20">
            photos github se live load hoti hain · photo na mile to placeholder
          </p>
        </div>
      </div>

      {/* hidden YouTube player — custom controls upar hain */}
      <div
        ref={playerHostRef}
        aria-hidden
        className="pointer-events-none fixed -left-[9999px] top-0 h-[1px] w-[1px] overflow-hidden opacity-0"
      />

      <AnimatePresence>
        {gridOpen ? (
          <GridModal
            index={index}
            onClose={() => setGridOpen(false)}
            onPick={(i) => {
              setGridOpen(false)
              goTo(i)
            }}
          />
        ) : null}
      </AnimatePresence>
    </section>
  )
}
