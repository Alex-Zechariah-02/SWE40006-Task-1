import type { UpdateEntry } from '../../types/update'
import { DEFAULT_ENTRIES } from './defaults'
import { extractManifestEntries } from './schema'

export async function loadReleaseManifest(): Promise<UpdateEntry[]> {
  try {
    const res = await fetch('./release-manifest.json')
    if (res.ok) {
      const data: unknown = await res.json()
      const entries = extractManifestEntries(data)
      if (entries) return entries as UpdateEntry[]
    }
  } catch {
    // Use the bundled defaults when the manifest file is unavailable.
  }
  return DEFAULT_ENTRIES
}

export function getDefaultReleaseEntries(): UpdateEntry[] {
  return DEFAULT_ENTRIES
}

