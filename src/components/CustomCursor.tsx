import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverType, setHoverType] = useState<'none' | 'click' | 'view'>('none');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const closestAwwwards = target.closest('.awwwards-list-item');
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.classList.contains('awwwards-hover');

      if (closestAwwwards) {
        setHoverType('view');
      } else if (isClickable) {
        setHoverType('click');
      } else {
        setHoverType('none');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full border-2 border-purple-500 bg-purple-500/10 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 32,
          height: 32,
        }}
        animate={{
          scale: hoverType === 'view' ? 2.5 : hoverType === 'click' ? 1.8 : 1,
          borderColor: hoverType === 'view' ? 'rgba(168, 85, 247, 0.9)' : 'rgba(168, 85, 247, 0.5)',
          backgroundColor: hoverType === 'view' ? 'rgba(168, 85, 247, 0.25)' : hoverType === 'click' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.03)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <span 
          className="text-[6px] font-black uppercase tracking-[0.2em] text-purple-200 transition-opacity duration-300 font-mono"
          style={{ opacity: hoverType === 'view' ? 1 : 0 }}
        >
          VIEW
        </span>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-2 w-2 rounded-full bg-blue-400"
        style={{
          x: useSpring(cursorX, { damping: 40, stiffness: 400 }),
          y: useSpring(cursorY, { damping: 40, stiffness: 400 }),
          translateX: 12,
          translateY: 12,
        }}
        animate={{
          scale: hoverType !== 'none' ? 0 : 1,
        }}
      />
    </>
  );
};
