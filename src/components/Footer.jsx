import { motion } from 'framer-motion'
import { footer, person } from '../data/content'
import { Ornament } from './SectionHeading'

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 py-16 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-script text-gold-shine text-5xl md:text-6xl"
      >
        {footer.wish}
      </motion.h2>

      <Ornament className="mt-5" />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="font-bangla mt-6 text-sm text-blush/70"
      >
        {footer.made}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45 }}
        className="mt-7 flex items-center justify-center gap-4"
      >
        <span className="h-px w-10 bg-gold/35 md:w-16" />
        <span
          className="flex h-9 w-9 rotate-[-8deg] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#c0146a,#7a1149_62%,#4a0a2c)] shadow-[0_6px_16px_rgba(0,0,0,0.35),inset_0_2px_3px_rgba(255,255,255,0.2)] ring-1 ring-rose-soft/25"
          aria-hidden="true"
        >
          <span className="font-script text-sm text-gold-soft">
            {person.petName.charAt(0)}
          </span>
        </span>
        <span className="font-display text-[10px] tracking-[0.35em] text-blush/65 uppercase">
          {footer.date}
        </span>
        <span className="hidden h-px w-10 bg-gold/35 md:block md:w-16" />
      </motion.div>
    </footer>
  )
}
