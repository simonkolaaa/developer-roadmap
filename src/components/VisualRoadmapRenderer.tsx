import { useEffect, useRef, useState } from 'react';
import { Spinner } from './ReactIcons/Spinner';
import { replaceChildren } from '../lib/dom.ts';
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

  async function fetchAndRender() {
    try {
      setIsLoading(true);
      setError(null);

      // Prioritize local roadmaps to avoid CORS and fetch issues
      const local = LOCAL_ROADMAPS.find(r => r.slug === roadmapId);
      if (local?.topics) {
        setIsLoading(false);
        return;
      }

      // Attempt to fetch the official JSON
      let roadmapJsonUrl = `https://roadmap.sh/${roadmapId}.json`;
      
      const res = await fetch(roadmapJsonUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch roadmap data: ${res.statusText}`);
      }
      
      const json = await res.json();
      
      const { wireframeJSONToSVG } = await import('roadmap-renderer');
      const svg: SVGElement | null = await wireframeJSONToSVG(json, {
        fontURL: '/fonts/balsamiq.woff2', // Fallback for old renderer logic
      });

      if (svg && containerEl.current) {
        replaceChildren(containerEl.current, svg);
      }
    } catch (err: any) {
      console.error('Roadmap rendering error:', err);
      // Fallback to local if fetch crashed
      const local = LOCAL_ROADMAPS.find(r => r.slug === roadmapId);
      if (!local?.topics) {
        setError(err.message || 'Something went wrong while rendering the roadmap.');
      }
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const data = LOCAL_ROADMAPS.find(r => r.slug === roadmapId);
    setLocalData(data);
    
    if (data?.topics) {
      setIsLoading(false);
    } else {
      fetchAndRender();
    }
  }, [roadmapId]);


  return (
    <div className={cn('relative w-full overflow-hidden rounded-xl bg-slate-900 p-6 border border-slate-800 neo-glow', className)}>
      {selectedMap && (
        <Modal 
          onClose={() => setSelectedMap(null)}
          bodyClassName="bg-slate-900 border border-slate-700 max-w-4xl"
          wrapperClassName="max-w-4xl"
        >
          <div className="p-1">
            <div className="flex items-center justify-between mb-4 px-3 pt-3">
              <h4 className="text-xl font-orbitron text-blue-400">{selectedMap.title}</h4>
            </div>
            <div className="rounded overflow-hidden bg-slate-950 border border-slate-800">
              {selectedMap.json ? (
                 <SubRoadmapRenderer jsonUrl={selectedMap.json} />
              ) : selectedMap.image ? (
                <img 
                  src={selectedMap.image} 
                  alt={selectedMap.title} 
                  className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                />
              ) : null}
            </div>

          </div>
        </Modal>
      )}

      {isLoading && (

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <Spinner className="h-12 w-12 animate-spin text-blue-500" />
          <span className="mt-4 font-medium text-slate-300 font-orbitron tracking-widest uppercase">Initializing...</span>
        </div>
      )}
      
      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-red-500 font-bold mb-2 font-orbitron">ERROR_DATA_FETCH_FAILED</p>
          <p className="text-slate-500 text-sm max-w-md">{error}</p>
        </div>
      )}

      {!isLoading && !error && !containerEl.current?.hasChildNodes() && localData?.topics && (
        <div className="py-2">
          <h3 className="text-xl font-orbitron text-blue-400 mb-8 border-b border-slate-800 pb-2">Programma di Studio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localData.topics.map((topic, index) => {
              const topicTitle = typeof topic === 'string' ? topic : topic.title;
              const topicImage = typeof topic === 'object' ? topic.image : undefined;
              
              return (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-center p-4 bg-slate-950 border border-slate-800 rounded-lg group transition-all",
                    (topicImage || (topic as any).json) ? "cursor-pointer hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "opacity-80"
                  )}
                  onClick={() => {
                    if (typeof topic === 'object') {
                      if (topic.json || topic.image) {
                        setSelectedMap({ 
                          title: topicTitle, 
                          image: topic.image, 
                          json: topic.json 
                        });
                      }
                    }
                  }}
                >

                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-blue-400 font-orbitron text-xs mr-4 group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors">
                    {index + 1}
                  </span>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-slate-200 group-hover:text-white font-medium">{topicTitle}</span>
                    {topicImage && (
                      <MapIcon className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
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
        className={cn("w-full h-full", isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500")}
      />
    </div>
  );
}

