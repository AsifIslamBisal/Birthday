export function Ornament({ className = '' }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60 md:w-16" />
      <span className="relative flex h-3 w-3 items-center justify-center">
        <span className="absolute inset-0 rotate-45 rounded-[2px] bg-gold/25 blur-[3px]" />
        <span className="text-[9px] leading-none text-gold">◆</span>
      </span>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60 md:w-16" />
    </div>
  )
}

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  className = '',
}) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {kicker && (
        <p className="text-[10px] uppercase tracking-[0.38em] text-gold/70 md:text-[11px]">
          <span className="mr-2 text-gold">✦</span>
          {kicker}
          <span className="ml-2 text-gold">✦</span>
        </p>
      )}
      <h2 className="font-display mt-3 text-balance text-4xl text-gold-soft md:text-5xl">
        {title}
      </h2>
      <Ornament className="mt-4" />
      {subtitle && (
        <p className="font-bangla mt-4 text-balance text-base leading-relaxed text-blush/75 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
