import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Stat } from '../../../components/ui/Stat'
import { Tag } from '../../../components/ui/Tag'
import type { TagTone } from '../../../components/ui/Tag'
import type { ResurrectionRank, Revelation } from '../domain/types'

type ResurrectionResultProps = {
  revelation: Revelation
  rank: ResurrectionRank
  score: number
  attemptsUsed: number
  fragmentsUsed: number
  onRetry: () => void
  onNext: () => void
}

const ranks: Record<ResurrectionRank, { label: string; tone: TagTone; description: string }> = {
  perfect: { label: 'Resurrección perfecta', tone: 'phosphor', description: 'Identificación temprana, sin errores y con pocas ayudas.' },
  stable: { label: 'Resurrección estable', tone: 'amber', description: 'Identificación correcta después de analizar varias evidencias.' },
  assisted: { label: 'Resurrección asistida', tone: 'warning', description: 'Se necesitaron varias ayudas o intentos para acertar.' },
  failed: { label: 'Registro degradado', tone: 'danger', description: 'Se agotaron los intentos. Revisa las evidencias para aprender de este caso.' },
}

// Ficha final: aparece al resolver o al agotar los intentos (el fracaso también revela información)
export function ResurrectionResult({ revelation, rank, score, attemptsUsed, fragmentsUsed, onRetry, onNext }: ResurrectionResultProps) {
  const failed = rank === 'failed'

  return (
    <Card padding="lg">
      <div className="flex flex-col gap-1">
        <Tag tone={ranks[rank].tone} className="self-start">
          {ranks[rank].label}
        </Tag>
        <p className="font-display text-label-sm uppercase text-on-surface-variant">
          #{String(revelation.pokemonId).padStart(3, '0')} · {revelation.genus}
        </p>
        <h2 className="font-display text-headline-lg uppercase text-phosphor glow-text">{revelation.name}</h2>
        <p className="text-body-md text-on-surface">{revelation.summary}</p>
        <p className="text-body-sm text-on-surface-variant">{ranks[rank].description}</p>
      </div>

      <div className="grid grid-cols-3 gap-1">
        <Stat boxed label="Puntuación" value={`${score} pts`} tone={failed ? 'muted' : 'phosphor'} />
        <Stat boxed label="Intentos" value={attemptsUsed} />
        <Stat boxed label="Fragmentos" value={fragmentsUsed} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={onNext}>Siguiente expediente</Button>
        <Button variant="secondary" onClick={onRetry}>
          Repetir caso
        </Button>
      </div>
    </Card>
  )
}
