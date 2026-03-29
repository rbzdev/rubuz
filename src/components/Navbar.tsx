import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { ThemeToggle } from './ui/theme-toggle';
import { translations, type Language } from '../i18n/translations';

interface NavbarProps {
  lang: Language;
  toggleLang: () => void;
}

export default function Navbar({ lang, toggleLang }: NavbarProps) {
  const t = translations[lang];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/50 border-b border-border/50">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lg lg:text-2xl font-bold tracking-tight bg-linear-to-r from-primary to-muted-foreground bg-clip-text text-transparent underline decoration-primary/30 decoration-1 underline-offset-8"
      >
        <a href="/">
          Rubuz<span className="text-primary">.</span>
        </a>
      </motion.div>

      <nav className="flex items-center gap-4">
        {/* Me link */}
        <a href="/me" className="text-xs hover:text-primary transition-colors">
          <img src="/images/profil.jpeg" alt="Profile" className="w-10 h-10 rounded-full" />
        </a>

        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 hover:bg-accent/50 transition-all text-[10px] font-black tracking-widest uppercase md:backdrop-blur-sm group"
        >
          <Icon icon="lucide:languages" className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          {lang.toUpperCase()}
        </button>

        <div className="h-4 w-px bg-border/50 mx-2" />

        <ThemeToggle
          className="p-2.5 rounded-full border border-border/50 hover:bg-accent/50 transition-all backdrop-blur-sm shadow-xl shadow-primary/5"
          animation="diamond"
          duration={600}
        />
      </nav>
    </header>
  );
}
