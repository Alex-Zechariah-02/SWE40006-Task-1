import { useState } from 'react'
import type { Assignment } from '../types/assignment'
import { loadAssignments, saveAssignments } from '../services/storage'
import AssignmentForm from '../components/AssignmentForm'
import AssignmentList from '../components/AssignmentList'

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>(() => loadAssignments())
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Assignment | null>(null)

  function handleSave(assignment: Assignment) {
    const updated = editing
      ? assignments.map((a) => (a.id === assignment.id ? assignment : a))
      : [...assignments, assignment]
    setAssignments(updated)
    saveAssignments(updated)
    setFormOpen(false)
    setEditing(null)
  }

  function handleEdit(assignment: Assignment) {
    setEditing(assignment)
    setFormOpen(true)
  }

  function handleDelete(id: string) {
    if (!window.confirm('Delete this assignment permanently?')) return
    const updated = assignments.filter((a) => a.id !== id)
    setAssignments(updated)
    saveAssignments(updated)
  }

  function handleClose() {
    setFormOpen(false)
    setEditing(null)
  }

  function handleAdd() {
    setEditing(null)
    setFormOpen(true)
  }

  const count = assignments.length

  return (
    <div>
      <div className="page-toolbar">
        <div className="page-header">
          <h1 className="page-title">Assignments</h1>
          <p className="page-subtitle">
            {count === 0
              ? 'No assignments'
              : `${count} assignment${count !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          Create assignment
        </button>
      </div>

      <AssignmentList
        assignments={assignments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {formOpen && (
        <AssignmentForm
          initial={editing ?? undefined}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  )
}
