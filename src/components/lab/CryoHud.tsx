import type { Readout } from '../../data/lab'
import { cx } from '../../lib/cx'

type CryoHudProps = {
  specimen: string
  readouts: Readout[]
}

// Cryo-Chamber HUD: visor octogonal con barrido de scanline y medidores debajo
export function CryoHud({ specimen, readouts }: CryoHudProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      {/* Dos octágonos superpuestos: el de afuera hace de borde de 1px */}
      <div className="relative mx-auto aspect-square w-full max-w-sm octagon bg-phosphor/40">
        <div className="absolute inset-px octagon overflow-hidden bg-void">
          <div className="absolute inset-x-0 top-1/2 h-px bg-slate-crt" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-slate-crt" />
          <div className="absolute inset-x-0 h-0.5 animate-sweep bg-phosphor/70 shadow-glow" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
            <p className="font-display text-label-sm uppercase text-outline">Stasis field</p>
            <p className="font-display text-headline-sm uppercase text-phosphor glow-text">{specimen}</p>
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-2 border-t border-slate-crt pt-3">
        {readouts.map((readout) => (
          <div key={readout.label}>
            <dt className="font-display text-label-sm uppercase text-outline">{readout.label}</dt>
            <dd
              className={cx(
                'font-display text-headline-md glow-text',
                readout.status === 'warn' ? 'text-amber' : 'text-phosphor',
              )}
            >
              {readout.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
