import { RankedItem } from '../../../components/lab/RankedItem'
import { Card } from '../../../components/ui/Card'
import { SectionHeader } from '../../../components/ui/SectionHeader'
import { StatusDot } from '../../../components/ui/StatusDot'
import { resurrections } from '../../../data/dashboard'

export function RecentResurrections() {
  return (
    <Card>
      <SectionHeader level={3} title="Resurrecciones recientes" icon={<StatusDot />} aside="[Histórico]" />
      <ul className="flex flex-col gap-1">
        {resurrections.map((entry) => (
          <li key={entry.id}>
            <RankedItem entry={entry} />
          </li>
        ))}
      </ul>
      <p className="text-center font-display text-label-sm uppercase text-outline">
        Sync pokédex local: {resurrections.length} especímenes re-vitalizados
      </p>
    </Card>
  )
}
