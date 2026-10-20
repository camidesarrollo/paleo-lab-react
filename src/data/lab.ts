// Datos de ejemplo; más adelante pueden venir de una API

export type LogLevel = 'ok' | 'info' | 'warn'

export type LogEntry = {
  time: string
  level: LogLevel
  message: string
}

export type Readout = {
  label: string
  value: string
  status: 'ok' | 'warn'
}

export type GenomeSample = {
  label: string
  integrity: number
  gaps: number[]
}

export const specimen = 'SPECIMEN_07 // VELOCIRAPTOR'

export const cryoReadouts: Readout[] = [
  { label: 'Core temp', value: '-196.4°C', status: 'ok' },
  { label: 'Neural sync', value: '87.2%', status: 'ok' },
  { label: 'Cellular decay', value: '12.9%', status: 'warn' },
]

export const genomeSamples: GenomeSample[] = [
  { label: 'SEQ_A // Mitochondrial', integrity: 92.4, gaps: [7, 19] },
  { label: 'SEQ_B // Nuclear', integrity: 71.8, gaps: [3, 12, 13, 21] },
  { label: 'SEQ_C // Ribosomal', integrity: 58.3, gaps: [9, 16] },
]

export const systemLogs: LogEntry[] = [
  { time: '04:12:07', level: 'ok', message: 'CRYO_LOCK ENGAGED' },
  { time: '04:12:09', level: 'info', message: 'LOADING GENOME BANK 3/7' },
  { time: '04:12:15', level: 'warn', message: 'SEQ_B GAP DETECTED @ 12-13' },
  { time: '04:12:22', level: 'info', message: 'VOCAL SYNTH CALIBRATED' },
  { time: '04:12:30', level: 'ok', message: 'NEURAL LINK STABLE' },
]

// Onda de llamada sintetizada: valores entre -1 y 1
export const vocalWaveform = Array.from({ length: 120 }, (_, i) => {
  const t = i / 119
  return Math.sin(t * 40) * Math.sin(t * Math.PI) * 0.8 + Math.sin(t * 97) * 0.15
})
