'use client';

import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

export function SystemStatus() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card/80 backdrop-blur-sm">
        <Activity className="h-4 w-4 text-terminal-green animate-pulse" />
        <span className="font-mono text-xs text-muted-foreground">uptime: {formatUptime(uptime)}</span>
      </div>
    </div>
  );
}
