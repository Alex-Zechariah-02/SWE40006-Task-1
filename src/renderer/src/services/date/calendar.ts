import { eachDayOfInterval, endOfMonth, getDay, startOfMonth } from 'date-fns'

/** Get the days of a calendar month grid (including padding days from prev/next months). */
export function getCalendarDays(year: number, month: number): Date[] {
  const start = startOfMonth(new Date(year, month))
  const end = endOfMonth(start)
  const days = eachDayOfInterval({ start, end })

  // Pad start to Monday (weekStartsOn: 1)
  const startDay = getDay(start)
  const padBefore = startDay === 0 ? 6 : startDay - 1
  const paddedStart: Date[] = []
  for (let i = padBefore; i > 0; i--) {
    const d = new Date(start)
    d.setDate(d.getDate() - i)
    paddedStart.push(d)
  }

  // Pad end to fill the last week
  const lastDay = getDay(end)
  const padAfter = lastDay === 0 ? 0 : 7 - lastDay
  const paddedEnd: Date[] = []
  for (let i = 1; i <= padAfter; i++) {
    const d = new Date(end)
    d.setDate(d.getDate() + i)
    paddedEnd.push(d)
  }

  return [...paddedStart, ...days, ...paddedEnd]
}
