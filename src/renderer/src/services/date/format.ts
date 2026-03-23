import { format } from 'date-fns'
import { parseLocalDate } from './due'

/** Format a YYYY-MM-DD date string for display. Returns em-dash if empty. */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '\u2014'
  const d = parseLocalDate(dateStr)
  if (!d) return '\u2014'
  return format(d, 'd MMM yyyy')
}

/** Format a timestamp for history display. */
export function formatTimestamp(isoStr: string): string {
  try {
    const d = new Date(isoStr)
    if (isNaN(d.getTime())) return isoStr
    return format(d, 'd MMM yyyy, h:mm a')
  } catch {
    return isoStr
  }
}
