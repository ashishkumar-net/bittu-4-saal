// A small, dependency-free ambient score built with the Web Audio API.
// Warm minor chords, a slow breath of reverb, and a few soft plucked notes.
// It exists so the page has a soul even before you add your own song.

const CHORDS = [
  [110.0, 164.81, 220.0, 261.63, 329.63], // A minor
  [87.31, 130.81, 174.61, 220.0, 261.63], // F major
  [130.81, 196.0, 261.63, 329.63, 392.0], // C major
  [98.0, 146.83, 196.0, 246.94, 293.66], // G major
]

const MELODY = [440.0, 523.25, 659.25, 783.99, 880.0, 1046.5]

export class AmbientEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.bus = null
    this.timer = null
    this.voices = new Set()
    this.chordIndex = 0
    this.volume = 0.55
    this.playing = false
  }

  _init() {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return false
    const ctx = new Ctx()
    this.ctx = ctx

    const master = ctx.createGain()
    master.gain.value = 0

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 2400
    filter.Q.value = 0.4

    // gentle feedback delay used as a poor-man's hall
    const delay = ctx.createDelay(2)
    delay.delayTime.value = 0.46
    const feedback = ctx.createGain()
    feedback.gain.value = 0.34
    const wet = ctx.createGain()
    wet.gain.value = 0.38

    master.connect(filter)
    filter.connect(ctx.destination)
    filter.connect(delay)
    delay.connect(feedback)
    feedback.connect(delay)
    delay.connect(wet)
    wet.connect(ctx.destination)

    this.master = master
    this.bus = filter
    return true
  }

  _voice(freq, { type = 'triangle', gain = 0.06, attack = 2.4, hold = 4.6, release = 4.2 } = {}) {
    const ctx = this.ctx
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const env = ctx.createGain()

    osc.type = type
    osc.frequency.value = freq
    osc.detune.value = (Math.random() - 0.5) * 8

    env.gain.setValueAtTime(0.0001, now)
    env.gain.linearRampToValueAtTime(gain, now + attack)
    env.gain.setValueAtTime(gain, now + attack + hold)
    env.gain.exponentialRampToValueAtTime(0.0001, now + attack + hold + release)

    osc.connect(env)
    env.connect(this.bus)
    osc.start(now)
    osc.stop(now + attack + hold + release + 0.1)

    this.voices.add(osc)
    osc.onended = () => {
      this.voices.delete(osc)
      try {
        env.disconnect()
      } catch {
        /* already gone */
      }
    }
  }

  _playChord() {
    if (!this.ctx) return
    const chord = CHORDS[this.chordIndex % CHORDS.length]
    this.chordIndex += 1

    chord.forEach((freq, i) => {
      if (i === 0) {
        this._voice(freq, { type: 'sine', gain: 0.1, attack: 2.8, hold: 5.6, release: 5 })
      } else if (i < 4) {
        this._voice(freq, { type: 'triangle', gain: 0.035, attack: 2.4, hold: 4.4, release: 4.5 })
      }
    })

    // a couple of sparse, bell-like notes on top
    const notes = 1 + (Math.random() < 0.4 ? 1 : 0)
    for (let n = 0; n < notes; n += 1) {
      const freq = MELODY[Math.floor(Math.random() * MELODY.length)]
      this._voice(freq, {
        type: 'sine',
        gain: 0.03,
        attack: 0.04,
        hold: 0.1,
        release: 3.4,
      })
    }
  }

  async start() {
    if (!this.ctx && !this._init()) return false
    await this.ctx.resume()
    if (!this.playing) {
      this.playing = true
      this._playChord()
      this.timer = setInterval(() => this._playChord(), 7200)
    }
    const now = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(Math.max(this.master.gain.value, 0.0001), now)
    this.master.gain.linearRampToValueAtTime(0.18 * this.volume * 1.8, now + 2.4)
    return true
  }

  stop() {
    if (!this.ctx) return
    this.playing = false
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    const now = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(this.master.gain.value, now)
    this.master.gain.linearRampToValueAtTime(0.0001, now + 0.9)

    const voices = [...this.voices]
    window.setTimeout(() => {
      voices.forEach((osc) => {
        try {
          osc.stop()
        } catch {
          /* already stopped */
        }
      })
    }, 1000)
  }

  setVolume(v) {
    this.volume = Math.min(1, Math.max(0, v))
    if (this.ctx && this.playing) {
      const now = this.ctx.currentTime
      this.master.gain.cancelScheduledValues(now)
      this.master.gain.linearRampToValueAtTime(0.18 * this.volume * 1.8, now + 0.3)
    }
  }

  async dispose() {
    this.stop()
    if (this.ctx) {
      try {
        await this.ctx.close()
      } catch {
        /* ignore */
      }
      this.ctx = null
    }
  }
}
