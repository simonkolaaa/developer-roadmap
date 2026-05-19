import { useEffect, useState } from 'react';
import { MermaidRenderer } from './MermaidRenderer';

export const SavedRoadmapViewer = () => {
  const [roadmap, setRoadmap] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id) {
      const saved = JSON.parse(localStorage.getItem('my-roadmaps') || '[]');
      const found = saved.find((r: any) => r.id === id);
      if (found) {
        setRoadmap(found);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-red-400">Roadmap non trovata</h1>
        <p className="text-slate-400">La roadmap richiesta non esiste o è stata eliminata dal tuo browser.</p>
        <a href="/" className="mt-4 rounded-full bg-slate-800 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700">
          Torna alla Home
        </a>
      </div>
    );
  }

  if (!roadmap) {
    return <div className="p-20 text-center text-slate-400">Caricamento...</div>;
  }

  return (
    <>
      <div className='border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 py-12'>
        <div className='mx-auto w-full max-w-[98vw] px-4 md:px-8'>
          <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium tracking-widest text-green-400 uppercase'>
            ✨ Personalizzata
          </div>
          <h1 className='mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl'>
            {roadmap.title}
          </h1>
          <p className='max-w-2xl text-base leading-relaxed text-slate-400'>
            Generata con AI il {new Date(roadmap.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className='mx-auto w-full max-w-[98vw] px-2 py-10 md:px-8'>
        <MermaidRenderer content={roadmap.content} definitions={{}} />
      </div>
    </>
  );
};
