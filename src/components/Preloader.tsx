import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Rimosso il check del sessionStorage per far godere l'animazione ad ogni F5

    const duration = 1500; // Hyper-fast 1.5 seconds
    const intervalTime = 15;
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
        }, 300); // Piccola pausa a 100% prima del botto
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
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
          exit={{ backgroundColor: "rgba(2, 6, 23, 0)", pointerEvents: "none" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Sfondo Esplosivo in uscita */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black z-0"
            initial={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: "circIn" }}
          />

          <div className="relative z-10 flex w-full h-full flex-col items-center justify-center">
            
            {/* Contatore Gigante e Maschera */}
            <div className="relative flex items-end overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%', opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="flex items-end"
              >
                <h1 className="text-[12rem] md:text-[20rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-800 mix-blend-overlay">
                  {progress}
                </h1>
                <span className="text-4xl md:text-8xl font-black text-slate-700 mb-8 md:mb-16 mix-blend-overlay">%</span>
              </motion.div>
            </div>
            
            {/* Nome che appare come "sottotitolo" */}
            <motion.div 
              className="absolute bottom-20 overflow-hidden"
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="text-2xl md:text-4xl font-extrabold uppercase tracking-[0.5em] text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
              >
                Simon Kola
              </motion.h2>
            </motion.div>

          </div>

          {/* Curtain Reveal Effect (Le porte che si aprono) */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-slate-950 z-20 pointer-events-none"
            initial={{ y: '-100%' }}
            exit={{ y: '-100%' }} // Si assicura che scivoli via
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-950 z-20 pointer-events-none"
            initial={{ y: '100%' }}
            exit={{ y: '100%' }} // Si assicura che scivoli via
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
