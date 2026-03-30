import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Navbar from './Navbar';
import Footer from './Footer';
import { translations, type Language } from '../i18n/translations';
import projectsData from '../data/projects.json';
import { ImageZoom } from './ui/image-zoom';
import { Button } from './ui/button';

interface Project {
   id: string;
   title: string;
   description: string;
   longDescription?: string;
   tech: string[];
   image: string;
   gallery?: string[];
   link: string;
   type: string;
   year?: string;
   status: 'active' | 'abandoned' | 'inacheved' | 'deleted';
}

const statusConfig = {
   active: {
      color: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20',
      icon: 'ph:circle-fill',
      label: { fr: 'Actif', en: 'Active' }
   },
   abandoned: {
      color: 'bg-orange-500/20 text-orange-500 border-orange-500/20',
      icon: 'ph:clock-countdown-fill',
      label: { fr: 'Abandonné', en: 'Abandoned' }
   },
   inacheved: {
      color: 'bg-sky-500/20 text-sky-500 border-sky-500/20',
      icon: 'lsicon:setting-outline',
      label: { fr: 'En cours', en: 'Unfinished' }
   },
   deleted: {
      color: 'bg-rose-500/20 text-rose-500 border-rose-500/20',
      icon: 'ph:trash-fill',
      label: { fr: 'Supprimé', en: 'Deleted' }
   }
};

export default function ProjectsPage() {
   const [lang, setLang] = React.useState<Language>(() => {
      if (typeof window !== 'undefined') {
         const saved = localStorage.getItem('lang');
         return (saved as Language) || 'fr';
      }
      return 'fr';
   });

   const [selectedId, setSelectedId] = React.useState<string | null>(null);
   const selectedProject = (projectsData as Project[]).find(p => p.id === selectedId);

   const t = translations[lang];

   React.useEffect(() => {
      document.documentElement.lang = lang;
      if (selectedId) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'unset';
      }
   }, [lang, selectedId]);

   const toggleLang = () => {
      setLang(prev => {
         const next = prev === 'fr' ? 'en' : 'fr';
         localStorage.setItem('lang', next);
         return next;
      });
   };

   return (
      <div className="flex flex-col min-h-screen font-sans">
         <Navbar lang={lang} toggleLang={toggleLang} />

         <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
            <header className="mb-16 space-y-4">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
               >
                  <h1 className="text-4xl md:text-6xl tracking-tight text-primary leading-none uppercase">
                     {t.projects}
                  </h1>
                  <p className="text-xl leading-relaxed max-w-4xl mt-6 text-muted-foreground">
                     {lang === 'fr' ? "Quelques réalisation que j'ai eu à concrétiser/contribuer à travers +5 ans d'expérience." : "Some of the projects I've had the opportunity to work on over the past 5+ years."}
                  </p>
               </motion.div>
            </header>

            {/* Bento Grid Vertical */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
               {(projectsData as Project[]).map((project, i) => (
                  <motion.div
                     layoutId={`card-${project.id}`}
                     key={project.id}
                     onClick={() => setSelectedId(project.id)}
                     className={`group relative overflow-hidden rounded-sm border border-border/50 bg-secondary/10 cursor-pointer shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500
                ${i % 4 === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                ${i % 4 === 3 ? 'md:col-span-1 md:row-span-2' : ''}
              `}
                  >
                     <motion.img
                        layoutId={`img-${project.id}`}
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 object-cover w-full h-full  transition-all duration-700 scale-100 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                     <div className="absolute top-6 left-6 flex gap-2">
                        <motion.span
                           layoutId={`type-${project.id}`}
                           className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase font-medium tracking-widest text-white border border-white/20"
                        >
                           {project.type}
                        </motion.span>
                        <div className={`px-2 py-1 rounded-full text-[10px] uppercase tracking-widest border backdrop-blur-md flex items-center gap-1.5 ${statusConfig[project.status].color}`}>
                           <Icon icon={statusConfig[project.status].icon} className="w-2.5 h-2.5" />
                           {statusConfig[project.status].label[lang]}
                        </div>
                     </div>

                     <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2">
                        <div className="flex items-end justify-between">
                           <div>
                              <motion.h2 layoutId={`title-${project.id}`} className="text-3xl text-white uppercase tracking-tighter leading-none">
                                 {project.title}
                              </motion.h2>
                           </div>
                           <motion.div layoutId={`icon-${project.id}`} className="p-2 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 text-3xl">
                              <Icon icon="guidance:left-arrow" className="w-4 h-4 -rotate-45" />
                           </motion.div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* Expanded View */}
            <AnimatePresence mode="wait">
               {selectedId && selectedProject && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                        className="absolute inset-0 bg-primary/60 backdrop-blur-xs"
                     />

                     <motion.div
                        layoutId={`card-${selectedId}`}
                        className="relative w-full max-w-6xl h-full md:max-h-[85vh] bg-background border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row"
                     >
                        {/* Left: Content Image */}
                        <div className="w-full md:w-1/2 relative bg-secondary">
                           <ImageZoom src={selectedProject.image} alt={selectedProject.title} className="w-full h-full" />
                           <button
                              onClick={() => setSelectedId(null)}
                              className="absolute top-6 left-6 p-4 bg-background/50 backdrop-blur-md rounded-full border border-white/20 hover:scale-110 transition-transform md:hidden"
                           >
                              <Icon icon="lucide:x" className="w-6 h-6" />
                           </button>
                        </div>

                        <button
                           onClick={() => setSelectedId(null)}
                           className="absolute top-4 right-4 p-4 hover:bg-secondary rounded-full transition-colors hidden md:block"
                        >
                           <Icon icon="lucide:x" className="w-6 h-6" />
                        </button>

                        {/* Right: Details */}
                        <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto space-y-12">
                           <div className="flex items-start justify-between">
                              <div className="space-y-4">
                                 <div className="flex gap-2">
                                    <motion.span layoutId={`type-${selectedId}`} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] uppercase tracking-widest border border-primary/20">
                                       {selectedProject.type}
                                    </motion.span>
                                    <div className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border flex items-center gap-1.5 ${statusConfig[selectedProject.status].color}`}>
                                       <Icon icon={statusConfig[selectedProject.status].icon} className="w-2.5 h-2.5" />
                                       {statusConfig[selectedProject.status].label[lang]}
                                    </div>
                                 </div>
                                 <motion.h2 layoutId={`title-${selectedId}`} className="text-2xl md:text-4xl uppercase tracking-tighter leading-none text-primary">
                                    {selectedProject.title}
                                 </motion.h2>
                              </div>

                           </div>

                           <div className="grid grid-cols-2 gap-8 py-8 border-y border-border/50">
                              <div className="space-y-1">
                                 <span className="text-[10px] uppercase text-muted-foreground tracking-widest">{lang === 'en' ? 'Year' : 'Année'} </span>
                                 <p className="font-medium">{selectedProject.year || "2024"}</p>
                              </div>
                              <div className="space-y-1">
                                 <span className="text-[10px] uppercase text-muted-foreground tracking-widest">{lang === 'en' ? 'Status' : 'Statut'}</span>
                                 <p className="font-medium capitalize">{statusConfig[selectedProject.status].label[lang]}</p>
                              </div>
                           </div>

                           <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="space-y-12"
                           >
                              <div className="space-y-6">
                                 <p className="text-sm leading-relaxed text-muted-foreground">
                                    {selectedProject.longDescription || selectedProject.description}
                                 </p>
                              </div>

                              {/* Gallery Grid */}
                              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                                 <div className="space-y-6 pt-12 border-t border-border/50">
                                    <h3 className="text-lg uppercase tracking-tighter">{lang === 'fr' ? 'Galerie du projet' : 'Project Gallery'}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                       {selectedProject.gallery.map((img, idx) => (
                                          <div key={idx} className="aspect-video">
                                             <ImageZoom
                                                src={img}
                                                alt={`${selectedProject.title} thumbnail ${idx + 1}`}
                                                className="w-full h-full rounded-lg border border-border/50"
                                             />
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              )}
                           </motion.div>

                           {selectedProject.link && selectedProject.status !== 'deleted' && (
                              <div className="pt-8">
                                 <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                                    <Button variant='secondary' className="w-full">
                                       {lang === 'en' ? 'Explore Project' : 'Explorer le projet'}
                                    </Button>
                                 </a>
                              </div>
                           )}
                        </div>
                     </motion.div>
                  </div>
               )}
            </AnimatePresence>
         </main>

         <Footer />
      </div>
   );
}
