// ANDROID HAPTIC FEEDBACK (RULES.md Rule 8.1)
export function triggerAndroidHaptics(pattern: number[] = [80, 40, 80]) {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // safe fallback if blocked
    }
  }
}

// Convenient alias for thumb-zone nav and interactions
export const vibrateDevice = triggerAndroidHaptics;
