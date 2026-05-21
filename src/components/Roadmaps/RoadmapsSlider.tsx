import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LOCAL_ROADMAPS } from '../../data/local-roadmaps';

/* ================================================================ */
/*  Particelle animate interne alla card                             */
/* ================================================================ */
const CardParticles = ({ isHovered }: { isHovered: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const mouse = useRef({ x: 145, y: 190 });
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = 320;
    canvas.height = 400;

    // Crea 40 particelle sparse
    if (particles.current.length === 0) {
      for (let i = 0; i < 40; i++) {
        particles.current.push({
          x: Math.random() * 320,
          y: Math.random() * 400,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.3 + 0.05,
        });
      }
    }

    const handleMouse = (e: MouseEvent) => {
      if (!isHovered) return;
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', handleMouse);

    const render = () => {
      ctx.clearRect(0, 0, 320, 400);

      particles.current.forEach((p) => {
        // Attrazione magnetica verso il cursore quando in hover
        if (isHovered) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120 * 0.02;
            p.vx += dx * force * 0.1;
            p.vy += dy * force * 0.1;
          }
        }

        // Friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = 320;
        if (p.x > 320) p.x = 0;
        if (p.y < 0) p.y = 400;
        if (p.y > 400) p.y = 0;

        // Draw
        const alpha = isHovered ? Math.min(p.alpha * 3, 0.6) : p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.fill();
      });

      // Connessioni tra particelle vicine (se in hover)
      if (isHovered) {
        particles.current.forEach((a, i) => {
          particles.current.slice(i + 1).forEach((b) => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 60) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(96, 165, 250, ${0.15 * (1 - dist / 60)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
      style={{ opacity: isHovered ? 1 : 0.2 }}
    />
  );
};

/* ================================================================ */
/*  Singola Card Roadmap con effetto 3D + Particelle                 */
/* ================================================================ */
const RoadmapCard = ({ roadmap, index }: { roadmap: typeof LOCAL_ROADMAPS[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { damping: 20, stiffness: 180 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { damping: 20, stiffness: 180 });
  const scale = useSpring(1, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
    cardRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const topicCount = roadmap.topics?.length ?? 0;
  const typeLabel = roadmap.type === 'role' ? 'PERCORSO' : roadmap.type === 'skill' ? 'COMPETENZA' : 'BEST PRACTICE';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsHovered(true); scale.set(1.04); }}
      onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); scale.set(1); }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX, rotateY, scale,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className="awwwards-list-item relative h-[400px] w-[320px] shrink-0 rounded-2xl border border-white/8 overflow-hidden p-6 flex flex-col justify-between group cursor-pointer bg-[#0a0f1c]"
    >
      {/* Particelle */}
      <div className="absolute inset-0 -z-10">
        <CardParticles isHovered={isHovered} />
      </div>

      {/* Spotlight che segue il mouse */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at var(--mx, 0px) var(--my, 0px), rgba(168,85,247,0.12), transparent 60%)`
        }}
      />

      {/* Bordo superiore brillante */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent group-hover:via-purple-400/50 transition-all duration-500" />
      
      {/* Bordo inferiore che appare in hover */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Header */}
      <div style={{ transform: 'translateZ(30px)' }} className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-purple-400/70 font-semibold">
            // {(index + 1).toString().padStart(2, '0')}
          </span>
          <span className="text-[8px] font-mono border border-white/10 rounded-full px-2.5 py-0.5 text-slate-400 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-all duration-300 bg-white/[0.02]">
            {typeLabel}
          </span>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-slate-200 uppercase font-orbitron group-hover:text-white transition-colors duration-300 leading-tight">
          {roadmap.title.card}
        </h3>
      </div>

      {/* Description */}
      <div style={{ transform: 'translateZ(20px)' }} className="relative z-10 flex-1 flex items-center">
        <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3 group-hover:text-slate-300 transition-colors duration-300">
          {roadmap.description}
        </p>
      </div>

      {/* Footer */}
      <div style={{ transform: 'translateZ(25px)' }} className="flex items-center justify-between border-t border-white/5 pt-4 relative z-10 group-hover:border-purple-500/15 transition-colors duration-300">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors duration-300 tabular-nums">
            {topicCount}
          </span>
          <span className="text-[10px] font-mono text-slate-600 uppercase">
            ARGOMENTI
          </span>
        </div>

        <a
          href={`/${roadmap.slug}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-slate-400 transition-all duration-500 group-hover:border-purple-400/40 group-hover:bg-purple-500/10 group-hover:text-purple-400 group-hover:rotate-[135deg] group-hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </motion.div>
  );
};

/* ================================================================ */
/*  Slider Orizzontale                                                */
/* ================================================================ */
export const RoadmapsSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const total = scrollWidth - clientWidth;
    if (total <= 0) return;
    setScrollProgress(scrollLeft / total);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: dir === 'left' ? -containerRef.current.clientWidth * 0.7 : containerRef.current.clientWidth * 0.7,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] text-purple-400 font-orbitron uppercase">// 01 . PERCORSI PERSONALI</span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-orbitron">
            Esplora i Roadmaps
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/40 text-slate-400 backdrop-blur-sm transition-all hover:border-purple-400/40 hover:text-purple-400 hover:bg-purple-500/10 active:scale-95"
            aria-label="Precedente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/40 text-slate-400 backdrop-blur-sm transition-all hover:border-purple-400/40 hover:text-purple-400 hover:bg-purple-500/10 active:scale-95"
            aria-label="Successivo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex w-full gap-6 overflow-x-auto pb-8 pt-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {LOCAL_ROADMAPS.sort((a, b) => a.order - b.order).map((roadmap, i) => (
          <div key={roadmap.slug} className="snap-start">
            <RoadmapCard roadmap={roadmap} index={i} />
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex flex-col items-center justify-center gap-2 mt-4">
        <div className="w-full max-w-xs h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${Math.max(scrollProgress * 100, 5)}%` }}
          />
        </div>
        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
          TRASCINA PER ESPLORARE
        </span>
      </div>
    </div>
  );
};
