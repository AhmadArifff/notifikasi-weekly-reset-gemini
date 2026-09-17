export function calculateInitialWeeklySeconds(): number {
  const now = new Date();
  const currentDay = now.getUTCDay(); // 0 = Sun, 1 = Mon ...
  let daysUntilMonday = (1 - currentDay + 7) % 7;
  if (daysUntilMonday === 0) {
    if (now.getUTCHours() >= 7) daysUntilMonday = 7;
  }
  const nextMon = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + daysUntilMonday, 7, 0, 0));
  return Math.max(0, Math.floor((nextMon.getTime() - now.getTime()) / 1000));
}

export function formatSecondsToTime(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export function getWeeklyCycleProgress(remainingSeconds: number): number {
  const totalWeekSec = 7 * 86400;
  const elapsedSec = totalWeekSec - remainingSeconds;
  return Math.min(100, Math.max(0, Math.round((elapsedSec / totalWeekSec) * 100)));
}
