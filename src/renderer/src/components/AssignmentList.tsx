import type { Assignment } from '../types/assignment'
import { formatDate } from '../services/date'
import EmptyState from './EmptyState'

interface AssignmentListProps {
  assignments: Assignment[]
  onEdit: (assignment: Assignment) => void
  onDelete: (id: string) => void
  emptyMessage?: string
}

function statusClassName(status: string): string {
  return 'assignment-status status-' + status.toLowerCase().replace(/\s+/g, '-')
}

function priorityClassName(priority: string): string {
  return 'assignment-priority priority-' + priority.toLowerCase()
}

export default function AssignmentList({
  assignments,
  onEdit,
  onDelete,
  emptyMessage = 'No assignments yet. Create your first assignment to get started.'
}: AssignmentListProps) {
  if (assignments.length === 0) {
    return <EmptyState title="No assignments" subtitle={emptyMessage} />
  }

  return (
    <div className="assignment-list">
      {assignments.map((a) => (
        <div key={a.id} className="assignment-row">
          <div className="assignment-title-block">
            <span className="assignment-title">{a.title}</span>
            {a.description && (
              <span className="assignment-description">{a.description}</span>
            )}
          </div>
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
