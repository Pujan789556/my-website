export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-muted animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-muted animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="w-24 h-3 bg-muted rounded animate-pulse ml-2" />
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="w-3/4 h-5 bg-muted rounded animate-pulse" />
          <div className="w-full h-3 bg-muted rounded animate-pulse" />
          <div className="w-5/6 h-3 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="w-16 h-6 bg-muted rounded animate-pulse" />
          <div className="w-16 h-6 bg-muted rounded animate-pulse" />
          <div className="w-16 h-6 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
