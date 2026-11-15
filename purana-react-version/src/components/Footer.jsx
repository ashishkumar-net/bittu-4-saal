import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative px-6 pb-28 pt-10 text-center sm:pb-32">
      <div className="glow-divider mx-auto max-w-md" />
      <p className="mx-auto mt-10 max-w-lg font-serif text-xl font-light italic leading-relaxed text-cream/55 sm:text-2xl">
        “Kuch kahaniyan khatam nahi hoti — woh bas ek naye, zyada sachhe panno ka intezaar karti
        hain.”
      </p>
      <div className="mt-7 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/30">
        <span>sir ashish</span>
        <Heart className="h-2.5 w-2.5 text-rose/60" fill="currentColor" strokeWidth={0} />
        <span>alka · bittu</span>
      </div>
      <p className="mt-8 text-[10px] uppercase tracking-[0.26em] text-cream/25">
        4 saal · ek pavitr bandhan · dil se banaya gaya
      </p>
    </footer>
  )
}
