import { useEffect, useRef, useState } from 'react';
import { Spinner } from './ReactIcons/Spinner';
import { replaceChildren } from '../lib/dom.ts';
import { cleanUrl } from '../lib/base-url';
import { httpGet } from '../lib/query-http';
import { cn } from '../lib/classname.ts';
import { LOCAL_ROADMAPS } from '../data/local-roadmaps';
import { Modal } from './Modal';
import { MapIcon } from 'lucide-react';
import { SubRoadmapRenderer } from './SubRoadmapRenderer';
import './FrameRenderer/FrameRenderer.css';

export interface VisualRoadmapRendererProps {
  roadmapId: string;
  className?: string;
  isCustom?: boolean;
}

export function VisualRoadmapRenderer(props: VisualRoadmapRendererProps) {
  const { roadmapId, className, isCustom } = props;
  const containerEl = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localData, setLocalData] = useState<any>(null);
  const [selectedMap, setSelectedMap] = useState<any>(null);

  async function fetchAndRender(localRoadmap: any) {
    // If we have local topics, we don't need to fetch from the network
    if (localRoadmap?.topics) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Only attempt to fetch if this is NOT a local roadmap
      const roadmapJsonUrl = `https://roadmap.sh/${roadmapId}.json`;

      const res = await fetch(roadmapJsonUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch roadmap data: ${res.statusText}`);
      }

      const json = await res.json();

      const { wireframeJSONToSVG } = await import('roadmap-renderer');
      const svg: SVGElement | null = await wireframeJSONToSVG(json, {
        fontURL: '/fonts/balsamiq.woff2',
      });

      if (svg && containerEl.current) {
        replaceChildren(containerEl.current, svg);
      }
    } catch (err: any) {
      console.error('Roadmap rendering error:', err);
      setError(
        err.message || 'Something went wrong while rendering the roadmap.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const data = LOCAL_ROADMAPS.find((r) => r.slug === roadmapId);
    setLocalData(data);

    fetchAndRender(data);
  }, [roadmapId]);

  return (
    <div
      className={cn(
        'neo-glow relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-6',
        className,
      )}
    >
      {selectedMap && (
        <Modal
          onClose={() => setSelectedMap(null)}
          bodyClassName="bg-slate-900 border border-slate-700 max-w-4xl"
          wrapperClassName="max-w-4xl"
        >
          <div className="p-1">
            <div className="mb-4 flex items-center justify-between px-3 pt-3">
              <h4 className="font-orbitron text-xl text-blue-400">
                {selectedMap.title}
              </h4>
            </div>
            <div className="overflow-hidden rounded border border-slate-800 bg-slate-950">
              {selectedMap.json ? (
                <SubRoadmapRenderer jsonUrl={selectedMap.json} />
              ) : selectedMap.image ? (
                <img
                  src={selectedMap.image}
                  alt={selectedMap.title}
                  className="mx-auto h-auto max-h-[80vh] w-full object-contain"
                />
              ) : null}
            </div>
          </div>
        </Modal>
      )}

      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <Spinner className="h-12 w-12 animate-spin text-blue-500" />
          <span className="font-orbitron mt-4 font-medium tracking-widest text-slate-300 uppercase">
            Initializing...
          </span>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="font-orbitron mb-2 font-bold text-red-500">
            ERROR_DATA_FETCH_FAILED
          </p>
          <p className="max-w-md text-sm text-slate-500">{error}</p>
        </div>
      )}

      {!isLoading && localData?.topics && (
        <div className="py-2">
          <h3 className="font-orbitron mb-8 border-b border-slate-800 pb-2 text-xl text-blue-400">
            Programma di Studio
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {localData.topics.map((topic, index) => {
              const topicTitle =
                typeof topic === 'string' ? topic : topic.title;
              const topicImage =
                typeof topic === 'object' ? topic.image : undefined;

              return (
                <div
                  key={index}
                  className={cn(
                    'group flex items-center rounded-lg border border-slate-800 bg-slate-950 p-4 transition-all',
                    topicImage || (topic as any).json
                      ? 'cursor-pointer hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                      : 'opacity-80',
                  )}
                  onClick={() => {
                    if (typeof topic === 'object') {
                      if (topic.json || topic.image) {
                        setSelectedMap({
                          title: topicTitle,
                          image: topic.image,
                          json: topic.json,
                        });
                      }
                    }
                  }}
                >
                  <span className="font-orbitron mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs text-blue-400 transition-colors group-hover:bg-blue-500 group-hover:text-slate-950">
                    {index + 1}
                  </span>
                  <div className="flex flex-1 items-center justify-between">
                    <span className="font-medium text-slate-200 group-hover:text-white">
                      {topicTitle}
                    </span>
                    {(topicImage ||
                      (typeof topic === 'object' && topic.json)) && (
                      <MapIcon className="h-4 w-4 text-slate-600 transition-colors group-hover:text-blue-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div
        ref={containerEl}
        id="resource-svg-wrap"
        className={cn(
          'h-full w-full',
          isLoading
            ? 'opacity-0'
            : 'opacity-100 transition-opacity duration-500',
        )}
      />
    </div>
  );
}
