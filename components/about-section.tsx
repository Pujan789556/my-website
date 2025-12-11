'use client';

import { useEffect, useState, useRef } from 'react';
import { TerminalWindow } from '@/components/terminal-window';
import { SectionHeader } from '@/components/section-header';

const profileData = {
  role: 'CTO / Co-Founder',
  stack: ['Node.js', 'NestJS', 'Next.js', 'MongoDB', 'PostgreSQL', 'tRPC', 'graphql', 'Redis', 'AWS', 'Docker'],
  experience: '10+ years',
  availability: 'Open for collaboration.',
  location: 'Remote / Nepal',
  focus: ['System Design', 'APIs', 'Backend', 'Cloud Infrastructure', 'Integration'],
};

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowJson(true), 500);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="About Me" command="GET /about → 200 OK" isVisible={isVisible} />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* JSON Profile */}
          <TerminalWindow title="profile.json">
            <pre className={`font-mono text-sm transition-all duration-700 ${showJson ? 'opacity-100' : 'opacity-0'}`}>
              <code>
                <span className="text-muted-foreground">{'{'}</span>
                {'\n'}
                <span className="text-terminal-cyan">{`  "role"`}</span>
                <span className="text-muted-foreground">: </span>
                <span className="text-terminal-green">{`"${profileData.role}"`}</span>
                <span className="text-muted-foreground">,</span>
                {'\n'}
                <span className="text-terminal-cyan">{`  "stack"`}</span>
                <span className="text-muted-foreground">: [</span>
                {'\n'}
                {profileData.stack.map((tech, i) => (
                  <span key={tech}>
                    <span className="text-terminal-green">{`    "${tech}"`}</span>
                    {i < profileData.stack.length - 1 && <span className="text-muted-foreground">,</span>}
                    {'\n'}
                  </span>
                ))}
                <span className="text-muted-foreground">{'  ],'}</span>
                {'\n'}
                <span className="text-terminal-cyan">{`  "experience"`}</span>
                <span className="text-muted-foreground">: </span>
                <span className="text-terminal-green">{`"${profileData.experience}"`}</span>
                <span className="text-muted-foreground">,</span>
                {'\n'}
                <span className="text-terminal-cyan">{`  "availability"`}</span>
                <span className="text-muted-foreground">: </span>
                <span className="text-terminal-green">{`"${profileData.availability}"`}</span>
                {'\n'}
                <span className="text-muted-foreground">{'}'}</span>
              </code>
            </pre>
          </TerminalWindow>

          {/* Description */}
          <div
            className={`space-y-4 transition-all duration-700 delay-300 ${
              showJson ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-muted-foreground leading-relaxed">
              As an engineering founder, I spend about{' '}
              <span className="text-primary font-semibold">80% of my time</span> writing backend code — crafting APIs,
              designing database schemas, and building systems that scale.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              But when the frontend needs attention, I roll up my sleeves and ship React components too. I believe in
              being a <span className="text-primary font-semibold">full-stack problem solver</span>, not just a title
              holder.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My passion lies in <span className="text-primary font-semibold">system design</span>, building robust
              APIs, backend services and architecting cloud infrastructure that doesn&apos;t wake you up at 3 AM.
            </p>

            <div className="pt-4">
              <TerminalWindow title="interests.sh">
                <div className="font-mono text-sm space-y-1">
                  {profileData.focus.map((item, i) => (
                    <div key={item} className="text-terminal-green">
                      <span className="text-muted-foreground">$</span> echo {item}
                    </div>
                  ))}
                </div>
              </TerminalWindow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
