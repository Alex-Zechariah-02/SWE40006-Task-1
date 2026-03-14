import type { Assignment } from '../types/assignment'

interface AssignmentListProps {
  assignments: Assignment[]
  onEdit: (assignment: Assignment) => void
  onDelete: (id: string) => void
}

function statusClassName(status: string): string {
  return 'assignment-status status-' + status.toLowerCase().replace(/\s+/g, '-')
}

function priorityClassName(priority: string): string {
  return 'assignment-priority priority-' + priority.toLowerCase()
}

function formatDate(date: string): string {
  if (!date) return '—'
  // Append T00:00:00 so Date parses as local time, not UTC midnight
  const d = new Date(date + 'T00:00:00')
  return d.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export default function AssignmentList({
  assignments,
  onEdit,
  onDelete
}: AssignmentListProps) {
  if (assignments.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">No assignments yet</p>
        <p className="empty-state-subtitle">
          Create your first assignment to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="assignment-list">
      {assignments.map((a) => (
        <div key={a.id} className="assignment-row">
          <span className="assignment-title">{a.title}</span>
          {a.unit && <span className="assignment-unit">{a.unit}</span>}
          <span className={statusClassName(a.status)}>{a.status}</span>
          <span className={priorityClassName(a.priority)}>{a.priority}</span>
          <span className="assignment-due">{formatDate(a.dueDate)}</span>
          <div className="assignment-actions">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onEdit(a)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(a.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
