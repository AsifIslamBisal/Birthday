export default function GlowBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* slow aurora blobs — palette only */}
      <div className="animate-aurora absolute -top-[18%] -left-[12%] h-[55vh] w-[55vh] rounded-full bg-rose-soft/15 blur-[110px]" />
      <div className="animate-aurora-slow absolute top-[28%] -right-[10%] h-[50vh] w-[50vh] rounded-full bg-gold/10 blur-[120px]" />
      <div
        className="animate-aurora absolute bottom-[-18%] left-[28%] h-[60vh] w-[60vh] rounded-full bg-rose-deep/40 blur-[130px]"
        style={{ animationDelay: '-12s' }}
      />
      <div
        className="animate-aurora-slow absolute top-[55%] left-[6%] hidden h-[32vh] w-[32vh] rounded-full bg-blush/10 blur-[90px] sm:block"
        style={{ animationDelay: '-8s' }}
      />

      {/* soft vignette keeps the eye on the content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(12,4,15,0.5)_100%)]" />

      {/* film grain */}
      <div className="grain absolute inset-0 opacity-[0.045] mix-blend-soft-light" />
    </div>
  )
}
