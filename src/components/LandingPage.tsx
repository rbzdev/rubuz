import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { translations, type Language } from '../i18n/translations';
import Navbar from './Navbar';
import Footer from './Footer';
import { Button } from './ui/button';

export default function LandingPage() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang');
      return (saved as Language) || 'fr';
    }
    return 'fr';
  });

  const t = translations[lang];

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'fr' ? 'en' : 'fr';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar lang={lang} toggleLang={toggleLang} />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden">
        {/* Abstract Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] -z-10 pointer-events-none opacity-50" />

        <section className="max-w-5xl w-full text-center space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 text-primary text-xs mb-10 border border-primary/20 backdrop-blur-[1px] shadow-xl shadow-primary/5">

              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              {lang === 'fr' ? 'Disponible pour de nouveaux projets' : 'Available for new projects'}
            </div>

            <h1 className="text-7xl md:text-9xl tracking-tight mb-8 leading-none">
              {t.hero_title.split('&').map((part, i) => (
                <span key={i} className={i === 1 ? "text-muted-foreground/40 block md:inline" : ""}>
                  {i === 1 && " &"} {part}
                </span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto ">
              {t.hero_subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center gap-6 pt-12"
          >
            <a href="/projects">
              <Button className="group">
                {t.view_projects}
                <Icon icon="guidance:left-arrow" className="text-3xl group-hover:translate-x-2 transition-transform" />
              </Button>

            </a>
            <Button className="group overflow-hidden">
              {t.contact_me}
              <Icon icon="iconoir:whatsapp" className="text-3xl group-hover:scale-[3] group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:text-green-500 dark:group-hover:text-green-700 transition-all" />
            </Button>
          </motion.div>
        </section>

        {/* Floating Icons Background Decor */}
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[5%] "
          >
            <Icon icon="logos:react" className="w-40 h-40 blur-xs" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 30, 0],
              rotate: [0, -15, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] right-[5%] "
          >
            <Icon icon="logos:astro-icon" className="w-56 h-56 blur-md" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 40, 0],
              rotate: [0, 20, 0],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] right-[10%] "
          >
            <Icon icon="logos:tailwindcss-icon" className="w-32 h-32 blur-[2px]" />
          </motion.div>
          <motion.div
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[30%] left-[10%] "
          >
            <Icon icon="logos:expo-icon" className="w-32 h-32 blur-[2px]" />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
