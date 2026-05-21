import type { VideoFileType } from '../../lib/video';
import { VideoListItem } from './VideoListItem';
import { useEffect, useRef, useState } from 'react';

export interface FeaturedVideoListProps {
  heading: string;
  videos: VideoFileType[];
}

export function FeaturedVideoList(props: FeaturedVideoListProps) {
  const { heading, videos } = props;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Reveal staggerato degli elementi video
  useEffect(() => {
    if (!isVisible) return;
    const items = document.querySelectorAll('.video-reveal');
    items.forEach((el, i) => {
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-6');
        el.classList.add('opacity-100', 'translate-y-0');
      }, i * 80);
    });
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="container bg-[#050505]">
      {/* Header con contatore animato */}
      <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">// LEARNING RESOURCES</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-medium tracking-tight text-white uppercase font-orbitron">
            {heading}
          </h2>
        </div>
        <div className="text-right">
          <span className="text-2xl md:text-3xl font-extrabold font-orbitron bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {videos.length}
          </span>
          <span className="block text-[9px] font-mono text-white/30 tracking-widest uppercase">EPISODES</span>
        </div>
      </div>

      <div className="my-6 border-t border-white/5">
        {videos.map((video, i) => (
          <VideoListItem key={video.id} video={video} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="/videos"
          className="group relative rounded-full border border-white/10 bg-transparent px-8 py-3.5 text-[10px] font-mono tracking-[0.2em] text-white uppercase transition-all duration-500 hover:border-purple-500/40 overflow-hidden"
        >
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-200%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(200%)]">
            <div className="relative h-full w-10 bg-white/10" />
          </div>
          <span className="relative z-10">VIEW ALL VIDEOS</span>
        </a>
      </div>
    </div>
  );
}
