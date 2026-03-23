import type { Assignment } from '../../../types/assignment'
import ImportExportControls from './ImportExportControls'

interface GeneralSettingsSectionProps {
  assignments: Assignment[]
  onImportAssignments: (imported: Assignment[]) => void
}

export default function GeneralSettingsSection({
  assignments,
  onImportAssignments,
}: GeneralSettingsSectionProps) {
  return (
    <div className="settings-section">
      <div className="settings-section-title">Data</div>
      <div className="settings-row">
        <div>
          <div className="settings-row-label">Storage</div>
          <div className="settings-row-desc">
            Assignment data is stored locally on this device
          </div>
        </div>
        <div className="settings-row-control">
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Local
          </span>
        </div>
      </div>
      <div className="settings-section-title" style={{ marginTop: 20 }}>
        Import / Export
      </div>
      <div className="settings-row">
        <div>
          <div className="settings-row-label">Assignment data</div>
          <div className="settings-row-desc">
            Export your assignments to a JSON file or import from one
          </div>
        </div>
        <div className="settings-row-control">
          <ImportExportControls
            assignments={assignments}
            onImport={onImportAssignments}
          />
        </div>
      </div>
    </div>
  )
}
