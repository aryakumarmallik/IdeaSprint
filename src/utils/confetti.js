import confetti from 'canvas-confetti';

export function triggerConfetti() {
  try {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0']
    });
  } catch {
    // Graceful fallback
  }
}
