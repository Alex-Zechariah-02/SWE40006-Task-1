/**
 * Date utility service for Acadence.
 * All comparisons use today's date at local midnight.
 */

/** Parse a YYYY-MM-DD date string as local midnight. Returns null if empty or invalid. */
export function parseLocalDate(dateStr: string): Date | null {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  if (isNaN(d.getTime())) return null
  return d
}

/** Return today at local midnight. */
export function today(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Calendar days from today until dueDate.
 * Negative = overdue. Returns null if no due date.
 */
export function daysUntilDue(dateStr: string): number | null {
  const due = parseLocalDate(dateStr)
  if (!due) return null
  const t = today()
  return Math.round((due.getTime() - t.getTime()) / 86_400_000)
}

/** True if the assignment is past due and not completed. */
export function isOverdue(dateStr: string, status: string): boolean {
  if (status === 'Completed') return false
  const days = daysUntilDue(dateStr)
  if (days === null) return false
  return days < 0
}

/**
 * True if due within the next `threshold` calendar days (inclusive of today).
 * Excludes overdue and completed.
 */
export function isDueSoon(dateStr: string, status: string, threshold = 3): boolean {
  if (status === 'Completed') return false
  const days = daysUntilDue(dateStr)
  if (days === null) return false
  return days >= 0 && days <= threshold
}

/**
 * True if due from today (inclusive) to the end of the current week (Sunday).
 * Excludes completed and overdue assignments — no overlap with isOverdue.
 */
export function isDueThisWeek(dateStr: string, status: string): boolean {
  if (status === 'Completed') return false
  const due = parseLocalDate(dateStr)
  if (!due) return false
  const t = today()
  const dayOfWeek = t.getDay() // 0 = Sunday
  const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
  const weekEnd = new Date(t)
  weekEnd.setDate(t.getDate() + daysToSunday)
  return due >= t && due <= weekEnd
}

/** Format a YYYY-MM-DD date string for display. Returns em-dash if empty. */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '\u2014'
  const d = parseLocalDate(dateStr)
  if (!d) return '\u2014'
  return d.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

/** Numeric sort weight for priority — lower = more urgent. */
const PRIORITY_WEIGHT: Record<string, number> = {
  Urgent: 0,
  High: 1,
  Medium: 2,
  Low: 3
}

export function priorityWeight(priority: string): number {
  return PRIORITY_WEIGHT[priority] ?? 4
}
