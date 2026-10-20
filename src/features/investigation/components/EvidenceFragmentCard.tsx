import { Button } from '../../../components/ui/Button'
import { Icon } from '../../../components/ui/Icon'
import { Panel } from '../../../components/ui/Panel'
import { Stat } from '../../../components/ui/Stat'
import { Tag } from '../../../components/ui/Tag'
import type { EvidenceFragment } from '../domain/types'

// revealed → se ve la pista · next → se puede analizar · locked → hay que analizar el anterior
// unused → el caso terminó sin necesitarlo
export type FragmentState = 'revealed' | 'next' | 'locked' | 'unused'

type EvidenceFragmentCardProps = {
  fragment: EvidenceFragment
  state: FragmentState
  onAnalyze: () => void
}

const lockedMessages: Record<Exclude<FragmentState, 'revealed'>, string> = {
  next: 'Datos cifrados. Requiere análisis.',
  locked: 'Requiere analizar el fragmento anterior.',
  unused: 'Evidencia no utilizada en la identificación.',
}

// Un fragmento de evidencia. Reutiliza Panel (marco con cruces) y lo resalta al revelarse.
export function EvidenceFragmentCard({ fragment, state, onAnalyze }: EvidenceFragmentCardProps) {
  const revealed = state === 'revealed'

  return (
    <Panel featured={revealed} code={`Fragmento ${fragment.code}`} title={fragment.title}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-1">
          {fragment.unlockCost === 0 && <Tag tone="phosphor">Disponible desde el inicio</Tag>}
          {fragment.unlockCost > 0 && <Tag tone={revealed ? 'neutral' : 'amber'}>Coste: -{fragment.unlockCost} pts</Tag>}
          {fragment.optional && <Tag tone="warning">Evidencia opcional</Tag>}
        </div>

        {revealed ? (
          <>
            <p className="text-body-md text-on-surface">{fragment.clue}</p>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
              {fragment.readings.map((reading) => (
                <Stat key={reading.label} boxed label={reading.label} value={reading.value} tone="phosphor" />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-body-sm text-outline">
              <Icon name="lock" size={16} />
              {lockedMessages[state]}
            </p>
            {state === 'next' && (
              <Button variant="ghost" size="sm" onClick={onAnalyze}>
                [Analizar · -{fragment.unlockCost} pts]
              </Button>
            )}
          </div>
        )}
      </div>
    </Panel>
  )
}
