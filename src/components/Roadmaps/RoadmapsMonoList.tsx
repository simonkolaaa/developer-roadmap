import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { LOCAL_ROADMAPS } from '../../data/local-roadmaps';

// Canvas interattivo per la griglia mesh liquida monocromatica (stile WebGL/three.js)
const LiquidCanvas = ({ activeIndex }: { activeIndex: number | null }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);
  const mousePos = useRef({ x: 140, y: 170 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = 280;
    let height = canvas.height = 340;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Colore della griglia: bianco semitrasparente sottilissimo
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;

      const cols = 14;
      const rows = 17;
      const cellW = width / (cols - 1);
      const cellH = height / (rows - 1);

      const points: { x: number; y: number }[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const origX = c * cellW;
          const origY = r * cellH;

          // Calcola distanza ed effetto attrazione liquida del mouse
          const dx = mousePos.current.x - origX;
          const dy = mousePos.current.y - origY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 90;
          let warpX = 0;
          let warpY = 0;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            // Allontanamento per effetto "bolla d'acqua/metaball"
            warpX = -(dx / dist) * force * 16;
            warpY = -(dy / dist) * force * 16;
          }

          // Movimento ondulatorio naturale
          const waveX = Math.sin(time + r * 0.25) * 6;
          const waveY = Math.cos(time + c * 0.25) * 6;

          points.push({
            x: origX + warpX + waveX,
            y: origY + warpY + waveY
          });
        }
      }

      // Linee orizzontali
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const pt = points[idx];
          if (c === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      }

      // Linee verticali
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const idx = r * cols + c;
          const pt = points[idx];
          if (r === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [activeIndex]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block bg-black" 
      style={{ filter: 'blur(0.4px)' }}
    />
  );
};

export const RoadmapsMonoList = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Coordinata del mouse a molla per inerzia liquida (Awwwards-style)
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { damping: 45, stiffness: 350 };
  const floatX = useSpring(mouseX, springConfig);
  const floatY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Posiziona il float leggermente sfalsato rispetto al cursore
      mouseX.set(e.clientX + 25);
      mouseY.set(e.clientY - 170);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  return (
    <div className="w-full">
      <div className="mb-12 flex items-baseline justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">// 01 . PERCORSI PERSONALI</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-medium tracking-tight text-white uppercase font-orbitron">
            Esplora i Roadmaps
          </h2>
        </div>
        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest hidden sm:block">
          HOVER FOR VISUAL
        </span>
      </div>

      <div className="w-full flex flex-col border-t border-white/5 relative z-10" ref={listRef}>
        {LOCAL_ROADMAPS.sort((a, b) => a.order - b.order).map((roadmap, i) => (
          <a
            key={roadmap.slug}
            href={`/${roadmap.slug}`}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            className="awwwards-list-item group relative w-full py-8 md:py-9 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between transition-colors duration-300"
          >
            {/* Sfondo soft hover che si attiva lateralmente */}
            <div 
              className="absolute inset-0 bg-white/[0.015] -z-10 transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100"
            />

            <div className="flex items-center gap-6 relative z-10">
              <span className="text-xs font-mono text-white/20 group-hover:text-white/60 transition-colors duration-300">
                {(i + 1).toString().padStart(2, '0')} /
              </span>
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-white/40 group-hover:text-white transition-all duration-300 uppercase font-orbitron">
                {roadmap.title.card}
              </h3>
            </div>

            <div className="flex items-center gap-8 mt-4 md:mt-0 relative z-10">
              <span className="text-[10px] font-mono text-white/20 group-hover:text-white/50 transition-colors duration-300">
                {roadmap.type === 'role' ? 'RUOLO' : 'COMPETENZA'}
              </span>
              <span className="text-[10px] font-mono text-white/20 group-hover:text-white/40 transition-colors duration-300">
                {roadmap.topics ? `${roadmap.topics.length} ARGOMENTI` : '0 ARGOMENTI'}
              </span>
              
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all duration-300 group-hover:border-white/30 group-hover:text-white group-hover:rotate-45 bg-black/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Floating Preview Card (aboutluca / igloo inspired) */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            style={{
              x: floatX,
              y: floatY,
              position: 'fixed',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              zIndex: 50,
            }}
            initial={{ opacity: 0, scale: 0.9, y: floatY.get() - 10 }}
            animate={{ opacity: 1, scale: 1, y: floatY.get() }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-[280px] h-[340px] rounded-2xl border border-white/10 bg-black overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.95)] flex flex-col justify-between"
          >
            {/* Sfondo Liquido Canvas */}
            <div className="absolute inset-0 z-0">
              <LiquidCanvas activeIndex={activeIndex} />
            </div>

            {/* Contenuto Monocromatico sovrapposto */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-between bg-gradient-to-t from-black via-black/40 to-transparent">
              <div>
                <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">// DETTAGLI ROADMAP</span>
                <h4 className="text-md font-bold text-white uppercase tracking-tight mt-1 font-orbitron">
                  {LOCAL_ROADMAPS[activeIndex].title.card}
                </h4>
              </div>

              <div>
                <p className="text-[11px] text-white/60 font-sans leading-relaxed line-clamp-3 mb-4">
                  {LOCAL_ROADMAPS[activeIndex].description}
                </p>
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-[9px] font-mono text-white/30 uppercase">
                    {LOCAL_ROADMAPS[activeIndex].topics ? `${LOCAL_ROADMAPS[activeIndex].topics.length} TOPICS` : '0 TOPICS'}
                  </span>
                  <span className="text-[9px] font-mono text-white tracking-widest flex items-center gap-1">
                    STUDIA ORA
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
