import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import { kiss } from '../data/content'
import { heartBurst } from '../utils/confetti'
import SectionHeading from './SectionHeading'

function GirlSvg() {
  return (
    <svg
      viewBox="0 0 120 200"
      className="h-full w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
    >
      {/* legs */}
      <line x1="47" y1="150" x2="42" y2="184" stroke="#ffd9c0" strokeWidth="11" strokeLinecap="round" />
      <line x1="73" y1="150" x2="78" y2="184" stroke="#ffd9c0" strokeWidth="11" strokeLinecap="round" />
      {/* shoes */}
      <ellipse cx="40" cy="186" rx="10" ry="4" fill="#a02a4f" />
      <ellipse cx="80" cy="186" rx="10" ry="4" fill="#a02a4f" />
      {/* dress */}
      <path d="M28 118 L92 118 L84 158 L36 158 Z" fill="#ff6fae" />
      <path d="M26 104 Q60 86 94 104 L90 122 L30 122 Z" fill="#ff88bf" />
      {/* arms */}
      <line x1="30" y1="112" x2="16" y2="142" stroke="#ffd9c0" strokeWidth="9" strokeLinecap="round" />
      <line x1="90" y1="112" x2="104" y2="142" stroke="#ffd9c0" strokeWidth="9" strokeLinecap="round" />
      {/* neck */}
      <rect x="52" y="62" width="16" height="14" fill="#ffd9c0" />
      {/* face */}
      <circle cx="60" cy="50" r="27" fill="#ffd9c0" />
      {/* hair */}
      <path d="M33 50 Q33 12 60 12 Q87 12 87 50 Q87 20 72 15 Q60 10 48 15 Q33 20 33 50 Z" fill="#3a0620" />
      <path d="M36 36 Q60 24 84 36 Q70 44 36 36 Z" fill="#5a1038" opacity="0.65" />
      {/* bow */}
      <g transform="translate(78 18)">
        <circle cx="0" cy="0" r="5" fill="#f5c542" />
        <path d="M0 0 L-13 -8 L-7 2 Z" fill="#f5c542" />
        <path d="M0 0 L13 -8 L7 2 Z" fill="#f5c542" />
        <path d="M-13 -8 A2 2 0 0 1 -7 5 Z" fill="#ffe9a8" />
      </g>
      {/* closed happy eyes */}
      <path d="M47 49 Q53 44 59 49" fill="none" stroke="#3a0620" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M65 48 Q71 43 77 48" fill="none" stroke="#3a0620" strokeWidth="2.6" strokeLinecap="round" />
      {/* blush */}
      <ellipse cx="45" cy="58" rx="6" ry="3.2" fill="#ff8fbf" opacity="0.6" />
      <ellipse cx="78" cy="57" rx="6" ry="3.2" fill="#ff8fbf" opacity="0.6" />
      {/* smile */}
      <path d="M54 60 Q62 68 70 60" fill="none" stroke="#a02a4f" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  )
}

function BoySvg() {
  return (
    <svg
      viewBox="0 0 120 200"
      className="h-full w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
    >
      {/* legs */}
      <line x1="47" y1="150" x2="42" y2="184" stroke="#2a4a7f" strokeWidth="11" strokeLinecap="round" />
      <line x1="73" y1="150" x2="78" y2="184" stroke="#2a4a7f" strokeWidth="11" strokeLinecap="round" />
      {/* shoes */}
      <ellipse cx="41" cy="186" rx="10" ry="4" fill="#1d0a14" />
      <ellipse cx="79" cy="186" rx="10" ry="4" fill="#1d0a14" />
      {/* shirt + torso */}
      <path d="M28 118 L92 118 L84 158 L36 158 Z" fill="#7ec8ff" />
      <path d="M26 104 Q60 86 94 104 L90 122 L30 122 Z" fill="#9bd6ff" />
      {/* arms */}
      <line x1="30" y1="112" x2="16" y2="142" stroke="#2a4a7f" strokeWidth="9" strokeLinecap="round" />
      <line x1="90" y1="112" x2="104" y2="142" stroke="#2a4a7f" strokeWidth="9" strokeLinecap="round" />
      {/* neck */}
      <rect x="52" y="62" width="16" height="14" fill="#ffd9c0" />
      {/* face */}
      <circle cx="60" cy="50" r="27" fill="#ffd9c0" />
      {/* hair */}
      <path d="M33 50 Q33 12 60 12 Q87 16 87 50 Q87 24 73 18 Q60 14 47 18 Q33 24 33 50 Z" fill="#1d0a14" />
      <path d="M36 34 Q54 22 84 32 Q58 40 36 34 Z" fill="#33240f" opacity="0.4" />
      {/* closed happy eyes */}
      <path d="M45 49 Q51 44 57 49" fill="none" stroke="#1d0a14" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M63 48 Q69 43 75 48" fill="none" stroke="#1d0a14" strokeWidth="2.6" strokeLinecap="round" />
      {/* blush */}
      <ellipse cx="45" cy="58" rx="6" ry="3.2" fill="#ff8fbf" opacity="0.5" />
      <ellipse cx="78" cy="57" rx="6" ry="3.2" fill="#ff8fbf" opacity="0.5" />
      {/* smile */}
      <path d="M53 58 Q60 66 68 58" fill="none" stroke="#a02a4f" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  )
}

const FLOATY = ['💕', '💖', '💗', '🦋', '✨', '💛']
const PETALS = [
  { left: '12%', top: '18%', emoji: '🌸', delay: 0, duration: 7 },
  { left: '84%', top: '22%', emoji: '🌷', delay: 1.2, duration: 8 },
  { left: '22%', top: '58%', emoji: '✨', delay: 2.1, duration: 6.5 },
  { left: '74%', top: '62%', emoji: '🌸', delay: 0.6, duration: 7.5 },
  { left: '46%', top: '10%', emoji: '🌷', delay: 1.8, duration: 9 },
  { left: '62%', top: '44%', emoji: '✨', delay: 2.6, duration: 6.8 },
]

export default function Kiss() {
  const ref = useRef(null)
  const bursted = useRef(false)
  const [vw, setVw] = useState(0)

  useEffect(() => {
    const measure = () => setVw(window.innerWidth)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  // Walk in from far outside the frame: girl from left, boy from right.
  // The walk starts only once the section is closer to mid-screen, so the
  // two are NOT already together before you reach the section.
  const enter = vw * 0.85
  const girlX = useTransform(scrollYProgress, [0.35, 0.85], [enter, 0])
  const boyX = useTransform(scrollYProgress, [0.35, 0.85], [-enter, 0])
  const girlRot = useTransform(scrollYProgress, [0.7, 1], [0, -12])
  const boyRot = useTransform(scrollYProgress, [0.7, 1], [0, 12])
  const kissScale = useTransform(scrollYProgress, [0.78, 0.92], [0, 1])
  const heartsOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.9, 1],
    [0, 1, 1],
  )

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > 0.92 && !bursted.current) {
      bursted.current = true
      heartBurst({ x: 0.5, y: 0.35 })
    }
    if (v < 0.5) bursted.current = false
  })

  return (
    <section
      id="kiss"
      ref={ref}
      className="relative z-10 mx-auto max-w-4xl overflow-hidden px-4 py-20 text-center md:py-28"
    >
      <SectionHeading
        kicker={kiss.kicker}
        title={kiss.title}
        subtitle={kiss.subtitle}
      />

      <div className="relative mx-auto mt-4 h-[300px] w-full max-w-md">
        {/* scene atmosphere */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-2 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,233,168,0.2),transparent_70%)] blur-2xl" />
          <div className="absolute inset-x-[14%] bottom-3 h-9 rounded-[100%] bg-rose-soft/15 blur-xl" />
          {PETALS.map((p, i) => (
            <motion.span
              key={i}
              className="absolute text-base opacity-70"
              style={{ left: p.left, top: p.top }}
              animate={{
                y: [0, -16, 0],
                x: [0, i % 2 === 0 ? 8 : -8, 0],
                rotate: [0, i % 2 === 0 ? 14 : -14, 0],
                opacity: [0.25, 0.8, 0.25],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {p.emoji}
            </motion.span>
          ))}
        </div>

        {/* floating hearts */}
        <motion.div
          style={{ opacity: heartsOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
        >
          {FLOATY.map((e, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${10 + i * 15}%`,
                top: `${8 + (i % 3) * 28}%`,
              }}
              animate={{
                y: [0, -26, 0],
                scale: [0.6, 1.2, 0.6],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3.2,
                delay: i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>

        {/* girl — walks in from the LEFT edge */}
        <motion.div
          className="absolute bottom-0 left-1/2 z-20 h-[260px] w-[120px]"
          style={{
            x: girlX,
            rotate: girlRot,
            transformOrigin: 'center bottom',
            marginLeft: '-110px',
          }}
        >
          <GirlSvg />
        </motion.div>

        {/* boy — walks in from the RIGHT edge */}
        <motion.div
          className="absolute bottom-0 left-1/2 z-20 h-[260px] w-[120px]"
          style={{
            x: boyX,
            rotate: boyRot,
            transformOrigin: 'center bottom',
            marginLeft: '-10px',
          }}
        >
          <BoySvg />
        </motion.div>

        {/* heart that pops between them */}
        <motion.div
          className="absolute top-[28%] left-1/2 z-30 -mt-6 origin-center"
          style={{ x: '-50%', scale: kissScale }}
        >
          <motion.span
            className="block text-7xl"
            style={{ filter: 'drop-shadow(0 0 18px rgba(255,77,141,0.9))' }}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          >
            💕
          </motion.span>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-bangla mt-2 text-sm text-blush/65"
      >
        ❝ tomar sathe protiti din, shobcheye priyo ❞
      </motion.p>
    </section>
  )
}
