import { Card } from '../../../components/ui/Card'
import { ProgressBar } from '../../../components/ui/ProgressBar'
import { SegmentMeter } from '../../../components/ui/SegmentMeter'
import { Stat } from '../../../components/ui/Stat'
import { Tag } from '../../../components/ui/Tag'
import type { TagTone } from '../../../components/ui/Tag'
import type { InvestigationCase, InvestigationStatus } from '../domain/types'

type CaseHeaderProps = {
  caseData: InvestigationCase
  status: InvestigationStatus
  attemptsLeft: number
  score: number
}

const statuses: Record<InvestigationStatus, { label: string; tone: TagTone; heading: string }> = {
  'in-progress': { label: 'Estado: inestable', tone: 'warning', heading: 'Identidad desconocida' },
  solved: { label: 'Estado: restaurado', tone: 'phosphor', heading: 'Identidad restaurada' },
  failed: { label: 'Estado: degradado', tone: 'danger', heading: 'Registro degradado' },
}

// Encabezado del expediente: número, estado, intentos restantes y puntuación potencial
export function CaseHeader({ caseData, status, attemptsLeft, score }: CaseHeaderProps) {
  return (
    <Card padding="lg">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-label-md uppercase text-on-surface-variant">Expediente {caseData.number}</span>
            <Tag tone={statuses[status].tone}>{statuses[status].label}</Tag>
          </div>
          <h1 className="font-display text-headline-xl-mobile uppercase text-primary lg:text-headline-xl">{statuses[status].heading}</h1>
          <p className="text-body-sm text-on-surface-variant">Se ha recuperado un registro biológico parcialmente dañado.</p>
        </div>

        <div className="flex flex-wrap items-end gap-6">
          <Stat label="Dificultad" value={`${caseData.difficulty} / 5`} size="md" />
          <div className="flex flex-col gap-1">
            <span className="font-display text-label-sm uppercase text-on-surface-variant">
              Intentos: {attemptsLeft}/{caseData.maxAttempts}
            </span>
            <SegmentMeter
              label="Intentos restantes"
              value={attemptsLeft}
              max={caseData.maxAttempts}
              segments={caseData.maxAttempts}
              tone={attemptsLeft === 1 ? 'amber' : 'phosphor'}
            />
          </div>
          <div className="w-48">
            <ProgressBar
              label="Puntuación potencial"
              value={score}
              tone={score < 50 ? 'amber' : 'phosphor'}
              valueText={`${score} pts`}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
