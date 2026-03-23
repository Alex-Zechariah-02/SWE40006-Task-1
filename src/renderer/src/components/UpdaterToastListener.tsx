import { useEffect, useRef } from 'react'
import { toast } from './ToastContainer'
import type { UpdaterSnapshot, UpdaterStatus } from '../types/updater'

function notify(snapshot: UpdaterSnapshot, previous: UpdaterStatus | null) {
  if (snapshot.status === 'available' && previous !== 'available') {
    toast.info(
      snapshot.availableVersion
        ? `Update ${snapshot.availableVersion} is available.`
        : 'An update is available.',
    )
  }

  if (snapshot.status === 'downloaded' && previous !== 'downloaded') {
    toast.success('Update downloaded. Restart to install.')
  }

  if (snapshot.status === 'error' && previous !== 'error') {
    toast.error(snapshot.message ?? 'Updater error.')
  }
}

export default function UpdaterToastListener() {
  const lastStatusRef = useRef<UpdaterStatus | null>(null)

  useEffect(() => {
    let unsubscribe: (() => void) | null = null
    let active = true

    window.api.updater
      .getSnapshot()
      .then((snap) => {
        if (!active) return
        notify(snap, lastStatusRef.current)
        lastStatusRef.current = snap.status
      })
      .catch(() => {
        if (!active) return
        // This should never fail in a healthy Electron build, but avoid crashing the UI.
      })

    unsubscribe = window.api.updater.onSnapshot((snap) => {
      if (!active) return
      notify(snap, lastStatusRef.current)
      lastStatusRef.current = snap.status
    })

    return () => {
      active = false
      if (unsubscribe) unsubscribe()
    }
  }, [])

  return null
}

