import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Icon } from '@iconify/react';
import { ThemeToggle } from './ui/theme-toggle';
import { translations, type Language } from '../i18n/translations';

interface NavbarProps {
  lang: Language;
  toggleLang: () => void;
}

export default function Navbar({ lang, toggleLang }: NavbarProps) {
  const t = translations[lang];
  const { scrollY } = useScroll();

  // States for scroll effect
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("ROUBOUZ");
      utterance.lang = "fr-FR";
      utterance.rate = 0.9;
      window.speechSynthesis.cancel(); // Stop any current speech
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <header className={`fixed left-0 right-0 z-50 flex justify-center pointer-events-none bg-transparent! `}>
      <motion.div
        animate={{
          width: isScrolled ? "auto" : "100%",
          padding: isScrolled ? "5px 10px" : "16px 32px",
          marginTop: isScrolled ? "10px" : "0",
          borderRadius: isScrolled ? "100px" : "0",
          // backgroundColor: isScrolled ? "transparent" : "rgba(var(--background), 0.3)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`pointer-events-auto flex items-center justify-between bg-transparent border border-border/0 w-full ${isScrolled ? "backdrop-blur-md shadow-2xl shadow-primary/5 border-border/90" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='relative '
        >
          {isScrolled ? (
            <a href="/" className="text-lg lg:text-xl border rounded-full px-2 py-1 bg-accent">
              Rubuz<span className="text-primary">.</span>
            </a>
          ) : (
            <a href="/" className="text-lg lg:text-2xl bg-linear-to-r from-primary to-muted-foreground bg-clip-text text-transparent underline decoration-primary/30 decoration-1 underline-offset-8">
              Mr Rubuz<span className="text-primary">.</span>
            </a>
          )}

          {/* Phonétique */}
          {!isScrolled && (
            <button
              onClick={speak}
              className="absolute -right-12 -top-2 text-[9px] text-muted-foreground/50 hover:text-primary transition-colors flex items-center gap-1 cursor-pointer group"
            >
              [ /ʁubuz/ ]
              <Icon icon="lucide:volume-2" className="w-2.5 h-2.5 group-hover:scale-125 transition-transform" />
            </button>
          )}
        </motion.div>

        <nav className="flex items-center gap-2 md:gap-4">
          {/* Me link */}
          <a href="/me" className="text-xs hover:text-primary transition-colors flex items-center justify-center">
            <img src="/images/profil.jpeg" alt="Profile" className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-border/50 object-cover" />
          </a>

          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-border/50 hover:bg-accent/50 transition-all text-[10px] uppercase md:backdrop-blur-sm group whitespace-nowrap"
          >
            <Icon icon="lucide:languages" className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
            <span className="hidden xs:inline">{lang === 'fr' ? 'FR' : 'EN'}</span>
            <span className="xs:hidden">{lang.toUpperCase()}</span>
          </button>

          <div className="h-4 w-px bg-border md:mx-2" />

          <ThemeToggle
            className="p-2.5 rounded-full border border-border/50 hover:bg-accent/50 transition-all backdrop-blur-sm shadow-xl shadow-primary/5"
            animation="diamond"
            duration={600}
          />
        </nav>
      </motion.div>
    </header>
  );
}
