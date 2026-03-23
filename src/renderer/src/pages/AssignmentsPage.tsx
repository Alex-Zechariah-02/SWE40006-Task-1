import AssignmentsView from '../features/assignments/ui/AssignmentsView'
import type { IconFamily } from '../types/icon'

interface AssignmentsPageProps {
  iconFamily?: IconFamily
  overlayBlur?: string
}

export default function AssignmentsPage({
  iconFamily = 'phosphor',
  overlayBlur,
}: AssignmentsPageProps) {
  return (
    <AssignmentsView iconFamily={iconFamily} overlayBlur={overlayBlur} />
  )
}
