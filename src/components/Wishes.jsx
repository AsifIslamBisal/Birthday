import { motion } from 'framer-motion'
import { wishes } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Wishes() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl overflow-hidden px-4 py-20 text-center md:py-28">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,197,66,0.08),rgba(255,143,191,0.08)_45%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <SectionHeading kicker={wishes.kicker} title={wishes.title} />
      </motion.div>

      <div className="relative mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-7">
        {wishes.items.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: (i % 3) * 0.12,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={{ y: -8, rotate: i % 2 === 0 ? -1 : 1 }}
            className="group relative overflow-hidden rounded-2xl border border-gold/10 bg-white/[0.05] p-6 text-left backdrop-blur-md transition-[box-shadow,border-color] duration-300 hover:border-gold/35 hover:shadow-[0_18px_55px_rgba(255,143,191,0.22)]"
          >
            <span
              className="font-display pointer-events-none absolute -top-2 right-3 text-5xl text-gold/[0.08] select-none"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-soft/25 via-white/5 to-gold/20 text-3xl shadow-[0_0_24px_rgba(255,143,191,0.2)] ring-1 ring-gold/25">
              <span
                className="animate-float inline-block"
                style={{ animationDelay: `${i * 0.4}s` }}
                aria-hidden="true"
              >
                {w.icon}
              </span>
            </span>

            <h3 className="font-bangla mt-4 text-lg font-semibold text-gold-soft">
              {w.title}
            </h3>
            <p className="font-bangla mt-1 text-sm leading-relaxed text-blush/75">
              {w.text}
            </p>

            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
