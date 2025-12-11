import type React from "react"
interface TerminalWindowProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function TerminalWindow({ title, children, className = "" }: TerminalWindowProps) {
  return (
    <div className={`rounded-lg border border-border bg-card overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-terminal-red" />
          <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
          <div className="w-3 h-3 rounded-full bg-terminal-green" />
        </div>
        <span className="font-mono text-xs text-muted-foreground ml-2">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
