import { Card } from '../../../components/ui/Card'
import { Stat } from '../../../components/ui/Stat'
import { incubator } from '../../../data/dashboard'

// Mini HUD de la cámara de incubación
export function IncubatorStatus() {
  return (
    <Card>
      <div className="flex items-center justify-between gap-2 font-display text-label-sm uppercase">
        <h3 className="text-on-surface-variant">{incubator.name}</h3>
        <span className="text-phosphor">{incubator.status}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Stat label="Fluido amniótico" value={incubator.fluid} />
        <Stat label="Sincro neural" value={incubator.neural} tone="amber" align="end" />
      </div>
    </Card>
  )
}
