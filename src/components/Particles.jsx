import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const HEARTS = ['💗', '💕', '🩷', '💛', '✨', '💖', '⭐']

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

export default function Particles({ count = 26 }) {
  const reduceMotion = useReducedMotion()

  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: HEARTS[i % HEARTS.length],
        left: randomBetween(0, 100),
        delay: randomBetween(-12, 0),
        duration: randomBetween(9, 18),
        size: randomBetween(14, 30),
        opacity: randomBetween(0.25, 0.6),
      })),
    [count],
  )

  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: randomBetween(2, 98),
        top: randomBetween(2, 96),
        delay: randomBetween(0, 3),
        size: randomBetween(2, 5),
      })),
    [count],
  )

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((s) => (
        <span
          key={`star-${s.id}`}
          className={`animate-twinkle absolute rounded-full bg-gold ${
            s.id % 2 ? 'hidden md:block' : ''
          }`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            boxShadow: '0 0 8px 2px rgba(245,197,66,0.55)',
          }}
        />
      ))}

      {!reduceMotion &&
        items.map((h) => (
          <motion.span
            key={`heart-${h.id}`}
            className={`animate-rise absolute bottom-[-8vh] ${
              h.id % 2 ? 'hidden md:inline-block' : ''
            }`}
            style={{
              left: `${h.left}%`,
              fontSize: h.size,
              opacity: h.opacity,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              filter: 'drop-shadow(0 0 6px rgba(255,143,191,0.6))',
            }}
          >
            <motion.span
              drag
              dragMomentum={false}
              dragElastic={0.6}
              whileDrag={{ scale: 1.3 }}
              whileHover={{ scale: 1.2 }}
              className="pointer-events-auto inline-block cursor-grab touch-none"
            >
              {h.emoji}
            </motion.span>
          </motion.span>
        ))}
    </div>
  )
}
