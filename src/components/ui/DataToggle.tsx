import { cx } from '../../lib/cx'

type DataToggleProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

// Data Toggle: un checkbox real (accesible) oculto con sr-only y dibujado como [ ] / [X]
export function DataToggle({ label, checked, onChange }: DataToggleProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span
        aria-hidden
        className={cx(
          'border px-1 font-display text-label-lg',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-hyper',
          checked ? 'border-phosphor text-phosphor shadow-glow' : 'border-slate-crt text-outline',
        )}
      >
        [{checked ? 'X' : ' '}]
      </span>
      <span className="font-display text-label-md uppercase">{label}</span>
    </label>
  )
}
