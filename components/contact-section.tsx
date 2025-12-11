'use client';

import { useEffect, useState, useRef } from 'react';
import { SectionHeader } from '@/components/section-header';
import { Mail, Phone, Send, Linkedin, Github } from 'lucide-react';
import { TerminalWindow } from '@/components/terminal-window';

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="contact" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Contact" command="POST /contact → Awaiting payload" isVisible={isVisible} />

        <div className="mt-4 mb-8">
          <p
            className={`font-mono text-sm text-muted-foreground transition-all duration-500 delay-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {'>'} connect via protocol: email, whatsapp, or linkedin
          </p>
        </div>

        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="https://www.linkedin.com/in/pujan-poudyal-b63578163/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#0077B5] text-white rounded-lg font-mono text-base hover:bg-[#0077B5]/90 transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            {'>'} Let's connect on LinkedIn
          </a>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <TerminalWindow title="email.sh">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-secondary">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-sm text-muted-foreground">Email Protocol</p>
                  <p className="font-mono text-foreground">pujan789556@gmail.com</p>
                </div>
              </div>
              <a
                href="mailto:pujan789556@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded font-mono text-sm hover:border-primary border border-border transition-colors w-full justify-center"
              >
                <Send className="h-4 w-4" />
                Execute: SendEmail()
              </a>
            </div>
          </TerminalWindow>

          <TerminalWindow title="whatsapp.sh">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-secondary">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-sm text-muted-foreground">WhatsApp Protocol</p>
                  <p className="font-mono text-foreground">+977 9841789556</p>
                </div>
              </div>
              <a
                href="https://wa.me/9779841789556"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded font-mono text-sm hover:border-primary border border-border transition-colors w-full justify-center"
              >
                <Send className="h-4 w-4" />
                Execute: SendMessage()
              </a>
            </div>
          </TerminalWindow>
        </div>

        <div
          className={`mt-6 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <TerminalWindow title="socials.sh">
            <div className="flex items-center justify-center gap-6 py-2">
              <a
                href="https://github.com/Pujan789556"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
              <span className="text-border">|</span>
              <a
                href="https://www.linkedin.com/in/pujan-poudyal-b63578163/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#0077B5] hover:text-[#0077B5]/80 transition-colors font-mono text-sm"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}
