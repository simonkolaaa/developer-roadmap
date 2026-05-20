import { motion, useTransform, useScroll } from 'framer-motion';

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

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
    <div className='relative min-h-[350px] md:min-h-[480px] overflow-hidden border-b border-white/5 bg-[#050505] flex items-center justify-center py-20'>
      {/* Sottile griglia di sfondo (stile Igloo Inc) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

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
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
              // CREATIVE DEVELOPER & PORTAL
            </span>
          </motion.div>

          {/* Titolo Monocromatico Pulito */}
          <div className="overflow-hidden py-1">
            <motion.h1
              variants={textRevealVariants}
              className='text-4xl sm:text-6xl md:text-7xl font-light tracking-wide text-white uppercase font-orbitron'
            >
              Simon Kola
            </motion.h1>
          </div>

          {/* Descrizione Strutturata */}
          <motion.p
            variants={itemVariants}
            className='mx-auto max-w-xl mt-6 text-sm text-white/50 leading-relaxed font-sans'
          >
            Una raccolta curata di roadmap informatiche, appunti universitari e risorse strutturate per lo sviluppo moderno. Creato con attenzione per le performance ed il design essenziale.
          </motion.p>

          {/* Bottone Minimal Monocromatico */}
          <motion.div
            variants={itemVariants}
            className='mt-10 flex w-full justify-center'
          >
            <motion.a
              whileHover={{ backgroundColor: '#ffffff', color: '#000000', borderColor: '#ffffff' }}
              whileTap={{ scale: 0.98 }}
              href='/ai'
              className='awwwards-hover group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-transparent px-8 py-3.5 text-[10px] font-mono tracking-[0.2em] text-white uppercase transition-all duration-300'
            >
              ✨ GENERATE WITH GEMMA AI
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
