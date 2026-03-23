import { differenceInCalendarDays, startOfDay, endOfWeek } from 'date-fns'

/** Parse a YYYY-MM-DD date string as local midnight. Returns null if empty or invalid. */
export function parseLocalDate(dateStr: string): Date | null {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  if (isNaN(d.getTime())) return null
  return d
}

/** Return today at local midnight. */
export function today(): Date {
  return startOfDay(new Date())
}

/**
 * Calendar days from today until dueDate.
 * Negative = overdue. Returns null if no due date.
 */
export function daysUntilDue(dateStr: string): number | null {
  const due = parseLocalDate(dateStr)
  if (!due) return null
  return differenceInCalendarDays(due, today())
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
export function isDueSoon(
  dateStr: string,
  status: string,
  threshold = 3,
): boolean {
  if (status === 'Completed') return false
  const days = daysUntilDue(dateStr)
  if (days === null) return false
  return days >= 0 && days <= threshold
}

/**
 * True if due from today (inclusive) to the end of the current week (Sunday).
 * Excludes completed and overdue assignments.
 */
export function isDueThisWeek(dateStr: string, status: string): boolean {
  if (status === 'Completed') return false
  const due = parseLocalDate(dateStr)
  if (!due) return false
  const t = today()
  const weekEnd = endOfWeek(t, { weekStartsOn: 1 })
  return due >= t && due <= weekEnd
}
