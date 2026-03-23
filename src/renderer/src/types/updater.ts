export type UpdaterStatus =
  | 'disabled'
  | 'idle'
  | 'checking'
  | 'available'
  | 'not-available'
  | 'downloading'
  | 'downloaded'
  | 'error'

export interface UpdaterProgress {
  percent: number
  transferred: number
  total: number
  bytesPerSecond: number
}

export interface UpdaterSnapshot {
  status: UpdaterStatus
  currentVersion: string
  availableVersion?: string
  progress?: UpdaterProgress
  lastCheckedAt?: string
  message?: string
  canCheck: boolean
  canDownload: boolean
  canInstall: boolean
}

