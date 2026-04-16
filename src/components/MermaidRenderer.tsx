import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

declare global {
  interface Window {
    mermaid: any;
    showNodeDefinition: (nodeId: string) => void;
  }
}

interface MermaidRendererProps {
  content: string;
  definitions?: Record<string, { title: string; text: string }>;
}

export const MermaidRenderer = ({ content, definitions = {} }: MermaidRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedNode, setSelectedNode] = useState<{ title: string; text: string } | null>(null);

  useEffect(() => {
    // 1. Initialize global callback for Mermaid click events
    window.showNodeDefinition = (nodeId: string) => {
      const def = definitions[nodeId];
      if (def) {
        setSelectedNode(def);
      }
    };

    // 2. Load Mermaid from CDN dynamically
    if (!window.mermaid) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
      script.async = true;
      script.onload = () => {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          themeVariables: {
            primaryColor: '#3b82f6',
            primaryTextColor: '#f8fafc',
            primaryBorderColor: '#3b82f6',
            lineColor: '#3b82f6',
            secondaryColor: '#1e293b',
            tertiaryColor: '#0f172a',
            mainBkg: '#0f172a',
            nodeBorder: '#3b82f6',
            clusterBkg: '#1e293b',
            titleColor: '#f8fafc',
            fontFamily: 'Orbitron, sans-serif',
          },
          flowchart: {
            htmlLabels: true,
            curve: 'basis',
          },
        });
        setIsLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }

    return () => {
      // @ts-ignore
      delete window.showNodeDefinition;
    };
  }, [definitions]);

  useEffect(() => {
    if (isLoaded && containerRef.current) {
      try {
        let enhancedContent = content;
        
        // Automatically append click events for all defined nodes
        Object.keys(definitions).forEach(nodeId => {
          if (!enhancedContent.includes(`click ${nodeId}`)) {
            enhancedContent += `\n    click ${nodeId} call showNodeDefinition("${nodeId}")`;
          }
        });

        containerRef.current.innerHTML = enhancedContent;
        window.mermaid.contentLoaded();
        window.mermaid.init(undefined, containerRef.current);
      } catch (err) {
        console.error('Mermaid render error:', err);
      }
    }
  }, [isLoaded, content, definitions]);

  return (
    <div className="mermaid-container relative w-full overflow-hidden bg-slate-950 p-6 rounded-xl border border-slate-800 shadow-2xl flex flex-col items-center min-h-[300px]">
      <div 
        ref={containerRef} 
        className="mermaid w-full flex justify-center cursor-pointer"
      >
        {/* Mermaid renders here */}
      </div>

      {selectedNode && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
          <div className="max-w-md w-full bg-slate-900 border border-blue-500/30 rounded-lg p-6 shadow-[0_0_20px_rgba(59,130,246,0.2)] relative">
            <button 
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-orbitron text-blue-400 mb-4 uppercase tracking-tighter">
              {selectedNode.title}
            </h3>
            <p className="text-slate-300 leading-relaxed font-sans">
              {selectedNode.text}
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button 
                onClick={() => setSelectedNode(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-orbitron text-xs transition-all uppercase tracking-widest shadow-[0_0_10px_rgba(59,130,246,0.4)]"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .mermaid svg {
          height: auto !important;
          max-width: 100% !important;
        }
        .mermaid .node rect, .mermaid .node circle, .mermaid .node polygon {
          stroke-width: 2px !important;
          filter: drop-shadow(0 0-8px-rgba(59, 130, 246, 0.3));
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .mermaid .clickable-node rect, .mermaid .clickable-node circle, .mermaid .clickable-node polygon {
          stroke: #60a5fa !important;
          stroke-dasharray: 5, 5;
          animation: pulse-border 2s infinite;
        }
        @keyframes pulse-border {
          0% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.3)); }
          50% { filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.6)); }
          100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.3)); }
        }
        .mermaid .edgePath path {
          stroke: #3b82f6 !important;
          stroke-width: 2px !important;
        }
        .mermaid .label {
          color: #f8fafc !important;
          font-family: 'Orbitron', sans-serif !important;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}} />
    </div>
  );
};
