export const memoryCycles = [1, 2, 4, 7, 15, 30, 60, 90];

export function getNextReviewDate(reviewCount: number): string {
  const today = new Date();
  const nextDays = memoryCycles[Math.min(reviewCount, memoryCycles.length - 1)];
  today.setDate(today.getDate() + nextDays);
  return today.toISOString().split('T')[0];
}

export function getTodayDate(): string {
  const today = new Date();
  today.setDate(today.getDate());
  return today.toISOString().split('T')[0];
}
