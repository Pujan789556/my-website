'use client';

import { useEffect, useState, useRef } from 'react';
import { SectionHeader } from '@/components/section-header';
import { ProjectCard } from '@/components/project-card';
import { SkeletonCard } from '@/components/skeleton-card';

const projects = [
  {
    title: 'AssurePro - Non-Life Insurance Portfolio Management',
    description:
      'Enterprise insurance management system for Nepalese insurance companies. Handles policy management, claims processing, reinsurance, and regulatory compliance per Nepal Insurance Board standards.',
    stack: ['Node.js', 'Next.js', 'PostgreSQL', 'React', 'tRPC'],
    company: 'I.T Hive Solutions',
    isNDA: false,
  },
  {
    title: 'Pivotate - AI Code-Free App Builder',
    description:
      'Backend infrastructure for AI-powered no-code application platform. Built scalable GraphQL APIs enabling non-technical users to create custom applications through natural language.',
    stack: ['Node.js', 'GraphQL', 'PostgreSQL', 'tRPC'],
    company: 'NoStack',
    isNDA: false,
  },
  {
    title: 'Concerto Analytics - Business Intelligence Suite',
    description:
      'Full-stack business modeling and simulation platform. Deployed backend APIs to Google Cloud with CI/CD pipelines. Developed custom Power BI visualization plugins for advanced data integration.',
    stack: ['Node.js', 'React', 'GCP', 'Power BI', 'CI/CD'],
    company: 'Wolfmatrix/Concerto Analytics',
    isNDA: false,
  },
  {
    title: 'SyntOMS - Enterprise HR Management',
    description:
      'Internal HR and project management system with mobile API integration. Built RESTful APIs published through WSO2 API Manager for cross-platform employee and project tracking.',
    stack: ['Node.js', 'WSO2', 'Mobile APIs', 'PostgreSQL'],
    company: 'Syntegrate',
    isNDA: false,
  },
  {
    title: 'Housing Reconstruction Damage Assessment',
    description:
      'Government disaster relief system for 2015 Nepal earthquake recovery. Built ODK-based Android app for offline field data collection and web platform for data processing, generating reports that helped NRA identify 800K+ affected households.',
    stack: ['Android', 'ODK', 'Web', 'PostgreSQL'],
    company: 'Kathmandu Living Labs',
    isNDA: false,
  },
];

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setIsLoading(false), 1500);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20 px-4 bg-secondary/30" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Projects" command="GET /projects → 200 OK" isVisible={isVisible} />

        <div className="mt-4 mb-8">
          <p
            className={`font-mono text-sm text-muted-foreground transition-all duration-500 delay-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isLoading ? '> Fetching project data...' : '> Deployed multiple projects successfully'}
          </p>
          <p
            className={`font-mono text-xs text-terminal-yellow mt-2 transition-all duration-500 delay-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {'// Note: All projects completed under NDA. Source code and live demos are confidential.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : projects.map((project, i) => <ProjectCard key={project.title} project={project} index={i} />)}
        </div>
      </div>
    </section>
  );
}
