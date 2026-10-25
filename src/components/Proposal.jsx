import { motion } from 'framer-motion'
import { dateAsk, gift, loveAsk, person } from '../data/content'

const enter = {
  initial: { opacity: 0, y: 28, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -24, scale: 0.98 },
  transition: { type: 'spring', stiffness: 120, damping: 16 },
}

const card =
  'glass mx-auto w-full max-w-xl rounded-[2rem] px-7 py-10 text-center shadow-[0_0_70px_rgba(255,143,191,0.24)] ring-1 ring-gold/15 md:px-10'

function PrimaryButton({ children, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="rounded-full bg-gradient-to-r from-gold via-rose-soft to-gold px-7 py-3 text-sm font-semibold text-[#3a0620] shadow-[0_12px_36px_rgba(245,197,66,0.28)]"
    >
      {children}
    </motion.button>
  )
}

function GhostButton({ children, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="rounded-full border border-gold/30 bg-white/5 px-6 py-3 text-sm text-gold-soft transition-colors hover:bg-white/10"
    >
      {children}
    </motion.button>
  )
}

export function DateQuestion({ onYes }) {
  return (
    <motion.div {...enter} className={card}>
      <p className="text-[10px] uppercase tracking-[0.38em] text-gold/70">
        {dateAsk.kicker}
      </p>

      <motion.span
        animate={{ rotate: [-6, 6, -6] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-5 block text-5xl"
        style={{ filter: 'drop-shadow(0 0 18px rgba(255,143,191,0.55))' }}
        aria-hidden="true"
      >
        🌷
      </motion.span>

      <h3 className="font-display mt-4 text-2xl leading-snug text-gold-soft md:text-3xl">
        {dateAsk.question}
      </h3>
      <p className="font-bangla mt-3 text-sm text-blush/70">{dateAsk.note}</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <PrimaryButton onClick={onYes}>{dateAsk.yes}</PrimaryButton>
        <button
          type="button"
          title="Ei button ta ekhon kaj kore na"
          className="cursor-default rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm text-blush/45"
        >
          {dateAsk.no}
        </button>
      </div>

      <p className="font-bangla mt-4 text-[11px] text-blush/40">
        {dateAsk.noNote}
      </p>
    </motion.div>
  )
}

export function DatePass({ onRedeem, onAgain }) {
  return (
    <motion.div {...enter} className="mx-auto w-full max-w-xl">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/40 bg-[#fff7e6] p-1.5 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <div className="relative overflow-hidden rounded-[1.4rem] border border-dashed border-rose-deep/30 px-6 py-8 text-left text-rose-deep md:px-9">
          <span
            className="absolute top-1/2 -left-6 h-10 w-10 -translate-y-1/2 rounded-full bg-night"
            aria-hidden="true"
          />
          <span
            className="absolute top-1/2 -right-6 h-10 w-10 -translate-y-1/2 rounded-full bg-night"
            aria-hidden="true"
          />

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-rose-deep/55">
                admit one
              </p>
              <h3 className="font-display mt-1 text-3xl tracking-wide">
                {dateAsk.pass.title}
              </h3>
            </div>
            <span className="font-display shrink-0 rounded-full border border-rose-deep/20 px-3 py-1 text-[9px] tracking-[0.18em]">
              {dateAsk.pass.serial}
            </span>
          </div>

          <p className="font-script mt-6 text-4xl text-rose-soft">
            {dateAsk.pass.for}
          </p>
          <p className="font-bangla mt-2 text-base leading-relaxed">
            {dateAsk.pass.line}
          </p>

          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-rose-deep/45">
                valid
              </p>
              <p className="font-bangla mt-1 text-sm">{dateAsk.pass.valid}</p>
            </div>
            <span
              className="flex h-14 w-14 shrink-0 rotate-[-8deg] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#c0146a,#7a1149_62%,#4a0a2c)] shadow-[0_8px_18px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.25)] ring-2 ring-rose-soft/20"
              aria-hidden="true"
            >
              <span className="font-script text-2xl text-gold-soft">
                {person.petName.charAt(0)}
              </span>
            </span>
          </div>

          <div className="mt-6 flex items-end justify-between gap-4 border-t border-dashed border-rose-deep/20 pt-5">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-rose-deep/45">
                with love
              </p>
              <p className="font-script text-2xl text-rose-deep">
                {dateAsk.pass.signature}
              </p>
            </div>
            <div className="flex items-end gap-[3px]" aria-hidden="true">
              {[6, 10, 4, 12, 7, 9, 5, 11, 8, 6, 10, 4].map((height, i) => (
                <span
                  key={i}
                  style={{ height: height * 2 }}
                  className="w-[2px] bg-rose-deep/60"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="font-bangla mt-4 text-center text-xs text-blush/50">
        {dateAsk.pass.note}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <PrimaryButton onClick={onRedeem}>{dateAsk.pass.redeem}</PrimaryButton>
        <GhostButton onClick={onAgain}>{gift.again}</GhostButton>
      </div>
    </motion.div>
  )
}

export function LoveQuestion({ onYes }) {
  return (
    <motion.div {...enter} className={card}>
      <p className="text-[10px] uppercase tracking-[0.38em] text-gold/70">
        {loveAsk.kicker}
      </p>

      <motion.span
        animate={{ scale: [1, 1.14, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-5 block text-5xl"
        style={{ filter: 'drop-shadow(0 0 18px rgba(255,143,191,0.55))' }}
        aria-hidden="true"
      >
        🤍
      </motion.span>

      <h3 className="font-display mt-4 text-2xl leading-snug text-gold-soft md:text-3xl">
        {loveAsk.question}
      </h3>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <PrimaryButton onClick={onYes}>{loveAsk.yes}</PrimaryButton>
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Ei option ta disabled"
          className="cursor-not-allowed rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-blush/30"
        >
          {loveAsk.no} 🔒
        </button>
      </div>
    </motion.div>
  )
}

export function LoveAccepted({ onContinue, onAgain }) {
  return (
    <motion.div {...enter} className={card}>
      <motion.span
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        className="block text-6xl"
        style={{ filter: 'drop-shadow(0 0 24px rgba(255,79,142,0.7))' }}
        aria-hidden="true"
      >
        💖
      </motion.span>

      <h3 className="font-display mt-4 text-3xl text-gold-soft">
        {loveAsk.acceptedTitle}
      </h3>
      <p className="font-bangla mt-4 leading-relaxed text-blush/90">
        {loveAsk.acceptedText}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <PrimaryButton onClick={onContinue}>
          {loveAsk.continue} →
        </PrimaryButton>
        <GhostButton onClick={onAgain}>{gift.again}</GhostButton>
      </div>
    </motion.div>
  )
}
