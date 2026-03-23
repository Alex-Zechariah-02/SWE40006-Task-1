import { useEffect, useState } from 'react'
import type { Assignment } from '../../types/assignment'

interface AssignmentNotesPanelProps {
  assignment: Assignment
  onUpdateNotes: (notes: string) => void
}

export default function AssignmentNotesPanel({
  assignment,
  onUpdateNotes,
}: AssignmentNotesPanelProps) {
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesText, setNotesText] = useState(assignment.notes ?? '')

  // Reset notes state when the selected assignment changes
  useEffect(() => {
    setNotesText(assignment.notes ?? '')
    setEditingNotes(false)
  }, [assignment.id, assignment.notes])

  function handleSaveNotes() {
    onUpdateNotes(notesText)
    setEditingNotes(false)
  }

  function handleCancelNotes() {
    setNotesText(assignment.notes ?? '')
    setEditingNotes(false)
  }

  return (
    <div className="detail-notes">
      {editingNotes ? (
        <div className="notes-edit">
          <textarea
            className="form-control notes-textarea"
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            rows={6}
            autoFocus
          />
          <div className="notes-edit-actions">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSaveNotes}
            >
              Save notes
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleCancelNotes}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {assignment.notes ? (
            <p className="detail-text">{assignment.notes}</p>
          ) : (
            <p className="detail-empty">No notes for this assignment.</p>
          )}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setNotesText(assignment.notes ?? '')
              setEditingNotes(true)
            }}
            style={{ marginTop: 8 }}
          >
            {assignment.notes ? 'Edit notes' : 'Add notes'}
          </button>
        </>
      )}
    </div>
  )
}
