import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { createPortal } from 'react-dom'
import type { NotificationPosition } from '../services/theme'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

/* ── Module-level event bus for toast dispatch ── */

type ToastListener = (message: string, type: Toast['type']) => void
const listeners = new Set<ToastListener>()

export const toast = {
  success: (message: string) =>
    listeners.forEach((fn) => fn(message, 'success')),
  error: (message: string) => listeners.forEach((fn) => fn(message, 'error')),
  info: (message: string) => listeners.forEach((fn) => fn(message, 'info')),
}

/* ── Component ── */

let nextId = 0

interface ToastContainerProps {
  position: NotificationPosition
}

export default function ToastContainer({ position }: ToastContainerProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: Toast['type']) => {
    const id = nextId++
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  useEffect(() => {
    listeners.add(addToast)
    return () => {
      listeners.delete(addToast)
    }
  }, [addToast])

  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')

  const slideX = position.includes('right')
    ? 30
    : position.includes('center')
      ? 0
      : -30
  const slideY = position.startsWith('top') ? -20 : 20

  return createPortal(
    <div
      className={`toast-container toast-position-${position}`}
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            className={`toast toast--${t.type}`}
            initial={
              motionEnabled ? { opacity: 0, x: slideX, y: slideY } : undefined
            }
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={motionEnabled ? { opacity: 0, x: slideX } : undefined}
            transition={{ duration: motionEnabled ? (reduced ? 0.1 : 0.2) : 0 }}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  )
}
