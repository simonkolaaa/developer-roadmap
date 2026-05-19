import { useIsMounted } from '../../hooks/use-is-mounted';
import { MarkFavorite } from '../FeaturedItems/MarkFavorite';
import type { GroupType } from './RoadmapsPage';

type RoadmapCardProps = {
  roadmap: GroupType['roadmaps'][number];
};

export function RoadmapCard(props: RoadmapCardProps) {
  const { roadmap } = props;

  const isMounted = useIsMounted();

  return (
    <a
      key={roadmap.link}
      className="group relative flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
      href={roadmap.link}
    >
      <span className="font-semibold text-slate-300 transition-colors group-hover:text-white">
        {roadmap.title}
      </span>

      {isMounted && (
        <div className="text-slate-500 group-hover:text-purple-400 transition-colors">
          <MarkFavorite
            resourceId={roadmap.link.split('/').pop()!}
            resourceType="roadmap"
            className="data-[is-favorite=true]:opacity-100"
          />
        </div>
      )}
    </a>
  );
}
