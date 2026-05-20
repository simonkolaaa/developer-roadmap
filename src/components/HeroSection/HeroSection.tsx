import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Magnetic } from '../Magnetic';

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const springConfig = { damping: 50, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallasse amplificato sui cerchi di sfondo
  const bgX1 = useTransform(smoothMouseX, [0, 1920], [-100, 100]);
  const bgY1 = useTransform(smoothMouseY, [0, 1080], [-100, 100]);
  const bgX2 = useTransform(smoothMouseX, [0, 1920], [100, -100]);
  const bgY2 = useTransform(smoothMouseY, [0, 1080], [100, -100]);

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
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  // Animazione per ogni singola lettera (Split Text)
  const letterVariants = {
    hidden: { y: '120%', rotate: 8 },
    visible: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1], // Elastic cubic bezier (stile Awwwards)
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
    <div className='relative min-h-[380px] md:min-h-[480px] overflow-hidden border-b border-b-[#1e293c] bg-slate-950 flex items-center justify-center py-20'>
      {/* Background Interactive Parallax Glows */}
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

          {/* Titolo con animazione Split Text Lettera per Lettera */}
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

          {/* Descrizione Strutturata */}
          <motion.p
            variants={itemVariants}
            className='mx-auto max-w-xl mt-6 text-sm text-slate-400 leading-relaxed font-sans'
          >
            Una raccolta curata di roadmap informatiche, appunti universitari e risorse strutturate per lo sviluppo moderno. Creato con attenzione per le performance ed il design animato.
          </motion.p>

          {/* Pulsante Magnetico Sfumato con Shimmer */}
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
    </div>
  );
};
export default HeroSection;
