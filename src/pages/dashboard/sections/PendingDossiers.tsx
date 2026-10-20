import { DossierCard } from '../../../components/lab/DossierCard'
import type { Dossier } from '../../../components/lab/DossierCard'
import { SectionHeader } from '../../../components/ui/SectionHeader'
import { Tag } from '../../../components/ui/Tag'
import { pendingDossiers } from '../../../data/dashboard'

type PendingDossiersProps = {
  onAction: (dossier: Dossier) => void
}

export function PendingDossiers({ onAction }: PendingDossiersProps) {
  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        title="Expedientes pendientes"
        badge={<Tag tone="warning">{pendingDossiers.length} en espera</Tag>}
        aside="Archivador criogénico: gabinete-B"
      />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {pendingDossiers.map((dossier) => (
          <li key={dossier.id}>
            <DossierCard dossier={dossier} onAction={onAction} />
          </li>
        ))}
      </ul>
    </section>
  )
}
