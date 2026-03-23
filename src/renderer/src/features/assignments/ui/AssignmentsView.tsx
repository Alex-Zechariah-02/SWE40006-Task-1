import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { Assignment, Milestone, ChecklistItem } from '../../../types/assignment'
import { useAssignments } from '../state/AssignmentContext'
import AssignmentForm from './AssignmentForm'
import CalendarView from './CalendarView'
import KanbanView from './KanbanView'
import AssignmentList from './assignment/AssignmentList'
import AssignmentDetail from './assignment/AssignmentDetail'
import ConfirmDialog from '../../../shared/ui/ConfirmDialog'
import ErrorBanner from '../../../shared/ui/ErrorBanner'
import { useResponsiveLayout } from '../../../shared/hooks/useResponsiveLayout'
import { useAssignmentViewState } from '../hooks/useAssignmentViewState'
import { useAssignmentFilters } from '../hooks/useAssignmentFilters'
import { filterAndSortAssignments } from '../selectors/assignmentFilters'
import AssignmentsToolbar from './AssignmentsToolbar'
import AssignmentsFilterBar from './AssignmentsFilterBar'
import AssignmentOverlayDrawer from './AssignmentOverlayDrawer'
import type { IconFamily } from '../../../types/icon'

export interface AssignmentsViewProps {
  iconFamily?: IconFamily
  overlayBlur?: string
}

export default function AssignmentsView({
  iconFamily = 'phosphor',
  overlayBlur,
}: AssignmentsViewProps) {
  const { assignments, loadError: contextLoadError, dispatch } = useAssignments()
  const [loadError, setLoadError] = useState<string | null>(contextLoadError)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Assignment | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { viewMode, setViewMode } = useAssignmentViewState()

  const { ref: contentRef, compact, width } = useResponsiveLayout()
  const {
    search,
    setSearch,
    filterUnit,
    setFilterUnit,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy,
    groupBy,
    setGroupBy,
    hasActiveFilters,
    clearFilters,
    unitSelectOptions,
    statusSelectOptions,
    prioritySelectOptions,
    sortSelectOptions,
    groupBySelectOptions,
  } = useAssignmentFilters(assignments)

  const filtered = useMemo(() => {
    return filterAndSortAssignments(assignments, {
      search,
      filterUnit,
      filterStatus,
      filterPriority,
      sortBy,
    })
  }, [assignments, search, filterUnit, filterStatus, filterPriority, sortBy])

  const selectedAssignment = selectedId
    ? (assignments.find((a) => a.id === selectedId) ?? null)
    : null

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  function handleSave(assignment: Assignment) {
    if (editing) {
      dispatch({ type: 'UPDATE', assignment })
    } else {
      dispatch({ type: 'ADD', assignment })
    }
    setFormOpen(false)
    setEditing(null)
  }

  function handleEdit(assignment: Assignment) {
    setEditing(assignment)
    setFormOpen(true)
  }

  function handleDelete(id: string) {
    setConfirmDeleteId(id)
  }

  function confirmDelete() {
    if (confirmDeleteId) {
      dispatch({ type: 'DELETE', id: confirmDeleteId })
      if (selectedId === confirmDeleteId) setSelectedId(null)
    }
    setConfirmDeleteId(null)
  }

  function handleClose() {
    setFormOpen(false)
    setEditing(null)
  }

  function handleAdd() {
    setEditing(null)
    setFormOpen(true)
  }

  function handleSelect(assignment: Assignment) {
    setSelectedId(assignment.id)
  }

  function handleCloseDetail() {
    setSelectedId(null)
  }

  const total = assignments.length
  const shown = filtered.length
  const listCompact = width < 900

  const isOverlay = !!selectedAssignment

  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')

  return (
    <div className="assignments-page-layout" ref={contentRef}>
      <div className="assignments-main">
        <AssignmentsToolbar
          total={total}
          shown={shown}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          compact={compact}
          onAdd={handleAdd}
        />

        {loadError && (
          <ErrorBanner
            message={loadError}
            onDismiss={() => setLoadError(null)}
          />
        )}

        {total > 0 && viewMode === 'list' && (
          <AssignmentsFilterBar
            search={search}
            onSearchChange={setSearch}
            filterUnit={filterUnit}
            onFilterUnitChange={setFilterUnit}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            filterPriority={filterPriority}
            onFilterPriorityChange={setFilterPriority}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            groupBy={groupBy}
            onGroupByChange={setGroupBy}
            unitSelectOptions={unitSelectOptions}
            statusSelectOptions={statusSelectOptions}
            prioritySelectOptions={prioritySelectOptions}
            sortSelectOptions={sortSelectOptions}
            groupBySelectOptions={groupBySelectOptions}
            hasActiveFilters={!!hasActiveFilters}
            onClear={clearFilters}
          />
        )}

        <AnimatePresence mode="wait" initial={false}>
          {viewMode === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: motionEnabled ? (reduced ? 0.06 : 0.12) : 0,
              }}
            >
              <AssignmentList
                assignments={filtered}
                groupBy={groupBy}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSelect={handleSelect}
                selectedId={selectedId ?? undefined}
                emptyMessage={
                  hasActiveFilters
                    ? 'No assignments match your current filters.'
                    : 'No assignments yet. Create your first assignment to get started.'
                }
                iconFamily={iconFamily}
                compact={listCompact}
              />
            </motion.div>
          )}

          {viewMode === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: motionEnabled ? (reduced ? 0.06 : 0.12) : 0,
              }}
            >
              <CalendarView
                assignments={filtered}
                onSelect={handleSelect}
                iconFamily={iconFamily}
              />
            </motion.div>
          )}

          {viewMode === 'kanban' && (
            <motion.div
              key="kanban"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: motionEnabled ? (reduced ? 0.06 : 0.12) : 0,
              }}
            >
              <KanbanView
                assignments={filtered}
                onSelect={handleSelect}
                iconFamily={iconFamily}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {formOpen && (
            <AssignmentForm
              initial={editing ?? undefined}
              onSave={handleSave}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>
      </div>

      <AssignmentOverlayDrawer
        open={isOverlay}
        onClose={handleCloseDetail}
        overlayBlur={overlayBlur}
      >
        {selectedAssignment && (
          <AssignmentDetail
            assignment={selectedAssignment}
            onClose={handleCloseDetail}
            onEdit={handleEdit}
            onAddMilestone={(m: Milestone) =>
              dispatch({
                type: 'ADD_MILESTONE',
                assignmentId: selectedAssignment.id,
                milestone: m,
              })
            }
            onToggleMilestone={(id: string) =>
              dispatch({
                type: 'TOGGLE_MILESTONE',
                assignmentId: selectedAssignment.id,
                milestoneId: id,
              })
            }
            onDeleteMilestone={(id: string) =>
              dispatch({
                type: 'DELETE_MILESTONE',
                assignmentId: selectedAssignment.id,
                milestoneId: id,
              })
            }
            onAddChecklistItem={(item: ChecklistItem) =>
              dispatch({
                type: 'ADD_CHECKLIST_ITEM',
                assignmentId: selectedAssignment.id,
                item,
              })
            }
            onToggleChecklistItem={(id: string) =>
              dispatch({
                type: 'TOGGLE_CHECKLIST_ITEM',
                assignmentId: selectedAssignment.id,
                itemId: id,
              })
            }
            onDeleteChecklistItem={(id: string) =>
              dispatch({
                type: 'DELETE_CHECKLIST_ITEM',
                assignmentId: selectedAssignment.id,
                itemId: id,
              })
            }
            onUpdateNotes={(notes: string) =>
              dispatch({
                type: 'UPDATE_NOTES',
                assignmentId: selectedAssignment.id,
                notes,
              })
            }
            iconFamily={iconFamily}
          />
        )}
      </AssignmentOverlayDrawer>

      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Delete assignment"
        message="Delete this assignment permanently?"
        confirmLabel="Delete"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  )
}

