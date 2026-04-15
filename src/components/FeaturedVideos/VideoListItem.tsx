import type { VideoFileType } from '../../lib/video';

export interface VideoListItemProps {
  video: VideoFileType;
}

export function VideoListItem(props: VideoListItemProps) {
  const { video } = props;
  const { frontmatter, id } = video;

  return (
    <a
      className="block no-underline py-2 group text-md items-center text-gray-600 hover:text-blue-600 flex justify-between border-b"
      href={`/videos/${id}`}
    >
      <span className="group-hover:translate-x-2 transition-transform text-slate-300 group-hover:text-blue-400 font-medium">
        {frontmatter.title}
      </span>
      <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-all text-sm">
        Watch &rarr;
      </span>
    </a>

  );
} 