'use client';

import { useEffect, useState, useRef } from 'react';
import { TypewriterEffect } from '@/components/typewriter-effect';
import { TerminalWindow } from '@/components/terminal-window';
import { Linkedin } from 'lucide-react';

function MatrixRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();

    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]=/\\*+-';
    const charArray = chars.split('');
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff88';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Brighter character at the head
        ctx.fillStyle = drops[i] * fontSize > canvas.height - fontSize * 2 ? '#ffffff' : '#00ff88';
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}

export function HeroSection() {
  const [showContent, setShowContent] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [photoLoading, setPhotoLoading] = useState(true);
  const [photoLoadProgress, setPhotoLoadProgress] = useState(0);
  const [photoLoadLines, setPhotoLoadLines] = useState<string[]>([]);

  const bootSequence = [
    '> initializing developer_profile...',
    '> loading modules: [nestjs, nextjs, postgresql]',
    '> connecting to experience.db...',
    '> status: online',
    '> ready to deploy.',
  ];

  const photoLoadSequence = [
    'GET /api/avatar HTTP/1.1',
    'Authorization: Bearer ****',
    'Fetching from CDN...',
    'Decoding image buffer...',
    'Rendering bitmap...',
    '200 OK',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setBootLines((prev) => [...prev, bootSequence[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowContent(true), 500);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let lineIndex = 0;
      const lineInterval = setInterval(() => {
        if (lineIndex < photoLoadSequence.length) {
          setPhotoLoadLines((prev) => [...prev, photoLoadSequence[lineIndex]]);
          lineIndex++;
        } else {
          clearInterval(lineInterval);
        }
      }, 300);

      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          setPhotoLoadProgress(100);
          clearInterval(progressInterval);
          setTimeout(() => setPhotoLoading(false), 400);
        } else {
          setPhotoLoadProgress(Math.min(progress, 100));
        }
      }, 200);

      return () => {
        clearInterval(lineInterval);
        clearInterval(progressInterval);
      };
    }, 800);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Avatar with backend-themed animation */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative group">
              <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-primary/50 bg-secondary">
                {photoLoading ? (
                  <div className="absolute inset-0 bg-card z-30 flex flex-col">
                    <div className="flex items-center gap-2 px-3 py-2 bg-secondary border-b border-border">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">avatar.fetch</span>
                    </div>

                    <div className="flex-1 p-3 font-mono text-[10px] space-y-1 overflow-hidden">
                      {photoLoadLines.map((line, i) => (
                        <div
                          key={i}
                          className={`${
                            line.includes('200 OK')
                              ? 'text-terminal-green'
                              : line.includes('GET') || line.includes('Authorization')
                              ? 'text-terminal-cyan'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {line}
                        </div>
                      ))}
                      <span className="inline-block w-1.5 h-3 bg-primary cursor-blink" />
                    </div>

                    <div className="px-3 pb-3 space-y-1">
                      <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                        <span>Loading image...</span>
                        <span>{Math.round(photoLoadProgress)}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden border border-border">
                        <div
                          className="h-full bg-primary transition-all duration-200 ease-out"
                          style={{ width: `${photoLoadProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                {!photoLoading && (
                  <div className="absolute inset-0 z-10 pointer-events-none opacity-30 mix-blend-screen">
                    <MatrixRain className="w-full h-full" />
                  </div>
                )}

                {/* Scan line animation overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scan z-10 pointer-events-none" />

                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:20px_20px] z-10 pointer-events-none" />

                {/* Glitch effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
                </div>

                <img
                  src="/dev-photo.jpeg"
                  alt="Pujan Poudyal"
                  className={`w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 ${
                    photoLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                  }`}
                />

                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary/70 z-20" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary/70 z-20" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary/70 z-20" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary/70 z-20" />
              </div>

              {/* Data stream effect on side */}
              <div className="absolute -right-8 top-0 bottom-0 w-6 overflow-hidden opacity-50">
                <div className="animate-data-stream font-mono text-[8px] text-primary/60 leading-tight whitespace-nowrap">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i}>{Math.random().toString(16).slice(2, 6)}</div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded px-3 py-1 font-mono text-xs z-20">
                <span className="text-terminal-green">●</span> status: online
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <TerminalWindow title="profile.sh">
              <div className="space-y-1 font-mono text-sm">
                {bootLines.map((line, i) => (
                  <div
                    key={i}
                    className={`${
                      line.includes('online') || line.includes('ready')
                        ? 'text-terminal-green'
                        : line.includes('loading') || line.includes('connecting')
                        ? 'text-terminal-cyan'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {line}
                  </div>
                ))}
                {bootLines.length === bootSequence.length && (
                  <span className="inline-block w-2 h-4 bg-primary cursor-blink ml-1" />
                )}
              </div>
            </TerminalWindow>

            <div
              className={`space-y-4 transition-all duration-700 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="space-y-2">
                <p className="font-mono text-sm text-muted-foreground">{'// Hello World'}</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  {"Hi, I'm "}
                  <span className="text-primary">Pujan Poudyal</span>
                </h1>
                <TypewriterEffect
                  words={['Backend Developer', 'CTO / Co-Founder', 'System Architect', 'API Engineer']}
                  className="text-xl sm:text-2xl font-mono text-muted-foreground"
                />
              </div>

              <p className="text-muted-foreground leading-relaxed max-w-md">
                I architect systems. I ship APIs. I scale things that break.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded font-mono text-sm hover:bg-[#0077B5]/90 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded font-mono text-sm hover:bg-primary/90 transition-colors"
                >
                  {'>'} View Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-secondary text-secondary-foreground rounded font-mono text-sm hover:border-primary transition-colors"
                >
                  {'>'} Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
