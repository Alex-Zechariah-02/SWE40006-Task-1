import { useMemo, useState } from 'react'
import type { Assignment, AssignmentStatus, AssignmentPriority } from '../types/assignment'
import { loadAssignments, saveAssignments } from '../services/storage'
import { daysUntilDue, priorityWeight } from '../services/date'
import AssignmentForm from '../components/AssignmentForm'
import AssignmentList from '../components/AssignmentList'
import ErrorBanner from '../components/ErrorBanner'

const STATUS_OPTIONS: AssignmentStatus[] = [
  'Not started',
  'In progress',
  'Review',
  'Waiting',
  'Completed'
]

const PRIORITY_OPTIONS: AssignmentPriority[] = ['Low', 'Medium', 'High', 'Urgent']

type SortBy = 'dueDate' | 'priority' | 'title'

export default function AssignmentsPage() {
  const [loadResult] = useState(() => loadAssignments())
  const [loadError, setLoadError] = useState<string | null>(loadResult.error)
  const [assignments, setAssignments] = useState<Assignment[]>(loadResult.data)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Assignment | null>(null)

  // Search and filter state
  const [search, setSearch] = useState('')
  const [filterUnit, setFilterUnit] = useState('')
  const [filterStatus, setFilterStatus] = useState<AssignmentStatus | ''>('')
  const [filterPriority, setFilterPriority] = useState<AssignmentPriority | ''>('')
  const [sortBy, setSortBy] = useState<SortBy>('dueDate')

  // Derive sorted + filtered list
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return assignments
      .filter((a) => {
        if (q && !a.title.toLowerCase().includes(q) && !a.unit.toLowerCase().includes(q)) {
          return false
        }
        if (filterUnit && a.unit !== filterUnit) return false
        if (filterStatus && a.status !== filterStatus) return false
        if (filterPriority && a.priority !== filterPriority) return false
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'dueDate') {
          const da = daysUntilDue(a.dueDate)
          const db = daysUntilDue(b.dueDate)
          if (da === null && db === null) return 0
          if (da === null) return 1
          if (db === null) return -1
          return da - db
        }
        if (sortBy === 'priority') {
          return priorityWeight(a.priority) - priorityWeight(b.priority)
        }
        // title
        return a.title.localeCompare(b.title)
      })
  }, [assignments, search, filterUnit, filterStatus, filterPriority, sortBy])

  // Derive unique units for filter dropdown
  const unitOptions = useMemo(() => {
    const units = Array.from(new Set(assignments.map((a) => a.unit).filter(Boolean)))
    return units.sort()
  }, [assignments])

  const hasActiveFilters = search || filterUnit || filterStatus || filterPriority

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

  function clearFilters() {
    setSearch('')
    setFilterUnit('')
    setFilterStatus('')
    setFilterPriority('')
  }

  const total = assignments.length
  const shown = filtered.length

  return (
    <div>
      <div className="page-toolbar">
        <div className="page-header">
          <h1 className="page-title">Assignments</h1>
          <p className="page-subtitle">
            {total === 0
              ? 'No assignments'
              : shown === total
                ? `${total} assignment${total !== 1 ? 's' : ''}`
                : `${shown} of ${total} shown`}
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          Create assignment
        </button>
      </div>

      {loadError && (
        <ErrorBanner message={loadError} onDismiss={() => setLoadError(null)} />
      )}

      {total > 0 && (
        <div className="filter-bar">
          <input
            className="filter-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or unit..."
            aria-label="Search assignments"
          />

          <select
            className="filter-select"
            value={filterUnit}
            onChange={(e) => setFilterUnit(e.target.value)}
            aria-label="Filter by unit"
          >
            <option value="">All units</option>
            {unitOptions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as AssignmentStatus | '')}
            aria-label="Filter by status"
          >
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as AssignmentPriority | '')}
            aria-label="Filter by priority"
          >
            <option value="">All priorities</option>
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <div className="filter-sort">
            <span className="filter-sort-label">Sort:</span>
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              aria-label="Sort assignments"
            >
              <option value="dueDate">Due date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button className="btn btn-secondary btn-sm filter-clear" onClick={clearFilters}>
              Clear
            </button>
          )}
        </div>
      )}

      <AssignmentList
        assignments={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage={
          hasActiveFilters
            ? 'No assignments match your current filters.'
            : 'No assignments yet. Create your first assignment to get started.'
        }
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
