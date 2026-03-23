import type { ViewMode } from '../hooks/useAssignmentViewState'

interface AssignmentsToolbarProps {
  total: number
  shown: number
  viewMode: ViewMode
  onViewModeChange: (viewMode: ViewMode) => void
  compact: boolean
  onAdd: () => void
}

export default function AssignmentsToolbar({
  total,
  shown,
  viewMode,
  onViewModeChange,
  compact,
  onAdd,
}: AssignmentsToolbarProps) {
  return (
    <div className="page-toolbar">
      <div className="toolbar-header">
        <h1 className="page-title">Assignments</h1>
        <p className="page-subtitle">
          {total === 0
            ? 'No assignments'
            : shown === total
              ? `${total} assignment${total !== 1 ? 's' : ''}`
              : `${shown} of ${total} shown`}
        </p>
      </div>
      <div className="page-toolbar-actions">
        <div className="toolbar-view-mode">
          <div className="view-mode-toggle">
            <button
              className={`btn btn-sm${viewMode === 'list' ? ' btn-primary' : ' btn-secondary'}`}
              onClick={() => onViewModeChange('list')}
            >
              List
            </button>
            <button
              className={`btn btn-sm${viewMode === 'calendar' ? ' btn-primary' : ' btn-secondary'}`}
              onClick={() => onViewModeChange('calendar')}
            >
              Calendar
            </button>
            <button
              className={`btn btn-sm${viewMode === 'kanban' ? ' btn-primary' : ' btn-secondary'}`}
              onClick={() => onViewModeChange('kanban')}
            >
              Kanban
            </button>
          </div>
        </div>
        <div className="toolbar-primary-action">
          <button
            className="btn btn-primary btn-sm"
            onClick={onAdd}
            aria-label="Create assignment"
          >
            {compact ? '+' : 'Create assignment'}
          </button>
        </div>
      </div>
    </div>
  )
}
