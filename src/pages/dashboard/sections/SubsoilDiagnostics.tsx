import { EqualizerBars } from '../../../components/lab/EqualizerBars'
import { LogStream } from '../../../components/lab/LogStream'
import { Card } from '../../../components/ui/Card'
import { Icon } from '../../../components/ui/Icon'
import { StatusDot } from '../../../components/ui/StatusDot'
import { diagnosticsLogs, equalizerBars } from '../../../data/dashboard'

// Log narrativo tipo teletipo + vista previa de la síntesis acústica
export function SubsoilDiagnostics() {
  return (
    <Card className="flex-1">
      <div className="flex items-center justify-between gap-2 font-display text-label-sm uppercase">
        <h3 className="flex items-center gap-1.5 text-secondary">
          <StatusDot tone="amber" size="sm" motion="ping" />
          Diagnóstico_subsuelo
        </h3>
        <span className="text-on-surface-variant">FREQ: 8.4 kHz</span>
      </div>

      <div className="min-h-45 bg-void p-2">
        <LogStream logs={diagnosticsLogs} />
      </div>

      <div className="flex items-center gap-2 bg-surface-container-low p-1">
        <Icon name="graphic_eq" className="text-secondary" />
        <EqualizerBars bars={equalizerBars} className="flex-1" />
        <span className="font-display text-label-sm text-on-surface-variant">CRY_SYNTH: OK</span>
      </div>
    </Card>
  )
}
