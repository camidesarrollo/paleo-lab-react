import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  // Ícono o LED a la izquierda del título
  icon?: ReactNode
  // Etiqueta junto al título, por ejemplo <Tag>3 EN ESPERA</Tag>
  badge?: ReactNode
  // Contenido a la derecha: un texto, un botón, filtros…
  aside?: ReactNode
  level?: 2 | 3
  size?: 'sm' | 'md'
}

// Encabezado de bloque: [ícono] TÍTULO [badge] ·········· [aside]
// En móvil el aside baja debajo del título.
export function SectionHeader({ title, subtitle, icon, badge, aside, level = 2, size = 'sm' }: SectionHeaderProps) {
  const Heading = level === 2 ? 'h2' : 'h3'

  return (
    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2">
        {icon}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <Heading
              className={cx(
                'font-display uppercase text-primary',
                size === 'md' ? 'text-headline-md' : 'text-headline-sm',
              )}
            >
              {title}
            </Heading>
            {badge}
          </div>
          {subtitle && <span className="text-body-sm text-on-surface-variant">{subtitle}</span>}
        </div>
      </div>
      {aside && <div className="font-display text-label-sm uppercase text-on-surface-variant">{aside}</div>}
    </div>
  )
}
