import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import ThemeIcon from './ThemeIcon'
import type { UpdateEntry } from '../types/update'

interface UpdateLogPanelProps {
  entries: UpdateEntry[]
  iconFamily?: 'phosphor' | 'tabler'
}

export default function UpdateLogPanel({
  entries,
  iconFamily = 'phosphor',
}: UpdateLogPanelProps) {
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null)

  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')
  const accordionDuration = motionEnabled ? (reduced ? 0.08 : 0.15) : 0

  function toggleExpand(version: string) {
    setExpandedVersion((prev) => (prev === version ? null : version))
  }

  return (
    <div className="update-log">
      {entries.map((entry) => {
        const isExpanded = expandedVersion === entry.version
        return (
          <div key={entry.version} className="update-log-entry">
            <div className="update-log-header">
              <span className="update-log-version">
                <ThemeIcon
                  name="check-circle"
                  family={iconFamily}
                  size={14}
                  weight="fill"
                  style={{ color: 'var(--widget-green)', flexShrink: 0 }}
                />
                {entry.version}
              </span>
              <span className="update-log-label">{entry.label}</span>
              <span className="update-log-date">{entry.date}</span>
            </div>
            <button
              className="update-log-toggle"
              onClick={() => toggleExpand(entry.version)}
              aria-expanded={isExpanded}
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} release notes for ${entry.version}`}
            >
              {isExpanded ? (
                <ThemeIcon
                  name="caret-down"
                  family={iconFamily}
                  size={12}
                  weight="bold"
                />
              ) : (
                <ThemeIcon
                  name="caret-right-sm"
                  family={iconFamily}
                  size={12}
                  weight="bold"
                />
              )}
              Release notes
            </button>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.ul
                  className="update-log-notes"
                  initial={
                    motionEnabled ? { height: 0, opacity: 0 } : undefined
                  }
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={motionEnabled ? { height: 0, opacity: 0 } : undefined}
                  transition={{
                    duration: accordionDuration,
                    ease: 'easeInOut',
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  {entry.notes.map((note, i) => (
                    <li key={i} className="update-log-note">
                      {note}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
