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
    order: 1
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
    order: 2
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
    order: 3
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
