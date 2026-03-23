import type { Assignment } from '../../../../types/assignment'
import { formatDate } from '../../../../services/date'

function statusClassName(status: string): string {
  return 'assignment-status status-' + status.toLowerCase().replace(/\s+/g, '-')
}

function priorityClassName(priority: string): string {
  return 'assignment-priority priority-' + priority.toLowerCase()
}

interface AssignmentOverviewPanelProps {
  assignment: Assignment
}

export default function AssignmentOverviewPanel({
  assignment,
}: AssignmentOverviewPanelProps) {
  return (
    <div className="detail-overview">
      <dl className="detail-fields">
        <div className="detail-field">
          <dt>Status</dt>
          <dd>
            <span className={statusClassName(assignment.status)}>
              {assignment.status}
            </span>
          </dd>
        </div>
        <div className="detail-field">
          <dt>Priority</dt>
          <dd>
            <span className={priorityClassName(assignment.priority)}>
              {assignment.priority}
            </span>
          </dd>
        </div>
        <div className="detail-field">
          <dt>Due date</dt>
          <dd>{formatDate(assignment.dueDate)}</dd>
        </div>
        {assignment.description && (
          <div className="detail-field detail-field--full">
            <dt>Description</dt>
            <dd className="detail-text">{assignment.description}</dd>
          </div>
        )}
        <div className="detail-field detail-field--meta">
          <dt>Created</dt>
          <dd>{new Date(assignment.createdAt).toLocaleDateString('en-AU')}</dd>
        </div>
        <div className="detail-field detail-field--meta">
          <dt>Last updated</dt>
          <dd>{new Date(assignment.updatedAt).toLocaleDateString('en-AU')}</dd>
        </div>
      </dl>
    </div>
  )
}
