import { motion } from 'framer-motion'
import { HeartHandshake, Sparkle } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { promises } from '../data/memories'

const ease = [0.22, 1, 0.36, 1]

export default function Promises() {
  return (
    <section id="waade" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          icon={HeartHandshake}
          eyebrow="ankahe waade · bina kisi shart ke"
          title={
            <>
              Woh Waade Jo Maine <span className="italic text-rose/85">Chup-chaap Nibhaye</span>
            </>
          }
          subtitle="Yeh resolutions nahi hain jo achhe lagne ke liye likhe gaye hon. Yeh woh sach hai jo maine chaar saalon mein jeeya — bimaari mein, doori mein, aur un raaton mein jab koi dekh nahi raha tha."
        />

        <div className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-2">
          {promises.map((promise, i) => (
            <motion.article
              key={promise.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease, delay: (i % 2) * 0.1 }}
              className="glass glass-hover group relative overflow-hidden p-6 sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(230,184,120,0.18),transparent_70%)] blur-xl"
              />
              <div className="relative flex items-start gap-4">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/25 bg-gold/[0.07] text-gold/90">
                  <Sparkle className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <div>
                  <span className="font-serif text-2xl leading-none text-white/10 transition-colors duration-500 group-hover:text-rose/25">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 font-serif text-[23px] font-light leading-tight text-cream/95 sm:text-[26px]">
                    {promise.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-cream/55">{promise.text}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
