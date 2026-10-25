import confetti from 'canvas-confetti'

const romanticColors = ['#ff8fbf', '#f5c542', '#ffe9a8', '#ffd6e8', '#ffffff']

export function burst(origin = { x: 0.5, y: 0.5 }) {
  confetti({
    particleCount: 140,
    spread: 90,
    startVelocity: 45,
    origin,
    colors: romanticColors,
    scalar: 1.05,
  })
}

export function heartBurst(origin = { x: 0.5, y: 0.5 }) {
  const heart = confetti.shapeFromText({ text: '💖', scalar: 2 })
  confetti({
    particleCount: 40,
    spread: 100,
    startVelocity: 40,
    origin,
    scalar: 2,
    shapes: [heart],
    flat: true,
  })
}

export function celebrate(duration = 4000) {
  const end = Date.now() + duration
  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      colors: romanticColors,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      colors: romanticColors,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}

export function sideCannons() {
  burst({ x: 0.15, y: 0.7 })
  burst({ x: 0.85, y: 0.7 })
}
