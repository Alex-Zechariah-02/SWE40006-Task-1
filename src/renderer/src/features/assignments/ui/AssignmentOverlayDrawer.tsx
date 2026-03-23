import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface AssignmentOverlayDrawerProps {
  open: boolean
  onClose: () => void
  overlayBlur?: string
  children: ReactNode
}

export default function AssignmentOverlayDrawer({
  open,
  onClose,
  overlayBlur,
  children,
}: AssignmentOverlayDrawerProps) {
  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')

  // Scroll-lock when overlay drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: motionEnabled ? (reduced ? 0.1 : 0.2) : 0,
            }}
            onClick={onClose}
            aria-hidden="true"
            style={
              overlayBlur
                ? { backdropFilter: `blur(${overlayBlur})` }
                : undefined
            }
          />
          <motion.div
            className="detail-panel--overlay"
            initial={{
              x: motionEnabled ? (reduced ? '50%' : '100%') : 0,
              opacity: motionEnabled ? 0 : 1,
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: motionEnabled ? (reduced ? '50%' : '100%') : 0,
              opacity: motionEnabled ? 0 : 1,
            }}
            transition={{
              duration: motionEnabled ? (reduced ? 0.14 : 0.24) : 0,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
