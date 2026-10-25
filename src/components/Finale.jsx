import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { finale, person } from '../data/content'
import { burst, celebrate, heartBurst, sideCannons } from '../utils/confetti'

const RISE = ['💖', '💛', '✨', '💕', '💗', '⭐']

export default function Finale() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const fired = useRef(false)
  const [shared, setShared] = useState(false)

  useEffect(() => {
    if (inView && !fired.current) {
      fired.current = true
      sideCannons()
      celebrate(6000)
      heartBurst({ x: 0.5, y: 0.4 })
    }
  }, [inView])

  const makeWish = () => {
    burst({ x: 0.5, y: 0.5 })
    heartBurst({ x: 0.5, y: 0.45 })
    celebrate(2800)
  }

  const replay = () => {
    window.dispatchEvent(new CustomEvent('birthday:reset-gift'))
    document.getElementById('gift')?.scrollIntoView({ behavior: 'smooth' })
  }

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Happy Birthday, Kuheli Kona 🎂',
          text: 'A little surprise, made with love.',
          url,
        })
        return
      }
      await navigator.clipboard.writeText(url)
      setShared(true)
      window.setTimeout(() => setShared(false), 2200)
    } catch {
      // sharing dismissed or unavailable — no-op
    }
  }

  return (
    <section
      ref={ref}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 text-center"
    >
      <div
        className="animate-pulse-glow pointer-events-none absolute inset-0 m-auto h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(245,197,66,0.16),rgba(255,143,191,0.1)_45%,transparent_70%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 m-auto h-[19rem] w-[19rem] rounded-full border border-gold/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 m-auto h-[14rem] w-[14rem] rounded-full border border-rose-soft/10"
        aria-hidden="true"
      />

      {RISE.map((e, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute text-3xl"
          style={{
            left: `${8 + i * 16}%`,
            top: '110%',
            animationDelay: `${i * 0.5}s`,
          }}
          animate={{ y: [-40, -160], opacity: [0, 1, 0] }}
          transition={{
            duration: 4,
            delay: i * 0.45,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          {e}
        </motion.span>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
        className="relative"
      >
        <motion.span
          className="inline-block text-8xl md:text-9xl"
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 30px rgba(255,79,142,0.7))' }}
        >
          🎂
        </motion.span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="font-display relative mt-6 text-3xl tracking-[0.25em] text-rose-soft uppercase md:text-4xl"
      >
        {finale.title}
      </motion.h2>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-script text-gold-shine animate-heartbeat relative mt-2 text-7xl leading-tight drop-shadow-[0_6px_30px_rgba(245,197,66,0.4)] md:text-9xl"
      >
        {finale.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.55 }}
        className="font-bangla relative mt-6 max-w-xl text-lg text-blush/90 md:text-xl"
      >
        {finale.subtitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.75 }}
        className="font-bangla relative mt-3 text-sm text-gold-soft/75"
      >
        {finale.line}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.95 }}
        className="relative mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <motion.button
          type="button"
          onClick={makeWish}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full bg-gradient-to-r from-rose-soft via-gold to-rose-soft px-7 py-3 text-sm font-semibold text-[#3a0620] shadow-[0_12px_36px_rgba(245,197,66,0.3)]"
        >
          Make a wish 🕯️
        </motion.button>

        <motion.button
          type="button"
          onClick={replay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full border border-gold/30 bg-white/5 px-6 py-3 text-sm text-gold-soft backdrop-blur-md transition-colors hover:bg-white/10"
        >
          Replay the surprise ↺
        </motion.button>

        <motion.button
          type="button"
          onClick={share}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full px-4 py-3 text-xs uppercase tracking-[0.25em] text-blush/70 transition-colors hover:text-gold-soft"
        >
          {shared ? 'link copied ✓' : 'share'}
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 1.15 }}
        className="relative mt-10 flex items-center gap-3"
      >
        <span className="h-px w-14 bg-gold/40" />
        <span className="animate-heartbeat text-2xl">🤍</span>
        <span className="h-px w-14 bg-gold/40" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 1.3 }}
        className="font-bangla relative mt-4 text-xs tracking-[0.3em] text-blush/70 uppercase"
      >
        forever &amp; always · for {person.petName}
      </motion.p>
    </section>
  )
}
