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
  // Fondamenti di Programmazione
  {
    slug: 'fondamenti-programmazione',
    title: { card: 'Fondamenti di Programmazione', page: 'Fondamenti di Programmazione' },
    description: 'Basi della programmazione, algoritmi e strutture dati.',
    type: 'role',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 1,
    topics: [
      { title: 'Introduzione agli Algoritmi', json: '/roadmaps/local/algorithms.json' },
      { title: 'Variabili e Tipi di Dato', json: '/roadmaps/local/variables-types.json' },
      { title: 'Strutture di Controllo (If, Else, Switch)', json: '/roadmaps/local/control-flow.json' },
      { title: 'Cicli e Iterazioni (For, While)', json: '/roadmaps/local/control-flow.json' },
      { title: 'Funzioni e Ricorsione', json: '/roadmaps/local/functions.json' },
      { title: 'Array e Liste Lineari', json: '/roadmaps/local/data-structures.json' },
      { title: 'Puntatori e Gestione Memoria', json: '/roadmaps/local/java-jvm.json' },
      { title: 'Complessità Computazionale', json: '/roadmaps/local/algorithms.json' }
    ]
  },

  // Programmazione a Oggetti
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
      { title: 'Incapsulamento e Modificatori di Accesso', json: '/roadmaps/local/oop-encapsulation.json' },
      { title: 'Ereditarietà e Gerarchie', json: '/roadmaps/local/oop-inheritance.json' },
      { title: 'Polimorfismo e Dynamic Binding', json: '/roadmaps/local/oop-polymorphism.json' },
      { title: 'Interfacce e Classi Astratte', json: '/roadmaps/local/oop-inheritance.json' },
      { title: 'Eccezioni e Gestione Errori', json: '/roadmaps/local/rust-ownership.json' },
      { title: 'Design Patterns di Base', json: '/roadmaps/local/software-design.json' },
      { title: 'UML e Modellazione', json: '/roadmaps/local/software-design.json' }
    ]
  },

  // Java
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
      { title: 'JVM & Architecture', json: '/roadmaps/local/java-jvm.json' },
      { title: 'Spring Framework', json: '/roadmaps/local/java.json' },
      { title: 'Hibernate & Persistence', json: '/roadmaps/local/java.json' },
      { title: 'Concurrency in Java', json: '/roadmaps/local/go.json' }
    ]
  },

  // Python
  {
    slug: 'python',
    title: { card: 'Python', page: 'Python Developer Roadmap' },
    description: 'Dalle basi alla Data Science e Web Backend.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 4,
    topics: [
      { title: 'Python Core & Advanced', json: '/roadmaps/local/python-advanced.json' },
      { title: 'Web Backend (Flask & Jinja2)', json: '/roadmaps/local/web-flask.json' },
      { title: 'Data Analysis with Pandas', json: '/roadmaps/local/python-data.json' },
      { title: 'Machine Learning Basics', json: '/roadmaps/local/python-data.json' },
      { title: 'Automation & Scripting', json: '/roadmaps/local/python-automation.json' }
    ]
  },

  // Rust
  {
    slug: 'rust',
    title: { card: 'Rust', page: 'Rust Developer Roadmap' },
    description: 'Il linguaggio per performance e sicurezza di memoria.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 5,
    topics: [
      { title: 'Rust Safety & Lifecycle', json: '/roadmaps/local/rust.json' },
      { title: 'Ownership & Borrowing', json: '/roadmaps/local/rust-ownership.json' },
      { title: 'Error Handling (Result/Option)', json: '/roadmaps/local/rust-ownership.json' },
      { title: 'Systems Programming with Rust', json: '/roadmaps/local/rust.json' },
      { title: 'WebAssembly (Wasm) Integration', json: '/roadmaps/local/rust.json' }
    ]
  },

  // Go
  {
    slug: 'go',
    title: { card: 'Go', page: 'Go Developer Roadmap' },
    description: 'Semplicità e performance per microservizi.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 6,
    topics: [
      { title: 'Go Concurrency & Internals', json: '/roadmaps/local/go.json' },
      { title: 'Goroutines & Channels', json: '/roadmaps/local/go.json' },
      { title: 'Building Microservices', json: '/roadmaps/local/web-api.json' },
      { title: 'Testing in Go', json: '/roadmaps/local/go.json' },
      { title: 'Go and Kubernetes', json: '/roadmaps/local/go-kubernetes.json' }
    ]
  },

  // JavaScript & React
  {
    slug: 'javascript',
    title: { card: 'JavaScript & React', page: 'Frontend Mastery' },
    description: 'Il linguaggio del web: moderne feature e framework.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 7,
    topics: [
      { title: 'Modern JS & TypeScript', json: '/roadmaps/local/js-ts.json' },
      { title: 'React Ecosystem', json: '/roadmaps/local/react.json' },
      { title: 'State Management (Redux/Zustand)', json: '/roadmaps/local/react-state.json' },
      { title: 'Next.js & Server Side Rendering', json: '/roadmaps/local/react.json' },
      { title: 'Modern CSS (Tailwind/Styled)', json: '/roadmaps/local/js-ts.json' }
    ]
  },

  // Web Architecture & Database
  {
    slug: 'sviluppo-web-database',
    title: { card: 'Web & Database', page: 'System Architecture' },
    description: 'Architetture web, SQL, NoSQL e sviluppo full-stack.',
    type: 'role',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 8,
    topics: [
      { title: 'System Overview', json: '/roadmaps/local/web-api.json' },
      { title: 'Database Relazionali & NoSQL', json: '/roadmaps/local/database.json' },
      { title: 'API Design (REST/GraphQL)', json: '/roadmaps/local/web-api.json' },
      { title: 'System Scalability', json: '/roadmaps/local/database.json' },
      { title: 'Authentication & JWT', json: '/roadmaps/local/web-auth.json' }
    ]
  },

  // Esame di Maturità
  {
    slug: 'maturita',
    title: { card: 'Esame di Maturità', page: 'Esame di Maturità - Ciclo di Vita Web App' },
    description: 'Ripasso completo per l\'esame: Python, Database, Web, Flask e Sicurezza.',
    type: 'role',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 9,
    topics: [
      { title: 'Diagramma Completo', json: '/roadmaps/local/maturita.json' }
    ]
  }
];
