'use client';

import { useEffect, useState, useRef } from 'react';
import { SectionHeader } from '@/components/section-header';
import { Building2 } from 'lucide-react';

const companies = [
  {
    name: 'I.T Hive Solutions',
    role: 'CTO / Co-Founder',
    period: '2021 - present',
  },
  {
    name: 'NoStack',
    role: 'Senior Backend Developer',
    period: '2022 - 2024',
  },
  {
    name: 'Wolfmatrix',
    role: 'Team Lead/ Senior Backend Developer',
    period: '2020 - 2022',
  },
  {
    name: 'Syntegrate',
    role: 'Application Developer',
    period: '2018 - 2020',
  },
  {
    name: 'Kathmandu Living Labs',
    role: 'Application Developer',
    period: '2014 - 2018',
  },
];

export function CompaniesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setLoadedCount(count);
            if (count >= companies.length) {
              clearInterval(interval);
            }
          }, 300);
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
    <section id="experience" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Experience" command="GET /experience → 200 OK" isVisible={isVisible} />

        <div className="mt-4 mb-8">
          <p
            className={`font-mono text-sm text-muted-foreground transition-all duration-500 delay-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {loadedCount < companies.length
              ? '> loading_companies...'
              : `> injected ${companies.length} records successfully`}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {companies.map((company, i) => (
            <div
              key={company.name}
              className={`p-4 rounded-lg border border-border bg-card transition-all duration-500 ${
                i < loadedCount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded bg-secondary">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-sm">{company.name}</h3>
              <p className="text-xs text-primary mt-1">{company.role}</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">{company.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
