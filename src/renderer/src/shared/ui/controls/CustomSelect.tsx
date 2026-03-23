import { useEffect, useRef, useState, useId } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import ThemeIcon from '../ThemeIcon'
import { useFloatingMenuPosition } from './useFloatingMenuPosition'
import type { IconFamily } from '../../../types/icon'
import type { SelectOption } from '../../types/select'

interface CustomSelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  description?: string
  disabled?: boolean
  className?: string
  id?: string
  'aria-label'?: string
  iconFamily?: IconFamily
}

export default function CustomSelect({
  label,
  value,
  onChange,
  options,
  description,
  disabled = false,
  className = '',
  id,
  'aria-label': ariaLabel,
  iconFamily = 'phosphor',
}: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const generatedId = useId()
  const selectId = id || generatedId
  const listboxId = `${selectId}-listbox`
  const { menuPos, updateMenuPosition } = useFloatingMenuPosition({
    triggerRef,
    optionsLength: options.length,
  })

  const selectedOption = options.find((o) => o.value === value)
  const selectedLabel = selectedOption?.label ?? value

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  useEffect(() => {
    if (open) {
      updateMenuPosition()
      const idx = options.findIndex((o) => o.value === value)
      setFocusedIndex(idx >= 0 ? idx : 0)
    }
  }, [open, options, value, updateMenuPosition])

  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (disabled) return
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        e.preventDefault()
        setOpen(true)
        break
      case 'ArrowUp':
        e.preventDefault()
        setOpen(true)
        break
    }
  }

  function handleListKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex((prev) => {
          let next = prev + 1
          while (next < options.length && options[next].disabled) next++
          return next < options.length ? next : prev
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex((prev) => {
          let next = prev - 1
          while (next >= 0 && options[next].disabled) next--
          return next >= 0 ? next : prev
        })
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (focusedIndex >= 0 && !options[focusedIndex]?.disabled) {
          onChange(options[focusedIndex].value)
          setOpen(false)
          triggerRef.current?.focus()
        }
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  function handleSelect(opt: SelectOption) {
    if (opt.disabled) return
    onChange(opt.value)
    setOpen(false)
    triggerRef.current?.focus()
  }

  useEffect(() => {
    if (open && listRef.current && focusedIndex >= 0) {
      const items = listRef.current.querySelectorAll('[role="option"]')
      const item = items[focusedIndex] as HTMLElement | undefined
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [focusedIndex, open])

  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')
  const menuMotion = motionEnabled
    ? {
        initial: { opacity: 0, y: reduced ? -2 : -4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: reduced ? -2 : -4 },
        transition: {
          duration: reduced ? 0.08 : 0.15,
          ease: [0.25, 1, 0.5, 1] as const,
        },
      }
    : {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }

  return (
    <div ref={containerRef} className={`custom-select ${className}`}>
      {label && (
        <label className="custom-select-label" htmlFor={selectId}>
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        id={selectId}
        type="button"
        className={`custom-select-trigger${open ? ' custom-select-trigger--open' : ''}${disabled ? ' custom-select-trigger--disabled' : ''}`}
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={
          open && focusedIndex >= 0
            ? `${selectId}-opt-${focusedIndex}`
            : undefined
        }
        aria-label={ariaLabel || label}
        aria-describedby={description ? `${selectId}-desc` : undefined}
        disabled={disabled}
      >
        <span className="custom-select-value">{selectedLabel}</span>
        <span
          className={`custom-select-chevron${open ? ' custom-select-chevron--open' : ''}`}
          aria-hidden="true"
        >
          <ThemeIcon name="caret-down" family={iconFamily} size={12} />
        </span>
      </button>
      {description && (
        <span id={`${selectId}-desc`} className="custom-select-desc">
          {description}
        </span>
      )}

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              className="custom-select-menu"
              style={{
                position: 'fixed',
                top: menuPos.top,
                left: menuPos.left,
                width: menuPos.width,
                maxHeight: 240,
              }}
              onKeyDown={handleListKeyDown}
              tabIndex={-1}
              {...menuMotion}
            >
              {options.map((opt, i) => (
                <li
                  key={opt.value}
                  id={`${selectId}-opt-${i}`}
                  role="option"
                  aria-selected={opt.value === value}
                  aria-disabled={opt.disabled || undefined}
                  className={
                    'custom-select-option' +
                    (opt.value === value
                      ? ' custom-select-option--selected'
                      : '') +
                    (i === focusedIndex
                      ? ' custom-select-option--focused'
                      : '') +
                    (opt.disabled ? ' custom-select-option--disabled' : '')
                  }
                  onClick={() => handleSelect(opt)}
                  onMouseEnter={() => !opt.disabled && setFocusedIndex(i)}
                >
                  {opt.label}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}
