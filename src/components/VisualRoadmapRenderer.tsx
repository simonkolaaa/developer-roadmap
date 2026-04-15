import { useEffect, useRef, useState } from 'react';
import { Spinner } from './ReactIcons/Spinner';
import { replaceChildren } from '../lib/dom.ts';
import { cn } from '../lib/classname.ts';
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
      setError(err.message || 'Something went wrong while rendering the roadmap.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAndRender();
  }, [roadmapId]);

  return (
    <div className={cn('relative w-full overflow-hidden rounded-xl bg-white p-4 shadow-2xl', className)}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <Spinner className="h-12 w-12 animate-spin text-blue-600" />
          <span className="ml-3 font-medium text-slate-600">Generating Roadmap...</span>
        </div>
      )}
      
      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-red-500 font-bold mb-2">Error Loading Roadmap</p>
          <p className="text-slate-500 text-sm max-w-md">{error}</p>
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
