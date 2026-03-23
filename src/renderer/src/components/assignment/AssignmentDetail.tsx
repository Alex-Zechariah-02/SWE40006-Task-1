import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import ThemeIcon from '../ThemeIcon'
import type {
  Assignment,
  ChecklistItem,
  Milestone,
} from '../../types/assignment'
import MilestoneList from '../MilestoneList'
import SubmissionChecklist from '../SubmissionChecklist'
import ActivityHistory from '../ActivityHistory'
import AssignmentDetailTabs, {
  type DetailTab,
  isDetailTab,
} from './AssignmentDetailTabs'
import AssignmentOverviewPanel from './AssignmentOverviewPanel'
import AssignmentNotesPanel from './AssignmentNotesPanel'

const TAB_KEY = 'acadence-detail-tab'

interface AssignmentDetailProps {
  assignment: Assignment
  onClose: () => void
  onEdit: (assignment: Assignment) => void
  onAddMilestone: (milestone: Milestone) => void
  onToggleMilestone: (id: string) => void
  onDeleteMilestone: (id: string) => void
  onAddChecklistItem: (item: ChecklistItem) => void
  onToggleChecklistItem: (id: string) => void
  onDeleteChecklistItem: (id: string) => void
  onUpdateNotes: (notes: string) => void
  iconFamily?: 'phosphor' | 'tabler'
}

function loadDetailTab(): DetailTab {
  try {
    const saved = localStorage.getItem(TAB_KEY)
    if (saved && isDetailTab(saved)) return saved
  } catch {
    /* ignore */
  }
  return 'overview'
}

export default function AssignmentDetail({
  assignment,
  onClose,
  onEdit,
  onAddMilestone,
  onToggleMilestone,
  onDeleteMilestone,
  onAddChecklistItem,
  onToggleChecklistItem,
  onDeleteChecklistItem,
  onUpdateNotes,
  iconFamily = 'phosphor',
}: AssignmentDetailProps) {
  const [tab, setTab] = useState<DetailTab>(() => loadDetailTab())

  function handleTabChange(t: DetailTab) {
    setTab(t)
    try {
      localStorage.setItem(TAB_KEY, t)
    } catch {
      /* ignore */
    }
  }

  // Reset tab when the selected assignment changes
  useEffect(() => {
    setTab('overview')
  }, [assignment.id, assignment.notes])

  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')
  const tabDuration = motionEnabled ? (reduced ? 0.06 : 0.12) : 0
  const tabY = motionEnabled ? (reduced ? 2 : 4) : 0

  return (
    <div className="detail-panel detail-panel--overlay">
      <div className="detail-header">
        <button
          className="detail-back-btn"
          onClick={onClose}
          aria-label="Back to assignments list"
        >
          <ThemeIcon
            name="arrow-left"
            family={iconFamily}
            size={14}
            weight="bold"
          />
          Back
        </button>
        <div className="detail-header-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onEdit(assignment)}
          >
            <ThemeIcon name="edit" family={iconFamily} size={13} />
            Edit
          </button>
        </div>
      </div>

      <div className="detail-title-block">
        <h2 className="detail-title">{assignment.title}</h2>
        {assignment.unit && (
          <span className="detail-unit">{assignment.unit}</span>
        )}
      </div>

      <AssignmentDetailTabs
        tab={tab}
        onTabChange={handleTabChange}
        iconFamily={iconFamily}
      />

      <div className="detail-body">
        <AnimatePresence mode="wait" initial={false}>
          {tab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: motionEnabled ? 0 : 1, y: tabY }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: motionEnabled ? 0 : 1, y: -tabY }}
              transition={{ duration: tabDuration }}
            >
              <AssignmentOverviewPanel assignment={assignment} />
            </motion.div>
          )}

          {tab === 'milestones' && (
            <motion.div
              key="milestones"
              initial={{ opacity: motionEnabled ? 0 : 1, y: tabY }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: motionEnabled ? 0 : 1, y: -tabY }}
              transition={{ duration: tabDuration }}
            >
              <MilestoneList
                milestones={assignment.milestones}
                onAdd={onAddMilestone}
                onToggle={onToggleMilestone}
                onDelete={onDeleteMilestone}
              />
            </motion.div>
          )}

          {tab === 'checklist' && (
            <motion.div
              key="checklist"
              initial={{ opacity: motionEnabled ? 0 : 1, y: tabY }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: motionEnabled ? 0 : 1, y: -tabY }}
              transition={{ duration: tabDuration }}
            >
              <SubmissionChecklist
                items={assignment.checklist}
                onAdd={onAddChecklistItem}
                onToggle={onToggleChecklistItem}
                onDelete={onDeleteChecklistItem}
              />
            </motion.div>
          )}

          {tab === 'notes' && (
            <motion.div
              key="notes"
              initial={{ opacity: motionEnabled ? 0 : 1, y: tabY }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: motionEnabled ? 0 : 1, y: -tabY }}
              transition={{ duration: tabDuration }}
            >
              <AssignmentNotesPanel
                assignment={assignment}
                onUpdateNotes={onUpdateNotes}
              />
            </motion.div>
          )}

          {tab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: motionEnabled ? 0 : 1, y: tabY }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: motionEnabled ? 0 : 1, y: -tabY }}
              transition={{ duration: tabDuration }}
            >
              <ActivityHistory entries={assignment.history} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
