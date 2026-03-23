import { useMemo, useState } from 'react'
import type {
  Assignment,
  AssignmentPriority,
  AssignmentStatus,
} from '../../../types/assignment'
import type { SelectOption } from '../../../shared/types/select'
import {
  GROUP_BY_SELECT_OPTIONS,
  PRIORITY_SELECT_OPTIONS,
  SORT_SELECT_OPTIONS,
  STATUS_SELECT_OPTIONS,
  buildUnitSelectOptions,
  type GroupBy,
  type SortBy,
} from '../selectors/assignmentOptions'

export function useAssignmentFilters(assignments: Assignment[]) {
  const [search, setSearch] = useState('')
  const [filterUnit, setFilterUnit] = useState('')
  const [filterStatus, setFilterStatus] = useState<AssignmentStatus | ''>('')
  const [filterPriority, setFilterPriority] = useState<AssignmentPriority | ''>(
    '',
  )
  const [sortBy, setSortBy] = useState<SortBy>('dueDate')
  const [groupBy, setGroupBy] = useState<GroupBy>('dueDate')

  const unitOptions = useMemo(() => {
    const units = Array.from(
      new Set(assignments.map((a) => a.unit).filter(Boolean)),
    )
    return units.sort()
  }, [assignments])

  const unitSelectOptions = useMemo<SelectOption[]>(() => {
    return buildUnitSelectOptions(unitOptions)
  }, [unitOptions])

  const statusSelectOptions = STATUS_SELECT_OPTIONS
  const prioritySelectOptions = PRIORITY_SELECT_OPTIONS
  const sortSelectOptions = SORT_SELECT_OPTIONS
  const groupBySelectOptions = GROUP_BY_SELECT_OPTIONS

  const hasActiveFilters =
    search || filterUnit || filterStatus || filterPriority

  function clearFilters() {
    setSearch('')
    setFilterUnit('')
    setFilterStatus('')
    setFilterPriority('')
  }

  return {
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
  }
}
