interface SectionHeaderProps {
  title: string
  command: string
  isVisible: boolean
}

export function SectionHeader({ title, command, isVisible }: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      <div
        className={`font-mono text-sm text-terminal-green transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {command}
      </div>
      <h2
        className={`text-3xl font-bold text-foreground transition-all duration-500 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {title}
      </h2>
    </div>
  )
}
