import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Preloader ispirato allo stile di mohamedshehata.net:
 * - Approccio completamente basato su HTML/CSS (niente SVG viewBox zoom)
 * - Il nome appare con animazione clip-path dal basso
 * - Poi tutto scala verso l'alto e dissolvenza
 * - Pulito, affidabile, ultra-smooth
 */
export const Preloader = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    // Controlla se l'intro è già stata riprodotta nella sessione
    if (typeof window !== 'undefined' && sessionStorage.getItem('intro_played')) {
      return; // Non renderizzare
    }
    setShouldRender(true);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    document.body.style.overflow = 'hidden';

    // Fase 1: l'animazione di entrata dura ~1.2s, poi teniamo il testo in vista
    const holdTimer = setTimeout(() => {
      setPhase('hold');
    }, 1200);

    // Fase 2: usciamo dopo 2.4s totali
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 2400);

    // Fase 3: rimuoviamo il componente dopo 3.2s
    const removeTimer = setTimeout(() => {
      document.body.style.overflow = 'unset';
      sessionStorage.setItem('intro_played', 'true');
      setShouldRender(false);
    }, 3200);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = 'unset';
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#020617]"
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Contenuto centrato */}
          <div className="flex flex-col items-center justify-center gap-4 px-4">
            
            {/* Nome principale — clip-path reveal dal basso */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 1.0, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.15
                }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase font-orbitron tracking-tighter text-center leading-none select-none"
              >
                SIMON
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 1.0, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.25
                }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase font-orbitron tracking-tighter text-center leading-none select-none"
                style={{
                  background: 'linear-gradient(90deg, #60a5fa, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                K<span className="relative">O</span>LA
              </motion.h1>
            </div>

            {/* Linea decorativa animata */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.5
              }}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent origin-center"
            />

            {/* Sottotitolo */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.6
              }}
              className="text-[10px] sm:text-xs font-mono tracking-[0.5em] text-slate-500 uppercase text-center"
            >
              Developer Roadmaps
            </motion.p>
          </div>

          {/* Sfondo sfumato sottile */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none"
            animate={phase === 'hold' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      ) : (
        /* Fase di uscita: scala e dissolvenza */
        <motion.div
          key="preloader-exit"
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#020617]"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center justify-center gap-4 px-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase font-orbitron tracking-tighter text-center leading-none select-none">
              SIMON
            </h1>
            <h1 
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase font-orbitron tracking-tighter text-center leading-none select-none"
              style={{
                background: 'linear-gradient(90deg, #60a5fa, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              KOLA
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <p className="text-[10px] sm:text-xs font-mono tracking-[0.5em] text-slate-500 uppercase text-center">
              Developer Roadmaps
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
