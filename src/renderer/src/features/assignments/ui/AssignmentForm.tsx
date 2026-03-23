import { useState } from 'react'
import { motion } from 'motion/react'
import CustomSelect from '../../../shared/ui/controls/CustomSelect'
import type { SelectOption } from '../../../shared/types/select'
import CustomDatePicker from '../../../shared/ui/controls/CustomDatePicker'
import type {
  Assignment,
  AssignmentStatus,
  AssignmentPriority,
} from '../../../types/assignment'

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
  'Completed',
]

const PRIORITY_OPTIONS: AssignmentPriority[] = [
  'Low',
  'Medium',
  'High',
  'Urgent',
]

export default function AssignmentForm({
  initial,
  onSave,
  onClose,
}: AssignmentFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [unit, setUnit] = useState(initial?.unit ?? '')
  const [status, setStatus] = useState<AssignmentStatus>(
    initial?.status ?? 'Not started',
  )
  const [priority, setPriority] = useState<AssignmentPriority>(
    initial?.priority ?? 'Medium',
  )
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
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
      description: description.trim(),
      notes: notes.trim(),
      milestones: initial?.milestones ?? [],
      checklist: initial?.checklist ?? [],
      history: initial?.history ?? [],
      createdAt: initial?.createdAt ?? now,
      updatedAt: now,
    }
    onSave(assignment)
  }

  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')
  const duration = motionEnabled ? (reduced ? 0.1 : 0.2) : 0

  return (
    <motion.div
      className="modal-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
    >
      <motion.div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: motionEnabled ? 0.95 : 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: motionEnabled ? 0.95 : 1 }}
        transition={{ duration }}
      >
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
              placeholder="e.g. Software Engineering"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="field-description">
              Description
            </label>
            <textarea
              id="field-description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Summarise what this assignment requires"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status</label>
              <CustomSelect
                value={status}
                onChange={(v) => setStatus(v as AssignmentStatus)}
                options={STATUS_OPTIONS.map(
                  (s): SelectOption => ({ value: s, label: s }),
                )}
                aria-label="Status"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <CustomSelect
                value={priority}
                onChange={(v) => setPriority(v as AssignmentPriority)}
                options={PRIORITY_OPTIONS.map(
                  (p): SelectOption => ({ value: p, label: p }),
                )}
                aria-label="Priority"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="field-due">
              Due date
            </label>
            <CustomDatePicker
              id="field-due"
              value={dueDate}
              onChange={(v) => setDueDate(v)}
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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initial ? 'Save changes' : 'Create assignment'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
