import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Magnetic } from '../Magnetic';

/* ------------------------------------------------------------------ */
/*  Animated Counter Hook                                              */
/* ------------------------------------------------------------------ */
function useCounter(target: number, duration = 2000, delay = 400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return value;
}

/* ------------------------------------------------------------------ */
/*  Floating Badge Pills                                               */
/* ------------------------------------------------------------------ */
const floatingPills = [
  { label: 'React',    top: '14%',    left: '5%',   delay: '0s',   dur: '14s' },
  { label: 'DevOps',  top: '20%',    right: '6%',  delay: '2.5s', dur: '17s' },
  { label: 'AI / ML', bottom: '30%', left: '8%',   delay: '4s',   dur: '19s' },
  { label: 'Backend', bottom: '20%', right: '9%',  delay: '1s',   dur: '15s' },
];

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */
const stats = [
  { value: 12,   suffix: '',  label: 'ROADMAPS' },
  { value: 80,   suffix: '+', label: 'TOPICS'   },
  { value: 40,   suffix: '+', label: 'VIDEOS'   },
  { value: null, symbol: '∞', label: 'GROWTH'   },
];

/* ------------------------------------------------------------------ */
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */
function StatCard({ value, suffix, symbol, label, index }: {
  value: number | null;
  suffix?: string;
  symbol?: string;
  label: string;
  index: number;
}) {
  const count = useCounter(value ?? 0, 2200, 600 + index * 200);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.9 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center min-w-[80px] sm:min-w-[100px] group"
    >
      <span
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-none tracking-tight tabular-nums"
        style={{ fontFamily: "'Space Grotesk', sans-serif", background: 'linear-gradient(135deg, #A78BFA, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
      >
        {symbol ? symbol : `${count}${suffix ?? ''}`}
      </span>
      <span className="mt-1.5 text-[9px] sm:text-[10px] font-mono tracking-[0.3em] text-slate-600 uppercase">
        {label}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dot Grid Background                                                */
/* ------------------------------------------------------------------ */
function DotGrid({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
        }}
      />
      {/* Radial glow center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

/* ================================================================== */
/*  HERO SECTION                                                       */
/* ================================================================== */
export const HeroSection = () => {
  const { scrollY } = useScroll();
  const heroY       = useTransform(scrollY, [0, 500], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 280], [1, 0]);
  const chevronOpacity = useTransform(scrollY, [0, 80], [1, 0]);

  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth  / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const springCfg    = { damping: 50, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springCfg);
  const smoothMouseY = useSpring(mouseY, springCfg);

  // Parallax glows on mouse
  const bgX1 = useTransform(smoothMouseX, [0, 1920], [-80, 80]);
  const bgY1 = useTransform(smoothMouseY, [0, 1080], [-80, 80]);
  const bgX2 = useTransform(smoothMouseX, [0, 1920], [80, -80]);
  const bgY2 = useTransform(smoothMouseY, [0, 1080], [80, -80]);

  // Mouse-reactive SVG line
  const lineRef = useRef<SVGPathElement>(null);
  const normX   = useTransform(smoothMouseX, [0, 1920], [0, 1]);
  const normY   = useTransform(smoothMouseY, [0, 1080], [0, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const unsubX = normX.on('change', updatePath);
    const unsubY = normY.on('change', updatePath);
    function updatePath() {
      if (!lineRef.current) return;
      const nx = normX.get(), ny = normY.get();
      const cp1y = 20 + (ny - 0.5) * 30;
      const cp2y = 20 - (ny - 0.5) * 20;
      const cpX1 = 300 + (nx - 0.5) * 120;
      const cpX2 = 700 - (nx - 0.5) * 120;
      lineRef.current.setAttribute('d', `M 0 20 C ${cpX1} ${cp1y}, ${cpX2} ${cp2y}, 1000 20`);
    }
    updatePath();
    return () => { unsubX(); unsubY(); };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const letterVariants = {
    hidden: { y: '120%', rotate: 8 },
    visible: { y: 0, rotate: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const titleWords = ['SIMON', 'KOLA'];

  return (
    <div
      className='relative min-h-[540px] md:min-h-[640px] overflow-hidden flex items-center justify-center py-24'
      style={{ background: 'var(--color-bg)', borderBottom: '1px solid rgba(139,92,246,0.1)' }}
    >
      <style>{`
        @keyframes orbit {
          0%   { transform: translate(0, 0) rotate(0deg); }
          25%  { transform: translate(10px, -16px) rotate(2deg); }
          50%  { transform: translate(-7px, -24px) rotate(-2deg); }
          75%  { transform: translate(-12px, 8px) rotate(3deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .pill-float {
          animation: orbit var(--orbit-dur, 16s) ease-in-out infinite;
          animation-delay: var(--orbit-delay, 0s);
        }
        @keyframes chevron-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>

      {/* === DOT GRID === */}
      <DotGrid mouseX={smoothMouseX} mouseY={smoothMouseY} />

      {/* === PARALLAX GLOWS === */}
      <motion.div
        style={{ x: bgX1, y: bgY1 }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)', filter: 'blur(60px)' } as any}
      />
      <motion.div
        style={{ x: bgX2, y: bgY2 }}
        animate={{ scale: [1, 1.22, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-20 left-1/4 h-[380px] w-[380px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)', filter: 'blur(60px)' } as any}
      />

      {/* === FLOATING PILLS === */}
      {floatingPills.map((pill) => {
        const posStyle: React.CSSProperties = {
          '--orbit-dur':   pill.dur,
          '--orbit-delay': pill.delay,
          ...(pill.top    && { top:    pill.top }),
          ...(pill.bottom && { bottom: pill.bottom }),
          ...(pill.left   && { left:   pill.left }),
          ...(pill.right  && { right:  pill.right }),
        } as React.CSSProperties;

        return (
          <motion.span
            key={pill.label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6 + parseFloat(pill.delay) * 0.15, ease: 'easeOut' }}
            style={posStyle}
            className="pill-float absolute z-10 select-none pointer-events-none rounded-full px-3.5 py-1 text-[10px] font-mono tracking-[0.15em] text-slate-400 hidden md:inline-flex"
            css={{ border: '1px solid rgba(139,92,246,0.2)', background: 'rgba(13,13,31,0.8)', backdropFilter: 'blur(8px)', boxShadow: '0 0 20px rgba(139,92,246,0.08)' } as any}
          >
            {pill.label}
          </motion.span>
        );
      })}

      {/* === MAIN CONTENT === */}
      <div className='container relative z-10 px-5 text-center' id='hero-text'>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: heroY, opacity: heroOpacity }}
          className="flex flex-col items-center justify-center"
        >
          {/* Badge tagline */}
          <motion.div variants={itemVariants} className='mb-5'>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-mono tracking-[0.25em] uppercase"
              style={{ border: '1px solid rgba(139,92,246,0.25)', background: 'rgba(139,92,246,0.08)', color: '#A78BFA' }}
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#22D3EE' }} />
              Creative Developer &amp; Learning Portal
            </span>
          </motion.div>

          {/* Split-text title */}
          <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 overflow-hidden py-1">
            {titleWords.map((word, wordIndex) => (
              <div key={wordIndex} className="flex overflow-hidden">
                {word.split('').map((letter, charIndex) => (
                  <span key={charIndex} className="inline-block overflow-hidden relative leading-none">
                    <motion.span
                      variants={letterVariants}
                      className="inline-block text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        background: 'linear-gradient(135deg, #A78BFA 0%, #818CF8 50%, #22D3EE 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        originY: '100%',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className='mx-auto max-w-lg mt-6 text-sm leading-relaxed'
            style={{ color: '#94A3B8', fontFamily: "'DM Sans', sans-serif" }}
          >
            A curated collection of developer roadmaps, university notes and structured resources for modern software development — built with performance and design in mind.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-14"
          >
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} index={i} />
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className='mt-10 flex flex-wrap items-center justify-center gap-3'
          >
            {/* Primary CTA */}
            <Magnetic>
              <motion.a
                whileHover={{ scale: 1.04, boxShadow: '0px 0px 40px rgba(139,92,246,0.4)' }}
                whileTap={{ scale: 0.98 }}
                href='/ai'
                className='group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-[10px] font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300 cursor-pointer'
                style={{ background: 'linear-gradient(135deg, #7C3AED, #0891B2)' }}
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-700 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="relative z-10">Generate with AI</span>
              </motion.a>
            </Magnetic>

            {/* Secondary CTA */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href='/roadmaps'
              className='inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer'
              style={{ border: '1px solid rgba(139,92,246,0.25)', color: '#C4B5FD', background: 'rgba(139,92,246,0.06)' }}
            >
              <span>Explore Roadmaps</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* === MOUSE-REACTIVE SVG LINE === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
      >
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="w-full h-[40px]" fill="none">
          <defs>
            <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#8B5CF6" stopOpacity="0" />
              <stop offset="20%"  stopColor="#8B5CF6" stopOpacity="0.5" />
              <stop offset="50%"  stopColor="#22D3EE" stopOpacity="0.7" />
              <stop offset="80%"  stopColor="#8B5CF6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            ref={lineRef}
            d="M 0 20 C 300 10, 700 10, 1000 20"
            stroke="url(#meshGrad)"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* === SCROLL CHEVRON === */}
      <motion.div
        style={{ opacity: chevronOpacity }}
        className="absolute bottom-6 left-1/2 pointer-events-none z-10"
        css={{ animation: 'chevron-bounce 2s ease-in-out infinite' } as any}
      >
        <svg
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(139,92,246,0.4)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: 'translateX(-50%)', animation: 'chevron-bounce 2s ease-in-out infinite' }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </motion.div>
    </div>
  );
};
export default HeroSection;
