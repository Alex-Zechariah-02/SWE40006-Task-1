import { useState } from 'react'
import type { ChecklistItem } from '../../../types/assignment'
import ConfirmDialog from '../../../shared/ui/ConfirmDialog'

interface SubmissionChecklistProps {
  items: ChecklistItem[]
  onAdd: (item: ChecklistItem) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function SubmissionChecklist({
  items,
  onAdd,
  onToggle,
  onDelete,
}: SubmissionChecklistProps) {
  const [label, setLabel] = useState('')
  const [note, setNote] = useState('')
  const [link, setLink] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!label.trim()) return
    onAdd({
      id: crypto.randomUUID(),
      label: label.trim(),
      checked: false,
      note: note.trim(),
      link: link.trim(),
    })
    setLabel('')
    setNote('')
    setLink('')
    setShowForm(false)
  }

  const checked = items.filter((c) => c.checked).length

  return (
    <div className="checklist">
      {items.length > 0 && (
        <div className="checklist-progress-section">
          <div className="milestone-progress-bar">
            <div
              className="milestone-progress-fill"
              style={{ width: `${(checked / items.length) * 100}%` }}
            />
          </div>
          <div className="checklist-progress-text">
            {checked} of {items.length} completed
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className="detail-empty">
          No checklist items yet. Add items to track submission requirements.
        </p>
      ) : (
        <ul className="checklist-items">
          {items.map((c) => (
            <li
              key={c.id}
              className={`checklist-item${c.checked ? ' checklist-item--done' : ''}`}
            >
              <label className="checklist-check-label">
                <input
                  type="checkbox"
                  checked={c.checked}
                  onChange={() => onToggle(c.id)}
                  className="checklist-checkbox"
                />
                <span
                  className={`checklist-label${c.checked ? ' checklist-label--done' : ''}`}
                >
                  {c.label}
                </span>
              </label>
              <div className="checklist-meta">
                {c.note && <span className="checklist-note">{c.note}</span>}
                {c.link && (
                  <a
                    className="checklist-link"
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                )}
              </div>
              <button
                className="btn btn-danger btn-xs"
                onClick={() => setConfirmDeleteId(c.id)}
                aria-label={`Remove checklist item: ${c.label}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {showForm ? (
        <form className="checklist-add-form" onSubmit={handleAdd}>
          <input
            type="text"
            className="form-control"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Item label (required)"
            autoFocus
          />
          <input
            type="text"
            className="form-control"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional note"
          />
          <input
            type="url"
            className="form-control"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Optional link"
          />
          <div className="checklist-add-actions">
            <button
              type="submit"
              className="btn btn-secondary btn-sm"
              disabled={!label.trim()}
            >
              Add item
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setShowForm(true)}
        >
          Add checklist item
        </button>
      )}

      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Remove checklist item"
        message="Remove this checklist item?"
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
