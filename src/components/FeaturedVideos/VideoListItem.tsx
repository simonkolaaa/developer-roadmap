import type { VideoFileType } from '../../lib/video';

export interface VideoListItemProps {
  video: VideoFileType;
}

export function VideoListItem(props: VideoListItemProps) {
  const { video } = props;
  const { frontmatter, id } = video;

  return (
    <a
      className="group relative flex items-center justify-between border-b border-white/5 py-4 transition-all duration-300"
      href={`/videos/${id}`}
    >
      {/* Sfondo soft hover */}
      <div 
        className="absolute inset-0 bg-white/[0.015] -z-10 transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100"
      />

      <span className="text-sm font-light tracking-wide text-white/40 transition-colors duration-300 group-hover:text-white uppercase font-orbitron z-10">
        {frontmatter.title}
      </span>
      
      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all duration-300 group-hover:border-white/30 group-hover:text-white group-hover:rotate-45 bg-black/40 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </a>
  );
}
