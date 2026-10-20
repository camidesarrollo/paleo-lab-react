import { Icon } from '../../components/ui/Icon'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { SegmentMeter } from '../../components/ui/SegmentMeter'
import { Stat } from '../../components/ui/Stat'
import { StatusDot } from '../../components/ui/StatusDot'
import { Tag } from '../../components/ui/Tag'
import type { TagTone } from '../../components/ui/Tag'
import { labModules, labStatus } from '../../data/dashboard'
import type { ModuleState } from '../../data/dashboard'

type TopbarProps = {
  menuOpen: boolean
  onMenuClick: () => void
}

const moduleTones: Record<ModuleState, TagTone> = {
  active: 'phosphor',
  locked: 'neutral',
  synced: 'phosphor',
}

// Barra superior: marca + nivel arriba; progreso, energía y módulos abajo.
// Es sticky (no fixed): ocupa su propio espacio y no hace falta compensar con padding-top.
export function Topbar({ menuOpen, onMenuClick }: TopbarProps) {
  const { pokedex, energy } = labStatus
  const pokedexPercent = (pokedex.found / pokedex.total) * 100

  return (
    <header className="sticky top-0 z-20 flex flex-col gap-2 border-b border-slate-crt bg-surface-container-lowest/95 px-4 py-3 backdrop-blur-md lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Abrir navegación"
            aria-expanded={menuOpen}
            aria-controls="sidebar"
            className="flex cursor-pointer border border-slate-crt p-1 text-phosphor hover:border-phosphor focus-visible:outline-2 focus-visible:outline-hyper lg:hidden"
          >
            <Icon name="menu" />
          </button>
          <Icon name="genetics" size={32} className="hidden text-phosphor sm:block" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-display text-headline-sm uppercase text-primary-fixed-dim">{labStatus.version}</span>
              <StatusDot motion="pulse" />
            </div>
            <span className="font-display text-label-sm uppercase text-on-surface-variant">{labStatus.sector}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden flex-col items-end md:flex">
            <span className="font-display text-label-sm uppercase text-secondary-fixed">{labStatus.level}</span>
            <span className="text-body-sm text-on-surface-variant">{labStatus.nextLevel}</span>
          </div>
          <span className="flex size-8 items-center justify-center bg-primary text-on-primary">
            <Icon name="person" size={18} label="Perfil del investigador" />
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-full sm:w-72">
            <ProgressBar
              label="Reconstrucción Pokédex:"
              value={pokedex.found}
              max={pokedex.total}
              valueText={`${pokedex.found} / ${pokedex.total} (${pokedexPercent.toFixed(1)}%)`}
            />
          </div>
          <div className="flex items-center gap-2">
            <Stat label="Energía núcleo:" value={`${energy.value}/${energy.max} ⚡ (${energy.regen})`} tone="amber" />
            <SegmentMeter label="Energía del núcleo" value={energy.value} max={energy.max} tone="amber" />
          </div>
        </div>

        <ul className="hidden flex-wrap items-center gap-1 xl:flex">
          {labModules.map((module) => (
            <li key={module.label}>
              <Tag tone={moduleTones[module.state]}>
                {module.state === 'locked' ? <Icon name="lock" size={12} /> : <StatusDot size="sm" />}
                {module.label}
              </Tag>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
