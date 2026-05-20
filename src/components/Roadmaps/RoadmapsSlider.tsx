import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LOCAL_ROADMAPS } from '../../data/local-roadmaps';

const RoadmapCard = ({ roadmap, index }: { roadmap: typeof LOCAL_ROADMAPS[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Calcolo dell'inclinazione 3D dinamica
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { damping: 25, stiffness: 200 });
  const scale = useSpring(1, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);

    // Coordinate locali per spotlight
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => {
    scale.set(1.03);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        scale,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className="awwwards-list-item relative h-[380px] w-[290px] shrink-0 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden p-6 flex flex-col justify-between group transition-all duration-300 hover:border-yellow-400/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-pointer"
    >
      {/* Spotlight glow overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(251,191,36,0.06), transparent 60%)`
        }}
      />
      
      {/* Top light reflection border */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>

      <div style={{ transform: 'translateZ(30px)' }} className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-yellow-500/60 font-semibold">// {(index + 1).toString().padStart(2, '0')}</span>
          <span className="text-[9px] font-mono border border-white/5 rounded px-2 py-0.5 text-slate-500 group-hover:border-yellow-500/20 group-hover:text-yellow-400 transition-colors duration-300">
            {roadmap.type === 'role' ? 'RUOLO' : 'COMPETENZA'}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-200 uppercase font-orbitron group-hover:text-white transition-colors duration-300">
          {roadmap.title.card}
        </h3>
      </div>

      <div style={{ transform: 'translateZ(20px)' }}>
        <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
          {roadmap.description}
        </p>
      </div>

      <div style={{ transform: 'translateZ(25px)' }} className="flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors duration-300">
          {roadmap.topics ? `${roadmap.topics.length} ARGOMENTI` : '0 ARGOMENTI'}
        </span>

        <a
          href={`/${roadmap.slug}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-slate-950/60 text-slate-400 transition-all duration-300 group-hover:border-yellow-400/40 group-hover:bg-yellow-500/10 group-hover:text-yellow-400 group-hover:rotate-45"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </motion.div>
  );
};

export const RoadmapsSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const totalScrollable = scrollWidth - clientWidth;
    if (totalScrollable <= 0) return;
    setScrollProgress(scrollLeft / totalScrollable);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    const scrollAmount = clientWidth * 0.75;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] text-yellow-400 font-orbitron uppercase">// 01 . PERCORSI PERSONALI</span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-orbitron">
            Esplora i Roadmaps
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/40 text-slate-400 backdrop-blur-sm transition-all hover:border-yellow-400/40 hover:text-yellow-400 active:scale-95"
            aria-label="Precedente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/40 text-slate-400 backdrop-blur-sm transition-all hover:border-yellow-400/40 hover:text-yellow-400 active:scale-95"
            aria-label="Successivo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      {/* Container di scorrimento orizzontale */}
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

      {/* Footer con Barra di Progresso */}
      <div className="flex flex-col items-center justify-center gap-2 mt-4">
        <div className="w-full max-w-xs h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          ></div>
        </div>
        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
          DRAG OR SCROLL TO EXPLORE
        </span>
      </div>
    </div>
  );
};
