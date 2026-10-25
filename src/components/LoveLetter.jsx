import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { letter, person } from '../data/content'
import SectionHeading from './SectionHeading'

function useTypewriter(lines) {
  const [state, setState] = useState({ line: 0, chars: 0, done: false })

  useEffect(() => {
    if (state.done || state.line >= lines.length) return
    const full = lines[state.line]
    if (state.chars < full.length) {
      const id = setTimeout(() => {
        setState((s) => ({ ...s, chars: s.chars + 1 }))
      }, 28)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => {
      setState((s) =>
        s.line === lines.length - 1
          ? { ...s, done: true }
          : { line: s.line + 1, chars: 0, done: false },
      )
    }, 900)
    return () => clearTimeout(id)
  }, [state, lines])

  return state
}

export default function LoveLetter() {
  const { line, chars, done } = useTypewriter(letter.lines)
  const [skipped, setSkipped] = useState(false)
  const finished = skipped || done

  const skip = () => setSkipped(true)

  return (
    <section className="relative z-10 mx-auto max-w-3xl px-4 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <SectionHeading kicker={letter.kicker} title={letter.title} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative mt-12 rounded-[2rem] border border-[#e8d3b0] bg-[linear-gradient(160deg,#fffdf6_0%,#fff7e6_45%,#ffefd8_100%)] p-8 text-left text-rose-deep shadow-[0_30px_80px_rgba(0,0,0,0.5)] md:p-12"
        onClick={skip}
      >
        {/* paper texture, border, fold and grain */}
        <span
          className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-rose-deep/10"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-rose-deep/10 to-transparent"
          aria-hidden="true"
        />
        <span
          className="grain pointer-events-none absolute inset-0 rounded-[2rem] opacity-[0.07] mix-blend-multiply"
          aria-hidden="true"
        />

        <span
          className="absolute -top-5 right-8 rotate-12 text-5xl drop-shadow-[0_6px_10px_rgba(122,17,73,0.25)]"
          aria-hidden="true"
        >
          💌
        </span>

        <div className="relative">
          <p className="font-bangla text-lg font-semibold md:text-xl">
            {letter.to}
          </p>

          <div className="mt-5 space-y-4">
            {letter.lines.map((text, i) => {
              if (skipped || i < line) {
                return (
                  <p
                    key={i}
                    className="font-bangla text-base leading-relaxed md:text-lg"
                  >
                    {text}
                  </p>
                )
              }
              if (i === line) {
                return (
                  <p
                    key={i}
                    className="font-bangla text-base leading-relaxed md:text-lg"
                  >
                    {text.slice(0, chars)}
                    {!finished && (
                      <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-rose-deep align-middle" />
                    )}
                  </p>
                )
              }
              return null
            })}
          </div>

          <div className="mt-8 text-right">
            <p className="font-script whitespace-pre-line text-3xl text-rose-soft md:text-4xl">
              {letter.sign}
            </p>
          </div>

          {finished && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-3xl tracking-[0.4em]"
            >
              {letter.signature}
            </motion.p>
          )}

          {!finished && (
            <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-rose-deep/45">
              tap to read it all
            </p>
          )}
        </div>

        {/* wax seal — tap to reveal the whole letter */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            skip()
          }}
          aria-label="Skip the typing animation and show the whole letter"
          className="absolute -right-3 -bottom-3 z-10 flex h-16 w-16 rotate-[-8deg] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#c0146a,#7a1149_62%,#4a0a2c)] text-gold-soft shadow-[0_10px_24px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.25)] ring-2 ring-rose-soft/20 transition-transform hover:scale-105 active:scale-95 md:h-20 md:w-20"
        >
          <span className="font-script text-2xl md:text-3xl">
            {person.petName.charAt(0)}
          </span>
        </button>
      </motion.div>
    </section>
  )
}
