import { useState } from 'react'

const EMOJIS = ['💛', '🦋', '🌷', '☕', '🌧️', '💫']

export function PlaceholderArt({ index, caption, className = '' }) {
  return (
    <div
      role="img"
      aria-label={caption || 'A little moment'}
      className={`relative overflow-hidden bg-gradient-to-br from-rose-soft/30 via-night-2 to-gold/20 ${className}`}
    >
      <div className="absolute -top-8 -left-8 h-28 w-28 rounded-full bg-blush/25 blur-2xl" />
      <div className="absolute -right-6 -bottom-10 h-32 w-32 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,214,232,0.32),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(245,197,66,0.22),transparent_55%)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="animate-sheen absolute -top-1/2 left-[-40%] h-[220%] w-1/3 bg-white/10 blur-md" />
      </div>

      <span
        className="animate-float absolute inset-0 flex items-center justify-center text-5xl drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:text-6xl"
        style={{ animationDelay: `${(index % 6) * 0.35}s` }}
        aria-hidden="true"
      >
        {EMOJIS[index % EMOJIS.length]}
      </span>
    </div>
  )
}

export default function PhotoVisual({
  photo,
  index,
  className = '',
  eager = false,
  fit = 'cover',
}) {
  const [broken, setBroken] = useState(false)

  if (broken) {
    return (
      <PlaceholderArt
        index={index}
        caption={photo.caption}
        className={`aspect-square ${className}`}
      />
    )
  }

  const fitClass =
    fit === 'contain'
      ? 'max-h-[72vh] w-full object-contain'
      : fit === 'natural'
        ? 'h-auto w-full object-cover'
        : 'h-full w-full object-cover'

  return (
    <img
      src={photo.src}
      alt={photo.caption}
      width={photo.w}
      height={photo.h}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setBroken(true)}
      className={`${fitClass} ${className}`}
    />
  )
}
