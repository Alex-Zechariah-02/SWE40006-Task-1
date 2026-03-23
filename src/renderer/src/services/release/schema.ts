export function extractManifestEntries(data: unknown): unknown[] | null {
  if (!data || typeof data !== 'object') return null
  const entries = (data as { entries?: unknown }).entries
  return Array.isArray(entries) ? entries : null
}

