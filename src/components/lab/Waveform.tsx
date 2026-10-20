type WaveformProps = {
  label: string
  points: number[]
}

const ticks = Array.from({ length: 11 }, (_, i) => i * 10)

// Oscilloscope: SVG en coordenadas 0–100 que se estira al ancho del panel.
// vectorEffect="non-scaling-stroke" mantiene las líneas en 1px aunque se estire.
export function Waveform({ label, points }: WaveformProps) {
  const step = 100 / (points.length - 1)
  const path = points.map((value, i) => `${i * step},${50 - value * 40}`).join(' ')

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label={label} className="h-32 w-full bg-void">
      {ticks.map((x) => (
        <line key={`grid-${x}`} x1={x} x2={x} y1={0} y2={100} className="stroke-slate-crt" vectorEffect="non-scaling-stroke" />
      ))}
      <line x1={0} x2={100} y1={50} y2={50} className="stroke-outline-variant" vectorEffect="non-scaling-stroke" />
      {ticks.map((x) => (
        <line key={`tick-${x}`} x1={x} x2={x} y1={94} y2={100} className="stroke-outline" vectorEffect="non-scaling-stroke" />
      ))}
      <polyline
        points={path}
        fill="none"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
        className="stroke-phosphor drop-shadow-[0_0_2px_var(--color-phosphor)]"
      />
    </svg>
  )
}
