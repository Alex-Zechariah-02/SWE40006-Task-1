import ThemeIcon from '../../../components/ThemeIcon'
import { formatDistanceToNowStrict } from 'date-fns'
import { useLiveUpdater } from '../hooks/useLiveUpdater'

interface LiveUpdateStatusPanelProps {
  iconFamily: 'phosphor' | 'tabler'
}

function formatLastChecked(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return 'Unknown'
  return `${formatDistanceToNowStrict(date, { addSuffix: true })}`
}

export default function LiveUpdateStatusPanel({
  iconFamily,
}: LiveUpdateStatusPanelProps) {
  const { snapshot, statusLabel, message, checkForUpdates, downloadUpdate, quitAndInstall } =
    useLiveUpdater()

  const progressPercent = snapshot?.progress?.percent ?? 0
  const showProgress = snapshot?.status === 'downloading'

  return (
    <div className="updater-panel">
      <div className="updater-row">
        <div>
          <div className="updater-title">
            <ThemeIcon
              name="refresh"
              family={iconFamily}
              size={14}
              weight="light"
            />
            Update status: {statusLabel}
          </div>
          <div className="updater-desc">{message || '—'}</div>
          <div className="updater-meta">
            <span>Installed: {snapshot?.currentVersion ?? __APP_VERSION__}</span>
            {snapshot?.availableVersion ? (
              <span>Available: {snapshot.availableVersion}</span>
            ) : null}
            {snapshot?.lastCheckedAt ? (
              <span>Last checked: {formatLastChecked(snapshot.lastCheckedAt)}</span>
            ) : null}
          </div>
        </div>

        <div className="updater-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={checkForUpdates}
            disabled={!snapshot?.canCheck}
            aria-label="Check for updates"
          >
            <ThemeIcon
              name="refresh"
              family={iconFamily}
              size={13}
              weight="light"
            />
            Check
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={downloadUpdate}
            disabled={!snapshot?.canDownload}
            aria-label="Download update"
          >
            <ThemeIcon
              name="timer"
              family={iconFamily}
              size={13}
              weight="light"
            />
            Download
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={quitAndInstall}
            disabled={!snapshot?.canInstall}
            aria-label="Restart and install update"
          >
            <ThemeIcon
              name="check-circle"
              family={iconFamily}
              size={13}
              weight="light"
            />
            Restart & install
          </button>
        </div>
      </div>

      {showProgress ? (
        <div className="updater-progress" aria-label="Download progress">
          <div
            className="updater-progress-bar"
            style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
          />
        </div>
      ) : null}
    </div>
  )
}

