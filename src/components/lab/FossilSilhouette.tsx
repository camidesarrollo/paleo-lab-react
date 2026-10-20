type FossilSilhouetteProps = {
  label: string
  tag: string
}

// Costillas que separan las cámaras de la concha: [x1, y1, x2, y2]
const ribs = [
  [80, 18, 80, 44],
  [120, 36, 102, 58],
  [142, 80, 116, 82],
  [124, 124, 104, 108],
  [76, 138, 78, 114],
  [34, 110, 56, 98],
]

// Silueta de amonite reconstruida en un visor octogonal.
// En SVG, para rotar un elemento sobre su propio centro hacen falta
// origin-center + [transform-box:fill-box].
export function FossilSilhouette({ label, tag }: FossilSilhouetteProps) {
  return (
    <div className="relative flex size-48 shrink-0 items-center justify-center octagon bg-surface-container-lowest p-2 sm:size-56">
      <svg
        viewBox="0 0 160 160"
        role="img"
        aria-label={label}
        className="size-full text-phosphor transition-transform duration-700 hover:rotate-6"
      >
        <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" className="text-outline-variant opacity-60" />
        <circle
          cx="80"
          cy="80"
          r="64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="10 4"
          className="origin-center animate-orbit text-secondary opacity-40 [transform-box:fill-box]"
        />
        <path
          d="M 80 18 A 62 62 0 1 1 24 96 A 48 48 0 1 1 68 136 A 36 36 0 1 1 114 96 A 24 24 0 1 1 80 66 A 14 14 0 1 1 76 88"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          className="drop-shadow-[0_0_8px_var(--color-phosphor)]"
        />
        {ribs.map(([x1, y1, x2, y2]) => (
          <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" className="text-secondary" />
        ))}
        {/* Fallas de ADN corrupto */}
        <rect x="30" y="40" width="8" height="2" className="animate-pulse fill-secondary" />
        <rect x="110" y="110" width="14" height="2" className="animate-pulse fill-error" />
        <rect x="70" y="70" width="6" height="6" className="origin-center animate-ping fill-phosphor [transform-box:fill-box]" />
        <circle cx="82" cy="80" r="7" className="fill-secondary opacity-90" />
        <circle cx="82" cy="80" r="3" className="fill-surface" />
      </svg>
      <span className="absolute bottom-8 bg-surface-container-highest/90 px-1 py-0.5 font-display text-label-sm text-primary">
        {tag}
      </span>
    </div>
  )
}
