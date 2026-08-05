import { DailyCheckIn } from './api';

export function dateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function computeStreak(checkins: DailyCheckIn[]): number {
  const checkedDates = new Set(checkins.map((c) => c.check_in_date));
  let streak = 0;
  const cursor = new Date();
  while (checkedDates.has(dateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
