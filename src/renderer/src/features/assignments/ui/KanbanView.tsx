import { motion, AnimatePresence } from 'motion/react'
import ThemeIcon from '../../../shared/ui/ThemeIcon'
import type { IconName } from '../../../types/themeIcon'
import type { Assignment, AssignmentStatus } from '../../../types/assignment'
import { formatDate, daysUntilDue } from '../../../services/date'
import { useResponsiveLayout } from '../../../shared/hooks/useResponsiveLayout'
import type { IconFamily } from '../../../types/icon'

interface KanbanViewProps {
  assignments: Assignment[]
  onSelect: (assignment: Assignment) => void
  iconFamily?: IconFamily
}

const COLUMNS: AssignmentStatus[] = [
  'Not started',
  'In progress',
  'Review',
  'Waiting',
  'Completed',
]

const COLUMN_ICON_NAMES: Record<AssignmentStatus, IconName> = {
  'Not started': 'circle-dashed',
  'In progress': 'spinner',
  Review: 'search',
  Waiting: 'hourglass',
  Completed: 'check-circle',
}

function DueIndicator({
  dateStr,
  status,
  iconFamily,
}: {
  dateStr: string
  status: string
  iconFamily: IconFamily
}) {
  const days = daysUntilDue(dateStr)
  if (days === null) return null
  if (status === 'Completed') return null
  if (days < 0)
    return (
      <span className="kanban-due kanban-due--overdue">
        <ThemeIcon name="warning" family={iconFamily} size={10} weight="fill" />
        Overdue
      </span>
    )
  if (days === 0)
    return (
      <span className="kanban-due kanban-due--today">
        <ThemeIcon name="timer" family={iconFamily} size={10} weight="fill" />
        Today
      </span>
    )
  if (days <= 3)
    return <span className="kanban-due kanban-due--soon">In {days}d</span>
  return null
}

export default function KanbanView({
  assignments,
  onSelect,
  iconFamily = 'phosphor',
}: KanbanViewProps) {
  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')
  const cardDuration = motionEnabled ? (reduced ? 0.07 : 0.14) : 0
  const cardY = motionEnabled ? (reduced ? 4 : 8) : 0

  const { ref: kanbanRef, columns } = useResponsiveLayout<HTMLDivElement>({
    minItemWidth: 200,
    maxColumns: 5,
    gap: 8,
  })

  const grouped = new Map<AssignmentStatus, Assignment[]>()
  for (const status of COLUMNS) {
    grouped.set(status, [])
  }
  for (const a of assignments) {
    grouped.get(a.status)?.push(a)
  }

  return (
    <div
      className="kanban-view"
      ref={kanbanRef}
      style={{ '--kanban-cols': columns } as React.CSSProperties}
    >
      {COLUMNS.map((status) => {
        const items = grouped.get(status) ?? []
        return (
          <div key={status} className="kanban-column">
            <div className="kanban-column-header">
              <span className="kanban-column-title">
                <ThemeIcon
                  name={COLUMN_ICON_NAMES[status]}
                  family={iconFamily}
                  size={13}
                />
                {status}
              </span>
              <span className="kanban-column-count">{items.length}</span>
            </div>
            <div className="kanban-column-body">
              {items.length === 0 ? (
                <div className="kanban-empty">No assignments</div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((a) => (
                    <motion.button
                      key={a.id}
                      className="kanban-card"
                      onClick={() => onSelect(a)}
                      initial={{ opacity: motionEnabled ? 0 : 1, y: cardY }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: motionEnabled ? 0 : 1, y: -cardY }}
                      transition={{ duration: cardDuration }}
                    >
                      <div className="kanban-card-title">{a.title}</div>
                      {a.unit && (
                        <div className="kanban-card-unit">{a.unit}</div>
                      )}
                      <div className="kanban-card-footer">
                        <span
                          className={`assignment-priority priority-${a.priority.toLowerCase()}`}
                        >
                          {a.priority}
                        </span>
                        {a.dueDate && (
                          <span className="kanban-card-due">
                            {formatDate(a.dueDate)}
                          </span>
                        )}
                        <DueIndicator
                          dateStr={a.dueDate}
                          status={a.status}
                          iconFamily={iconFamily}
                        />
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
