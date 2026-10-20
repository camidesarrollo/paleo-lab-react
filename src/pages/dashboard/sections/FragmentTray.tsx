import { useState } from 'react'
import { FragmentCard } from '../../../components/lab/FragmentCard'
import type { Fragment, FragmentType } from '../../../components/lab/FragmentCard'
import { ButtonGroup } from '../../../components/ui/ButtonGroup'
import { Card } from '../../../components/ui/Card'
import { Icon } from '../../../components/ui/Icon'
import { SectionHeader } from '../../../components/ui/SectionHeader'
import { fragments } from '../../../data/dashboard'

type Filter = 'all' | FragmentType

const filterOptions: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: `[Todos (${fragments.length})]` },
  { value: 'audio', label: '[Audio-clips]' },
  { value: 'stats', label: '[Estadísticas]' },
  { value: 'hex', label: '[Código hex]' },
]

type FragmentTrayProps = {
  onAction: (fragment: Fragment) => void
}

// Bandeja de fragmentos con filtro.
// El filtro es estado LOCAL: solo le importa a esta sección, así que vive aquí y no en la página.
export function FragmentTray({ onAction }: FragmentTrayProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? fragments : fragments.filter((fragment) => fragment.type === filter)

  return (
    <Card>
      <SectionHeader
        title="Fragmentos sueltos y datos huérfanos"
        subtitle="Paquetes residuales de búsqueda PokeAPI // banco de memoria temporal"
        icon={<Icon name="dns" size={22} className="text-phosphor" />}
        aside={<ButtonGroup label="Filtrar fragmentos" options={filterOptions} value={filter} onChange={setFilter} />}
      />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {visible.map((fragment) => (
          <li key={fragment.id}>
            <FragmentCard fragment={fragment} onAction={onAction} />
          </li>
        ))}
      </ul>
    </Card>
  )
}
