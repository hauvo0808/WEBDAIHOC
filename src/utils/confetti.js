import confetti from 'canvas-confetti'

const BRAND_COLORS = ['#f97316', '#ea580c', '#ca8a04', '#ffffff']

/**
 * Bắn pháo giấy ăn mừng khi thí sinh có ít nhất một nguyện vọng "Chắc chắn đậu".
 * Bắn hai đợt từ hai góc màn hình để tạo cảm giác "vinh quy bái tổ".
 */
export function fireSuccessConfetti() {
  const duration = 1100
  const end = Date.now() + duration

  ;(function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors: BRAND_COLORS,
      startVelocity: 45,
      scalar: 0.9,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors: BRAND_COLORS,
      startVelocity: 45,
      scalar: 0.9,
    })

    if (Date.now() < end) requestAnimationFrame(frame)
  })()

  confetti({
    particleCount: 90,
    spread: 100,
    startVelocity: 38,
    origin: { x: 0.5, y: 0.3 },
    colors: BRAND_COLORS,
    scalar: 1.05,
  })
}
