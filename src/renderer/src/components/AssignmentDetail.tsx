import { useState } from 'react'
import type { Assignment } from '../types/assignment'
import { formatDate } from '../services/date'

type DetailTab = 'overview' | 'notes' | 'history'

const TAB_LABELS: Record<DetailTab, string> = {
  overview: 'Overview',
  notes: 'Notes',
  history: 'History',
}

interface AssignmentDetailProps {
  assignment: Assignment
  onClose: () => void
  onEdit: (assignment: Assignment) => void
}

function statusClassName(status: string): string {
  return 'assignment-status status-' + status.toLowerCase().replace(/\s+/g, '-')
}

function priorityClassName(priority: string): string {
  return 'assignment-priority priority-' + priority.toLowerCase()
}

export default function AssignmentDetail({ assignment, onClose, onEdit }: AssignmentDetailProps) {
  const [tab, setTab] = useState<DetailTab>('overview')

  return (
    <div className="detail-panel">
      <div className="detail-header">
        <button className="detail-back-btn" onClick={onClose} aria-label="Back to assignments list">
          ← Back
        </button>
        <div className="detail-header-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => onEdit(assignment)}>
            Edit
          </button>
        </div>
      </div>

      <div className="detail-title-block">
        <h2 className="detail-title">{assignment.title}</h2>
        {assignment.unit && <span className="detail-unit">{assignment.unit}</span>}
      </div>

      <div className="detail-tabs" role="tablist">
        {(Object.keys(TAB_LABELS) as DetailTab[]).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            className={`detail-tab${tab === t ? ' detail-tab--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="detail-body">
        {tab === 'overview' && (
          <div className="detail-overview">
            <dl className="detail-fields">
              <div className="detail-field">
                <dt>Status</dt>
                <dd>
                  <span className={statusClassName(assignment.status)}>{assignment.status}</span>
                </dd>
              </div>
              <div className="detail-field">
                <dt>Priority</dt>
                <dd>
                  <span className={priorityClassName(assignment.priority)}>{assignment.priority}</span>
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
        )}

        {tab === 'notes' && (
          <div className="detail-notes">
            {assignment.notes ? (
              <p className="detail-text">{assignment.notes}</p>
            ) : (
              <p className="detail-empty">No notes for this assignment.</p>
            )}
          </div>
        )}

        {tab === 'history' && (
          <div className="detail-history">
            <p className="detail-empty">No history recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
