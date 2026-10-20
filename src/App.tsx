import { useState } from 'react'
import { InvestigationPage } from './features/investigation/InvestigationPage'
import { cases } from './features/investigation/data/cases'
import { DashboardLayout } from './layout/dashboard/DashboardLayout'
import { DashboardPage } from './pages/dashboard/DashboardPage'

// Navegación mínima con estado mientras no haya router:
// null = laboratorio principal, número = índice del expediente abierto
function App() {
  const [caseIndex, setCaseIndex] = useState<number | null>(null)
  const activeCase = caseIndex === null ? null : cases[caseIndex]

  return (
    <DashboardLayout>
      {activeCase ? (
        <InvestigationPage
          // key: al cambiar de caso React crea la página de nuevo y su estado empieza limpio
          key={activeCase.id}
          caseData={activeCase}
          onBack={() => setCaseIndex(null)}
          onNextCase={() => setCaseIndex((current) => ((current ?? 0) + 1) % cases.length)}
        />
      ) : (
        <DashboardPage onOpenCase={() => setCaseIndex(0)} />
      )}
    </DashboardLayout>
  )
}

export default App
