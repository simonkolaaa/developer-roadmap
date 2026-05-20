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
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="mb-16 relative z-10 bg-[#050505] py-12 md:py-16 border-t border-white/5">
      <div className="mb-8 flex items-baseline justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">// PERSONAL ARCHIVE</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-medium tracking-tight text-white uppercase font-orbitron">
            Your Created Roadmaps
          </h2>
        </div>
      </div>

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
              borderColor: "rgba(168, 85, 247, 0.35)",
              backgroundColor: "rgba(168, 85, 247, 0.04)"
            }}
            whileTap={{ scale: 0.99 }}
            key={roadmap.id}
            href={`/my-roadmap?id=${roadmap.id}`}
            className="group relative flex min-h-[90px] items-center justify-between rounded-xl border border-white/5 bg-transparent p-4 transition-all duration-300"
          >
            <span className="text-sm font-light text-white/50 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-450 transition-all duration-300 line-clamp-2 uppercase font-sans">
              {roadmap.title}
            </span>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[9px] font-mono text-white/30 whitespace-nowrap bg-white/5 px-2 py-0.5 rounded border border-white/5 group-hover:border-purple-500/20 group-hover:text-purple-300 transition-all duration-300">
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
                className="text-[10px] text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-full h-5 w-5 flex items-center justify-center transition-all border border-white/5 hover:border-red-500/25"
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
