import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 20+ font che ciclano rapidamente sul nome prima dell'entrata nel sito.
 * Mix di Google Fonts system + web-safe per garantire variazione visiva istantanea.
 */
const CYCLING_FONTS = [
  '"Courier New", monospace',
  '"Georgia", serif',
  '"Impact", sans-serif',
  '"Comic Sans MS", cursive',
  '"Times New Roman", serif',
  '"Trebuchet MS", sans-serif',
  '"Lucida Console", monospace',
  '"Palatino", serif',
  '"Garamond", serif',
  '"Brush Script MT", cursive',
  '"Arial Black", sans-serif',
  '"Copperplate", serif',
  '"Papyrus", fantasy',
  '"Verdana", sans-serif',
  '"Futura", sans-serif',
  '"Didot", serif',
  '"Rockwell", serif',
  '"Monaco", monospace',
  '"Gill Sans", sans-serif',
  '"Baskerville", serif',
  '"Optima", sans-serif',
  '"Franklin Gothic", sans-serif',
  '"Orbitron", sans-serif', // Font finale!
];

export const Preloader = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [phase, setPhase] = useState<'cycling' | 'reveal' | 'exit'>('cycling');
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [cycleComplete, setCycleComplete] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('intro_played')) {
      return;
    }
    setShouldRender(true);
  }, []);

  // Font cycling: cambia font ogni 120ms, cicla attraverso tutti i 23 font
  useEffect(() => {
    if (!shouldRender || cycleComplete) return;

    const interval = setInterval(() => {
      setCurrentFontIndex(prev => {
        const next = prev + 1;
        if (next >= CYCLING_FONTS.length) {
          setCycleComplete(true);
          clearInterval(interval);
          return CYCLING_FONTS.length - 1; // Resta su Orbitron
        }
        return next;
      });
    }, 120); // ~120ms × 23 font ≈ 2.8 secondi di cycling

    return () => clearInterval(interval);
  }, [shouldRender, cycleComplete]);

  // Dopo che il cycling è completo, avvia la fase reveal
  useEffect(() => {
    if (!cycleComplete) return;

    document.body.style.overflow = 'hidden';

    // Tieni il font finale visibile per 600ms
    const revealTimer = setTimeout(() => {
      setPhase('reveal');
    }, 600);

    // Esci dopo altri 800ms
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 1400);

    // Rimuovi completamente dopo la transizione
    const removeTimer = setTimeout(() => {
      document.body.style.overflow = 'unset';
      sessionStorage.setItem('intro_played', 'true');
      setShouldRender(false);
    }, 2200);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = 'unset';
    };
  }, [cycleComplete]);

  // Lock scroll durante il cycling
  useEffect(() => {
    if (shouldRender) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [shouldRender]);

  if (!shouldRender) return null;

  const currentFont = CYCLING_FONTS[currentFontIndex];
  const isFinalFont = currentFontIndex === CYCLING_FONTS.length - 1;

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#020617]"
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: 'blur(10px)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Flash visivo al cambio font */}
          <motion.div
            key={currentFontIndex}
            className="absolute inset-0 bg-white/[0.015] pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />

          {/* Contenuto centrato */}
          <div className="flex flex-col items-center justify-center gap-3 px-4">
            
            {/* SIMON — sempre bianco */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: isFinalFont ? 0 : 0 }}
                animate={isFinalFont ? { y: 0 } : {}}
                className="text-center"
              >
                <span
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none select-none block transition-none"
                  style={{ fontFamily: currentFont }}
                >
                  SIMON
                </span>
              </motion.div>
            </div>

            {/* KOLA — gradiente blu→viola */}
            <div className="overflow-hidden">
              <motion.div className="text-center">
                <span
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none select-none block transition-none"
                  style={{
                    fontFamily: currentFont,
                    background: 'linear-gradient(90deg, #60a5fa, #a855f7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  KOLA
                </span>
              </motion.div>
            </div>

            {/* Linea decorativa — appare solo con il font finale */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isFinalFont ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent origin-center"
            />

            {/* Sottotitolo — appare solo con il font finale */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={isFinalFont ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[10px] sm:text-xs font-mono tracking-[0.5em] text-slate-500 uppercase text-center"
            >
              Developer Roadmaps
            </motion.p>

            {/* Indicatore di cycling — barra di caricamento font */}
            <motion.div
              className="mt-6 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden"
              animate={isFinalFont ? { opacity: 0, y: -10 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${((currentFontIndex + 1) / CYCLING_FONTS.length) * 100}%` }}
                transition={{ duration: 0.08 }}
              />
            </motion.div>

            {/* Font name indicator — piccolo testo che mostra il font corrente */}
            <motion.span
              key={currentFont}
              initial={{ opacity: 0 }}
              animate={{ opacity: isFinalFont ? 0 : 0.3 }}
              className="text-[8px] font-mono text-white/30 tracking-widest uppercase mt-1"
            >
              {currentFont.split(',')[0].replace(/"/g, '')}
            </motion.span>
          </div>

          {/* Sfondo gradiente sottile */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/8 via-transparent to-blue-900/8 pointer-events-none" />
        </motion.div>
      ) : (
        <motion.div
          key="preloader-exit"
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#020617]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center justify-center gap-3 px-4">
            <span
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase font-orbitron tracking-tighter leading-none select-none block"
            >
              SIMON
            </span>
            <span
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase font-orbitron tracking-tighter leading-none select-none block"
              style={{
                background: 'linear-gradient(90deg, #60a5fa, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              KOLA
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
