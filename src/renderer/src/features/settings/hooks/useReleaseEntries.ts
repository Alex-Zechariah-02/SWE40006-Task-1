import { useEffect, useState } from 'react'
import type { UpdateEntry } from '../../../types/update'
import { loadReleaseManifest } from '../../../services/release'

export function useReleaseEntries() {
  const [releaseEntries, setReleaseEntries] = useState<UpdateEntry[]>([])

  useEffect(() => {
    let active = true
    loadReleaseManifest().then((entries) => {
      if (active) setReleaseEntries(entries)
    })
    return () => {
      active = false
    }
  }, [])

  return releaseEntries
}
