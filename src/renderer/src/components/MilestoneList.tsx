import { useState } from 'react'
import type { Milestone } from '../types/assignment'
import ConfirmDialog from './ConfirmDialog'

interface MilestoneListProps {
  milestones: Milestone[]
  onAdd: (milestone: Milestone) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function MilestoneList({
  milestones,
  onAdd,
  onToggle,
  onDelete,
}: MilestoneListProps) {
  const [title, setTitle] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    })
    setTitle('')
  }

  const completed = milestones.filter((m) => m.completed).length

  return (
    <div className="milestone-list">
      {milestones.length > 0 && (
        <div className="milestone-progress-section">
          <div className="milestone-progress-bar">
            <div
              className="milestone-progress-fill"
              style={{ width: `${(completed / milestones.length) * 100}%` }}
            />
          </div>
          <div className="milestone-progress-text">
            {completed} of {milestones.length} completed
          </div>
        </div>
      )}

      {milestones.length === 0 ? (
        <p className="detail-empty">
          No milestones yet. Add milestones to track assignment progress.
        </p>
      ) : (
        <ul className="milestone-items">
          {milestones.map((m) => (
            <li
              key={m.id}
              className={`milestone-item${m.completed ? ' milestone-item--done' : ''}`}
            >
              <label className="milestone-check-label">
                <input
                  type="checkbox"
                  checked={m.completed}
                  onChange={() => onToggle(m.id)}
                  className="milestone-checkbox"
                />
                <span
                  className={`milestone-title${m.completed ? ' milestone-title--done' : ''}`}
                >
                  {m.title}
                </span>
              </label>
              <button
                className="btn btn-danger btn-xs"
                onClick={() => setConfirmDeleteId(m.id)}
                aria-label={`Remove milestone: ${m.title}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <form className="milestone-add-form" onSubmit={handleAdd}>
        <input
          type="text"
          className="form-control milestone-add-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add milestone..."
        />
        <button
          type="submit"
          className="btn btn-secondary btn-sm"
          disabled={!title.trim()}
        >
          Add
        </button>
      </form>

      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Remove milestone"
        message="Remove this milestone?"
        confirmLabel="Remove"
        variant="danger"
        onConfirm={() => {
          if (confirmDeleteId) onDelete(confirmDeleteId)
          setConfirmDeleteId(null)
        }}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  )
}
