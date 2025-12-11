"use client"

import { Lock, Building2 } from "lucide-react"
import { TerminalWindow } from "@/components/terminal-window"

interface Project {
  title: string
  description: string
  stack: string[]
  company: string
  isNDA: boolean
}

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <TerminalWindow title={`project_${index + 1}.md`}>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-secondary text-primary rounded border border-border"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{project.company}</span>
            </div>
            {project.isNDA && (
              <div className="flex items-center gap-2 mt-2 text-xs font-mono text-terminal-yellow">
                <Lock className="h-3 w-3" />
                <span>Protected under NDA - No source code or demo available</span>
              </div>
            )}
          </div>
        </div>
      </TerminalWindow>
    </div>
  )
}
