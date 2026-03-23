import { motion } from 'motion/react'
import ThemeIcon from '../../../../shared/ui/ThemeIcon'
import type { IconName } from '../../../../types/themeIcon'
import type { Assignment } from '../../../../types/assignment'
import type { IconFamily } from '../../../../types/icon'
import { formatDate } from '../../../../services/date'

function statusClassName(status: string): string {
  return 'assignment-status status-' + status.toLowerCase().replace(/\s+/g, '-')
}

function priorityClassName(priority: string): string {
  return 'assignment-priority priority-' + priority.toLowerCase()
}

const STATUS_ICON_NAMES: Record<string, IconName> = {
  'not started': 'circle-dashed',
  'in progress': 'spinner',
  review: 'search',
  waiting: 'hourglass',
  completed: 'check-circle',
}

function StatusIcon({
  status,
  iconFamily,
}: {
  status: string
  iconFamily: IconFamily
}) {
  const name = STATUS_ICON_NAMES[status.toLowerCase()]
  if (!name) return null
  return <ThemeIcon name={name} family={iconFamily} size={11} />
}

interface AssignmentListRowProps {
  assignment: Assignment
  selected: boolean
  compact?: boolean
  iconFamily: IconFamily
  onEdit: (assignment: Assignment) => void
  onDelete: (id: string) => void
  onSelect?: (assignment: Assignment) => void
  motionEnabled: boolean
  rowDuration: number
  rowY: number
}

export default function AssignmentListRow({
  assignment: a,
  selected,
  compact,
  iconFamily,
  onEdit,
  onDelete,
  onSelect,
  motionEnabled,
  rowDuration,
  rowY,
}: AssignmentListRowProps) {
  return (
    <motion.div
      key={a.id}
      className={`assignment-row${selected ? ' assignment-row--selected' : ''}${compact ? ' assignment-row--compact' : ''}`}
      onClick={() => onSelect?.(a)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(a)
        }
      }}
      layout={motionEnabled}
      initial={{ opacity: motionEnabled ? 0 : 1, y: rowY }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: motionEnabled ? 0 : 1, y: -rowY }}
      transition={{ duration: rowDuration }}
    >
      <div className="assignment-title-block">
        <span className="assignment-title">{a.title}</span>
        {a.description && (
          <span className="assignment-description">{a.description}</span>
        )}
      </div>
      {compact ? (
        <>
          <div className="assignment-actions">
            <button
              className="btn btn-secondary btn-sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(a)
              }}
              aria-label={`Edit ${a.title}`}
            >
              <ThemeIcon name="edit" family={iconFamily} size={13} />
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(a.id)
              }}
              aria-label={`Delete ${a.title}`}
            >
              <ThemeIcon name="trash" family={iconFamily} size={13} />
            </button>
          </div>
          <div className="assignment-compact-meta">
            {a.unit && <span className="assignment-unit">{a.unit}</span>}
            <span className={statusClassName(a.status)}>
              <StatusIcon status={a.status} iconFamily={iconFamily} />
              {a.status}
            </span>
            <span className={priorityClassName(a.priority)}>{a.priority}</span>
            <span className="assignment-due">{formatDate(a.dueDate)}</span>
          </div>
        </>
      ) : (
        <>
          {a.unit && <span className="assignment-unit">{a.unit}</span>}
          <span className={statusClassName(a.status)}>
            <StatusIcon status={a.status} iconFamily={iconFamily} />
            {a.status}
          </span>
          <span className={priorityClassName(a.priority)}>{a.priority}</span>
          <span className="assignment-due">{formatDate(a.dueDate)}</span>
          <div className="assignment-actions">
            <button
              className="btn btn-secondary btn-sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(a)
              }}
              aria-label={`Edit ${a.title}`}
            >
              <ThemeIcon name="edit" family={iconFamily} size={13} />
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(a.id)
              }}
              aria-label={`Delete ${a.title}`}
            >
              <ThemeIcon name="trash" family={iconFamily} size={13} />
              Delete
            </button>
          </div>
        </>
      )}
    </motion.div>
  )
}
