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
    }, 1500); // Snappy fill (1.5s)

    const exitTimer = setTimeout(() => {
      setPhase('exit');
      document.body.style.overflow = 'unset';
      sessionStorage.setItem('intro_played', 'true');
    }, 3000); // 1.5s fill + 1.5s zoom

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
          transition={{ duration: 1.0, ease: 'easeIn' }}
          exit={{ opacity: 0 }}
        >
          {/* Sfondo sfumato che sparisce prima dello zoom */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black z-0"
            animate={phase === 'zoom' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Testo Gigante Animato (Convertito in SVG Vettoriale per performance) */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center w-full"
            style={{ 
              transformOrigin: '76% 50%', // Punta esattamenta verso la "O" di KOLA
              willChange: 'transform' // GPU Acceleration
            }}
            initial={{ scale: 1 }}
            animate={phase === 'zoom' ? { scale: 180, opacity: 0 } : { scale: 1 }}
            transition={phase === 'zoom' ? { duration: 1.5, ease: [0.76, 0, 0.24, 1] } : {}}
          >
            <svg 
              viewBox="0 0 1000 200" 
              className="w-full max-w-[90vw] md:max-w-6xl h-auto drop-shadow-2xl"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                
                <clipPath id="fillClip">
                  <motion.rect
                    x="0"
                    width="1000"
                    initial={{ y: 200, height: 0 }}
                    animate={{ y: 0, height: 200 }}
                    transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                  />
                </clipPath>
              </defs>

              {/* Stroke Text (Background) */}
              <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="font-black uppercase tracking-tighter"
                style={{ fontSize: '140px', fontFamily: 'Orbitron, sans-serif' }}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
                fill="transparent"
              >
                SIMON KOLA
              </text>

              {/* Fill Text (Foreground) */}
              <g clipPath="url(#fillClip)">
                <text 
                  x="50%" 
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="font-black uppercase tracking-tighter"
                  style={{ fontSize: '140px', fontFamily: 'Orbitron, sans-serif' }}
                  fill="url(#textGradient)"
                >
                  SIMON KOLA
                </text>
              </g>
            </svg>
            
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
