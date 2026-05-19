import { useEffect, useState } from 'react';

interface SavedRoadmap {
  id: string;
  title: string;
  content: string;
  date: string;
}

export const MyRoadmapsList = () => {
  const [roadmaps, setRoadmaps] = useState<SavedRoadmap[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my-roadmaps') || '[]');
    setRoadmaps(saved);
  }, []);

  if (roadmaps.length === 0) {
    return null;
  }

  return (
    <div className="mb-14 px-4 sm:px-0">
      <h2 className="mb-3 text-lg font-bold text-white sm:text-xl uppercase tracking-widest text-blue-400">
        YOUR CREATED ROADMAPS
      </h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {roadmaps.map((roadmap) => (
          <a
            key={roadmap.id}
            href={`/my-roadmap?id=${roadmap.id}`}
            className="group relative flex min-h-[82px] items-center justify-between rounded-md border border-slate-800 bg-slate-900 p-3 transition-all hover:border-blue-500/50 hover:bg-slate-800"
          >
            <span className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-2">
              {roadmap.title}
            </span>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-slate-500 whitespace-nowrap">
                {new Date(roadmap.date).toLocaleDateString()}
              </span>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (confirm('Vuoi eliminare questa roadmap?')) {
                    const newRoadmaps = roadmaps.filter(r => r.id !== roadmap.id);
                    localStorage.setItem('my-roadmaps', JSON.stringify(newRoadmaps));
                    setRoadmaps(newRoadmaps);
                  }
                }}
                className="text-xs text-red-500/50 hover:text-red-400 p-1"
                title="Elimina"
              >
                ×
              </button>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
