import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import ThemeIcon from '../ThemeIcon'
import {
  WEEKDAYS,
  formatDisplayDate,
  getDaysInMonth,
  getFirstDayOfWeek,
  toDateString,
} from './datePickerUtils'
import type { IconFamily } from '../../../types/icon'

interface CustomDatePickerProps {
  value: string
  onChange: (value: string) => void
  id?: string
  iconFamily?: IconFamily
}

export default function CustomDatePicker({
  value,
  onChange,
  id,
  iconFamily = 'phosphor',
}: CustomDatePickerProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [menuPos, setMenuPos] = useState<{
    top: number
    left: number
    width: number
    dropUp: boolean
  }>({ top: 0, left: 0, width: 0, dropUp: false })

  const today = new Date()
  const parsed = value ? value.split('-').map(Number) : null
  const [viewYear, setViewYear] = useState(
    parsed ? parsed[0] : today.getFullYear(),
  )
  const [viewMonth, setViewMonth] = useState(
    parsed ? parsed[1] - 1 : today.getMonth(),
  )

  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')
  const duration = motionEnabled ? (reduced ? 0.08 : 0.15) : 0

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const popoverHeight = 300
    const spaceBelow = window.innerHeight - rect.bottom
    const dropUp = spaceBelow < popoverHeight && rect.top > spaceBelow
    setMenuPos({
      top: dropUp ? rect.top - popoverHeight : rect.bottom + 4,
      left: rect.left,
      width: Math.max(rect.width, 260),
      dropUp,
    })
  }, [])

  useEffect(() => {
    if (open) {
      updatePosition()
      if (value) {
        const [y, m] = value.split('-').map(Number)
        setViewYear(y)
        setViewMonth(m - 1)
      }
    }
  }, [open, value, updatePosition])

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1)
      setViewMonth(11)
    } else setViewMonth(viewMonth - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1)
      setViewMonth(0)
    } else setViewMonth(viewMonth + 1)
  }

  function selectDay(day: number) {
    onChange(toDateString(viewYear, viewMonth, day))
    setOpen(false)
    triggerRef.current?.focus()
  }

  function selectToday() {
    const now = new Date()
    onChange(toDateString(now.getFullYear(), now.getMonth(), now.getDate()))
    setOpen(false)
    triggerRef.current?.focus()
  }

  function clearDate() {
    onChange('')
    setOpen(false)
    triggerRef.current?.focus()
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth)
  const todayStr = toDateString(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  )
  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString('en-AU', {
    month: 'long',
    year: 'numeric',
  })

  const popover = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={popoverRef}
          className="datepicker-popover"
          style={{
            position: 'fixed',
            top: menuPos.top,
            left: menuPos.left,
            width: menuPos.width,
            zIndex: 1002,
          }}
          initial={{
            opacity: 0,
            y: motionEnabled ? (menuPos.dropUp ? 4 : -4) : 0,
          }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: motionEnabled ? (menuPos.dropUp ? 4 : -4) : 0,
          }}
          transition={{ duration }}
        >
          <div className="datepicker-header">
            <button
              type="button"
              className="datepicker-nav-btn"
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
            <span className="datepicker-month-label">{monthLabel}</span>
            <button
              type="button"
              className="datepicker-nav-btn"
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
          <div className="datepicker-weekdays">
            {WEEKDAYS.map((d) => (
              <span key={d} className="datepicker-weekday">
                {d}
              </span>
            ))}
          </div>
          <div className="datepicker-days">
            {Array.from({ length: firstDay }, (_, i) => (
              <span
                key={`empty-${i}`}
                className="datepicker-day datepicker-day--empty"
              />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const dateStr = toDateString(viewYear, viewMonth, day)
              const isSelected = dateStr === value
              const isToday = dateStr === todayStr
              return (
                <button
                  key={day}
                  type="button"
                  className={`datepicker-day${isSelected ? ' datepicker-day--selected' : ''}${isToday ? ' datepicker-day--today' : ''}`}
                  onClick={() => selectDay(day)}
                >
                  {day}
                </button>
              )
            })}
          </div>
          <div className="datepicker-footer">
            <button
              type="button"
              className="btn btn-secondary btn-xs"
              onClick={selectToday}
            >
              Today
            </button>
            {value && (
              <button
                type="button"
                className="btn btn-secondary btn-xs"
                onClick={clearDate}
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="custom-datepicker">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className="custom-datepicker-trigger form-control"
        onClick={() => setOpen(!open)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <ThemeIcon name="calendar" family={iconFamily} size={14} />
        <span className="custom-datepicker-value">
          {formatDisplayDate(value)}
        </span>
        <ThemeIcon
          name="caret-down"
          family={iconFamily}
          size={12}
          className={`custom-datepicker-chevron${open ? ' custom-datepicker-chevron--open' : ''}`}
        />
      </button>
      {createPortal(popover, document.body)}
    </div>
  )
}
