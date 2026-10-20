import type { ButtonHTMLAttributes } from 'react'
import { cx } from '../../lib/cx'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
}

// Cada variante es un string de clases: así se agregan variantes sin tocar el JSX.
// enabled:hover: hace que el hover no cambie nada cuando el botón está deshabilitado.
const variants: Record<Variant, string> = {
  // Revive / Initialize: verde sólido con brillo; en hover cambia a ámbar con parpadeo
  primary:
    'bg-phosphor text-void shadow-glow enabled:hover:bg-amber enabled:hover:shadow-glow-amber enabled:hover:animate-flicker',
  // Abort / Vent: transparente con borde ámbar
  secondary: 'border border-amber text-amber enabled:hover:bg-amber/10',
  // Acción discreta dentro de tarjetas: [ANALIZAR], [PURGAR]…
  ghost: 'bg-surface-container-high text-primary enabled:hover:bg-phosphor enabled:hover:text-void',
}

const sizes: Record<Size, string> = {
  sm: 'px-2 py-1 text-label-sm',
  md: 'px-4 py-2 text-label-lg',
  lg: 'px-6 py-2 text-headline-sm',
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        'inline-flex cursor-pointer items-center justify-center gap-2 font-display uppercase transition-colors duration-100',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hyper',
        'disabled:cursor-not-allowed disabled:opacity-50',
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    >
      {variant === 'secondary' ? <>[ {children} ]</> : children}
    </button>
  )
}
