import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { FeatureAnnouncement } from '../FeatureAnnouncement';

export const HeroSection = () => {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const springConfig = { damping: 50, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

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
        staggerChildren: 0.15,
        delayChildren: 2.5, // Aspetta che il preloader finisca
      },
    },
  };

  const textRevealVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Custom awwwards-style bezier
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className='relative min-h-[192px] overflow-hidden border-b border-b-[#1e293c] bg-slate-950 transition-all sm:min-h-[281px]'>
      {/* Background Interactive Parallax Glows */}
      <motion.div
        style={{ x: bgX1, y: bgY1 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/30 blur-[120px]"
      />
      <motion.div
        style={{ x: bgX2, y: bgY2 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-blue-600/30 blur-[100px]"
      />

      <div
        className='container relative z-10 px-5 py-6 pb-14 text-left sm:px-0 sm:py-20 sm:text-center'
        id='hero-text'
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center sm:items-center items-start"
        >
          <motion.div variants={itemVariants} className='-mt-4 mb-7 w-full sm:-mt-10 sm:mb-4 sm:flex sm:justify-center'>
            <FeatureAnnouncement />
          </motion.div>

          <div className="overflow-hidden pb-2">
            <motion.h1
              variants={textRevealVariants}
              className='mb-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-5xl font-extrabold text-transparent sm:mb-4 sm:text-7xl sm:leading-tight'
            >
              Simon Kola Roadmaps
            </motion.h1>
          </div>

          <motion.p
            variants={itemVariants}
            className='mx-auto hidden max-w-2xl px-4 text-xl text-slate-400 sm:block'
          >
            <span className='font-bold text-blue-400'>My Personal Journey</span>. A
            curated collection of computer science roadmaps, university notes and
            essential resources for modern development.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className='block px-0 text-base text-slate-400 sm:hidden'
          >
            Personal roadmaps, university notes and articles to master software
            engineering.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='mt-8 flex w-full flex-col items-start justify-start gap-4 sm:flex-row sm:items-center sm:justify-center'
          >
            <motion.a
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 0px 40px rgba(168, 85, 247, 0.6)" 
              }}
              whileTap={{ scale: 0.95 }}
              href='/ai'
              className='awwwards-hover group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-sm font-bold text-white transition-all'
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
              <span className="relative z-10">✨ Generate Roadmaps with Gemma AI</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
