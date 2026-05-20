import type { VideoFileType } from '../../lib/video';
import { VideoListItem } from './VideoListItem';

export interface FeaturedVideoListProps {
  heading: string;
  videos: VideoFileType[];
}

export function FeaturedVideoList(props: FeaturedVideoListProps) {
  const { heading, videos } = props;

  return (
    <div className="container bg-[#050505]">
      <div className="mb-8 flex items-baseline justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">// LEARNING RESOURCES</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-medium tracking-tight text-white uppercase font-orbitron">
            {heading}
          </h2>
        </div>
      </div>

      <div className="my-6 border-t border-white/5">
        {videos.map((video) => (
          <VideoListItem key={video.id} video={video} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="/videos"
          className="rounded-full border border-white/10 bg-transparent px-8 py-3.5 text-[10px] font-mono tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
        >
          VIEW ALL VIDEOS
        </a>
      </div>
    </div>
  );
}
