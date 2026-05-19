import { motion } from 'framer-motion';
import { FeatureAnnouncement } from '../FeatureAnnouncement';

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className='relative min-h-[192px] overflow-hidden border-b border-b-[#1e293c] bg-slate-950 transition-all sm:min-h-[281px]'>
      {/* Background Animated Glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-blue-600/20 blur-[80px]"
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

          <motion.h1
            variants={itemVariants}
            className='mb-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-4xl font-extrabold text-transparent sm:mb-4 sm:text-7xl sm:leading-tight'
          >
            Simon Kola Roadmaps
          </motion.h1>

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
                boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              href='/ai'
              className='group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-sm font-bold text-white transition-all'
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
