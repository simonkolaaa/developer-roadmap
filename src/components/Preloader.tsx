import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if we already showed the preloader in this session
    if (sessionStorage.getItem('intro_played')) {
      setIsLoading(false);
      return;
    }

    const duration = 2000;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('intro_played', 'true');
        }, 500); // Wait half a sec at 100% before dismissing
      }
    }, intervalTime);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      clearInterval(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Make sure body overflow is reset when component unmounts or finishes loading
  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-slate-950"
        >
          <div className="relative flex flex-col items-center">
            {/* Background glowing orb */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/30 blur-[80px]"
            />
            
            <motion.div 
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <h1 className="relative z-10 text-5xl font-extrabold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 sm:text-7xl drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                Simon Kola
              </h1>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex w-full max-w-xs flex-col items-center gap-4 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="flex w-full justify-between text-xs font-mono tracking-widest text-slate-400">
                <span>INITIALIZING</span>
                <span>{progress}%</span>
              </div>
              <div className="h-[2px] w-full overflow-hidden bg-slate-800">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
