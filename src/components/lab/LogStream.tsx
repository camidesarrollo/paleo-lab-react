import type { LogEntry, LogLevel } from '../../data/lab'

type LogStreamProps = {
  logs: LogEntry[]
}

const levelStyles: Record<LogLevel, string> = {
  ok: 'text-phosphor',
  info: 'text-on-surface-variant',
  warn: 'text-amber',
  error: 'text-error',
}

// System Log Stream: líneas con hora y color por nivel, terminadas en un cursor
export function LogStream({ logs }: LogStreamProps) {
  return (
    <ol aria-live="polite" className="space-y-1 text-body-sm">
      {logs.map((log, i) => (
        <li key={`${log.time}-${i}`} className="flex gap-2">
          <span className="shrink-0 whitespace-nowrap text-outline">{log.time}</span>
          <span className={levelStyles[log.level]}>{log.message}</span>
        </li>
      ))}
      <li aria-hidden className="flex items-center gap-1 pt-1 text-phosphor">
        SYS_ROOT:&gt;
        <span className="h-4 w-2.5 animate-blink bg-phosphor" />
      </li>
    </ol>
  )
}
