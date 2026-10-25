import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { countdown, life, person } from '../data/content'
import { celebrate } from '../utils/confetti'
import SectionHeading from './SectionHeading'

const DAY = 86400000
const HOUR = 3600000
const MINUTE = 60000
const SECOND = 1000
const BD_OFFSET = 6 * HOUR
const lifeFormat = new Intl.NumberFormat('en-IN')

function countdownParts(target, now) {
  const diff = Math.max(0, target - now)
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
  }
}

function lifeParts(birth, now) {
  const diff = Math.max(0, now - birth)
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor(diff / HOUR),
    minutes: Math.floor(diff / MINUTE),
    seconds: Math.floor(diff / SECOND),
  }
}

function bdDay(ms) {
  return new Date(ms + BD_OFFSET).toISOString().slice(0, 10)
}

function FlipValue({ value }) {
  const display = String(value).padStart(2, '0')

  return (
    <span className="relative flex h-[1.15em] items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={display}
          initial={{ y: '75%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-75%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="block min-w-[1.2ch] text-center tabular-nums"
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function LifeValue({ value }) {
  return (
    <span className="block text-[clamp(0.95rem,3.6vw,1.6rem)] leading-tight whitespace-nowrap tabular-nums">
      {lifeFormat.format(value)}
    </span>
  )
}

export default function Countdown() {
  const target = countdown.birthday.date.getTime()
  const birth = person.birth.date.getTime()
  const [now, setNow] = useState(() => Date.now())
  const isLife = now >= target
  const wasLife = useRef(isLife)
  const active = isLife ? life : countdown
  const time = isLife ? lifeParts(birth, now) : countdownParts(target, now)
  const isBirthday = bdDay(now) === bdDay(target)

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (isLife && !wasLife.current) celebrate(3500)
    wasLife.current = isLife
  }, [isLife])

  return (
    <section className="relative z-10 mx-auto max-w-4xl overflow-hidden px-4 py-20 text-center md:py-28">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,197,66,0.1),rgba(255,143,191,0.08)_45%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <SectionHeading
          kicker={active.kicker}
          title={active.title}
          subtitle={active.subtitle}
        />

        {isLife && isBirthday && (
          <p className="font-bangla animate-heartbeat mt-8 text-2xl text-rose-soft md:text-3xl">
            {countdown.done}
          </p>
        )}

        <div
          className={`grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 ${
            isLife && isBirthday ? 'mt-8' : 'mt-10'
          }`}
        >
          {active.units.map((u, i) => (
            <motion.div
              key={u.key}
              initial={{ opacity: 0, scale: 0.85, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                type: 'spring',
                stiffness: 120,
              }}
              className="glass relative overflow-hidden rounded-2xl px-4 py-6 ring-1 ring-gold/15 shadow-[inset_0_1px_0_rgba(255,233,168,0.16)]"
            >
              <span className="absolute top-2 left-2 h-1 w-1 rounded-full bg-gold/60" />
              <span className="absolute top-2 right-2 h-1 w-1 rounded-full bg-gold/60" />
              <span className="absolute bottom-2 left-2 h-1 w-1 rounded-full bg-gold/30" />
              <span className="absolute right-2 bottom-2 h-1 w-1 rounded-full bg-gold/30" />

              {isLife ? (
                <div className="font-display text-rose-soft">
                  <LifeValue value={time[u.key]} />
                </div>
              ) : (
                <div className="font-display text-4xl text-rose-soft md:text-5xl">
                  <FlipValue value={time[u.key]} />
                </div>
              )}
              <div className="font-bangla mt-2 text-sm text-gold-soft/85">
                {u.label}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="font-bangla mt-8 text-sm text-blush/65">
          🕰️ {isLife ? life.label : countdown.birthday.label}
        </p>
      </motion.div>
    </section>
  )
}
