import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import PhotoVisual from './PhotoVisual'

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${direction === 'left' ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  )
}

export default function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const closeRef = useRef(null)
  const photo = photos[index]

  useEffect(() => {
    closeRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${photo.caption}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-night/85 p-3 backdrop-blur-md md:p-8"
    >
      <motion.div
        initial={{ scale: 0.93, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 170, damping: 22 }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo"
          className="glass absolute -top-3 -right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full text-xl text-gold-soft transition-transform hover:scale-110 md:-top-4 md:-right-4"
        >
          ×
        </button>

        <div className="overflow-hidden rounded-2xl border border-gold/25 bg-night-2 p-1.5 shadow-[0_40px_120px_rgba(0,0,0,0.65)] md:p-2.5">
          <PhotoVisual
            key={photo.src}
            photo={photo}
            index={index}
            eager
            fit="contain"
            className="rounded-xl"
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 px-1">
          <p className="font-bangla text-sm text-blush/90 md:text-base">
            {photo.caption}
          </p>
          <span className="font-display shrink-0 text-sm text-blush/60">
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(photos.length).padStart(2, '0')}
          </span>
        </div>

        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous photo"
          className="glass absolute top-[42%] left-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-gold-soft shadow-lg transition-transform hover:scale-110"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next photo"
          className="glass absolute top-[42%] right-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-gold-soft shadow-lg transition-transform hover:scale-110"
        >
          <ArrowIcon />
        </button>
      </motion.div>
    </motion.div>
  )
}
