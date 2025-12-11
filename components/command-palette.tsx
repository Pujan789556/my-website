"use client"

import { useEffect, useState, useCallback } from "react"
import { Command, Search, Home, User, FolderGit2, Building2, FileText, Mail, X } from "lucide-react"

const commands = [
  { name: "Go to Home", icon: Home, action: "#home" },
  { name: "About Me", icon: User, action: "#about" },
  { name: "View Projects", icon: FolderGit2, action: "#projects" },
  { name: "Experience", icon: Building2, action: "#experience" },
  { name: "Download Resume", icon: FileText, action: "#resume" },
  { name: "Contact", icon: Mail, action: "#contact" },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filteredCommands = commands.filter((cmd) => cmd.name.toLowerCase().includes(search.toLowerCase()))

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      setIsOpen((prev) => !prev)
    }
    if (e.key === "Escape") {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const handleCommand = (action: string) => {
    setIsOpen(false)
    setSearch("")
    window.location.href = action
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative w-full max-w-lg mx-4 rounded-lg border border-border bg-card shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-mono"
            autoFocus
          />
          <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-secondary transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2">
          <div className="px-2 py-1.5">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Navigation</p>
          </div>
          {filteredCommands.map((cmd) => (
            <button
              key={cmd.name}
              onClick={() => handleCommand(cmd.action)}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-foreground hover:bg-secondary rounded transition-colors"
            >
              <cmd.icon className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono">{cmd.name}</span>
            </button>
          ))}
          {filteredCommands.length === 0 && (
            <div className="px-3 py-6 text-center">
              <p className="text-sm text-muted-foreground font-mono">No commands found for &ldquo;{search}&rdquo;</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-secondary/50">
          <div className="flex items-center gap-2">
            <Command className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">Command Palette</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-xs font-mono bg-secondary border border-border rounded text-muted-foreground">
              esc
            </kbd>
            <span className="text-xs text-muted-foreground">to close</span>
          </div>
        </div>
      </div>
    </div>
  )
}
