import { useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { CommandInput } from '../../../components/ui/CommandInput'

type HypothesisFormProps = {
  disabled?: boolean
  onSubmit: (hypothesis: string) => void
}

// Formulario para proponer una identidad. El texto vive aquí (estado local):
// a la página solo le importa la hipótesis enviada, no cada tecla.
export function HypothesisForm({ disabled = false, onSubmit }: HypothesisFormProps) {
  const [hypothesis, setHypothesis] = useState('')

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        if (!hypothesis.trim()) return
        onSubmit(hypothesis)
        setHypothesis('')
      }}
    >
      <CommandInput
        label="Proponer una identidad"
        prompt="ID_ESPECIE:>"
        value={hypothesis}
        disabled={disabled}
        onChange={(event) => setHypothesis(event.target.value)}
      />
      <Button type="submit" disabled={disabled || !hypothesis.trim()}>
        Analizar hipótesis
      </Button>
    </form>
  )
}
