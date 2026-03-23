/** Numeric sort weight for priority — lower = more urgent. */
const PRIORITY_WEIGHT: Record<string, number> = {
  Urgent: 0,
  High: 1,
  Medium: 2,
  Low: 3,
}

export function priorityWeight(priority: string): number {
  return PRIORITY_WEIGHT[priority] ?? 4
}
