import ThemeIcon from '../../../shared/ui/ThemeIcon'
import UpdateLogPanel from './UpdateLogPanel'
import LiveUpdateStatusPanel from './LiveUpdateStatusPanel'
import type { UpdateEntry } from '../../../types/update'
import type { IconFamily } from '../../../types/icon'

interface UpdatesSettingsSectionProps {
  lastOpenedUpdates: string | null
  onOpenReleases: () => void | Promise<void>
  releaseEntries: UpdateEntry[]
  releasesUrl: string
  iconFamily: IconFamily
}

export default function UpdatesSettingsSection({
  lastOpenedUpdates,
  onOpenReleases,
  releaseEntries,
  releasesUrl,
  iconFamily,
}: UpdatesSettingsSectionProps) {
  return (
    <div className="settings-section">
      <div className="settings-section-title">Current version</div>
      <div className="settings-row">
        <div>
          <div
            className="settings-row-label"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <ThemeIcon
              name="tag"
              family={iconFamily}
              size={14}
              weight="light"
            />
            Acadence {__APP_VERSION__}
          </div>
          <div className="settings-row-desc">
            Last opened: {lastOpenedUpdates ?? 'Never'}
          </div>
        </div>
        <div className="settings-row-control">
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenReleases}
            aria-label="Open releases"
            disabled={!releasesUrl}
          >
            <ThemeIcon
              name="refresh"
              family={iconFamily}
              size={13}
              weight="light"
            />
            Open releases
          </button>
        </div>
      </div>

      <div className="settings-section-title" style={{ marginTop: 0 }}>
        Update status
      </div>
      <div className="settings-row" style={{ borderBottom: 'none' }}>
        <div style={{ width: '100%' }}>
          <LiveUpdateStatusPanel iconFamily={iconFamily} />
        </div>
      </div>

      <div className="settings-section-title" style={{ marginTop: 0 }}>
        Release history
      </div>
      <UpdateLogPanel entries={releaseEntries} iconFamily={iconFamily} />
    </div>
  )
}
