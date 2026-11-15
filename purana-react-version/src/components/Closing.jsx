import { motion } from 'framer-motion'
import { MoonStar, Sparkles } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

export default function Closing() {
  return (
    <section id="dua" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease }}
          className="flex justify-center"
        >
          <span className="eyebrow">
            <MoonStar className="h-3 w-3 text-gold/80" strokeWidth={2} />
            aakhri dua · hamesha ke liye
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease, delay: 0.08 }}
          className="mt-6 font-serif text-[clamp(2.1rem,5.4vw,3.6rem)] font-light leading-[1.05] text-cream"
        >
          Hamesha Khush Rehna,{' '}
          <span className="text-gradient-rose italic">Bittu</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
          className="glass relative mx-auto mt-10 overflow-hidden px-6 py-10 sm:px-12 sm:py-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 h-56 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(230,184,120,0.22),transparent_70%)] blur-2xl"
          />

          <div className="relative">
            <p className="font-serif text-[17px] leading-[1.95] text-cream/75 sm:text-[18px]">
              Meri dua hai ki tum jahan bhi raho, jiske saath bhi raho — tumhari subah mein sukoon
              ho, tumhari raat mein chain ho, aur tumhare chehre ki woh hansi kabhi kam na ho.
            </p>
            <p className="mt-5 font-serif text-[17px] leading-[1.95] text-cream/65 sm:text-[18px]">
              Mujhe tumse kuch nahi chahiye — na jawab, na wajah, na koi hisaab. Bas itna ki tum
              khush raho, swasth raho, aur khud par hamesha garv karo. Tumhare liye meri dua kabhi
              kam nahi hogi.
            </p>

            <div className="glow-divider mx-auto my-8 w-32" />

            <div className="space-y-2 font-serif text-[17px] italic leading-relaxed text-rose/80 sm:text-[19px]">
              <p>“Waqt guzar jayega, mausam bhi badal jayenge,</p>
              <p>Par tere naam ke diye is dil mein hamesha jalte rahenge.</p>
              <p>Shikayat nahi hai tujhse kisi bhi mod par mujhe,</p>
              <p>Meri har dua mein bas teri khushi ke phool khilte rahenge.”</p>
            </div>

            <p className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.26em] text-cream/35">
              <Sparkles className="h-3 w-3 text-gold/70" />
              hamesha apna khayal rakhna
            </p>
            <p className="mt-4 font-script text-3xl text-rose/85 sm:text-4xl">— Tumhara Ashish</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
