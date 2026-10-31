import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { person } from '../data/content'
import { burst, heartBurst } from '../utils/confetti'

function EnvelopeSeal() {
  return (
    <motion.svg
      viewBox="0 0 220 160"
      className="mx-auto h-32 w-auto drop-shadow-[0_18px_35px_rgba(0,0,0,0.45)] md:h-36"
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gatePaper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffbef" />
          <stop offset="1" stopColor="#f6e7cc" />
        </linearGradient>
        <radialGradient id="gateWax" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#b3125f" />
          <stop offset="0.6" stopColor="#7a1149" />
          <stop offset="1" stopColor="#4a0a2c" />
        </radialGradient>
      </defs>

      {/* note peeking out */}
      <rect x="48" y="16" width="124" height="72" rx="7" fill="#fffdf6" stroke="#ecdcc0" />
      <path d="M62 36h96M62 50h80M62 64h64" stroke="#e3cba4" strokeWidth="2" strokeLinecap="round" />

      {/* envelope body */}
      <rect x="18" y="40" width="184" height="102" rx="12" fill="url(#gatePaper)" stroke="#e8d3b0" />
      <path d="M18 52 L110 116 L202 52 L202 130 Q202 142 190 142 L30 142 Q18 142 18 130 Z" fill="#fffdf6" />
      <path d="M18 142 L92 92 M202 142 L128 92" stroke="#ecdcc0" strokeWidth="1.5" />
      <path d="M18 52 L110 116 L202 52" fill="none" stroke="#e8d3b0" strokeWidth="2" />

      {/* wax seal */}
      <circle cx="110" cy="96" r="23" fill="url(#gateWax)" />
      <circle cx="110" cy="96" r="17" fill="none" stroke="#ffd6e8" strokeOpacity="0.28" />
      <text
        x="110"
        y="105"
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize="26"
        fill="#ffe9a8"
      >
        {person.petName.charAt(0)}
      </text>
    </motion.svg>
  )
}

export default function IntroGate({ onEnter }) {
  const [leaving, setLeaving] = useState(false)
  const enteredRef = useRef(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  const enter = () => {
    if (enteredRef.current) return
    enteredRef.current = true
    setLeaving(true)
    burst({ x: 0.5, y: 0.62 })
    heartBurst({ x: 0.5, y: 0.58 })
    window.dispatchEvent(new CustomEvent('birthday:start'))
    window.setTimeout(() => onEnter?.(), 1050)
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Open your birthday surprise"
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-night/95 px-4 py-10 backdrop-blur-md md:items-center"
      initial={{ opacity: 1 }}
      animate={leaving ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7, delay: leaving ? 0.35 : 0 }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-pulse-glow absolute inset-0 m-auto h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(245,197,66,0.16),rgba(255,143,191,0.12)_45%,transparent_70%)] blur-2xl" />
        <div className="animate-float-slow absolute top-[12%] left-[12%] text-2xl opacity-70"></div>
        <div
          className="animate-float absolute right-[14%] bottom-[18%] text-xl opacity-60"
          style={{ animationDelay: '1.2s' }}
        >
          ✧
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={
          leaving
            ? { opacity: 0, y: -26, scale: 0.97 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-[2rem] border border-gold/25 bg-white/[0.055] px-7 py-10 text-center shadow-[0_30px_120px_rgba(0,0,0,0.6)] backdrop-blur-xl md:px-10"
      >
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg text-gold" aria-hidden>
          
        </span>

        <p className="text-[10px] uppercase tracking-[0.45em] text-gold/70">
          a little surprise
        </p>
        <p className="font-script text-gold-shine mt-3 text-4xl md:text-5xl">
          For {person.petName}
        </p>

        <div className="mt-5">
          <EnvelopeSeal />
        </div>

        <p className="font-bangla text-blush/80">
          Tomar jonno ekta chhoto surprise opokkha korche.
        </p>

        <motion.button
          ref={buttonRef}
          type="button"
          onClick={enter}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-7 w-full rounded-full bg-gradient-to-r from-rose-soft via-gold to-rose-soft px-8 py-3.5 text-sm font-semibold tracking-wide text-[#3a0620] shadow-[0_14px_40px_rgba(245,197,66,0.35)]"
        >
          Kholo 
        </motion.button>

        <button
          type="button"
          onClick={enter}
          className="mt-5 text-[10px] uppercase tracking-[0.32em] text-blush/65 transition-colors hover:text-gold-soft"
        >
          skip · dhuke jao
        </button>
      </motion.div>
    </motion.div>
  )
}
