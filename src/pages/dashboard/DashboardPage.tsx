import { useState } from 'react'
import type { Dossier } from '../../components/lab/DossierCard'
import type { Fragment } from '../../components/lab/FragmentCard'
import { Grid, GridItem } from '../../components/ui/Grid'
import { useToast } from '../../components/ui/toast-context'
import { activeDossier } from '../../data/dashboard'
import { ActiveDossier } from './sections/ActiveDossier'
import { ConsoleStatusBar } from './sections/ConsoleStatusBar'
import type { SimState } from './sections/ConsoleStatusBar'
import { FragmentTray } from './sections/FragmentTray'
import { IncubatorStatus } from './sections/IncubatorStatus'
import { PendingDossiers } from './sections/PendingDossiers'
import { RecentResurrections } from './sections/RecentResurrections'
import { SubsoilDiagnostics } from './sections/SubsoilDiagnostics'
import { TutorialSteps } from './sections/TutorialSteps'

// Página del laboratorio principal.
// Guarda el estado compartido entre secciones (simState) y decide qué pasa con cada acción.
// Las secciones solo muestran cosas y avisan con callbacks (onAction, onStartProtocol…).
type DashboardPageProps = {
  onOpenCase: () => void
}

export function DashboardPage({ onOpenCase }: DashboardPageProps) {
  const [simState, setSimState] = useState<SimState>('active')
  const toast = useToast()

  function changeSimState(next: SimState) {
    setSimState(next)
    if (next === 'sync') {
      toast({
        tone: 'success',
        title: 'Sincronización exitosa',
        message: 'Base de datos regional Kanto Pokédex v2. 14 especímenes conectados.',
      })
    }
    if (next === 'error') {
      toast({ tone: 'error', title: 'Interferencia en señal PokeAPI', message: 'Protocolos en modo aislado.' })
    }
  }

  function startProtocol() {
    toast({
      tone: 'info',
      title: 'Iniciando protocolo',
      message: `Abriendo ${activeDossier.code}. Identidad bloqueada hasta completar la investigación.`,
    })
    onOpenCase()
  }

  function handleDossier(dossier: Dossier) {
    toast({ title: dossier.code, message: `Acción ${dossier.action} en cola.` })
  }

  function handleFragment(fragment: Fragment) {
    toast({ title: fragment.code, message: `${fragment.action}: procesando fragmento…` })
  }

  return (
    <div className="flex flex-col gap-6">
      <ConsoleStatusBar state={simState} onStateChange={changeSimState} />

      {simState === 'tutorial' && <TutorialSteps onClose={() => setSimState('active')} />}

      {/* Mesa de trabajo: 8 columnas de expedientes + 4 de telemetría en desktop */}
      <Grid columns={{ base: 1, lg: 12 }}>
        <GridItem span={{ lg: 8 }} className="flex flex-col gap-6">
          <ActiveDossier offline={simState === 'error'} onStartProtocol={startProtocol} />
          <PendingDossiers onAction={handleDossier} />
        </GridItem>
        <GridItem span={{ lg: 4 }} className="flex flex-col gap-6">
          <RecentResurrections />
          <SubsoilDiagnostics />
          <IncubatorStatus />
        </GridItem>
      </Grid>

      <FragmentTray onAction={handleFragment} />
    </div>
  )
}
