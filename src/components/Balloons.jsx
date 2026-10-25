import { motion, useReducedMotion } from 'framer-motion'

const BALLOONS = [
  { color: '#ff8fbf', duration: 26, delay: -6, left: 5, size: 70 },
  { color: '#f5c542', duration: 30, delay: -14, left: 86, size: 82 },
  { color: '#ffd6e8', duration: 24, delay: -18, left: 18, size: 58 },
  { color: '#ffe9a8', duration: 27, delay: -22, left: 74, size: 64 },
  { color: '#ff9d9d', duration: 32, delay: -8, left: 33, size: 50 },
  { color: '#f7b5ff', duration: 28, delay: -16, left: 92, size: 58 },
  { color: '#ff8fbf', duration: 34, delay: -24, left: 58, size: 46 },
  { color: '#ffe9a8', duration: 29, delay: -2, left: 12, size: 54 },
]

const STATIC = [
  { color: '#ff8fbf', left: '8%', top: '16%', size: 64, opacity: 0.3 },
  { color: '#f5c542', left: '80%', top: '26%', size: 72, opacity: 0.26 },
  { color: '#ffd6e8', left: '68%', top: '68%', size: 56, opacity: 0.22 },
]

function BalloonSvg({ color, size, i = 0 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 120 170">
      <ellipse
        cx="60"
        cy="48"
        rx="44"
        ry="52"
        fill={color}
        style={{ filter: `drop-shadow(0 0 10px ${color}66)` }}
      />
      <path
        d="M 60 100 Q 52 122 60 140 Q 68 122 60 100 Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d={`M 60 138 Q ${
          i % 2 === 0 ? 52 : 68
        } ${i % 2 === 0 ? 185 : 160} 60 230 Q ${
          i % 2 === 0 ? 70 : 54
        } 260 60 300`}
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
      />
      <ellipse
        cx="47"
        cy="42"
        rx="10"
        ry="16"
        fill="rgba(255,255,255,0.5)"
        transform="rotate(-28 47 42)"
      />
    </svg>
  )
}

function BalloonBody({ b, i }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.6}
      whileDrag={{ scale: 1.1 }}
      whileHover={{ scale: 1.05 }}
      className="pointer-events-auto inline-block cursor-grab touch-none"
    >
      <BalloonSvg color={b.color} size={b.size} i={i} />
    </motion.div>
  )
}

export default function Balloons() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {reduceMotion
        ? STATIC.map((b, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: b.left, top: b.top, opacity: b.opacity }}
            >
              <BalloonSvg color={b.color} size={b.size} i={i} />
            </div>
          ))
        : BALLOONS.map((b, i) => (
            <div
              key={i}
              className={`absolute top-0 ${i > 3 ? 'hidden md:block' : ''}`}
              style={{
                left: `${b.left}%`,
                animation: `balloon-rise ${b.duration}s linear ${b.delay}s infinite`,
              }}
            >
              <div
                className="animate-sway"
                style={{
                  animationDuration: `${4 + (i % 4)}s`,
                  animationDelay: `${i * 0.35}s`,
                }}
              >
                <BalloonBody b={b} i={i} />
              </div>
            </div>
          ))}
    </div>
  )
}
