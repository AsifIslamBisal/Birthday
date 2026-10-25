import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { music } from '../data/content'

const UNLOCK_EVENTS = [
  'pointerdown',
  'pointerup',
  'mousedown',
  'touchstart',
  'touchend',
  'click',
  'keydown',
  'scroll',
]

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const unlockedRef = useRef(false)

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(music.src)
      audio.loop = true
      audio.volume = 0.45
      audio.preload = 'auto'
      audio.addEventListener('play', () => {
        if (!audio.muted) setPlaying(true)
      })
      audio.addEventListener('pause', () => setPlaying(false))
      audio.addEventListener('ended', () => setPlaying(false))
      audio.addEventListener('error', () => {
        if (audio.src && !audio.src.endsWith('/birthday-song.mp3')) {
          const wasPlaying = !audio.paused
          audio.src = '/music/birthday-song.mp3'
          audio.load()
          if (wasPlaying || unlockedRef.current) audio.play().catch(() => {})
        }
      })
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  useEffect(() => {
    const audio = ensureAudio()

    // Browsers block sound-on-load. If unmuted autoplay is refused,
    // start MUTED (allowed everywhere) so the song is already running,
    // then unmute on the very first user action anywhere on the page.
    audio.play().catch(() => {
      audio.muted = true
      audio.play().catch(() => {})
    })

    const unlock = () => {
      if (unlockedRef.current || !audioRef.current) return
      const a = audioRef.current
      if (a.paused && a.muted) {
        a.muted = false
        a.play()
          .then(() => {
            unlockedRef.current = true
            setPlaying(true)
          })
          .catch(() => {})
      } else if (a.paused) {
        a.play()
          .then(() => {
            unlockedRef.current = true
            setPlaying(true)
          })
          .catch(() => {})
      } else {
        a.muted = false
        unlockedRef.current = true
        setPlaying(true)
      }
    }

    UNLOCK_EVENTS.forEach((e) =>
      document.addEventListener(e, unlock, { capture: true, passive: true }),
    )

    const retry = setInterval(() => {
      if (!unlockedRef.current && audioRef.current) {
        const a = audioRef.current
        if (a.muted) {
          a.muted = false
          a.play()
            .then(() => {
              unlockedRef.current = true
              setPlaying(true)
            })
            .catch(() => {
              a.muted = true
            })
        }
      }
    }, 1500)

    return () => {
      UNLOCK_EVENTS.forEach((e) =>
        document.removeEventListener(e, unlock, { capture: true }),
      )
      clearInterval(retry)
      unlockedRef.current = false
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      audioRef.current = null
    }
  }, [ensureAudio])

  // The intro gate click is the clearest "start the experience" signal.
  useEffect(() => {
    const start = () => {
      const audio = ensureAudio()
      audio.muted = false
      audio
        .play()
        .then(() => {
          unlockedRef.current = true
          setPlaying(true)
        })
        .catch(() => {})
    }

    window.addEventListener('birthday:start', start)
    return () => window.removeEventListener('birthday:start', start)
  }, [ensureAudio])

  const toggle = () => {
    const audio = ensureAudio()
    if (audio.paused) {
      audio.muted = false
      audio
        .play()
        .then(() => {
          unlockedRef.current = true
          setPlaying(true)
        })
        .catch(() => {})
    } else {
      audio.pause()
      audio.muted = true
    }
  }

  return (
    <>
      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ delay: 0.6 }}
            className="fixed right-5 bottom-24 z-50 text-right"
          >
            <div className="glass font-bangla inline-block rounded-full px-4 py-2 text-sm text-gold-soft shadow-lg">
              ♪ tap koro — gan suru hobe
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="group fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-soft to-gold shadow-[0_8px_30px_rgba(255,143,191,0.5)]"
        aria-label={playing ? 'Pause music' : 'Play music'}
        aria-pressed={playing}
      >
        {/* hover / focus label */}
        <span className="glass pointer-events-none absolute right-[4.5rem] top-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-[11px] whitespace-nowrap text-gold-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          ♪ {music.title} · {playing ? 'pause' : 'play'}
        </span>

        {!playing && (
          <>
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/40" />
            <span className="absolute inset-0 -z-10 rounded-full border-2 border-gold/50" />
          </>
        )}
        {playing ? (
          <div className="flex h-6 items-end gap-[3px]" aria-hidden="true">
            <span
              className="animate-equalize h-6 w-[3px] origin-bottom rounded-full bg-[#3a0620]"
              style={{ animationDelay: '0s' }}
            />
            <span
              className="animate-equalize h-6 w-[3px] origin-bottom rounded-full bg-[#3a0620]"
              style={{ animationDelay: '0.18s', animationDuration: '0.75s' }}
            />
            <span
              className="animate-equalize h-6 w-[3px] origin-bottom rounded-full bg-[#3a0620]"
              style={{ animationDelay: '0.34s', animationDuration: '1s' }}
            />
            <span
              className="animate-equalize h-6 w-[3px] origin-bottom rounded-full bg-[#3a0620]"
              style={{ animationDelay: '0.52s', animationDuration: '0.8s' }}
            />
          </div>
        ) : (
          <span className="text-2xl text-[#3a0620]">🎵</span>
        )}
      </motion.button>
    </>
  )
}
