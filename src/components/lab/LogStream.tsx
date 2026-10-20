import type { LogEntry, LogLevel } from '../../data/lab'

type LogStreamProps = {
  logs: LogEntry[]
}

const levelStyles: Record<LogLevel, string> = {
  ok: 'text-phosphor',
  info: 'text-on-surface-variant',
  warn: 'text-amber',
}

// System Log Stream: líneas con hora y color por nivel, terminadas en un cursor
export function LogStream({ logs }: LogStreamProps) {
  return (
    <ol aria-live="polite" className="space-y-1 text-body-sm">
      {logs.map((log, i) => (
        <li key={`${log.time}-${i}`} className="flex gap-2">
          <span className="text-outline">{log.time}</span>
          <span className={levelStyles[log.level]}>{log.message}</span>
        </li>
      ))}
      <li aria-hidden className="h-3 w-1.5 animate-blink bg-phosphor" />
    </ol>
  )
}
