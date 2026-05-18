import type { VideoFileType } from '../../lib/video';

export interface VideoListItemProps {
  video: VideoFileType;
}

export function VideoListItem(props: VideoListItemProps) {
  const { video } = props;
  const { frontmatter, id } = video;

  return (
    <a
      className="group text-md block flex items-center justify-between border-b py-2 text-gray-600 no-underline hover:text-blue-600"
      href={`/videos/${id}`}
    >
      <span className="font-medium text-slate-300 transition-transform group-hover:translate-x-2 group-hover:text-blue-400">
        {frontmatter.title}
      </span>
      <span className="text-sm text-blue-400 opacity-0 transition-all group-hover:opacity-100">
        Watch &rarr;
      </span>
    </a>
  );
}
