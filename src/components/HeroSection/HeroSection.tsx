import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useEffect } from 'react';

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const springConfig = { damping: 50, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const bgX1 = useTransform(smoothMouseX, [0, 1920], [-80, 80]);
  const bgY1 = useTransform(smoothMouseY, [0, 1080], [-80, 80]);
  const bgX2 = useTransform(smoothMouseX, [0, 1920], [80, -80]);
  const bgY2 = useTransform(smoothMouseY, [0, 1080], [80, -80]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const textRevealVariants = {
    hidden: { y: '40%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className='relative min-h-[380px] md:min-h-[480px] overflow-hidden border-b border-b-[#1e293c] bg-slate-950 flex items-center justify-center py-20'>
      {/* Background Interactive Parallax Glows */}
      <motion.div
        style={{ x: bgX1, y: bgY1 }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[110px] pointer-events-none z-0"
      />
      <motion.div
        style={{ x: bgX2, y: bgY2 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-blue-600/20 blur-[90px] pointer-events-none z-0"
      />

      <div
        className='container relative z-10 px-5 text-center'
        id='hero-text'
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: heroY, opacity: heroOpacity }}
          className="flex flex-col items-center justify-center"
        >
          {/* Tagline Monospace */}
          <motion.div variants={itemVariants} className='mb-4'>
            <span className="text-[10px] font-mono tracking-[0.3em] text-blue-400 uppercase">
              // CREATIVE DEVELOPER & PORTAL
            </span>
          </motion.div>

          {/* Titolo con Sfumature Brillantissime */}
          <div className="overflow-hidden py-1">
            <motion.h1
              variants={textRevealVariants}
              className='text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent uppercase font-orbitron'
            >
              Simon Kola
            </motion.h1>
          </div>

          {/* Descrizione Strutturata */}
          <motion.p
            variants={itemVariants}
            className='mx-auto max-w-xl mt-6 text-sm text-slate-400 leading-relaxed font-sans'
          >
            Una raccolta curata di roadmap informatiche, appunti universitari e risorse strutturate per lo sviluppo moderno. Creato con attenzione per le performance ed il design animato.
          </motion.p>

          {/* Bottone Sfumato e Shimmering */}
          <motion.div
            variants={itemVariants}
            className='mt-10 flex w-full justify-center'
          >
            <motion.a
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.4)" 
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
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
