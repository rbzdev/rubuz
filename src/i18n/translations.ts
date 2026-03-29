export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      me: "Moi",
      projects: "Projets"
    },
    hero_title: "Développeur Fullstack Web & Mobile",
    hero_subtitle: "Désigne des expériences web et mobiles modernes, fluides et performantes.",
    view_projects: "Voir mes projets",
    contact_me: "Me contacter",
    skills: "Compétences",
    experience: "Expérience",
    projects: "Projets",
    about_me: {
      title: "À propos de moi",
      description: "Passionné par le développement depuis plus de 5 ans, je me spécialise dans la création d'applications robustes et scalables. Mon approche combine design minimaliste et performances optimales.",
      experience_years: "5+ Années d'expérience",
      skills_title: "Savoir-faire",
      gdg_title: "GDG Member & Google Badges",
      gdg_desc: "Membre actif du Google Developer Group. Passionné par les technologies Google, de Firebase au Cloud Platform.",
      address: "Adresse",
      contact: "Coordonnées"
    },
    languages: {
      en: "English",
      fr: "Français"
    }
  },
  en: {
    nav: {
      home: "Home",
      me: "Me",
      projects: "Projects"
    },
    hero_title: "Fullstack Web & Mobile Developer",
    hero_subtitle: "I design modern, fluid, and performance-driven web and mobile experiences.",
    view_projects: "View My Projects",
    contact_me: "Contact Me",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    about_me: {
      title: "About Me",
      description: "Passionate about development for over 5 years, I specialize in building robust and scalable applications. My approach combines minimalist design with optimal performance.",
      experience_years: "5+ Years of Experience",
      skills_title: "Expertise",
      gdg_title: "GDG Member & Google Badges",
      gdg_desc: "Active member of the Google Developer Group. Passionate about Google technologies, from Firebase to Google Cloud Platform.",
      address: "Address",
      contact: "Contact Info"
    },
    languages: {
      en: "English",
      fr: "Français"
    }
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = keyof typeof translations.fr;
