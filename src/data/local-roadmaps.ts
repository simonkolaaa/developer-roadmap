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
  // Mappe dagli Appunti IT
  {
    slug: 'fondamenti-programmazione',
    title: {
      card: 'Fondamenti di Programmazione',
      page: 'Fondamenti di Programmazione'
    },
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
    title: {
      card: 'Programmazione a Oggetti',
      page: 'Programmazione a Oggetti (OOP)'
    },
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
  {
    slug: 'sviluppo-web-database',
    title: {
      card: 'Sviluppo Web e Database',
      page: 'Sviluppo Web e Database'
    },
    description: 'Architetture web, SQL, NoSQL e sviluppo full-stack.',
    type: 'role',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 3,
    topics: [
      'Protocollo HTTP e Client/Server',
      'HTML5 e CSS3 Moderno',
      'Database Relazionali (SQL)',
      'Normalizzazione delle Tabelle',
      'NoSQL e Document Stores',
      'API REST e JSON',
      'Autenticazione e Sicurezza Web',
      'Deployment e Cloud Hosting'
    ]
  },
  
  // Linguaggi di Programmazione
  {
    slug: 'java',
    title: {
      card: 'Java',
      page: 'Java Developer Roadmap'
    },
    description: 'Percorso completo per padroneggiare l ecosystem Java.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 4
  },
  {
    slug: 'python',
    title: {
      card: 'Python',
      page: 'Python Developer Roadmap'
    },
    description: 'Dalle basi alla Data Science e Web Backend.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 5
  },
  {
    slug: 'javascript',
    title: {
      card: 'JavaScript',
      page: 'JavaScript Mastery'
    },
    description: 'Il linguaggio del web: moderne feature e framework.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 6
  },
  {
    slug: 'sql',
    title: {
      card: 'SQL',
      page: 'SQL & Database Design'
    },
    description: 'Mastery nelle query e nell architettura dei dati.',
    type: 'skill',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 7
  }
];
