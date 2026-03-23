import ThemeIcon from '../../../../shared/ui/ThemeIcon'
import type { IconName } from '../../../../types/themeIcon'
import type { IconFamily } from '../../../../types/icon'

export type DetailTab =
  | 'overview'
  | 'milestones'
  | 'checklist'
  | 'notes'
  | 'history'

const TAB_LABELS: Record<DetailTab, string> = {
  overview: 'Overview',
  milestones: 'Milestones',
  checklist: 'Submission checklist',
  notes: 'Notes',
  history: 'History',
}

const TAB_ICON_NAMES: Record<DetailTab, IconName> = {
  overview: 'info',
  milestones: 'flag',
  checklist: 'list-checks',
  notes: 'note',
  history: 'history',
}

function tabIcon(tab: DetailTab, iconFamily: IconFamily) {
  return <ThemeIcon name={TAB_ICON_NAMES[tab]} family={iconFamily} size={14} />
}

interface AssignmentDetailTabsProps {
  tab: DetailTab
  onTabChange: (tab: DetailTab) => void
  iconFamily: IconFamily
}

export default function AssignmentDetailTabs({
  tab,
  onTabChange,
  iconFamily,
}: AssignmentDetailTabsProps) {
  return (
    <div className="detail-tabs" role="tablist">
      {(Object.keys(TAB_LABELS) as DetailTab[]).map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={tab === t}
          className={`detail-tab${tab === t ? ' detail-tab--active' : ''}`}
          onClick={() => onTabChange(t)}
        >
          {tabIcon(t, iconFamily)}
          {TAB_LABELS[t]}
        </button>
      ))}
    </div>
  )
}

export function isDetailTab(value: string): value is DetailTab {
  return value in TAB_LABELS
}
