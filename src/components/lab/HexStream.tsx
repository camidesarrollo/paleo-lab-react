export type HexRow = {
  address: string
  bytes: string
  status: string
  tone: 'phosphor' | 'amber' | 'error'
}

type HexStreamProps = {
  rows: HexRow[]
}

const tones: Record<HexRow['tone'], string> = {
  phosphor: 'text-phosphor',
  amber: 'text-secondary',
  error: 'text-error',
}

// Volcado hexadecimal: dirección + bytes a la izquierda, estado del sector a la derecha
export function HexStream({ rows }: HexStreamProps) {
  return (
    <ul className="space-y-0.5 bg-surface-container-lowest p-1 font-mono text-label-sm">
      {rows.map((row) => (
        <li key={row.address} className="flex justify-between gap-2">
          <span className="text-primary-fixed-dim">
            {row.address}: {row.bytes}
          </span>
          <span className={tones[row.tone]}>{row.status}</span>
        </li>
      ))}
    </ul>
  )
}
