import CustomSelect from '../../../shared/ui/controls/CustomSelect'
import type { SelectOption } from '../../../shared/types/select'
import type {
  AssignmentPriority,
  AssignmentStatus,
} from '../../../types/assignment'
import type { GroupBy, SortBy } from '../selectors/assignmentOptions'

interface AssignmentsFilterBarProps {
  search: string
  onSearchChange: (next: string) => void
  filterUnit: string
  onFilterUnitChange: (unit: string) => void
  filterStatus: AssignmentStatus | ''
  onFilterStatusChange: (status: AssignmentStatus | '') => void
  filterPriority: AssignmentPriority | ''
  onFilterPriorityChange: (priority: AssignmentPriority | '') => void
  sortBy: SortBy
  onSortByChange: (sortBy: SortBy) => void
  groupBy: GroupBy
  onGroupByChange: (groupBy: GroupBy) => void
  unitSelectOptions: SelectOption[]
  statusSelectOptions: SelectOption[]
  prioritySelectOptions: SelectOption[]
  sortSelectOptions: SelectOption[]
  groupBySelectOptions: SelectOption[]
  hasActiveFilters: boolean
  onClear: () => void
}

export default function AssignmentsFilterBar({
  search,
  onSearchChange,
  filterUnit,
  onFilterUnitChange,
  filterStatus,
  onFilterStatusChange,
  filterPriority,
  onFilterPriorityChange,
  sortBy,
  onSortByChange,
  groupBy,
  onGroupByChange,
  unitSelectOptions,
  statusSelectOptions,
  prioritySelectOptions,
  sortSelectOptions,
  groupBySelectOptions,
  hasActiveFilters,
  onClear,
}: AssignmentsFilterBarProps) {
  return (
    <div className="filter-bar">
      <input
        className="filter-search"
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by title or unit..."
        aria-label="Search assignments"
      />

      <CustomSelect
        value={filterUnit}
        onChange={(v) => onFilterUnitChange(v)}
        options={unitSelectOptions}
        aria-label="Filter by unit"
      />

      <CustomSelect
        value={filterStatus}
        onChange={(v) => onFilterStatusChange(v as AssignmentStatus | '')}
        options={statusSelectOptions}
        aria-label="Filter by status"
      />

      <CustomSelect
        value={filterPriority}
        onChange={(v) => onFilterPriorityChange(v as AssignmentPriority | '')}
        options={prioritySelectOptions}
        aria-label="Filter by priority"
      />

      <div className="filter-sort">
        <CustomSelect
          value={sortBy}
          onChange={(v) => onSortByChange(v as SortBy)}
          options={sortSelectOptions}
          aria-label="Sort assignments"
        />
      </div>

      <CustomSelect
        value={groupBy}
        onChange={(v) => onGroupByChange(v as GroupBy)}
        options={groupBySelectOptions}
        aria-label="Group assignments"
      />

      {hasActiveFilters && (
        <button
          className="btn btn-secondary btn-sm filter-clear"
          onClick={onClear}
        >
          Clear
        </button>
      )}
    </div>
  )
}
