import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

// Componentes de texto con la escala tipográfica del DESIGN.md.
// El nivel semántico (h1–h6) y el tamaño visual van separados:
// <Heading level={1} size="md"> es un h1 que se ve mediano.

type Tone = 'default' | 'muted' | 'phosphor' | 'amber'

const tones: Record<Tone, string> = {
  default: 'text-on-surface',
  muted: 'text-outline',
  phosphor: 'text-phosphor glow-text',
  amber: 'text-amber glow-text',
}

type Size = 'lg' | 'md' | 'sm'

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: Size | 'xl'
  tone?: Tone
  className?: string
  children: ReactNode
}

const headingSizes: Record<Size | 'xl', string> = {
  xl: 'text-headline-xl-mobile lg:text-headline-xl',
  lg: 'text-headline-lg',
  md: 'text-headline-md',
  sm: 'text-headline-sm',
}

export function Heading({ level = 2, size = 'lg', tone = 'phosphor', className, children }: HeadingProps) {
  const Tag = `h${level}` as const
  return <Tag className={cx('font-display uppercase', headingSizes[size], tones[tone], className)}>{children}</Tag>
}

type TextProps = {
  as?: 'p' | 'span' | 'div'
  size?: Size
  tone?: Tone
  className?: string
  children: ReactNode
}

const textSizes: Record<Size, string> = {
  lg: 'text-body-lg',
  md: 'text-body-md',
  sm: 'text-body-sm',
}

export function Text({ as: Tag = 'p', size = 'md', tone = 'default', className, children }: TextProps) {
  return <Tag className={cx('font-mono', textSizes[size], tones[tone], className)}>{children}</Tag>
}

type LabelProps = {
  as?: 'span' | 'p'
  size?: Size
  tone?: Tone
  className?: string
  children: ReactNode
}

const labelSizes: Record<Size, string> = {
  lg: 'text-label-lg',
  md: 'text-label-md',
  sm: 'text-label-sm',
}

export function Label({ as: Tag = 'span', size = 'md', tone = 'muted', className, children }: LabelProps) {
  return <Tag className={cx('font-display uppercase', labelSizes[size], tones[tone], className)}>{children}</Tag>
}

export function Code({ children }: { children: ReactNode }) {
  return <code className="border border-slate-crt bg-void px-1 text-body-sm text-phosphor">{children}</code>
}
