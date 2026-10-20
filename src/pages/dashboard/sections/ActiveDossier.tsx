import { CrtViewport } from '../../../components/lab/CrtViewport'
import { DnaHelixBar } from '../../../components/lab/DnaHelixBar'
import { FossilSilhouette } from '../../../components/lab/FossilSilhouette'
import { HexStream } from '../../../components/lab/HexStream'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Icon } from '../../../components/ui/Icon'
import { Stat } from '../../../components/ui/Stat'
import { StatusDot } from '../../../components/ui/StatusDot'
import { Tag } from '../../../components/ui/Tag'
import { activeDossier as dossier, hexRows, specimenStats } from '../../../data/dashboard'
import { cx } from '../../../lib/cx'

type ActiveDossierProps = {
  // En estado de error el expediente se atenúa y no se puede iniciar el protocolo
  offline?: boolean
  onStartProtocol: () => void
}

// Expediente activo: la pieza central del dashboard.
// Es pura composición: casi todo lo que contiene son componentes de ui/ y lab/.
export function ActiveDossier({ offline = false, onStartProtocol }: ActiveDossierProps) {
  return (
    <Card as="article" padding="lg" className={cx('transition-opacity', offline && 'opacity-40')}>
      <div aria-hidden className="flex items-center justify-between gap-2 font-display text-label-sm">
        <span className="text-primary-fixed-dim">+--[ACTIVE_EXPEDIENTE]--+</span>
        <span className="text-outline">{dossier.location}</span>
      </div>

      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div className="flex flex-col">
          <span className="flex items-center gap-1.5 font-display text-label-sm uppercase text-secondary">
            <StatusDot tone="amber" />
            {dossier.priority}
          </span>
          <h2 className="font-display text-headline-md uppercase text-primary">
            {dossier.code}
            {' // '}
            {dossier.title}
          </h2>
          <span className="text-body-sm text-on-surface-variant">{dossier.taxon}</span>
        </div>
        <div className="flex items-end gap-1 sm:flex-col">
          <Tag tone="phosphor" glow>
            {dossier.status}
          </Tag>
          <span className="font-display text-label-sm text-on-surface-variant">{dossier.hash}</span>
        </div>
      </div>

      <CrtViewport
        status="RADAR_FÓSIL: ESCANEO EN TIEMPO REAL"
        meta="RES_MATRIX: 256x256_CRT"
        footer={dossier.scanStatus}
        footerMeta={`ENERGÍA REQUERIDA: -${dossier.energyCost} ⚡`}
      >
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <FossilSilhouette tag={dossier.silhouetteTag} label="Silueta reconstruida del espécimen 138" />
          <div className="flex w-full max-w-sm flex-col gap-2">
            <DnaHelixBar label="Estructura helicoidal" integrity={dossier.viability} segments={6} gaps={[4]} />
            <HexStream rows={hexRows} />
            <div className="grid grid-cols-2 gap-1">
              {specimenStats.map((stat) => (
                <Stat key={stat.label} boxed {...stat} />
              ))}
            </div>
          </div>
        </div>
      </CrtViewport>

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex w-full items-center gap-4 sm:w-auto">
          <Stat label="Costo de protocolo:" value={`-${dossier.energyCost} ⚡ NÚCLEO`} tone="amber" size="md" />
          <div aria-hidden className="hidden h-8 w-px bg-surface-container-highest sm:block" />
          <Stat label="Probabilidad éxito:" value={dossier.successRate} tone="phosphor" size="md" />
        </div>
        <Button size="lg" className="w-full sm:w-auto" disabled={offline} onClick={onStartProtocol}>
          <Icon name="science" />
          Abrir expediente [iniciar protocolo de excavación]
        </Button>
      </div>
    </Card>
  )
}
