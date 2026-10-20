import { Badge } from '../ui/Badge'

export function LabHeader() {
  return (
    <header className="flex flex-col gap-3 border-b border-slate-crt px-4 py-3 md:flex-row md:items-center md:justify-between lg:px-6">
      <div>
        <p className="font-display text-label-sm uppercase text-outline">SEC-00 // Mainframe</p>
        <h1 className="font-display text-headline-xl-mobile uppercase text-phosphor glow-text lg:text-headline-xl">
          Paleo-Terminal OS
        </h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge label="Status" value="Online" />
        <Badge label="Threat" value="Apex" tone="amber" />
      </div>
    </header>
  )
}
