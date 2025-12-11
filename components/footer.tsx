import { Terminal, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm text-muted-foreground">
              build: {process.env.npm_package_version} | last commit:{' '}
              {process.env.NEXT_PUBLIC_COMMIT_SHA ? process.env.NEXT_PUBLIC_COMMIT_SHA.substring(0, 7) : 'dev'} |
              deployed on vercel
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Pujan789556"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/pujan-poudyal-b63578163"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 bg-[#0077B5] text-white rounded text-xs font-mono hover:bg-[#0077B5]/90 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              Connect
            </a>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pujan Poudyal. All systems operational.
          </p>
        </div>
      </div>
    </footer>
  );
}
