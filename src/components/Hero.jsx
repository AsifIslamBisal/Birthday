import { motion } from 'framer-motion'
import { person, hero } from '../data/content'
import { Ornament } from './SectionHeading'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.25 } },
}

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.97, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 90, damping: 16 },
  },
}

const SPARKLES = [
  { left: '10%', top: '20%', size: 3, delay: 0 },
  { left: '18%', top: '38%', size: 2, delay: 0.7 },
  { left: '7%', top: '58%', size: 4, delay: 1.4 },
  { left: '24%', top: '74%', size: 2, delay: 2.1 },
  { left: '38%', top: '16%', size: 2, delay: 1.1 },
  { left: '62%', top: '13%', size: 3, delay: 0.4 },
  { left: '78%', top: '24%', size: 2, delay: 1.8 },
  { left: '88%', top: '42%', size: 3, delay: 0.9 },
  { left: '82%', top: '66%', size: 2, delay: 2.4 },
  { left: '72%', top: '80%', size: 3, delay: 1.6 },
  { left: '48%', top: '86%', size: 2, delay: 0.2 },
  { left: '30%', top: '90%', size: 2, delay: 2.8 },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 text-center"
    >
      {/* ambient depth */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="animate-float-slow absolute top-[18%] left-[8%] h-44 w-44 rounded-full bg-rose-soft/10 blur-3xl" />
        <div
          className="animate-float absolute top-[46%] right-[6%] h-56 w-56 rounded-full bg-gold/10 blur-3xl"
          style={{ animationDelay: '1.4s' }}
        />
        <div className="absolute inset-x-0 top-1/4 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="absolute inset-x-0 top-3/4 h-px bg-gradient-to-r from-transparent via-rose-soft/15 to-transparent" />
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className="animate-twinkle absolute rounded-full bg-gold"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              boxShadow: '0 0 8px 2px rgba(245,197,66,0.45)',
            }}
          />
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative flex flex-col items-center"
      >
        {/* golden halo behind the name */}
        <div
          className="animate-pulse-glow pointer-events-none absolute inset-0 m-auto h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(245,197,66,0.18),rgba(255,143,191,0.08)_45%,transparent_70%)] blur-2xl"
          aria-hidden="true"
        />

        <motion.span
          variants={item}
          className="glass relative max-w-full rounded-full px-4 py-2 text-center text-xs tracking-wide text-gold-soft md:px-5 md:text-sm"
        >
          <span className="mr-2 text-xs text-gold">✦</span>
          {hero.kicker}
          <span className="ml-2 text-xs text-gold">✦</span>
        </motion.span>

        <motion.h2
          variants={item}
          className="relative mt-4 flex flex-wrap items-center justify-center gap-4 text-xl font-semibold tracking-[0.3em] uppercase md:text-3xl"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold md:w-20" />
          <span className="text-rose-soft">{hero.happy}</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold md:w-20" />
        </motion.h2>

        <motion.h1
          variants={item}
          className="font-script text-gold-shine animate-heartbeat relative mt-2 text-6xl leading-tight drop-shadow-[0_6px_30px_rgba(245,197,66,0.35)] md:text-8xl lg:text-9xl"
        >
          {person.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="font-bangla relative mt-2 text-xl italic text-blush/90 md:text-2xl"
        >
          ❝ {person.tagline} ❞
        </motion.p>

        <motion.div variants={item} className="relative">
          <Ornament className="mt-5" />
        </motion.div>

        <motion.p
          variants={item}
          className="font-bangla relative mt-5 max-w-2xl text-base leading-relaxed text-blush/75 md:text-lg"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          variants={item}
          className="relative mt-14 flex flex-col items-center gap-3"
        >
          <span className="font-bangla text-[11px] tracking-[0.2em] text-blush/65">
            {hero.scroll}
          </span>
          <span className="relative block h-12 w-px overflow-hidden bg-gradient-to-b from-gold/70 to-transparent">
            <motion.span
              className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(245,197,66,0.5)]"
              animate={{ y: [0, 40], opacity: [1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
          <span className="animate-float text-xl">🎈</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
