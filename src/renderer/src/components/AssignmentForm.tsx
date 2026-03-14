import { useState } from 'react'
import type { Assignment, AssignmentStatus, AssignmentPriority } from '../types/assignment'

interface AssignmentFormProps {
  initial?: Assignment
  onSave: (assignment: Assignment) => void
  onClose: () => void
}

const STATUS_OPTIONS: AssignmentStatus[] = [
  'Not started',
  'In progress',
  'Review',
  'Waiting',
  'Completed'
]

const PRIORITY_OPTIONS: AssignmentPriority[] = ['Low', 'Medium', 'High', 'Urgent']

export default function AssignmentForm({ initial, onSave, onClose }: AssignmentFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [unit, setUnit] = useState(initial?.unit ?? '')
  const [status, setStatus] = useState<AssignmentStatus>(initial?.status ?? 'Not started')
  const [priority, setPriority] = useState<AssignmentPriority>(initial?.priority ?? 'Medium')
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '')
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required.')
      return
    }
    const now = new Date().toISOString()
    const assignment: Assignment = {
      id: initial?.id ?? crypto.randomUUID(),
      title: title.trim(),
      unit: unit.trim(),
      status,
      priority,
      dueDate,
      notes: notes.trim(),
      createdAt: initial?.createdAt ?? now,
      updatedAt: now
    }
    onSave(assignment)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          {initial ? 'Edit assignment' : 'Create assignment'}
        </h2>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="field-title">
              Title *
            </label>
            <input
              id="field-title"
              className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Research report on distributed systems"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="field-unit">
              Unit
            </label>
            <input
              id="field-unit"
              className="form-control"
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. SWE40006 Software Deployment"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="field-status">
                Status
              </label>
              <select
                id="field-status"
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value as AssignmentStatus)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="field-priority">
                Priority
              </label>
              <select
                id="field-priority"
                className="form-control"
                value={priority}
                onChange={(e) => setPriority(e.target.value as AssignmentPriority)}
              >
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="field-due">
              Due date
            </label>
            <input
              id="field-due"
              className="form-control"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="field-notes">
              Notes
            </label>
            <textarea
              id="field-notes"
              className="form-control"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Additional context, requirements, or reminders"
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initial ? 'Save changes' : 'Create assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
