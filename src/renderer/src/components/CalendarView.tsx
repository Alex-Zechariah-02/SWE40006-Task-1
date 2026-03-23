import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import ThemeIcon from './ThemeIcon'
import type { Assignment } from '../types/assignment'
import { getCalendarDays, formatDate } from '../services/date'
import { format, isSameMonth, isSameDay, startOfDay } from 'date-fns'

interface CalendarViewProps {
  assignments: Assignment[]
  onSelect: (assignment: Assignment) => void
  iconFamily?: 'phosphor' | 'tabler'
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function CalendarView({
  assignments,
  onSelect,
  iconFamily = 'phosphor',
}: CalendarViewProps) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())

  const days = getCalendarDays(year, month)
  const todayDate = startOfDay(new Date())
  const currentMonth = new Date(year, month)

  function prevMonth() {
    if (month === 0) {
      setYear(year - 1)
      setMonth(11)
    } else {
      setMonth(month - 1)
    }
  }

  function nextMonth() {
    if (month === 11) {
      setYear(year + 1)
      setMonth(0)
    } else {
      setMonth(month + 1)
    }
  }

  function goToday() {
    const now = new Date()
    setYear(now.getFullYear())
    setMonth(now.getMonth())
  }

  // Group assignments by due date
  const assignmentsByDate = new Map<string, Assignment[]>()
  for (const a of assignments) {
    if (a.dueDate) {
      const key = a.dueDate
      const existing = assignmentsByDate.get(key) ?? []
      existing.push(a)
      assignmentsByDate.set(key, existing)
    }
  }

  const hasAnyDueDates = assignments.some((a) => a.dueDate)

  // Check if any assignments have due dates in the currently displayed month
  const hasAssignmentsThisMonth = assignments.some((a) => {
    if (!a.dueDate) return false
    const d = new Date(a.dueDate)
    return d.getFullYear() === year && d.getMonth() === month
  })

  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <div className="calendar-nav-row">
          <button
            className="btn btn-secondary btn-sm"
            onClick={prevMonth}
            aria-label="Previous month"
          >
            <ThemeIcon
              name="caret-left"
              family={iconFamily}
              size={14}
              weight="bold"
            />
          </button>
          <span className="calendar-month-label">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={nextMonth}
            aria-label="Next month"
          >
            <ThemeIcon
              name="caret-right"
              family={iconFamily}
              size={14}
              weight="bold"
            />
          </button>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={goToday}>
          Today
        </button>
      </div>

      {!hasAnyDueDates && (
        <div className="calendar-empty">
          <p className="calendar-empty-title">No assignments with due dates</p>
          <p className="calendar-empty-desc">
            Add due dates to your assignments to see them on the calendar.
          </p>
        </div>
      )}

      {hasAnyDueDates && !hasAssignmentsThisMonth && (
        <div className="calendar-empty">
          <p className="calendar-empty-title">No assignments due this month</p>
          <p className="calendar-empty-desc">
            Navigate to another month or add assignments with due dates in{' '}
            {format(currentMonth, 'MMMM yyyy')}.
          </p>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${year}-${month}`}
          className="calendar-grid"
          initial={{ opacity: motionEnabled ? 0 : 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: motionEnabled ? 0 : 1 }}
          transition={{ duration: motionEnabled ? (reduced ? 0.06 : 0.1) : 0 }}
        >
          {WEEKDAYS.map((day) => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}

          {days.map((day, i) => {
            const dateKey = format(day, 'yyyy-MM-dd')
            const dayAssignments = assignmentsByDate.get(dateKey) ?? []
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isToday = isSameDay(day, todayDate)

            return (
              <div
                key={i}
                className={
                  'calendar-day' +
                  (isCurrentMonth ? '' : ' calendar-day--other') +
                  (isToday ? ' calendar-day--today' : '')
                }
              >
                <span className="calendar-day-number">{day.getDate()}</span>
                <div className="calendar-day-assignments">
                  {dayAssignments.slice(0, 3).map((a) => (
                    <button
                      key={a.id}
                      className={`calendar-assignment status-bg-${a.status.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => onSelect(a)}
                      title={`${a.title} - ${formatDate(a.dueDate)}`}
                    >
                      {a.title}
                    </button>
                  ))}
                  {dayAssignments.length > 3 && (
                    <span className="calendar-more">
                      +{dayAssignments.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
