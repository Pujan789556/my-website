'use client';

import { useEffect, useState, useRef } from 'react';
import { SectionHeader } from '@/components/section-header';
import { Download, FileText, Loader2 } from 'lucide-react';
import { TerminalWindow } from '@/components/terminal-window';

export function ResumeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      // Download file from public folder name the file 'pujan_poudyal_resume.pdf'
      const link = document.createElement('a');
      link.href = '/dev-resume.pdf';
      link.download = 'pujan_poudyal_resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
      // In production, this would trigger actual download
    }, 2000);
  };

  return (
    <section id="resume" className="py-20 px-4 bg-secondary/30" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Resume" command="GET /resume → 200 OK" isVisible={isVisible} />

        <div
          className={`mt-12 flex flex-col items-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <TerminalWindow title="download.sh" className="w-full max-w-md">
            <div className="space-y-4 text-center">
              <FileText className="h-16 w-16 text-primary mx-auto" />
              <div className="space-y-1">
                <p className="font-mono text-sm text-muted-foreground">pujan_poudyal_resume.pdf</p>
                <p className="font-mono text-xs text-muted-foreground">Last updated: December 2025</p>
              </div>

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded font-mono text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download Resume()
                  </>
                )}
              </button>

              {isDownloading && (
                <div className="font-mono text-xs text-terminal-green">{'>'} Executing download pipeline...</div>
              )}
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}
