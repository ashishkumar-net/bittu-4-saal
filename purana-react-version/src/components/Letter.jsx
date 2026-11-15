import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Feather, Heart, MailOpen, PenLine } from 'lucide-react'
import SectionHeading from './SectionHeading'

const ease = [0.22, 1, 0.36, 1]

const letters = [
  {
    id: 'pehla',
    label: 'Pehla Khat',
    title: 'Meri Bittu,',
    lines: [
      'Aaj jab peeche mud kar dekhta hoon, toh lagta hai jaise kal hi ki baat ho jab hamara ye safar shuru hua tha. In chaar saalon mein humne kitne hi mausam dekhe, kitni hi baatein ki, aur kitne hi aise pal bitaye jo meri zindagi ki sabse keemti daulat hain.',
      'Chahe woh mandir ki shanti mein saath baithna ho, ya pahadiyon ki hawa mein ghanton baatein karna, ya phir har mushkil waqt mein ek doosre ki fikar karna — mere liye har ek lamha bilkul saccha aur pavitr tha.',
      'Maine jab bhi tumhari fikar ki, jab bhi tumhari safety aur khushi ke liye socha, woh sirf isliye kyunki tum mere liye sirf ek insaan nahi, meri poori duniya thi. Maine hamesha yahi chaha ki tumhare chehre par kabhi koi udasi na aaye aur tum jahan bhi raho, hamesha surakshit aur khush raho.',
      'Aur agar kabhi meri baaton se, mere gusse se ya meri zid se tumhe dukh pahuncha — toh uske liye main sach mein maafi maangta hoon. Koi bahana nahi, koi shart nahi. Bas itna ki tumhare hisse mein sirf sukoon aaye.',
      'Waqt aur halaat chahe jahan bhi le jayein, ek baat hamesha sach rahegi — Ashish ne apni poori wafadari, izzat aur sachhe dil se sirf apni Bittu ko chaaha tha. Meri har dua mein tumhari khushi aur kamyabi hamesha shamil rahegi.',
    ],
  },
  {
    id: 'shayari',
    label: 'Doosra Khat',
    title: 'Jo main keh nahi paaya, woh shayari mein:',
    lines: [
      'Waqt guzar jayega, mausam bhi badal jayenge,\nPar tere naam ke diye is dil mein hamesha jalte rahenge.',
      'Shikayat nahi hai tujhse kisi bhi mod par mujhe,\nMeri har dua mein bas teri khushi ke phool khilte rahenge.',
      'Tu jahan bhi rahe, wahan roshni banke rahe,\nMeri duniya adhoori sahi — teri duniya hari bhari rahe.',
    ],
  },
  {
    id: 'aakhri',
    label: 'Teesra Khat',
    title: 'Chhoti si baat, Bittu:',
    lines: [
      'Main tumse koi jawab nahi maang raha. Na koi hisaab, na koi wajah. Bas itna kehna hai ki chaar saal se jo tumhare liye dua nikalti hai, woh aaj bhi nikalti hai — bilkul waisi hi, bina kisi shart ke.',
      'Tumhari hansi kahin aur bhi ho, tumhara haath kisi aur ke haath mein bhi ho — meri dua mein tumhara naam wahi rahega, wahi izzat, wahi pyaar.',
      'Hamesha apna khayal rakhna.\n— Tumhara Ashish',
    ],
  },
]

function useTypewriter(text, speed = 11) {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)
  const timerRef = useRef(0)

  useEffect(() => {
    window.clearInterval(timerRef.current)
    if (reduce) {
      setShown(text)
      setDone(true)
      return undefined
    }
    setShown('')
    setDone(false)
    let i = 0
    timerRef.current = window.setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) {
        window.clearInterval(timerRef.current)
        setDone(true)
      }
    }, speed)
    return () => window.clearInterval(timerRef.current)
  }, [text, speed, reduce])

  const finish = () => {
    window.clearInterval(timerRef.current)
    setShown(text)
    setDone(true)
  }

  return { shown, done, finish }
}

function LetterBody({ letter }) {
  const full = useMemo(() => letter.lines.join('\n\n'), [letter])
  const { shown, done, finish } = useTypewriter(full)
  const visible = showParagraphs(shown)

  return (
    <div>
      <div className="space-y-5">
        {visible.paragraphs.map((text, i) => (
          <p
            key={`${letter.id}-${i}`}
            className={
              text.includes('— Tumhara Ashish')
                ? 'whitespace-pre-line font-script text-3xl leading-snug text-rose/85 sm:text-4xl'
                : 'whitespace-pre-line text-[14.5px] leading-[1.95] text-cream/70 sm:text-[15.5px]'
            }
          >
            {text}
            {!done && i === visible.paragraphs.length - 1 ? (
              <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-rose/70 align-middle" />
            ) : null}
          </p>
        ))}
      </div>

      {!done ? (
        <button
          type="button"
          onClick={finish}
          className="mt-6 text-[10px] uppercase tracking-[0.26em] text-cream/35 transition-colors hover:text-rose/80"
        >
          poora khat ek saath padho
        </button>
      ) : null}
    </div>
  )
}

// Splits the typed string back into paragraphs, keeping partially typed lines intact.
function showParagraphs(shown) {
  if (!shown) return { paragraphs: [] }
  return { paragraphs: shown.split('\n\n') }
}

export default function Letter() {
  const [active, setActive] = useState(letters[0].id)
  const letter = letters.find((l) => l.id === active) || letters[0]

  return (
    <section id="letters" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          icon={Feather}
          eyebrow="dil ki baatein · ashish ki taraf se"
          title={
            <>
              Kuch Khat, Jo Dil Se <span className="italic text-rose/85">Likhe Gaye</span>
            </>
          }
          subtitle="Koi shikayat nahi, koi hisaab nahi. Sirf woh baatein jo saalon se seena mein dabee thi — sachhi, seedhi aur tumhare naam. Envelope chuno aur khat khud-ba-khud likhta jayega."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {letters.map((l) => {
            const isActive = l.id === active
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => setActive(l.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition-all duration-500 ${
                  isActive
                    ? 'border-rose/45 bg-rose/10 text-cream'
                    : 'border-white/10 bg-white/[0.03] text-cream/45 hover:border-rose/25 hover:text-cream/70'
                }`}
              >
                {isActive ? <MailOpen className="h-3 w-3 text-rose/80" /> : <PenLine className="h-3 w-3" />}
                {l.label}
              </button>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease }}
          className="glass relative mt-8 overflow-hidden px-6 py-10 sm:px-10 sm:py-14 md:px-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(227,154,134,0.18),transparent_70%)] blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(230,184,120,0.14),transparent_70%)] blur-2xl"
          />
          <div className="paper-lines pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <p className="font-serif text-xl leading-snug text-cream/90 sm:text-2xl">
                {letter.title}
              </p>
              <span className="mt-1 hidden shrink-0 items-center gap-1.5 text-[9px] uppercase tracking-[0.24em] text-cream/25 sm:flex">
                <Heart className="h-2.5 w-2.5 text-rose/60" fill="currentColor" strokeWidth={0} />
                sir ashish
              </span>
            </div>

            <div className="mt-6 min-h-[14rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={letter.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <LetterBody letter={letter} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="glow-divider mt-9" />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="font-script text-2xl text-rose/80 sm:text-3xl">— Tumhara Ashish</p>
              <p className="text-[9px] uppercase tracking-[0.24em] text-cream/25">
                hamesha, har haal mein
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
