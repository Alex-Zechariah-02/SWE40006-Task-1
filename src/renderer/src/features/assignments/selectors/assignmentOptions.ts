import type {
  AssignmentPriority,
  AssignmentStatus,
} from '../../../types/assignment'
import type { SelectOption } from '../../../components/controls/CustomSelect'

export const STATUS_OPTIONS: AssignmentStatus[] = [
  'Not started',
  'In progress',
  'Review',
  'Waiting',
  'Completed',
]

export const PRIORITY_OPTIONS: AssignmentPriority[] = [
  'Low',
  'Medium',
  'High',
  'Urgent',
]

export type SortBy = 'dueDate' | 'priority' | 'title'
export type GroupBy = 'none' | 'dueDate' | 'unit' | 'unit+dueDate'

export const SORT_SELECT_OPTIONS: SelectOption[] = [
  { value: 'dueDate', label: 'Due date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' },
]

export const GROUP_BY_SELECT_OPTIONS: SelectOption[] = [
  { value: 'none', label: 'No grouping' },
  { value: 'dueDate', label: 'Due date' },
  { value: 'unit', label: 'Unit' },
  { value: 'unit+dueDate', label: 'Unit + Due date' },
]

export function buildUnitSelectOptions(units: string[]): SelectOption[] {
  return [
    { value: '', label: 'All units' },
    ...units.map((u) => ({ value: u, label: u })),
  ]
}

export const STATUS_SELECT_OPTIONS: SelectOption[] = [
  { value: '', label: 'All statuses' },
  ...STATUS_OPTIONS.map((s) => ({ value: s, label: s })),
]

export const PRIORITY_SELECT_OPTIONS: SelectOption[] = [
  { value: '', label: 'All priorities' },
  ...PRIORITY_OPTIONS.map((p) => ({ value: p, label: p })),
]
