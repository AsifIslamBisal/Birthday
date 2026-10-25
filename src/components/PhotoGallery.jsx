import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gallery } from '../data/content'
import Lightbox from './Lightbox'
import PhotoVisual from './PhotoVisual'
import SectionHeading from './SectionHeading'

const TILTS = [
  '-rotate-2',
  'rotate-1',
  'rotate-2',
  '-rotate-1',
  'rotate-3',
  '-rotate-2',
  'rotate-1',
  '-rotate-1',
]

function PhotoCard({ photo, index, featured, onOpen }) {
  const tilt = TILTS[index % TILTS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: (index % 3) * 0.08, type: 'spring', stiffness: 90 }}
      whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
      className={`group relative mb-5 break-inside-avoid md:mb-7 ${tilt}`}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`View photo: ${photo.caption}`}
        className="relative block w-full cursor-zoom-in rounded-lg bg-gradient-to-br from-[#fffdf6] to-[#f4e6cf] p-2.5 pb-5 text-left shadow-[0_16px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/40 transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      >
        <span
          className="absolute -top-2.5 -left-2 h-6 w-16 -rotate-45 bg-blush/45 shadow-sm backdrop-blur-[1px]"
          aria-hidden="true"
        />
        <span
          className="absolute -top-2.5 -right-2 h-6 w-16 rotate-45 bg-gold-soft/40 shadow-sm backdrop-blur-[1px]"
          aria-hidden="true"
        />

        <div className="relative overflow-hidden rounded-md border border-rose-deep/10">
          <PhotoVisual
            photo={photo}
            index={index}
            className={`w-full transition-transform duration-700 group-hover:scale-[1.04] ${
              featured ? 'aspect-[4/5]' : 'aspect-square'
            }`}
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <p className="font-bangla mt-3 text-center text-sm text-rose-deep">
          {photo.caption}
        </p>
      </button>
    </motion.div>
  )
}

export default function PhotoGallery() {
  const [active, setActive] = useState(null)

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () =>
      setActive(
        (i) => (i - 1 + gallery.photos.length) % gallery.photos.length,
      ),
    [],
  )
  const next = useCallback(
    () => setActive((i) => (i + 1) % gallery.photos.length),
    [],
  )

  return (
    <section className="relative z-10 mx-auto max-w-6xl overflow-hidden px-4 py-20 text-center md:py-28">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,143,191,0.1),rgba(245,197,66,0.06)_45%,transparent_70%)] blur-3xl"
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
          kicker={gallery.kicker}
          title={gallery.title}
          subtitle={gallery.subtitle}
        />
      </motion.div>

      <div className="relative mt-12 columns-2 gap-4 md:columns-3 md:gap-7">
        {gallery.photos.map((photo, i) => (
          <PhotoCard
            key={photo.src + i}
            photo={photo}
            index={i}
            featured={i === 0}
            onOpen={setActive}
          />
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <Lightbox
            photos={gallery.photos}
            index={active}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
