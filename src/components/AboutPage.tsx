import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { translations, type Language } from '../i18n/translations';
import Navbar from './Navbar';
import Footer from './Footer';
import { ImageZoom } from './ui/image-zoom';
import { Button } from './ui/button';

export default function AboutPage() {
  const [lang, setLang] = React.useState<Language>(() => {
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

  const skills = [
    { name: 'Javascript', icon: 'skill-icons:javascript' },
    { name: 'Typescript', icon: 'skill-icons:typescript' },
    { name: 'React', icon: 'skill-icons:react-dark' },
    { name: 'Next.js', icon: 'skill-icons:nextjs-dark' },
    { name: 'Node.js', icon: 'skill-icons:nodejs-dark' },
    { name: 'Express', icon: 'skill-icons:expressjs-dark' },
    { name: 'NestJS', icon: 'skill-icons:nestjs-dark' },
    { name: 'React Native', icon: 'skill-icons:react-dark' },
    { name: 'Expo', icon: 'cib:expo' },
    { name: 'PHP', icon: 'skill-icons:php-dark' },
    { name: 'Tailwind CSS', icon: 'skill-icons:tailwindcss-dark' },
    { name: 'PostgreSQL', icon: 'skill-icons:postgresql-dark' },
    { name: 'MongoDB', icon: 'skill-icons:mongodb' },
    { name: 'MySQL', icon: 'logos:mysql' },
    { name: 'Prisma ORM', icon: 'skill-icons:prisma' },
    { name: 'Inertia.js', icon: 'devicon:inertiajs' },
    { name: 'Git', icon: 'material-icon-theme:git' },
    { name: 'GitHub', icon: 'mdi:github' },

  ];

  const mainGallery = [
    { src: "/images/profil.jpeg", className: "col-span-1 row-span-2" },
    { src: "/images/me_no_air.JPG", className: "col-span-1 row-span-1" },
    { src: "/images/prof_dev_1.png", className: "col-span-1 row-span-1" },
    { src: "/images/prof_dev_3.png", className: "col-span-2 row-span-1" },
  ];

  const communityImages = [
    { src: "/images/devfest.JPEG", className: "col-span-2 row-span-2" },
    { src: "/images/devfest1.JPEG", className: "col-span-1 row-span-1" },
    { src: "/images/devfest2.JPEG", className: "col-span-1 row-span-1" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar lang={lang} toggleLang={toggleLang} />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-20">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="w-full md:w-1/3 aspect-square rounded-[2rem] overflow-hidden border-2 border-primary/20 shadow-2xl">
                <ImageZoom src="/images/profil.jpeg" alt="Profile" className="w-full h-full" />
              </div>
              <div className="flex-1 space-y-6">
                <h1 className="text-5xl tracking-tight text-primary leading-none">
                  {t.about_me.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed ">
                  {t.about_me.description}
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl border-b border-border pb-2 inline-block uppercase tracking-tighter">
                {t.about_me.skills_title}
              </h2>
              <div className="flex flex-wrap gap-4">

                {skills.map((skill, index) => (

                  <div key={index} className="flex items-center gap-2 px-2 py-2 bg-secondary/50 rounded-lg border  hover:border-primary/30 transition-colors">
                    <Icon icon={skill.icon} className="text-xl" />
                    <span className="font text-sm">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Gallery Section with its own sidebar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-4 space-y-20">
                {/* Gallery - Bento Grid */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl uppercase tracking-tighter">{lang === 'fr' ? 'Portfolio Visuel' : 'Visual Portfolio'}</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-[200px]">
                    {mainGallery.map((img, i) => (
                      <ImageZoom
                        key={i}
                        src={img.src}
                        alt="Visual Portfolio"
                        className={`${img.className} border border-border/50 rounded-sm shadow-xl shadow-primary/5`}
                      />
                    ))}
                  </div>
                </motion.section>

                {/* Community - Bento Grid */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl uppercase tracking-tighter">{lang === 'fr' ? 'Communauté' : 'Community'}</h2>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] tracking-widest border border-primary/20">GDG / DevFest</span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-0 auto-rows-[150px]">
                    {communityImages.map((img, i) => (
                      <ImageZoom
                        key={i}
                        src={img.src}
                        alt="Community Event"
                        className={`${img.className} border border-border/50 shadow-xl shadow-primary/5 `}
                      />
                    ))}
                  </div>
                </motion.section>
              </div>


            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">

            {/* About shortcut */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-4 rounded-xl bg-linear-to-br from-primary/5 to-secondary/5 border border-primary/10 relative overflow-visible group shadow-2xl shadow-primary/5"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-evenly">
                  <Icon icon="mdi:apple" className="text-5xl bg-white dark:bg-accent border rounded-lg p-1" />
                  <Icon icon="logos:android-icon" className=" h-12 w-12 border rounded-lg bg-white dark:bg-accent p-1" />
                  <Icon icon="streamline-freehand:website-development-browser-com-web" className="text-5xl border rounded-lg bg-white dark:bg-accent p-1" />
                  <Icon icon="solar:server-path-outline" className="text-5xl border rounded-lg bg-white dark:bg-accent p-1" />
                </div>
                <h3 className="text-sm mt-4">{lang === 'fr' ? 'Développeur Fullstack web et Mobile' : 'Fullstack web and Mobile Developer'}</h3>
                <p className="text-muted-foreground text-sm">
                  {lang === 'fr' ? 'D\'une simple landing page à un SaaS complet avec intégration IA.' : 'From simple landing page to a complete SaaS with AI integration'}
                </p>
              </div>
            </motion.div>

            {/* GDG & Google Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-4 rounded-xl bg-linear-to-br from-primary/5 to-secondary/5 border border-primary/10 relative overflow-visible group shadow-2xl shadow-primary/5"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-md bg-white dark:bg-accent shadow-xs flex items-center justify-center">
                    <Icon icon="logos:google-developers" className="w-10 h-10" />
                  </div>
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center first:text-sky-500 even:text-emerald-300 last:text-emerald-500">
                        <Icon icon="flowbite:badge-check-outline" className="w-6 h-6 " />
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl mt-4">{t.about_me.gdg_title}</h3>
                <p className="text-muted-foreground text-sm">
                  {t.about_me.gdg_desc}
                </p>
              </div>

              {/* Hovering Badge Image */}
              <div className="absolute right-[105%] top-1/2 -translate-y-1/2 w-150 h-auto pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-10 transition-all duration-500">
                <img src="/images/google_badge.png" alt="Google Cloud Badge" className="w-full h-full object-contain filter drop-shadow-2xl border p-1 rounded-sm backdrop-blur-2xl" />
              </div>

              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              <div className="p-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm space-y-4">
                <h3 className="flex items-center gap-2">
                  <Icon icon="hugeicons:office" className="text-xl text-primary" />
                  {t.about_me.address}
                </h3>
                <p className="text-sm text-muted-foreground">Lubumbashi, Haut-Katanga, RD Congo</p>

                <h3 className="flex items-center gap-2 pt-2">
                  <Icon icon="solar:user-linear" className="text-xl text-primary" />
                  {t.about_me.contact}
                </h3>

                <a href='mailto:rubuzolivier2@gmail.com' className="flex group ">
                  <Icon icon="mynaui:mail" className="text-xl text-primary opacity-0 group-hover:opacity-100 group-hover:text-sky-500 translate-x-5 group-hover:-translate-x-0 transition-all" />

                  <p className="text-sm text-muted-foreground hover:text-sky-500 -translate-x-2 group-hover:translate-x-2 transition-all">rubuzolivier2@gmail.com</p>
                </a>

                <a href='https://wa.me/+243998034962' target='_blank' className="flex group">
                  <Icon icon="fa6-brands:whatsapp" className="text-xl text-primary  opacity-0 group-hover:opacity-100 group-hover:text-green-500 translate-x-5 group-hover:-translate-x-0 transition-all" />

                  <p className="text-sm text-muted-foreground hover:text-green-500 -translate-x-2 group-hover:translate-x-2 transition-all ">+243 998034962</p>

                </a>
              </div>
            </motion.div>

            {/* Gallery Specific Sidebar */}
            <aside className="md:col-span-1 border-l border-border pl-4 md:pl-12 space-y-12 h-fit md:sticky md:top-32 w-full ">
              <div className="space-y-4">
                <h4 className="text-lg uppercase ">{lang === 'fr' ? 'Statistiques' : 'Stats'}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{lang === 'fr' ? 'Projets' : 'Projects'}</span>
                    <span className="font-bold">20+</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{lang === 'fr' ? 'Clients' : 'Clients'}</span>
                    <span className="font-bold">10+</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{lang === 'fr' ? 'Entreprises' : 'Companies'}</span>
                    <span className="font-bold">5+</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{lang === 'fr' ? 'Taux de satisfaction' : 'Satisfaction Rate'}</span>
                    <span className="font-bold">95%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg uppercase">{lang === 'fr' ? 'Équipement' : 'Gear'}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lang === 'fr' ? 'Capturé avec un souci du détail, mêlant moments spontanés et portraits réfléchis.' : 'Captured with an eye for detail, blending candid moments and thoughtful portraits.'}
                </p>
              </div>

              <a href="/projects" className="pt-8 border-t border-border/50">
                <Button variant="outline" size="sm" className="w-full rounded-sm text-[10px] uppercase ">
                  {lang === 'fr' ? 'Voir les réalisations' : 'View my projects'}
                </Button>
              </a>
            </aside>
          </aside>


        </div>
      </main>

      <Footer />
    </div>
  );
}
