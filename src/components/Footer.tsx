import React from 'react';
import { Icon } from '@iconify/react';

export default function Footer() {
  return (
    <footer className="px-6 py-16 border-t border-border mt-20 bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-sm">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <div className="text-xl tracking-tight">
            Mr Rubuz<span className="text-primary">.</span>
          </div>
          <p className="text-muted-foreground font-medium">© {new Date().getFullYear()} Rubuz Portfolio. Built with Astro & React.</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-4">
            <a
              href="https://github.com/rbzdev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 bg-background/30 hover:bg-accent/50 hover:scale-110 active:scale-95 transition-all text-muted-foreground hover:text-foreground"
              aria-label="GitHub"
            >
              <Icon icon="iconoir:github" className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/rubuz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 bg-background/30 hover:bg-accent/50 hover:scale-110 active:scale-95 transition-all text-muted-foreground hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Icon icon="mdi:linkedin" className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/@rubuz_"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 bg-background/30 hover:bg-accent/50 hover:scale-110 active:scale-95 transition-all text-muted-foreground hover:text-foreground"
              aria-label="Twitter"
            >
              <Icon icon="mdi:twitter" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
