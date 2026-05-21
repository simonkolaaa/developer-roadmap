import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Magnetic } from '../Magnetic';

/* ------------------------------------------------------------------ */
/*  Animated Counter Hook – counts from 0 to target on mount          */
/* ------------------------------------------------------------------ */
function useCounter(target: number, duration = 2000, delay = 400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic for a satisfying deceleration
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
/*  Floating Badge Pill                                                */
/* ------------------------------------------------------------------ */
const floatingPills = [
  { label: 'React',   top: '12%', left: '6%',  delay: '0s',    dur: '14s', size: 'text-[10px]' },
  { label: 'DevOps',  top: '22%', right: '7%', delay: '2.5s',  dur: '17s', size: 'text-[10px]' },
  { label: 'AI / ML', bottom: '28%', left: '9%', delay: '4s',  dur: '19s', size: 'text-[10px]' },
  { label: 'Backend', bottom: '18%', right: '10%', delay: '1s', dur: '15s', size: 'text-[10px]' },
];

/* ------------------------------------------------------------------ */
/*  Stats data                                                         */
/* ------------------------------------------------------------------ */
const stats = [
  { value: 12,   suffix: '',  label: 'ROADMAPS' },
  { value: 80,   suffix: '+', label: 'ARGOMENTI' },
  { value: 40,   suffix: '+', label: 'VIDEO' },
  { value: null, symbol: '∞', label: 'CRESCITA' },
];

/* ------------------------------------------------------------------ */
/*  Stat Card Component                                                */
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
      className="flex flex-col items-center min-w-[90px] sm:min-w-[110px]"
    >
      <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-orbitron bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent leading-none tracking-tight">
        {symbol ? symbol : `${count}${suffix ?? ''}`}
      </span>
      <span className="mt-1.5 text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-slate-500 uppercase">
        {label}
      </span>
    </motion.div>
  );
}

/* ================================================================== */
/*  HERO SECTION                                                       */
/* ================================================================== */
export const HeroSection = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const springConfig = { damping: 50, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax on background glows
  const bgX1 = useTransform(smoothMouseX, [0, 1920], [-100, 100]);
  const bgY1 = useTransform(smoothMouseY, [0, 1080], [-100, 100]);
  const bgX2 = useTransform(smoothMouseX, [0, 1920], [100, -100]);
  const bgY2 = useTransform(smoothMouseY, [0, 1080], [100, -100]);

  // SVG mesh line reactive curves (normalised 0-1)
  const lineRef = useRef<SVGPathElement>(null);
  const normX = useTransform(smoothMouseX, [0, 1920], [0, 1]);
  const normY = useTransform(smoothMouseY, [0, 1080], [0, 1]);

  // Track mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update SVG path based on mouse
  useEffect(() => {
    const unsubX = normX.on('change', updatePath);
    const unsubY = normY.on('change', updatePath);
    function updatePath() {
      if (!lineRef.current) return;
      const nx = normX.get();
      const ny = normY.get();
      // 3-point quadratic bezier that follows mouse subtly
      const cp1y = 10 + (ny - 0.5) * 30;   // control point 1 vertical shift
      const cp2y = 10 - (ny - 0.5) * 20;   // control point 2 vertical shift
      const cpX1 = 300 + (nx - 0.5) * 120;
      const cpX2 = 700 - (nx - 0.5) * 120;
      lineRef.current.setAttribute(
        'd',
        `M 0 20 C ${cpX1} ${cp1y}, ${cpX2} ${cp2y}, 1000 20`
      );
    }
    updatePath();
    return () => { unsubX(); unsubY(); };
  }, []);

  /* ---------- Animation variants ---------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { y: '120%', rotate: 8 },
    visible: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const titleWords = ["SIMON", "KOLA"];

  return (
    <div className='relative min-h-[520px] md:min-h-[620px] overflow-hidden border-b border-b-[#1e293c] bg-slate-950 flex items-center justify-center py-20'>

      {/* ======================== CSS Keyframes ======================== */}
      <style>{`
        @keyframes orbit {
          0%   { transform: translate(0, 0)   rotate(0deg); }
          25%  { transform: translate(12px, -18px) rotate(3deg); }
          50%  { transform: translate(-8px, -28px) rotate(-2deg); }
          75%  { transform: translate(-14px, 10px) rotate(4deg); }
          100% { transform: translate(0, 0)   rotate(0deg); }
        }
        .pill-float {
          animation: orbit var(--orbit-dur, 16s) ease-in-out infinite;
          animation-delay: var(--orbit-delay, 0s);
        }
      `}</style>

      {/* =================== Background Parallax Glows ================= */}
      <motion.div
        style={{ x: bgX1, y: bgY1 }}
        animate={{ scale: [1, 1.18, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none z-0"
      />
      <motion.div
        style={{ x: bgX2, y: bgY2 }}
        animate={{ scale: [1, 1.25, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-20 left-1/4 h-[350px] w-[350px] rounded-full bg-blue-600/15 blur-[100px] pointer-events-none z-0"
      />

      {/* =================== Floating Badge Pills ====================== */}
      {floatingPills.map((pill) => {
        const posStyle: React.CSSProperties = {
          '--orbit-dur': pill.dur,
          '--orbit-delay': pill.delay,
          ...(pill.top    && { top: pill.top }),
          ...(pill.bottom && { bottom: pill.bottom }),
          ...(pill.left   && { left: pill.left }),
          ...(pill.right  && { right: pill.right }),
        } as React.CSSProperties;

        return (
          <motion.span
            key={pill.label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6 + parseFloat(pill.delay) * 0.15, ease: 'easeOut' }}
            style={posStyle}
            className={`pill-float absolute z-10 select-none pointer-events-none rounded-full border border-slate-700/60 bg-slate-900/70 backdrop-blur-sm px-3.5 py-1 ${pill.size} font-mono tracking-[0.15em] text-slate-400 shadow-[0_0_18px_rgba(99,102,241,0.12)] hidden md:inline-flex`}
          >
            {pill.label}
          </motion.span>
        );
      })}

      {/* =================== Main Content ============================== */}
      <div className='container relative z-10 px-5 text-center' id='hero-text'>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: heroY, opacity: heroOpacity }}
          className="flex flex-col items-center justify-center"
        >
          {/* ---------- Tagline ---------- */}
          <motion.div variants={itemVariants} className='mb-4'>
            <span className="text-[10px] font-mono tracking-[0.3em] text-blue-400 uppercase">
              // CREATIVE DEVELOPER &amp; PORTAL
            </span>
          </motion.div>

          {/* ---------- Split-Text Title ---------- */}
          <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 overflow-hidden py-1">
            {titleWords.map((word, wordIndex) => (
              <div key={wordIndex} className="flex overflow-hidden">
                {word.split("").map((letter, charIndex) => (
                  <span key={charIndex} className="inline-block overflow-hidden relative leading-none">
                    <motion.span
                      variants={letterVariants}
                      className="inline-block text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent uppercase font-orbitron"
                      style={{ originY: "100%" }}
                    >
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* ---------- Description ---------- */}
          <motion.p
            variants={itemVariants}
            className='mx-auto max-w-xl mt-6 text-sm text-slate-400 leading-relaxed font-sans'
          >
            Una raccolta curata di roadmap informatiche, appunti universitari e risorse strutturate per lo sviluppo moderno. Creato con attenzione per le performance ed il design animato.
          </motion.p>

          {/* ---------- Stats Bar ---------- */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-14"
          >
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} index={i} />
            ))}
          </motion.div>

          {/* ---------- Magnetic Gemma AI Button ---------- */}
          <motion.div
            variants={itemVariants}
            className='mt-10'
          >
            <Magnetic>
              <motion.a
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0px 0px 35px rgba(168, 85, 247, 0.45)"
                }}
                whileTap={{ scale: 0.98 }}
                href='/ai'
                className='awwwards-hover group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-[10px] font-mono tracking-[0.2em] text-white uppercase transition-all duration-300'
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>
                <span className="relative z-10">✨ GENERATE WITH GEMMA AI</span>
              </motion.a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* ============== Mouse-Reactive Gradient Mesh Line ============== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
      >
        <svg
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
          className="w-full h-[40px]"
          fill="none"
        >
          <defs>
            <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="20%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            ref={lineRef}
            d="M 0 20 C 300 10, 700 10, 1000 20"
            stroke="url(#meshGrad)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  );
};
export default HeroSection;
