/* Contenido bilingüe del portafolio de Armando Aguilar.
   Cada texto es {es, en}. Usa pick(node, lang) para resolver. */
window.PICK = function (node, lang) {
  if (node == null) return "";
  if (typeof node === "string") return node;
  return node[lang] != null ? node[lang] : node.es;
};

window.CONTENT = {
  meta: {
    name: "Armando Aguilar",
    initials: "AA",
    role: { es: "Infraestructura & Arquitectura en la nube", en: "Infrastructure & Cloud Architecture" },
    available: { es: "Abierto a proyectos y oportunidades", en: "Open to projects & opportunities" },
  },

  nav: [
    { id: "inicio", es: "Inicio", en: "Home" },
    { id: "mente", es: "Enfoque", en: "Approach" },
    { id: "proyectos", es: "Proyectos", en: "Work" },
    { id: "sobre", es: "Sobre mí", en: "About" },
    { id: "habilidades", es: "Habilidades", en: "Skills" },
    { id: "contacto", es: "Contacto", en: "Contact" },
  ],

  hero: {
    kicker: { es: "Profesional de TI e infraestructura · +10 años", en: "IT & infrastructure professional · 10+ years" },
    role: { es: "Certificado en arquitectura de soluciones en la nube, ganando experiencia en proyectos reales", en: "Certified in cloud solutions architecture, gaining experience on real-world projects" },
    tagline: {
      es: ["Pienso en cómo se rompen", "las cosas.", "Antes de que se rompan."],
      en: ["I think about how", "things break.", "Before they do."],
    },
    sub: {
      es: "Diseño y sostengo sistemas anticipando dónde van a fallar: dependencias, casos límite, el detalle que nadie miró. Esa anticipación es mi oficio.",
      en: "I design and maintain systems by anticipating where they'll fail: dependencies, edge cases, the detail nobody checked. That anticipation is my craft.",
    },
    ctaPrimary: { es: "Ver proyectos", en: "View work" },
    ctaSecondary: { es: "Contacto", en: "Get in touch" },
    photoCaption: { es: "Armando Aguilar", en: "Armando Aguilar" },
  },

  analytic: {
    label: { es: "La mente analítica", en: "The analytical mind" },
    intro: {
      es: "Abordo la tecnología con una mentalidad analítica forjada en una trayectoria poco lineal. Donde otros ven sistemas aislados, yo veo dependencias interconectadas y posibles puntos de falla.",
      en: "I approach technology with an analytical mindset forged on a non-linear path. Where others see isolated systems, I see interconnected dependencies and potential points of failure.",
    },
    cols: [
      {
        title: { es: "Filosofía", en: "Philosophy" },
        body: { es: "La simplicidad es la mayor sofisticación. Reducir dependencias, aislar dominios.", en: "Simplicity is the ultimate sophistication. Reduce dependencies, isolate domains." },
      },
      {
        title: { es: "Métricas", en: "Metrics" },
        body: { es: "Medir todo. Optimizar con base en datos, no en intuición.", en: "Measure everything. Optimize based on data, not intuition." },
      },
      {
        title: { es: "Ejecución", en: "Execution" },
        body: { es: "Entrega iterativa con controles de calidad. Fallar rápido, recuperarse más rápido.", en: "Iterative delivery with quality gates. Fail fast, recover faster." },
      },
    ],
  },

  projects: [
    {
      id: "biblia",
      area: { es: "Sistemas · Nube", en: "Systems · Cloud" },
      name: { es: "Biblia de estudio MVI Amor y Gracia", en: "MVI Amor y Gracia Study Bible" },
      kind: "PWA",
      title: { es: "Estudiar la Biblia en su idioma original, sin salir de la app", en: "Study the Bible in its original language — without leaving the app" },
      problem: {
        es: "Las Biblias de estudio existentes cobran extra por el idioma original u obligan a salir a otras páginas, fragmentando el estudio.",
        en: "Existing study Bibles charge extra for the original language or push you out to other sites, fragmenting the study.",
      },
      result: {
        es: "Una PWA instalable y gratuita: al tocar cualquier palabra aparece su idioma original (griego/hebreo), significado, contexto, número Strong, morfología y todas sus apariciones, sin salir de la app. Indexé el texto palabra por palabra contra las fuentes en griego y hebreo, diseñé el modelo de datos que conecta cada término con sus apariciones, y la desplegué en AWS.",
        en: "A free, installable PWA: tap any word to reveal its original language (Greek/Hebrew), meaning, context, Strong's number, morphology, and every occurrence — without ever leaving the app. I indexed the text word by word against the original Greek and Hebrew sources, designed the data model that links each term to its occurrences, and deployed it on AWS.",
      },
      ai: true,
      tags: ["PWA", "AWS", { es: "Griego / Hebreo", en: "Greek / Hebrew" }, { es: "Modelo de datos", en: "Data model" }],
      status: { es: "En desarrollo", en: "In development" },
      link: null,
      linkPending: true,
      image: null,
      images: ["/assets/biblia-1.webp", "/assets/biblia-2.webp", "/assets/biblia-3.webp", "/assets/biblia-4.webp", "/assets/biblia-5.webp", "/assets/biblia-6.webp", "/assets/biblia-7.webp"],
      imageLabel: { es: "capturas de la PWA", en: "PWA screenshots" },
    },
    {
      id: "financiero",
      area: { es: "Sistemas · Seguridad", en: "Systems · Security" },
      name: { es: "MVI Amor y Gracia — Sistema financiero", en: "MVI Amor y Gracia — Financial System" },
      kind: { es: "Plataforma interna", en: "Internal platform" },
      title: { es: "Un sistema financiero que protege lo sensible", en: "A financial system that protects sensitive data by design" },
      problem: {
        es: "Administrar las finanzas de una organización con datos sensibles expuestos a riesgo.",
        en: "Managing an organization's finances while sensitive data sat exposed to risk.",
      },
      result: {
        es: "Diseñé el modelo de datos y la arquitectura de seguridad, dejando la información crítica fuera del alcance de la web.",
        en: "I designed the data model and the security architecture, keeping critical information beyond the reach of the public web.",
      },
      ai: true,
      tags: [{ es: "Arquitectura", en: "Architecture" }, { es: "Seguridad", en: "Security" }, { es: "Modelo de datos", en: "Data model" }],
      status: null,
      link: null,
      image: "/assets/dash-financiero.webp",
      imageLabel: { es: "dashboard real", en: "live dashboard" },
    },
    {
      id: "hyatt",
      area: { es: "Infraestructura · Recuperación ante desastre", en: "Infrastructure · Disaster recovery" },
      name: { es: "Hyatt Regency Cancún", en: "Hyatt Regency Cancún" },
      kind: { es: "Infraestructura de red", en: "Network infrastructure" },
      title: { es: "Restaurar todo en menos de 24 horas", en: "Restore everything in under 24 hours" },
      problem: {
        es: "Una tormenta tropical destruyó la infraestructura de red de un restaurante a horas de su inauguración.",
        en: "A tropical storm destroyed a restaurant's network infrastructure just hours before opening.",
      },
      result: {
        es: "No solo la restauré: rediseñé la instalación para resistir el entorno costero.",
        en: "I didn't just restore it — I redesigned the installation to withstand the coastal environment.",
      },
      ai: false,
      tags: [{ es: "Infraestructura de redes", en: "Network infrastructure" }, { es: "Configuración de equipos", en: "Workstation setup" }, { es: "Configuración de servidores", en: "Server configuration" }],
      status: null,
      link: null,
      image: "/assets/hyatt.webp",
      imageLabel: { es: "Hyatt Regency Cancún", en: "Hyatt Regency Cancún" },
    },
    {
      id: "santuario",
      area: { es: "Web · Desarrollo y animación", en: "Web · Development & motion" },
      name: { es: "Residenciales Santuario — La Senda", en: "Residenciales Santuario — La Senda" },
      kind: { es: "Sección de sitio", en: "Site section" },
      title: { es: "Una sección entera, construida y animada antes del amanecer", en: "A whole new section, built and animated before dawn" },
      problem: {
        es: "Un desarrollo inmobiliario de alto valor necesitaba una sección nueva en su sitio web ya existente, lista para una presentación clave al amanecer.",
        en: "A high-value real estate development needed a brand-new section on its existing website, ready for a key presentation at dawn.",
      },
      result: {
        es: "Construí la sección completa —contenido, diseño y animaciones— en una sola madrugada, integrada al sitio existente y adaptable a cualquier dispositivo.",
        en: "I built the entire section — content, design, and motion — in a single overnight push, integrated into the existing site and fully responsive.",
      },
      ai: false,
      tags: ["Web", { es: "Animación", en: "Motion" }, "Responsive", { es: "Entrega rápida", en: "Fast delivery" }],
      status: null,
      link: "https://santuarioresidenciales.com.mx/la-senda/",
      linkPending: true,
      image: "/assets/la-senda.webp",
      imageLabel: { es: "sitio en vivo", en: "live site" },
    },
  ],

  about: {
    label: { es: "Sobre mí", en: "About" },
    paras: [
      {
        es: "Soy Armando Aguilar, profesional de TI e infraestructura con más de una década sosteniendo sistemas reales. Hoy estoy en transición hacia la arquitectura de soluciones en la nube: llevar todo lo aprendido manteniendo cosas en producción hacia el diseño de plataformas que escalan y resisten.",
        en: "I'm Armando Aguilar, an IT and infrastructure professional with over a decade spent keeping real systems running. Today I'm moving into cloud solutions architecture — carrying everything I learned in production into the design of platforms that scale and endure.",
      },
      {
        es: "Mi formación es poco lineal, y esa es mi ventaja. Me formé en sistemas y redes en dos países —un TSU en México y una licenciatura en Francia— y dirijo equipos y proyectos de forma empírica.",
        en: "My path isn't linear, and that's my edge. I trained in systems and networks across two countries — an advanced technical degree in Mexico and a bachelor's in France — and I've led teams and projects hands-on, learning by doing.",
      },
    ],
    languagesLabel: { es: "Idiomas", en: "Languages" },
    languages: [
      { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
      { name: { es: "Inglés", en: "English" }, level: "C1" },
      { name: { es: "Francés", en: "French" }, level: { es: "Intermedio", en: "Intermediate" } },
    ],
    educationLabel: { es: "Formación", en: "Education" },
    education: [
      {
        school: "IUT — Institut Universitaire de Technologie",
        degree: { es: "Licenciatura en Sistemas Informáticos y de Software · Administración de Sistemas y Redes", en: "Bachelor's in Computer & Software Systems · Systems & Network Administration" },
        place: { es: "Francia", en: "France" },
        years: "2011 — 2012",
        desc: { es: "Proyecto de titulación: desarrollé y puse en marcha un servidor que conectaba a todas las universidades de Francia para gestionar eventos académicos entre ellas: comunicarse, saber dónde sería el próximo evento, qué lugares turísticos había alrededor y los hoteles cercanos recomendados.", en: "Capstone project: I built and deployed a server connecting every university in France so they could manage academic events together: communicate, see where the next event would be held, what tourist spots were nearby, and the recommended nearby hotels." },
      },
      {
        school: "Universidad Tecnológica Metropolitana",
        degree: { es: "Técnico Superior Universitario en TIC · Redes y Telecomunicaciones", en: "Advanced Technical Degree (TSU) in ICT · Networks & Telecommunications" },
        place: { es: "México", en: "Mexico" },
        years: "2009 — 2011",
        desc: { es: "Formación en redes y telecomunicaciones, donde gané varios primeros lugares en configuración de redes y telecomunicaciones. Tras un año de evaluaciones, fui uno de los pocos seleccionados a nivel nacional para una beca de estudios en Francia; me certifiqué en francés y obtuve un resultado sobresaliente en el examen nacional de egreso (EGETSU).", en: "Training in networks and telecommunications, where I won several first places in network configuration and telecommunications. After a year of evaluations, I was one of a handful chosen nationwide for a scholarship to study in France; I earned a French-language certification and scored 'outstanding' on the national exit exam (EGETSU)." },
      },
    ],
    photoLabel: { es: "Tu foto aquí", en: "Your photo here" },
    photo: "/assets/armando-aguilar-about.webp",
  },

  skills: {
    label: { es: "Habilidades", en: "Skills" },
    intro: { es: "Honesto, sin barras de nivel. Lo que de verdad hago.", en: "Honest, no level bars. What I actually do." },
    groups: [
      {
        label: { es: "Nube e Infraestructura", en: "Cloud & Infrastructure" },
        items: [
          { es: "AWS (en curso)", en: "AWS (in progress)" },
          { es: "Linux (básico, en mejora)", en: "Linux (basic, improving)" },
          { es: "Redes", en: "Networking" },
          "DNS / SSL",
          { es: "Administración de servidores", en: "Server administration" },
          { es: "Hosting", en: "Hosting" },
          "Git",
        ],
      },
      {
        label: { es: "Desarrollo y sistemas", en: "Development & systems" },
        items: [
          "HTML",
          "CSS",
          "Python",
          "WordPress",
          "WooCommerce",
          "Elementor",
          { es: "Dirección de desarrollo con IA (Claude Code)", en: "Leading AI-assisted development (Claude Code)" },
        ],
      },
    ],
    studying: { es: "Actualmente preparándome para la certificación oficial de AWS.", en: "Currently preparing for the official AWS certification." },
  },

  certs: {
    label: { es: "Certificaciones", en: "Certifications" },
    bannerLabel: { es: "Certificaciones AWS · completadas", en: "AWS certifications · completed" },
    items: [
      { name: "AWS Cloud Solutions Architect", issuer: "Coursera · AWS", note: { es: "Completado · 4 cursos · arquitectura de soluciones en la nube", en: "Completed · 4 courses · cloud solutions architecture" }, done: true, featured: true, link: "https://coursera.org/verify/professional-cert/E5CMG00KYTRP" },
      { name: "AWS Fundamentals", issuer: "Coursera · AWS", note: { es: "Completado · 3 cursos · fundamentos de AWS", en: "Completed · 3 courses · AWS fundamentals" }, done: true, featured: true, link: "https://coursera.org/verify/specialization/7OOXO00X4SJ6" },
    ],
    note: { es: "Y más de 50 cursos completados en Platzi, Coursera y Udemy.", en: "Plus 50+ completed courses on Platzi, Coursera, and Udemy." },
  },

  contact: {
    label: { es: "Contacto", en: "Contact" },
    headline: { es: "¿Construimos algo que no se rompa?", en: "Shall we build something that won't break?" },
    blurb: {
      es: "Disponible para proyectos de infraestructura, nube y desarrollo asistido por IA. Escríbeme y conversamos.",
      en: "Available for infrastructure, cloud, and AI-assisted development projects. Reach out and let's talk.",
    },
    email: "hola@armandoaguilar.dev",
    github: "https://github.com/armando86mx",
    githubLabel: "armando86mx",
    linkedin: "https://www.linkedin.com/in/armando-ag/",
    linkedinLabel: "armando-ag",
    locationLabel: { es: "Ubicación", en: "Location" },
    location: { es: "Puebla, México", en: "Puebla, Mexico" },
    locationLink: "https://www.google.com/maps/search/?api=1&query=Puebla%2C+M%C3%A9xico",
  },

  ui: {
    viewProject: { es: "Ver proyecto", en: "View project" },
    caseStudy: { es: "Ver caso de estudio", en: "View case study" },
    viewSite: { es: "Ver sitio web", en: "Visit website" },
    soon: { es: "en camino", en: "coming soon" },
    linkSoon: { es: "Enlace en camino", en: "Live link soon" },
    problem: { es: "Problema", en: "Problem" },
    result: { es: "Resultado", en: "Result" },
    builtAi: { es: "Desarrollo asistido por IA, bajo mi dirección", en: "AI-assisted development, under my direction" },
    verify: { es: "Verificar", en: "Verify" },
    featured: { es: "Destacado", en: "Featured" },
    scroll: { es: "Desplázate", en: "Scroll" },
    backHome: { es: "Volver a elegir dirección", en: "Back to directions" },
  },
};
