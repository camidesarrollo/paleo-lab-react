import { useState } from 'react'
import { CryoHud } from '../../components/lab/CryoHud'
import { DnaHelixBar } from '../../components/lab/DnaHelixBar'
import { LabHeader } from '../../components/lab/LabHeader'
import { LogStream } from '../../components/lab/LogStream'
import { Waveform } from '../../components/lab/Waveform'
import { Button } from '../../components/ui/Button'
import { CommandInput } from '../../components/ui/CommandInput'
import { DataToggle } from '../../components/ui/DataToggle'
import { Panel } from '../../components/ui/Panel'
import { cryoReadouts, genomeSamples, specimen, systemLogs, vocalWaveform } from '../../data/lab'
import type { LogEntry, LogLevel } from '../../data/lab'

type SystemKey = 'cryoLock' | 'neuralLink' | 'ventilation'

const systemToggles: Array<{ key: SystemKey; label: string }> = [
  { key: 'cryoLock', label: 'Cryo_lock' },
  { key: 'neuralLink', label: 'Neural_link' },
  { key: 'ventilation', label: 'Biohazard_vent' },
]

function timestamp() {
  return new Date().toTimeString().slice(0, 8)
}

// Primer dashboard de práctica (consola Cryo/Genome/Log). Se conserva como ejemplo de composición.
export function LabConsolePage() {
  const [logs, setLogs] = useState<LogEntry[]>(systemLogs)
  const [command, setCommand] = useState('')
  const [systems, setSystems] = useState<Record<SystemKey, boolean>>({
    cryoLock: true,
    neuralLink: true,
    ventilation: false,
  })

  function addLog(level: LogLevel, message: string) {
    setLogs((current) => [...current, { time: timestamp(), level, message }])
  }

  function runCommand() {
    const text = command.trim()
    if (!text) return
    addLog('info', `> ${text.toUpperCase()}`)
    setCommand('')
  }

  return (
    // Bisel de la pantalla: 1rem en móvil, 2rem en desktop
    <div className="min-h-svh p-4 lg:p-8">
      {/* Vidrio CRT encima de todo; pointer-events-none deja hacer clic a través */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-50 crt-glass" />

      {/* Chasis */}
      <div className="flex min-h-[calc(100svh-2rem)] flex-col border border-slate-crt lg:min-h-[calc(100svh-4rem)]">
        <LabHeader />

        {/*
          Rack de instrumentos:
          móvil  → 1 columna apilada
          tablet → 2 columnas (visor | métricas)
          desktop→ 12 columnas (ala izq. 3 | visor 6 | ala der. 3)
        */}
        <main className="grid flex-1 grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-6 lg:p-6">
          <Panel
            featured
            code="SEC-01"
            title="Cryo_chamber"
            className="md:row-span-2 lg:col-span-6 lg:col-start-4 lg:row-span-1 lg:row-start-1"
          >
            <CryoHud specimen={specimen} readouts={cryoReadouts} />
          </Panel>

          <div className="flex flex-col gap-4 lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:gap-6">
            <Panel code="SEC-02" title="Genome_integrity">
              <div className="space-y-3">
                {genomeSamples.map((sample) => (
                  <DnaHelixBar key={sample.label} {...sample} />
                ))}
              </div>
            </Panel>
            <Panel code="SEC-03" title="Life_support">
              {systemToggles.map(({ key, label }) => (
                <DataToggle
                  key={key}
                  label={label}
                  checked={systems[key]}
                  onChange={(checked) => {
                    setSystems((current) => ({ ...current, [key]: checked }))
                    addLog(checked ? 'ok' : 'warn', `${label.toUpperCase()} ${checked ? 'ON' : 'OFF'}`)
                  }}
                />
              ))}
            </Panel>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:gap-6">
            <Panel code="SEC-05" title="Vocal_synthesis">
              <Waveform label="Llamada reconstruida del espécimen" points={vocalWaveform} />
            </Panel>
            <Panel code="SEC-06" title="System_log" className="flex-1">
              <LogStream logs={logs} />
            </Panel>
          </div>
        </main>

        {/* Línea de comandos: fija abajo en móvil, normal desde tablet */}
        <footer className="sticky bottom-0 border-t border-slate-crt bg-graphite p-4 md:static lg:px-6">
          <form
            className="flex flex-col gap-3 md:flex-row md:items-center"
            onSubmit={(event) => {
              event.preventDefault()
              runCommand()
            }}
          >
            <CommandInput
              label="Comando del sistema"
              className="flex-1"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
            />
            <div className="flex gap-3">
              <Button type="submit">Revive</Button>
              <Button type="button" variant="secondary" onClick={() => addLog('warn', 'ABORT SEQUENCE')}>
                Abort
              </Button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  )
}

