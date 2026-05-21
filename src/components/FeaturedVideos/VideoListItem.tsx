import type { VideoFileType } from '../../lib/video';

export interface VideoListItemProps {
  video: VideoFileType;
}

export function VideoListItem(props: VideoListItemProps) {
  const { video } = props;
  const { frontmatter, id } = video;

  return (
    <a
      className="video-reveal group relative flex items-center justify-between border-b border-white/5 py-5 transition-all duration-500 hover:border-purple-500/25 opacity-0 translate-y-6"
      href={`/videos/${id}`}
    >
      {/* Linea di progresso animata al hover */}
      <div 
        className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700 ease-out group-hover:w-full"
      />

      {/* Sfondo soft hover sfumato */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] to-purple-500/[0.02] -z-10 transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100"
      />

      {/* Indice numerico con animazione */}
      <div className="flex items-center gap-5 z-10">
        <span className="text-[10px] font-mono text-white/20 group-hover:text-purple-400 transition-colors duration-300 w-6 text-right tabular-nums">
          {String(props.video.frontmatter.order || 0).padStart(2, '0')}
        </span>
        
        <span className="text-base md:text-lg font-light tracking-wide text-white/40 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 uppercase font-orbitron group-hover:tracking-wider">
          {frontmatter.title}
        </span>
      </div>
      
      {/* Durata + Freccia */}
      <div className="flex items-center gap-4 z-10">
        {frontmatter.duration && (
          <span className="text-[9px] font-mono text-white/20 group-hover:text-white/40 transition-colors duration-300 hidden sm:block">
            {frontmatter.duration}
          </span>
        )}
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all duration-500 group-hover:border-purple-500/40 group-hover:bg-purple-500/10 group-hover:text-purple-400 group-hover:rotate-[135deg] bg-black/40">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>
    </a>
  );
}
