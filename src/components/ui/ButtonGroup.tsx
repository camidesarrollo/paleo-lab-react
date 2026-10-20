import { cx } from '../../lib/cx'

type Option<T extends string> = {
  value: T
  label: string
}

type ButtonGroupProps<T extends string> = {
  label: string
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
}

// Button Group: botones unidos donde uno queda seleccionado (aria-pressed).
// Es genérico: value solo acepta los valores declarados en options.
export function ButtonGroup<T extends string>({ label, options, value, onChange }: ButtonGroupProps<T>) {
  return (
    <div role="group" aria-label={label} className="inline-flex divide-x divide-slate-crt border border-slate-crt">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cx(
              'cursor-pointer px-3 py-1.5 font-display text-label-md uppercase transition-colors duration-100',
              'focus-visible:relative focus-visible:outline-2 focus-visible:outline-hyper',
              active ? 'bg-phosphor text-void' : 'text-outline hover:bg-surface-container hover:text-on-surface',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
