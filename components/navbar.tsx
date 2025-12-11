'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Terminal, Menu, X, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="#home" className="flex items-center gap-2 group">
            <Terminal className="h-5 w-5 text-primary transition-transform group-hover:rotate-12" />
            <span className="font-mono text-sm text-primary">~/pujan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://www.linkedin.com/in/pujan-poudyal-b63578163/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-1.5 rounded bg-[#0077B5] text-white font-mono text-xs hover:bg-[#0077B5]/90 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <div className="ml-2 px-3 py-1 rounded border border-border bg-secondary/50 font-mono text-xs text-muted-foreground">
              <kbd className="text-primary">⌘</kbd> + <kbd className="text-primary">K</kbd>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {'>'} {item.name}
              </Link>
            ))}
            <a
              href="https://www.linkedin.com/in/pujan-poudyal-b63578163/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-sm font-mono text-[#0077B5] hover:text-[#0077B5]/80 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {'>'} LinkedIn
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
