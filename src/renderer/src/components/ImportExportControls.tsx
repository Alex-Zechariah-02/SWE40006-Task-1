import { useState } from 'react'
import type { Assignment } from '../types/assignment'
import { exportAssignmentsJson, parseImportedJson } from '../services/storage'
import ConfirmDialog from './ConfirmDialog'
import { toast } from './ToastContainer'

interface ImportExportControlsProps {
  assignments: Assignment[]
  onImport: (assignments: Assignment[]) => void
}

export default function ImportExportControls({
  assignments,
  onImport,
}: ImportExportControlsProps) {
  const [pendingImport, setPendingImport] = useState<Assignment[] | null>(null)

  async function handleExport() {
    try {
      const json = exportAssignmentsJson(assignments)
      const result = await window.api.exportFile(
        json,
        'acadence-assignments.json',
      )
      if (result) {
        toast.success('Assignments exported successfully.')
      }
    } catch {
      toast.error('Failed to export assignments.')
    }
  }

  async function handleImport() {
    try {
      const content = await window.api.importFile()
      if (!content) return
      const result = parseImportedJson(content)
      if (result.error || !result.data) {
        toast.error(result.error ?? 'Failed to parse the imported file.')
        return
      }
      setPendingImport(result.data)
    } catch {
      toast.error('Failed to import assignments.')
    }
  }

  return (
    <div className="import-export-controls">
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-secondary btn-sm" onClick={handleExport}>
          Export assignments
        </button>
        <button className="btn btn-secondary btn-sm" onClick={handleImport}>
          Import assignments
        </button>
      </div>

      <ConfirmDialog
        open={!!pendingImport}
        title="Import assignments"
        message={`Import ${pendingImport?.length ?? 0} assignment(s)? This will replace your current data.`}
        confirmLabel="Import"
        variant="default"
        onConfirm={() => {
          if (pendingImport) {
            onImport(pendingImport)
            toast.success(
              `Imported ${pendingImport.length} assignment(s) successfully.`,
            )
          }
          setPendingImport(null)
        }}
        onCancel={() => setPendingImport(null)}
      />
    </div>
  )
}
