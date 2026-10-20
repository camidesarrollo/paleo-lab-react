import type { ButtonHTMLAttributes } from 'react'
import { cx } from '../../lib/cx'

type Variant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

// Cada variante es un string de clases: así se agregan variantes sin tocar el JSX
const variants: Record<Variant, string> = {
  // Revive / Initialize: verde sólido con brillo; en hover cambia a ámbar con parpadeo
  primary:
    'bg-phosphor text-void shadow-glow hover:bg-amber hover:shadow-glow-amber hover:animate-flicker',
  // Abort / Vent: transparente con borde ámbar
  secondary: 'border border-amber text-amber hover:bg-amber/10',
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        'cursor-pointer px-4 py-2 font-display text-label-lg uppercase transition-colors duration-100',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hyper',
        variants[variant],
        className,
      )}
      {...props}
    >
      {variant === 'secondary' ? <>[ {children} ]</> : children}
    </button>
  )
}
