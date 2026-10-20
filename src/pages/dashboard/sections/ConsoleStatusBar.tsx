import { ButtonGroup } from '../../../components/ui/ButtonGroup'
import { Card } from '../../../components/ui/Card'
import { StatusDot } from '../../../components/ui/StatusDot'
import { Tag } from '../../../components/ui/Tag'

export type SimState = 'active' | 'tutorial' | 'sync' | 'error'

const simOptions: Array<{ value: SimState; label: string }> = [
  { value: 'active', label: '[Estado activo]' },
  { value: 'tutorial', label: '[Tutorial vacío]' },
  { value: 'sync', label: '[Sync nacional]' },
  { value: 'error', label: '[Signal_fail]' },
]

type ConsoleStatusBarProps = {
  state: SimState
  onStateChange: (state: SimState) => void
}

// Consola superior: estado de la mesa de trabajo + selector para simular estados de la UI
export function ConsoleStatusBar({ state, onStateChange }: ConsoleStatusBarProps) {
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Tag tone="phosphor">
            <StatusDot motion="pulse" />
            {'MESA_DE_TRABAJO // SEC-04 ACTIVE'}
          </Tag>
          <p className="text-body-sm text-on-surface-variant">
            CANAL BIO-TELEMÉTRICO: <span className="font-bold text-secondary">ALPHA-779_PRIME</span>
          </p>
          <Tag>MODO: EXCAVACIÓN_IN_SITU</Tag>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display text-label-sm uppercase text-on-surface-variant">Simular_estado:</span>
          <ButtonGroup label="Simular estado" options={simOptions} value={state} onChange={onStateChange} />
        </div>
      </div>
    </Card>
  )
}
