import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
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
      // Check if we are hovering over something clickable
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.classList.contains('awwwards-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
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
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border-2 border-purple-500 bg-purple-500/20 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(168, 85, 247, 0.4)' : 'rgba(168, 85, 247, 0.1)',
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-2 w-2 rounded-full bg-blue-400"
        style={{
          x: useSpring(cursorX, { damping: 40, stiffness: 400 }),
          y: useSpring(cursorY, { damping: 40, stiffness: 400 }),
          translateX: 12,
          translateY: 12,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />
    </>
  );
};
