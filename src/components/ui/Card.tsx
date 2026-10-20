import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

type CardProps = {
  as?: 'section' | 'article' | 'div' | 'aside'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
  children: ReactNode
}

const paddings: Record<NonNullable<CardProps['padding']>, string> = {
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-4 lg:p-6',
}

// Card: el contenedor base de cada bloque del dashboard.
// Solo pone el fondo, el borde y el espacio; el contenido (incluido el encabezado) lo decide quien lo usa.
// Para paneles de diagnóstico con cruces en las esquinas, usa Panel.
export function Card({ as: Tag = 'section', padding = 'md', className, children }: CardProps) {
  return (
    <Tag className={cx('flex flex-col gap-4 border border-slate-crt bg-surface-container-lowest', paddings[padding], className)}>
      {children}
    </Tag>
  )
}
