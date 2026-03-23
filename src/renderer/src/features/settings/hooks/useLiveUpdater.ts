import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from '../../../shared/ui/ToastContainer'
import type { UpdaterSnapshot, UpdaterStatus } from '../../../types/updater'

function describeStatus(status: UpdaterStatus) {
  switch (status) {
    case 'disabled':
      return 'Disabled'
    case 'idle':
      return 'Idle'
    case 'checking':
      return 'Checking'
    case 'available':
      return 'Update available'
    case 'not-available':
      return 'Up to date'
    case 'downloading':
      return 'Downloading'
    case 'downloaded':
      return 'Ready to install'
    case 'error':
      return 'Error'
    default:
      return 'Unknown'
  }
}

export function useLiveUpdater() {
  const [snapshot, setSnapshot] = useState<UpdaterSnapshot | null>(null)

  useEffect(() => {
    let unsubscribe: (() => void) | null = null
    let active = true

    window.api.updater
      .getSnapshot()
      .then((snap) => {
        if (!active) return
        setSnapshot(snap)
      })
      .catch(() => {
        if (!active) return
        toast.error('Unable to read updater status.')
      })

    unsubscribe = window.api.updater.onSnapshot((snap) => {
      if (!active) return
      setSnapshot(snap)
    })

    return () => {
      active = false
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const checkForUpdates = useCallback(async () => {
    try {
      await window.api.updater.checkForUpdates()
    } catch {
      toast.error('Failed to check for updates.')
    }
  }, [])

  const downloadUpdate = useCallback(async () => {
    try {
      await window.api.updater.downloadUpdate()
    } catch {
      toast.error('Failed to download the update.')
    }
  }, [])

  const quitAndInstall = useCallback(async () => {
    try {
      await window.api.updater.quitAndInstall()
    } catch {
      toast.error('Failed to restart and install the update.')
    }
  }, [])

  const statusLabel = useMemo(() => {
    if (!snapshot) return 'Loading…'
    return describeStatus(snapshot.status)
  }, [snapshot])

  const message = useMemo(() => {
    if (!snapshot) return 'Reading updater status…'
    return snapshot.message ?? ''
  }, [snapshot])

  return {
    snapshot,
    statusLabel,
    message,
    checkForUpdates,
    downloadUpdate,
    quitAndInstall,
  }
}
