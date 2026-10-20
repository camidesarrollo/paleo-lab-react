import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Icon } from '../../../components/ui/Icon'
import { SectionHeader } from '../../../components/ui/SectionHeader'
import { StepCard } from '../../../components/ui/StepCard'
import { tutorialSteps } from '../../../data/dashboard'

type TutorialStepsProps = {
  onClose: () => void
}

export function TutorialSteps({ onClose }: TutorialStepsProps) {
  return (
    <Card padding="lg">
      <SectionHeader
        size="md"
        title="Protocolo de arranque // tutorial de 4 pasos"
        icon={<Icon name="terminal" size={28} className="text-phosphor" />}
        aside={
          <Button variant="ghost" size="sm" onClick={onClose}>
            [Cerrar asistente]
          </Button>
        }
      />
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tutorialSteps.map((step) => (
          <StepCard key={step.id} title={step.title} description={step.description} tone={step.tone} />
        ))}
      </ol>
    </Card>
  )
}
