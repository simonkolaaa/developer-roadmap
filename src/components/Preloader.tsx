import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [phase, setPhase] = useState<'fill' | 'zoom' | 'exit'>('fill');

  useEffect(() => {
    // Rimuoviamo il sessionStorage così puoi vedere sempre l'animazione ricaricando
    setShouldRender(true);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Sequence timing
    const fillTimer = setTimeout(() => {
      setPhase('zoom');
    }, 2500); // Slower fill (2.5s)

    const exitTimer = setTimeout(() => {
      setPhase('exit');
      document.body.style.overflow = 'unset';
      sessionStorage.setItem('intro_played', 'true');
    }, 4500); // 2.5s fill + 2s zoom

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(exitTimer);
      document.body.style.overflow = 'unset';
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center overflow-hidden pointer-events-none"
          initial={{ backgroundColor: '#020617' }} // slate-950
          animate={phase === 'zoom' ? { backgroundColor: 'rgba(2, 6, 23, 0)' } : { backgroundColor: '#020617' }}
          transition={{ duration: 1.5, ease: 'easeIn' }}
          exit={{ opacity: 0 }}
        >
          {/* Sfondo sfumato che sparisce prima dello zoom */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black z-0"
            animate={phase === 'zoom' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 1.2 }}
          />

          {/* Testo Gigante Animato */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center whitespace-nowrap"
            style={{ transformOrigin: '73% 50%' }} // Punta verso la "O" di KOLA
            initial={{ scale: 1 }}
            animate={phase === 'zoom' ? { scale: 150, opacity: 0 } : { scale: 1 }}
            transition={phase === 'zoom' ? { duration: 2.2, ease: [0.76, 0, 0.24, 1] } : {}}
          >
            <style>{`
              .stroke-text {
                -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
                color: transparent;
                font-size: clamp(4rem, 15vw, 15rem);
              }
              .fill-text {
                font-size: clamp(4rem, 15vw, 15rem);
                background-image: linear-gradient(90deg, #60a5fa, #a855f7);
                -webkit-background-clip: text;
                color: transparent;
              }
            `}</style>
            
            <div className="relative font-black tracking-tighter leading-none uppercase">
              {/* Testo Trasparente con Bordo (Background) */}
              <div className="stroke-text absolute inset-0 select-none">
                SIMON KOLA
              </div>
              
              {/* Testo Riempito con maschera (Foreground animato) */}
              <motion.div 
                className="fill-text relative z-10 select-none overflow-hidden"
                initial={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }} // Inizia nascosto dal basso
                animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }} // Si riempie verso l'alto
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              >
                SIMON KOLA
              </motion.div>
            </div>
            
            {/* Piccola sottoscritta */}
            <motion.div
              className="mt-4 text-xs md:text-sm font-mono tracking-[0.5em] text-slate-500 uppercase text-center"
              animate={phase === 'zoom' ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Developer Roadmaps
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
