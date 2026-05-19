import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  return (
    <div className="mb-14 px-4 sm:px-0 relative z-10">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-4 text-lg font-bold text-white sm:text-2xl uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
      >
        Your Created Roadmaps
      </motion.h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {roadmaps.map((roadmap) => (
          <motion.a
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0px 10px 30px rgba(168, 85, 247, 0.2)",
              borderColor: "rgba(168, 85, 247, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
            key={roadmap.id}
            href={`/my-roadmap?id=${roadmap.id}`}
            className="group relative flex min-h-[100px] items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-md p-4 transition-colors"
          >
            <span className="text-base font-semibold text-slate-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all line-clamp-2">
              {roadmap.title}
            </span>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap bg-slate-950 px-2 py-1 rounded-full">
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
                className="text-xs text-red-500/30 hover:text-red-400 hover:bg-red-500/10 rounded-full p-1.5 transition-all"
                title="Elimina"
              >
                ×
              </button>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};
