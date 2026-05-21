import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// ─────────────────────────────────────────────
// 1. MarqueeTicker
// ─────────────────────────────────────────────

const TICKER_TEXT =
  '// ROADMAPS • GUIDES • VIDEOS • DEVELOPMENT • ';

const marqueeKeyframes = `
@keyframes marquee-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

export function MarqueeTicker() {
  // Duplicate the string enough times so the ticker never shows a gap
  const repeatedText = Array(8).fill(TICKER_TEXT).join('');

  return (
    <>
      {/* Inject keyframes once */}
      <style>{marqueeKeyframes}</style>

      <div
        aria-hidden="true"
        style={{
          width: '100%',
          overflow: 'hidden',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.02)',
          padding: '10px 0',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            whiteSpace: 'nowrap',
            animation: 'marquee-scroll 30s linear infinite',
            willChange: 'transform',
          }}
        >
          {/* Two identical halves → seamless loop */}
          <span
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(128,128,128,0.55)',
            }}
          >
            {repeatedText}
          </span>
          <span
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(128,128,128,0.55)',
            }}
          >
            {repeatedText}
          </span>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// 2. TextReveal
// ─────────────────────────────────────────────

interface TextRevealProps {
  children: string;
  /** HTML tag rendered for the wrapper (default: "p") */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

const wordVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.05, // 50 ms stagger
    },
  }),
};

export function TextReveal({
  children,
  as: Tag = 'p',
  className,
  style,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const words = children.split(/\s+/).filter(Boolean);

  // We need to use a wrapper element type – motion doesn't support
  // arbitrary tags, so we wrap with a plain tag and apply motion to spans.
  const MotionTag = Tag as React.ElementType;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0 0.3em',
        overflow: 'hidden',
        ...style,
      }}
    >
      {words.map((word: string, i: number) => (
        <span
          key={`${word}-${i}`}
          style={{ display: 'inline-block', overflow: 'hidden' }}
        >
          <motion.span
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

// ─────────────────────────────────────────────
// 3. CountUp
// ─────────────────────────────────────────────

interface CountUpProps {
  /** Target number to count up to */
  to: number;
  /** Duration in seconds (default: 2) */
  duration?: number;
  /** Prefix rendered before the number (e.g. "$") */
  prefix?: string;
  /** Suffix rendered after the number (e.g. "+", "%") */
  suffix?: string;
  /** Number of decimal places (default: 0) */
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CountUp({
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setDisplayValue(value.toFixed(decimals));
      },
    });

    return () => controls.stop();
  }, [isInView, to, duration, decimals]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
