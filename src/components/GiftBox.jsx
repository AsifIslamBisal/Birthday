import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { gift } from '../data/content'
import { burst, celebrate, heartBurst } from '../utils/confetti'
import SectionHeading from './SectionHeading'
import {
  DatePass,
  DateQuestion,
  LoveAccepted,
  LoveQuestion,
} from './Proposal'

const stageMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.28 },
}

function Gift({ onOpen }) {
  const [untied, setUntied] = useState(false)
  const dragged = useRef(false)
  const rotateXValue = useMotionValue(0)
  const rotateYValue = useMotionValue(0)
  const pullValue = useMotionValue(0)
  const smoothPull = useSpring(pullValue, { stiffness: 260, damping: 28 })
  const bowControls = useAnimationControls()
  const rotateX = useSpring(rotateXValue, { stiffness: 140, damping: 18 })
  const rotateY = useSpring(rotateYValue, { stiffness: 140, damping: 18 })
  const progress = useTransform(smoothPull, (value) =>
    Math.min(1, Math.max(0, value / 92)),
  )
  const lidLift = useTransform(progress, [0, 1], [0, -26])
  const lidTilt = useTransform(progress, [0, 1], [0, -4])
  const boxScale = useTransform(progress, [0, 1], [1, 0.985])
  const ribbonSlide = useTransform(progress, [0, 1], [0, 48])
  const ribbonSquash = useTransform(progress, [0, 1], [1, 0.55])
  const ribbonFade = useTransform(progress, [0, 0.9], [1, 0.35])

  const open = () => {
    if (untied) return
    setUntied(true)
    pullValue.set(110)
    bowControls.start({
      y: 132,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.35, ease: 'easeOut' },
    })
    if (navigator.vibrate) navigator.vibrate(20)
    window.setTimeout(() => onOpen(), 700)
  }

  const tilt = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    rotateYValue.set(x * 18)
    rotateXValue.set(y * -14)
  }

  const resetTilt = () => {
    rotateXValue.set(0)
    rotateYValue.set(0)
  }

  const handleClick = () => {
    if (dragged.current) return
    open()
  }

  const handleDragStart = () => {
    dragged.current = true
  }

  const handleDrag = (_, info) => {
    pullValue.set(Math.max(0, Math.min(130, info.offset.y)))
  }

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 64 || info.velocity.y > 480) {
      open()
    } else {
      pullValue.set(0)
      bowControls.start({
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 320, damping: 24 },
      })
    }
    window.setTimeout(() => {
      dragged.current = false
    }, 100)
  }

  return (
    <div className="flex flex-col items-center">
      <div
        onPointerMove={tilt}
        onPointerLeave={resetTilt}
        className="relative h-[270px] w-[250px] touch-pan-y select-none sm:h-[300px] sm:w-[290px]"
      >
        <div
          className="pointer-events-none absolute top-10 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,143,191,0.22),rgba(245,197,66,0.12)_45%,transparent_70%)] blur-2xl"
          aria-hidden="true"
        />

        <motion.div
          style={{ rotateX, rotateY, scale: boxScale, transformPerspective: 1000 }}
          className="relative h-full w-full"
        >
          <div
            className="absolute bottom-6 left-1/2 h-7 w-52 -translate-x-1/2 rounded-[100%] bg-black/40 blur-lg"
            aria-hidden="true"
          />

          <div className="absolute top-[124px] left-1/2 h-[122px] w-[208px] -translate-x-1/2 rounded-[14px] bg-gradient-to-br from-[#c2186b] via-[#9c1660] to-[#6d0f42] shadow-[0_24px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 sm:h-[136px] sm:w-[232px]">
            <span className="absolute inset-y-0 left-0 w-5 rounded-l-[14px] bg-black/20" />
            <span className="absolute inset-y-0 right-0 w-5 rounded-r-[14px] bg-black/15" />
            <span className="absolute inset-x-4 top-3 h-px bg-white/15" />
            <span className="absolute inset-x-6 bottom-3 h-px bg-black/20" />
          </div>

          <div className="absolute top-[124px] left-1/2 z-10 h-[122px] w-8 -translate-x-1/2 overflow-hidden sm:h-[136px]">
            <motion.div
              style={{
                y: ribbonSlide,
                scaleY: ribbonSquash,
                opacity: ribbonFade,
                transformOrigin: 'top',
              }}
              className="h-full w-full bg-gradient-to-b from-gold-soft via-gold to-[#b8860b] shadow-[0_0_18px_rgba(245,197,66,0.35)]"
            />
          </div>

          <div className="absolute top-[66px] left-1/2 z-20 w-[224px] -translate-x-1/2 sm:w-[248px]">
            <motion.div style={{ y: lidLift, rotate: lidTilt }}>
              <motion.div
                animate={
                  untied
                    ? { y: -100, x: 38, rotate: -16, opacity: 0 }
                    : { y: 0, x: 0, rotate: 0, opacity: 1 }
                }
                transition={{ type: 'spring', stiffness: 120, damping: 13 }}
                className="relative h-[62px] w-full"
              >
                <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-[#e0247f] via-[#b3125f] to-[#6d0f42] shadow-[0_18px_35px_rgba(0,0,0,0.45)] ring-1 ring-white/10" />
                <span className="absolute inset-x-3 top-2 h-px bg-white/30" />
                <span className="absolute inset-x-4 bottom-2 h-px bg-black/20" />
                <span className="absolute inset-y-0 left-1/2 w-9 -translate-x-1/2 bg-gradient-to-b from-gold-soft via-gold to-[#b8860b]" />
                <span className="absolute inset-y-0 left-0 w-4 rounded-l-[16px] bg-black/20" />
                <span className="absolute inset-y-0 right-0 w-4 rounded-r-[16px] bg-black/15" />
              </motion.div>
            </motion.div>
          </div>

          <AnimatePresence>
            {untied && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0.5 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute bottom-24 left-1/2 z-10 h-40 w-32 origin-bottom -translate-x-1/2 bg-[linear-gradient(to_top,rgba(255,233,168,0.55),rgba(255,143,191,0.15),transparent)] blur-xl"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          {[
            { left: '4%', top: '26%', delay: 0 },
            { left: '92%', top: '34%', delay: 0.8 },
            { left: '12%', top: '76%', delay: 1.5 },
            { left: '84%', top: '82%', delay: 2.1 },
          ].map((sparkle, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(245,197,66,0.5)]"
              style={{ left: sparkle.left, top: sparkle.top }}
              animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.3, 0.7] }}
              transition={{
                duration: 2.6,
                delay: sparkle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            />
          ))}

          <button
            type="button"
            onClick={open}
            aria-label="Gift box kholo"
            className="absolute inset-0 z-30 cursor-pointer rounded-[2rem]"
          />

          <div className="absolute top-0 left-1/2 z-40 -translate-x-1/2">
            <motion.button
              type="button"
              drag="y"
              dragConstraints={{ top: 0, bottom: 130 }}
              dragElastic={0.08}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              onClick={handleClick}
              animate={bowControls}
              whileDrag={{ scale: 1.06 }}
              aria-label="Gift-er fita dhore niche tano ba tap koro"
              className="cursor-grab touch-none rounded-2xl p-2 active:cursor-grabbing"
            >
              <motion.svg
                width="124"
                height="126"
                viewBox="0 0 120 124"
                className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="bowGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fff4c8" />
                    <stop offset="0.45" stopColor="#f5c542" />
                    <stop offset="1" stopColor="#b8860b" />
                  </linearGradient>
                </defs>
                <path
                  d="M55 48 C 46 74, 38 96, 26 120 C 42 104, 52 84, 60 58 Z"
                  fill="url(#bowGold)"
                />
                <path
                  d="M65 48 C 74 74, 82 96, 94 120 C 78 104, 68 84, 60 58 Z"
                  fill="url(#bowGold)"
                />
                <path d="M60 40 C 30 4, 4 26, 44 55 Z" fill="url(#bowGold)" />
                <path d="M60 40 C 90 4, 116 26, 76 55 Z" fill="url(#bowGold)" />
                <path
                  d="M54 48 C 42 62, 36 70, 22 76 C 32 66, 38 58, 48 46 Z"
                  fill="url(#bowGold)"
                />
                <path
                  d="M66 48 C 78 62, 84 70, 98 76 C 88 66, 82 58, 72 46 Z"
                  fill="url(#bowGold)"
                />
                <circle
                  cx="60"
                  cy="42"
                  r="12"
                  fill="#ffe9a8"
                  stroke="#b8860b"
                  strokeWidth="2"
                />
                <circle cx="56" cy="38" r="3" fill="#fffdf6" opacity="0.75" />
              </motion.svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="mt-3 flex flex-col items-center">
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-sm text-gold"
          aria-hidden="true"
        >
          ↓
        </motion.span>
        <p className="font-bangla text-sm text-gold-soft/80">{gift.ribbonHint}</p>
        <p className="font-bangla text-[11px] text-blush/50">{gift.tapHint}</p>
      </div>
    </div>
  )
}

function Candle({ cx, lit, onBlow, delay }) {
  return (
    <g className="cursor-pointer" onClick={onBlow}>
      <rect
        x={cx - 4}
        y="-34"
        width="8"
        height="20"
        rx="2"
        fill="#ffe9a8"
        stroke="#e0b34a"
        strokeWidth="1"
      />
      {lit && (
        <g>
          <path
            className="animate-flicker"
            style={{ animationDelay: `${delay}s` }}
            d={`M${cx} -42 C ${cx + 8} -34, ${
              cx - 8
            } -30, ${cx} -24 C ${cx + 8} -30, ${cx + 8} -34, ${cx} -42 Z`}
            fill="#ffb703"
          />
          <circle
            className="animate-flicker"
            style={{ animationDelay: `${delay}s` }}
            cx={cx}
            cy="-32"
            r="5"
            fill="#fffbeb"
            opacity="0.9"
          />
        </g>
      )}
    </g>
  )
}

function Cake({ onBlow, smoke }) {
  return (
    <motion.div
      initial={{ scale: 0.5, y: 40, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 110, damping: 12 }}
      className="flex flex-col items-center"
      onClick={onBlow}
    >
      <motion.span
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none mb-4 text-3xl drop-shadow-[0_0_12px_rgba(255,143,191,0.8)]"
      >
        {smoke ? '✨' : '👆'}
      </motion.span>
      <motion.svg
        width="320"
        height="300"
        viewBox="0 0 320 300"
        className="cursor-pointer drop-shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
        whileHover={{ y: -6 }}
      >
        <defs>
          <linearGradient id="cream" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <Candle cx={70} lit={!smoke} delay={0} onBlow={onBlow} />
        <Candle cx={130} lit={!smoke} delay={0.15} onBlow={onBlow} />
        <Candle cx={190} lit={!smoke} delay={0.3} onBlow={onBlow} />
        <Candle cx={250} lit={!smoke} delay={0.45} onBlow={onBlow} />

        {smoke &&
          [70, 130, 190, 250].map((cx, i) => (
            <motion.circle
              key={cx}
              cx={cx}
              cy={-36}
              r={4}
              fill="#ffd6e8"
              initial={{ opacity: 0.8 }}
              animate={{ cy: -78, r: 11, opacity: 0 }}
              transition={{ duration: 1.1, delay: i * 0.07, ease: 'easeOut' }}
            />
          ))}

        <path
          d="M20 90 Q40 102 60 90 Q80 102 100 90 Q120 102 140 90 Q160 102 180 90 Q200 102 220 90 Q240 102 260 90 Q280 102 300 90 L300 118 L20 118 Z"
          fill="#ffd6e8"
        />
        <rect x="14" y="118" width="292" height="66" rx="14" fill="#ff9dc7" />
        <rect x="14" y="118" width="292" height="66" rx="14" fill="url(#cream)" />
        <rect x="6" y="184" width="308" height="70" rx="14" fill="#f76cae" />
        <rect x="6" y="184" width="308" height="70" rx="14" fill="url(#cream)" />
        <rect x="0" y="254" width="320" height="24" rx="12" fill="#ff9dc7" />
        <rect x="0" y="254" width="320" height="24" rx="12" fill="url(#cream)" />
        {[40, 90, 120, 165, 200, 250, 285].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1={126}
            x2={x + (i % 2 === 0 ? 10 : -10)}
            y2={172}
            stroke={i % 2 === 0 ? '#f5c542' : '#fff'}
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
        {[60, 160, 260].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="222" r="11" fill="#8a1440" />
            <circle cx={x - 3} cy="219" r="4" fill="#ff8fbf" opacity="0.7" />
            <path
              d={`M ${x} 211 Q ${x + 5} 200 ${x + 10} 206`}
              fill="none"
              stroke="#4d8a3c"
              strokeWidth="3"
            />
          </g>
        ))}
        <ellipse cx="160" cy="284" rx="150" ry="12" fill="#1a0b1e55" />
      </motion.svg>
    </motion.div>
  )
}

function Reveal({ onNext, onAgain }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass mx-auto max-w-xl rounded-3xl px-8 py-10 text-center shadow-[0_0_70px_rgba(255,143,191,0.28)] ring-1 ring-gold/15"
    >
      <motion.p
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 10, delay: 0.2 }}
        className="text-5xl"
      >
        🎉
      </motion.p>
      <h3 className="font-display mt-3 text-3xl text-gold-soft">
        {gift.revealTitle}
      </h3>
      <p className="font-bangla mt-4 leading-relaxed text-blush/90">
        {gift.revealText}
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-gradient-to-r from-gold to-rose-soft px-7 py-2.5 text-sm font-semibold text-[#3a0620] shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          {gift.revealCta} →
        </button>
        <button
          type="button"
          onClick={onAgain}
          className="rounded-full border border-gold/30 bg-white/5 px-5 py-2.5 text-sm text-gold-soft transition-transform hover:scale-105 active:scale-95"
        >
          🔁 {gift.again}
        </button>
      </div>
    </motion.div>
  )
}

export default function GiftBox({ onContinue }) {
  const [stage, setStage] = useState('gift')
  const [smoke, setSmoke] = useState(false)

  useEffect(() => {
    const reset = () => {
      setSmoke(false)
      setStage('gift')
    }
    window.addEventListener('birthday:reset-gift', reset)
    return () => window.removeEventListener('birthday:reset-gift', reset)
  }, [])

  const openGift = () => {
    burst({ x: 0.5, y: 0.55 })
    heartBurst({ x: 0.5, y: 0.55 })
    setStage('cake')
  }

  const blowCandles = () => {
    if (smoke) return
    setSmoke(true)
    heartBurst({ x: 0.5, y: 0.6 })
    window.setTimeout(() => {
      setStage('reveal')
      celebrate(3500)
    }, 800)
  }

  const again = () => {
    burst({ x: 0.5, y: 0.5 })
    setSmoke(false)
    setStage('gift')
  }

  const acceptDate = () => {
    burst({ x: 0.5, y: 0.55 })
    heartBurst({ x: 0.5, y: 0.5 })
    setStage('pass')
  }

  const redeemPass = () => {
    celebrate(2200)
    setStage('love')
  }

  const acceptLove = () => {
    celebrate(4800)
    heartBurst({ x: 0.5, y: 0.4 })
    setStage('accepted')
  }

  return (
    <section
      id="gift"
      className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center overflow-hidden px-4 py-20 text-center md:py-28"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,143,191,0.14),rgba(245,197,66,0.08)_45%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <SectionHeading title={gift.title} className="relative" />

      <div className="relative mt-10 flex min-h-[470px] w-full flex-col items-center justify-center">
          {stage === 'gift' && (
            <motion.div key="gift" {...stageMotion} className="w-full">
              <Gift onOpen={openGift} />
            </motion.div>
          )}

          {stage === 'cake' && (
            <motion.div
              key="cake"
              {...stageMotion}
              className="flex w-full flex-col items-center"
            >
              <Cake onBlow={blowCandles} smoke={smoke} />
              <p className="font-bangla mt-2 text-sm text-blush/65">
                {gift.cakeHint}
              </p>
              <button
                type="button"
                onClick={blowCandles}
                disabled={smoke}
                className="mt-4 rounded-full border border-gold/30 bg-white/5 px-6 py-2.5 text-sm text-gold-soft transition-transform hover:scale-105 active:scale-95 disabled:cursor-default disabled:opacity-60 disabled:hover:scale-100"
              >
                {smoke ? 'Wish korlam ✨' : 'Candle nibhao 🕯️'}
              </button>
            </motion.div>
          )}

          {stage === 'reveal' && (
            <motion.div key="reveal" {...stageMotion} className="w-full">
              <Reveal onNext={() => setStage('date')} onAgain={again} />
            </motion.div>
          )}

          {stage === 'date' && (
            <motion.div key="date" {...stageMotion} className="w-full">
              <DateQuestion onYes={acceptDate} />
            </motion.div>
          )}

          {stage === 'pass' && (
            <motion.div key="pass" {...stageMotion} className="w-full">
              <DatePass onRedeem={redeemPass} onAgain={again} />
            </motion.div>
          )}

          {stage === 'love' && (
            <motion.div key="love" {...stageMotion} className="w-full">
              <LoveQuestion onYes={acceptLove} />
            </motion.div>
          )}

          {stage === 'accepted' && (
            <motion.div key="accepted" {...stageMotion} className="w-full">
              <LoveAccepted onContinue={onContinue} onAgain={again} />
            </motion.div>
          )}
      </div>
    </section>
  )
}
