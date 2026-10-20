import { LogStream } from '../../components/lab/LogStream'
import { Alert } from '../../components/ui/Alert'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Grid, GridItem } from '../../components/ui/Grid'
import { SectionHeader } from '../../components/ui/SectionHeader'
import type { LogEntry, LogLevel } from '../../data/lab'
import { CaseHeader } from './components/CaseHeader'
import { EvidenceFragmentCard } from './components/EvidenceFragmentCard'
import type { FragmentState } from './components/EvidenceFragmentCard'
import { HypothesisForm } from './components/HypothesisForm'
import { IdentitySignal } from './components/IdentitySignal'
import { ResurrectionResult } from './components/ResurrectionResult'
import type { InvestigationCase, InvestigationEvent } from './domain/types'
import { useInvestigation } from './hooks/useInvestigation'

type InvestigationPageProps = {
  caseData: InvestigationCase
  onBack: () => void
  onNextCase: () => void
}

const eventLevels: Record<InvestigationEvent['kind'], LogLevel> = {
  start: 'info',
  reveal: 'ok',
  miss: 'error',
  repeat: 'warn',
  solved: 'ok',
  failed: 'warn',
}

// Pantalla "Expediente activo" (requerimientos.md, sección 7.02):
// fragmentos desbloqueables, formulario de hipótesis, intentos restantes y registro de evidencias.
export function InvestigationPage({ caseData, onBack, onNextCase }: InvestigationPageProps) {
  const investigation = useInvestigation(caseData)
  const { state, score, finished, nextFragment, revelation, lastEvent } = investigation

  const fragments = [...caseData.fragments].sort((a, b) => a.order - b.order)
  const fragmentState = (id: string): FragmentState => {
    if (state.revealedFragmentIds.includes(id)) return 'revealed'
    if (finished) return 'unused'
    return id === nextFragment?.id ? 'next' : 'locked'
  }

  const log: LogEntry[] = state.events.map((event) => ({
    time: `[EV-${String(event.id).padStart(2, '0')}]`,
    level: eventLevels[event.kind],
    message: event.message,
  }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Button variant="ghost" size="sm" onClick={onBack}>
          {'< Volver al laboratorio'}
        </Button>
      </div>

      <CaseHeader caseData={caseData} status={state.status} attemptsLeft={investigation.attemptsLeft} score={score} />

      <Grid columns={{ base: 1, lg: 12 }}>
        {/* Evidencias */}
        <GridItem span={{ lg: 7 }} className="flex flex-col gap-4">
          <SectionHeader title="Fragmentos de evidencia" aside="Analizar reduce la puntuación potencial" />
          {fragments.map((fragment) => (
            <EvidenceFragmentCard
              key={fragment.id}
              fragment={fragment}
              state={fragmentState(fragment.id)}
              onAnalyze={investigation.revealNext}
            />
          ))}
        </GridItem>

        {/* Identidad, hipótesis y registro */}
        <GridItem span={{ lg: 5 }} className="flex flex-col gap-4">
          <IdentitySignal revelation={revelation} />

          {revelation ? (
            <ResurrectionResult
              revelation={revelation}
              rank={investigation.rank}
              score={score}
              attemptsUsed={state.attemptsUsed}
              fragmentsUsed={state.status === 'failed' ? caseData.fragments.length : state.revealedFragmentIds.length}
              onRetry={investigation.reset}
              onNext={onNextCase}
            />
          ) : (
            <Card>
              <SectionHeader level={3} title="Proponer una identidad" />
              <HypothesisForm disabled={finished} onSubmit={investigation.submit} />
              {lastEvent?.kind === 'miss' && (
                <Alert tone="error" title="Hipótesis descartada">
                  {lastEvent.message} Te quedan {investigation.attemptsLeft} intentos.
                </Alert>
              )}
              {lastEvent?.kind === 'repeat' && <Alert tone="info">{lastEvent.message}</Alert>}
            </Card>
          )}

          <Card>
            <SectionHeader level={3} title="Registro de evidencias" />
            <div className="bg-void p-2">
              <LogStream logs={log} />
            </div>
          </Card>
        </GridItem>
      </Grid>
    </div>
  )
}
