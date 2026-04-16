export interface LocalTopic {
  title: string;
  image?: string;
  json?: string;
  description?: string;
}

export interface LocalRoadmap {
  slug: string;
  title: {
    card: string;
    page: string;
  };
  description: string;
  type: 'role' | 'skill' | 'best-practice';
  createdAt: string;
  updatedAt: string;
  order: number;
  topics?: (string | LocalTopic)[];
}

export const LOCAL_ROADMAPS: LocalRoadmap[] = [
  // Mappe dagli Appunti IT & Basi
  {
    slug: 'fondamenti-programmazione',
    title: { card: 'Fondamenti di Programmazione', page: 'Fondamenti di Programmazione' },
    description: 'Basi della programmazione, algoritmi e strutture dati.',
    type: 'role',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 1,
    topics: [
      { title: 'Introduzione agli Algoritmi', json: '/roadmaps/local/programming-fundamentals.json' },
      'Variabili e Tipi di Dato',
      'Strutture di Controllo (If, Else, Switch)',
      'Cicli e Iterazioni (For, While)',
      'Funzioni e Ricorsione',
      'Array e Liste Lineari',
      'Puntatori e Gestione Memoria',
      'Complessità Computazionale'
    ]
  },
  {
    slug: 'programmazione-oggetti',
    title: { card: 'Programmazione a Oggetti', page: 'Programmazione a Oggetti (OOP)' },
    description: 'Principi di OOP, classi, interfacce ed ereditarietà.',
    type: 'role',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 2,
    topics: [
      { title: 'Classi e Oggetti', json: '/roadmaps/local/oop-classes.json' },
      'Incapsulamento e Modificatori di Accesso',
      { title: 'Ereditarietà e Gerarchie', json: '/roadmaps/local/oop-inheritance.json' },
      'Polimorfismo e Dynamic Binding',
      'Interfacce e Classi Astratte',
      'Eccezioni e Gestione Errori',
      'Design Patterns di Base',
      'UML e Modellazione'
    ]
  },

  // Roadmap Linguaggi (Interattive Mermaid via JSON)
  {
    slug: 'java',
    title: { card: 'Java', page: 'Java Developer Roadmap' },
    description: 'Il percorso completo per padroneggiare l ecosystem Java.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 3,
    topics: [
      { title: 'Java Core & Ecosystem', json: '/roadmaps/local/java.json' },
      'JVM & Architecture',
      'Spring Framework',
      'Hibernate & Persistence',
      'Concurrency in Java'
    ]
  },
  {
    slug: 'python',
    title: { card: 'Python', page: 'Python Developer Roadmap' },
    description: 'Dalle basi alla Data Science e Web Backend.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 3,
    topics: [
      { title: 'Python Core & Advanced', json: '/roadmaps/local/python-advanced.json' },
      { title: 'Web Backend (Flask & Jinja2)', json: '/roadmaps/local/web-flask.json' },
      'Data Analysis with Pandas',
      'Machine Learning Basics',
      'Automation & Scripting'
    ]
  },
  {
    slug: 'rust',
    title: { card: 'Rust', page: 'Rust Developer Roadmap' },
    description: 'Il linguaggio per performance e sicurezza di memoria.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 4,
    topics: [
      { title: 'Rust Safety & Lifecycle', json: '/roadmaps/local/rust.json' },
      'Ownership & Borrowing',
      'Error Handling (Result/Option)',
      'Systems Programming with Rust',
      'WebAssembly (Wasm) Integration'
    ]
  },
  {
    slug: 'go',
    title: { card: 'Go', page: 'Go Developer Roadmap' },
    description: 'Semplicità e performance per microservizi.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 5,
    topics: [
      { title: 'Go Concurrency & Internals', json: '/roadmaps/local/go.json' },
      'Goroutines & Channels',
      'Building Microservices',
      'Testing in Go',
      'Go and Kubernetes'
    ]
  },
  {
    slug: 'javascript',
    title: { card: 'JavaScript & React', page: 'Frontend Mastery' },
    description: 'Il linguaggio del web: moderne feature e framework.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 6,
    topics: [
      { title: 'Modern JS & TypeScript', json: '/roadmaps/local/js-ts.json' },
      { title: 'React Ecosystem', json: '/roadmaps/local/react.json' },
      'State Management (Redux/Zustand)',
      'Next.js & Server Side Rendering',
      'Modern CSS (Tailwind/Styled)'
    ]
  },
  {
    slug: 'sviluppo-web-database',
    title: { card: 'Web & Database', page: 'System Architecture' },
    description: 'Architetture web, SQL, NoSQL e sviluppo full-stack.',
    type: 'role',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 7,
    topics: [
      { title: 'System Overview', json: '/roadmaps/local/web-flask.json' },
      { title: 'Database Relazionali & NoSQL', json: '/roadmaps/local/database.json' },
      'API Design (REST/GraphQL)',
      'System Scalability',
      'Authentication & JWT'
    ]
  }
];
