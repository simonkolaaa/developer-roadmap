import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

export const Preloader = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [phase, setPhase] = useState<'fill' | 'zoom' | 'exit'>('fill');
  const zoomPoint = useRef({ x: 672, y: 100 }); // Default estimate for 'O' in KOLA

  const zoomProgress = useMotionValue(0);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Sequence timing
    const fillTimer = setTimeout(() => {
      setPhase('zoom');
      // Smooth Awwwards cubic-bezier zoom animation on the viewBox
      animate(zoomProgress, 1, {
        duration: 1.6,
        ease: [0.76, 0, 0.24, 1],
      });
    }, 1500);

    const exitTimer = setTimeout(() => {
      setPhase('exit');
      document.body.style.overflow = 'unset';
      sessionStorage.setItem('intro_played', 'true');
    }, 3100);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(exitTimer);
      document.body.style.overflow = 'unset';
    };
  }, [shouldRender]);

  // Interpolazione viewBox per ingrandimento vettoriale puro (100% nitido)
  const originalW = 1000;
  const originalH = 200;
  const targetW = 12; // Zoom ravvicinato dentro il buco della lettera "O"
  const targetH = 2.4;

  const viewBox = useTransform(zoomProgress, (progress) => {
    const x = zoomPoint.current.x;
    const y = zoomPoint.current.y;
    
    const w = originalW - (originalW - targetW) * progress;
    const h = originalH - (originalH - targetH) * progress;
    
    // Linearly interpolate the center point from the initial center to the target point
    const centerX = (originalW / 2) + (x - (originalW / 2)) * progress;
    const centerY = (originalH / 2) + (y - (originalH / 2)) * progress;

    const currentX = centerX - w / 2;
    const currentY = centerY - h / 2;
    
    return `${currentX} ${currentY} ${w} ${h}`;
  });

  const textOpacity = useTransform(zoomProgress, [0, 0.85, 1], [1, 1, 0]);

  useEffect(() => {
    if (!shouldRender) return;
    
    // Rilevamento programmatico delle coordinate per centrare la "O" a prescindere dal font/display
    const detectTimer = setTimeout(() => {
      const oEl = document.getElementById('zoom-o');
      if (oEl) {
        try {
          const bbox = (oEl as any).getBBox();
          if (bbox && bbox.width > 0) {
            zoomPoint.current = {
              x: bbox.x + bbox.width / 2,
              y: bbox.y + bbox.height / 2
            };
          }
        } catch (e) {
          console.warn("Failed to get BBox of zoom-o:", e);
        }
      }
    }, 300);

    return () => clearTimeout(detectTimer);
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center overflow-hidden pointer-events-none"
          initial={{ backgroundColor: '#020617' }}
          animate={{ backgroundColor: '#020617' }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Sfondo sfumato che sparisce prima dello zoom */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black z-0"
            animate={phase === 'zoom' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Testo Gigante Animato (Vettoriale al 100% per evitare sgranature) */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full">
            <motion.svg 
              viewBox={viewBox} 
              className="w-full max-w-[90vw] md:max-w-6xl h-auto drop-shadow-2xl"
              preserveAspectRatio="xMidYMid meet"
              style={{ opacity: textOpacity }}
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
                  SIMON K<tspan id="zoom-o">O</tspan>LA
                </text>
              </g>
            </motion.svg>
            
            {/* Piccola sottoscritta */}
            <motion.div
              className="mt-4 text-xs md:text-sm font-mono tracking-[0.5em] text-slate-500 uppercase text-center"
              style={{ opacity: textOpacity }}
            >
              Developer Roadmaps
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
