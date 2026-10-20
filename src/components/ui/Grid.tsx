import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

// Grid del DESIGN.md: rack de instrumentos de 1 / 2 / 12 columnas.
//
// IMPORTANTE: Tailwind solo genera las clases que encuentra ESCRITAS COMPLETAS en el código.
// Algo como `lg:col-span-${n}` no funciona, por eso cada clase aparece literal en estos mapas.

type Breakpoint = 'base' | 'md' | 'lg'
type Cols = 1 | 2 | 3 | 4 | 6 | 12
type Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full'

const colClasses: Record<Breakpoint, Record<Cols, string>> = {
  base: { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 6: 'grid-cols-6', 12: 'grid-cols-12' },
  md: { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 6: 'md:grid-cols-6', 12: 'md:grid-cols-12' },
  lg: { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 6: 'lg:grid-cols-6', 12: 'lg:grid-cols-12' },
}

const spanClasses: Record<Breakpoint, Record<Span, string>> = {
  base: {
    1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4', 5: 'col-span-5', 6: 'col-span-6',
    7: 'col-span-7', 8: 'col-span-8', 9: 'col-span-9', 10: 'col-span-10', 11: 'col-span-11', 12: 'col-span-12',
    full: 'col-span-full',
  },
  md: {
    1: 'md:col-span-1', 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4', 5: 'md:col-span-5', 6: 'md:col-span-6',
    7: 'md:col-span-7', 8: 'md:col-span-8', 9: 'md:col-span-9', 10: 'md:col-span-10', 11: 'md:col-span-11', 12: 'md:col-span-12',
    full: 'md:col-span-full',
  },
  lg: {
    1: 'lg:col-span-1', 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4', 5: 'lg:col-span-5', 6: 'lg:col-span-6',
    7: 'lg:col-span-7', 8: 'lg:col-span-8', 9: 'lg:col-span-9', 10: 'lg:col-span-10', 11: 'lg:col-span-11', 12: 'lg:col-span-12',
    full: 'lg:col-span-full',
  },
}

type GridProps = {
  columns?: Partial<Record<Breakpoint, Cols>>
  as?: 'div' | 'main' | 'section'
  className?: string
  children: ReactNode
}

// Gutters del diseño: 1rem, y 1.5rem en pantallas grandes
export function Grid({ columns = { base: 1, md: 2, lg: 12 }, as: Tag = 'div', className, children }: GridProps) {
  return (
    <Tag
      className={cx(
        'grid gap-4 lg:gap-6',
        columns.base && colClasses.base[columns.base],
        columns.md && colClasses.md[columns.md],
        columns.lg && colClasses.lg[columns.lg],
        className,
      )}
    >
      {children}
    </Tag>
  )
}

type GridItemProps = {
  span?: Partial<Record<Breakpoint, Span>>
  className?: string
  children: ReactNode
}

// <GridItem span={{ md: 'full', lg: 6 }}> ocupa todo en tablet y la mitad en desktop
export function GridItem({ span = {}, className, children }: GridItemProps) {
  return (
    <div
      className={cx(
        span.base && spanClasses.base[span.base],
        span.md && spanClasses.md[span.md],
        span.lg && spanClasses.lg[span.lg],
        className,
      )}
    >
      {children}
    </div>
  )
}
