import { useEffect, useState } from 'react'
import { cx } from '../../lib/cx'

type Size = 'sm' | 'md' | 'lg'

type SpinnerProps = {
  label?: string
  showLabel?: boolean
  size?: Size
}

// Fotogramas del spinner clásico de terminal
const frames = ['|', '/', '-', '\\']

const sizes: Record<Size, string> = {
  sm: 'text-label-md',
  md: 'text-headline-sm',
  lg: 'text-headline-lg',
}

// Spinner ASCII [|] [/] [-] [\]. Con "reducir movimiento" activado se queda quieto.
export function Spinner({ label = 'Procesando', showLabel = true, size = 'md' }: SpinnerProps) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setFrame((current) => (current + 1) % frames.length), 120)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <span role="status" className="inline-flex items-center gap-2 font-display uppercase text-phosphor">
      <span aria-hidden className={cx('glow-text', sizes[size])}>
        [{frames[frame]}]
      </span>
      <span className={showLabel ? 'text-label-md' : 'sr-only'}>{label}</span>
    </span>
  )
}
