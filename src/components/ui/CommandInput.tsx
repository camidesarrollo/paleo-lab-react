import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cx } from '../../lib/cx'

type CommandInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'placeholder'> & {
  label: string
  prompt?: string
}

// Command Line Prompt: fondo void, regla inferior verde y prefijo SYS_ROOT:>
export function CommandInput({ label, prompt = 'SYS_ROOT:>', className, ...props }: CommandInputProps) {
  const id = useId()

  return (
    <div
      className={cx(
        'flex items-center gap-2 border-b border-phosphor bg-void px-3 py-2 focus-within:shadow-glow',
        className,
      )}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <span aria-hidden className="shrink-0 font-display text-label-lg text-phosphor glow-text">
        {prompt}
      </span>
      <div className="relative flex-1">
        {/* placeholder=" " permite usar peer-placeholder-shown para saber si está vacío */}
        <input
          id={id}
          type="text"
          placeholder=" "
          autoComplete="off"
          spellCheck={false}
          className="peer w-full bg-transparent text-body-md text-primary caret-phosphor outline-none"
          {...props}
        />
        {/* Cursor cuadrado: solo visible con el campo vacío y sin foco */}
        <span
          aria-hidden
          className="pointer-events-none invisible absolute inset-y-0 left-0 my-auto h-4 w-2 animate-blink bg-phosphor peer-placeholder-shown:visible peer-focus:invisible"
        />
      </div>
    </div>
  )
}
