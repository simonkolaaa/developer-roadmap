import { useEffect, useRef, useState } from 'react';
import { Spinner } from './ReactIcons/Spinner';
import { replaceChildren } from '../lib/dom.ts';
import { cn } from '../lib/classname.ts';
import { MermaidRenderer } from './MermaidRenderer';

export interface SubRoadmapRendererProps {
  jsonUrl: string;
  className?: string;
}

export function SubRoadmapRenderer(props: SubRoadmapRendererProps) {
  const { jsonUrl, className } = props;
  const containerEl = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mermaidData, setMermaidData] = useState<{ content: string; definitions: any } | null>(null);

  async function fetchAndRender() {
    try {
      setIsLoading(true);
      setError(null);
      setMermaidData(null);

      // Clean up the URL to avoid "undefined/" or malformed paths
      const appUrl = import.meta.env.PUBLIC_APP_URL;
      const baseUrl = (appUrl && appUrl !== 'undefined') ? appUrl : (typeof window !== 'undefined' ? window.location.origin : '');
      let finalUrl = jsonUrl;
      
      if (finalUrl.startsWith('undefined/')) {
        finalUrl = finalUrl.replace('undefined/', baseUrl ? `${baseUrl}/` : '/');
      } else if (!finalUrl.startsWith('http') && !finalUrl.startsWith('/') && baseUrl) {
        finalUrl = `${baseUrl.replace(/\/$/, '')}/${finalUrl.replace(/^\//, '')}`;
      }

      const res = await fetch(`${finalUrl}${finalUrl.includes('?') ? '&' : '?'}t=${Date.now()}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch sub-roadmap data: ${res.statusText}`);
      }
      
      const json = await res.json();
      
      // If the JSON contains a "mermaid" field, it's our new interactive format
      if (json.type === 'mermaid' || json.mermaid) {
        setMermaidData({
          content: json.mermaid,
          definitions: json.definitions || {}
        });
        setIsLoading(false);
        return;
      }

      // Otherwise, use the old wireframe renderer
      const { wireframeJSONToSVG } = await import('roadmap-renderer');
      
      const svg: SVGElement | null = await wireframeJSONToSVG(json, {
        fontURL: '/fonts/balsamiq.woff2',
      });

      if (svg && containerEl.current) {
        svg.classList.add('simon-kola-svg');
        replaceChildren(containerEl.current, svg);
        
        // Post-process SVG colors
        const rects = svg.querySelectorAll('rect');
        rects.forEach(rect => {
            rect.setAttribute('fill', '#0f172a');
            rect.setAttribute('stroke', '#3b82f6');
            rect.setAttribute('stroke-width', '2');
        });
        
        const texts = svg.querySelectorAll('text');
        texts.forEach(text => {
            text.setAttribute('fill', '#f8fafc');
            text.style.fontFamily = "'Orbitron', sans-serif";
            text.style.textTransform = "uppercase";
            text.style.letterSpacing = "1px";
        });

        const lines = svg.querySelectorAll('line, path');
        lines.forEach(line => {
            line.setAttribute('stroke', '#1e293b');
            if (line.getAttribute('stroke') === '#000' || line.getAttribute('stroke') === 'black') {
                line.setAttribute('stroke', '#3b82f6');
            }
        });
      }
    } catch (err: any) {
      console.error('Sub-Roadmap rendering error:', err);
      setError(err.message || 'Error rendering sub-roadmap.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAndRender();
  }, [jsonUrl]);

  if (mermaidData) {
    return (
      <MermaidRenderer 
        content={mermaidData.content} 
        definitions={mermaidData.definitions} 
      />
    );
  }

  return (
    <div className={cn('relative w-full overflow-hidden bg-slate-950 rounded-lg border border-slate-800 min-h-[400px]', className)}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
          <Spinner className="h-10 w-10 animate-spin text-blue-500" />
          <span className="mt-4 font-orbitron text-xs text-slate-400 tracking-widest uppercase">Decrypting Map...</span>
        </div>
      )}
      
      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-red-500 font-bold mb-2 font-orbitron">RENDER_FAILED</p>
          <p className="text-slate-500 text-sm max-w-sm">{error}</p>
        </div>
      )}

      <div 
        ref={containerEl} 
        className={cn("w-full h-full p-4 flex justify-center", isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-700")}
      />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .simon-kola-svg {
          max-width: 100%;
          height: auto;
        }
        .simon-kola-svg rect {
          filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.2));
          transition: all 0.3s ease;
        }
        /* Enhanced Golden Node Styles */
        .mermaid g.definedNode rect, .mermaid g.definedNode circle, .mermaid g.definedNode polygon, .mermaid g.definedNode path, .mermaid [id*="definedNode"] rect, .mermaid .node.definedNode rect {
          stroke: #fbbf24 !important;
          stroke-width: 4px !important;
          fill: #0f172a !important;
          animation: pulse-gold 2s infinite !important;
          cursor: pointer !important;
        }
        .mermaid g.definedNode .label, .mermaid g.definedNode span, .mermaid g.definedNode div, .mermaid .node.definedNode .label {
          color: #fbbf24 !important;
          font-weight: 800 !important;
          text-shadow: 0 0 5px rgba(251, 191, 36, 0.4);
        }
        @keyframes pulse-gold {
          0% { filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.3)); stroke: #fbbf24 !important; }
          50% { filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.9)); stroke: #fff !important; }
          100% { filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.3)); stroke: #fbbf24 !important; }
        }
        .simon-kola-svg rect:hover {
          stroke: #60a5fa;
          filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.4));
          cursor: pointer;
        }
      `}} />
    </div>
  );
}
