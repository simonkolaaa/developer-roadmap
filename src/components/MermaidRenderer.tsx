import { useCallback, useEffect, useRef, useState } from 'react';
import { Book, X } from 'lucide-react';

declare global {
  interface Window {
    mermaid: any;
    showNodeDefinition: (nodeId: string) => void;
  }
}

interface NodeDef {
  title: string;
  text: string;
  note?: string;
}

interface MermaidRendererProps {
  content: string;
  definitions?: Record<string, NodeDef>;
}

export const MermaidRenderer = ({ content, definitions = {} }: MermaidRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeDef | null>(null);

  // Use a ref so the global callback always sees the latest definitions
  // without needing to re-register it every time definitions changes.
  const definitionsRef = useRef(definitions);
  useEffect(() => {
    definitionsRef.current = definitions;
  }, [definitions]);

  // Register the global callback ONCE on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.showNodeDefinition = (nodeId: string) => {
      const def = definitionsRef.current[nodeId];
      if (def) {
        setSelectedNode(def);
      }
    };

    // Load Mermaid from CDN dynamically
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
            fontFamily: 'Inter, sans-serif',
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

    // Do NOT delete window.showNodeDefinition on cleanup —
    // doing so was causing click events to silently fail after re-renders.
    return () => {};
  }, []); // Empty deps: register only once

  // Re-render the diagram whenever content, definitions, or mermaid loads
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const renderMermaid = async () => {
      try {
        const id = `mermaid-svg-${Math.random().toString(36).substr(2, 9)}`;
        let enhancedContent = content;

        // Append click + style + class directives for each defined node
        enhancedContent += '\n\n    %% Styles and Clicks';
        Object.keys(definitions).forEach(nodeId => {
          if (!enhancedContent.includes(`click ${nodeId}`)) {
            enhancedContent += `\n    click ${nodeId} call showNodeDefinition("${nodeId}")`;
            enhancedContent += `\n    style ${nodeId} fill:#0f172a,stroke:#fbbf24,stroke-width:3px,color:#fbbf24`;
            enhancedContent += `\n    class ${nodeId} definedNode`;
          }
        });

        const { svg } = await window.mermaid.render(id, enhancedContent);

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;

          // POST-RENDER: Apply inline styles to golden nodes.
          // Mermaid v11 SVG structure makes CSS class selectors unreliable.
          const container = containerRef.current;
          const definedNodeEls = container.querySelectorAll('g.definedNode, .node.definedNode');
          definedNodeEls.forEach((nodeEl) => {
            nodeEl.querySelectorAll('rect, circle, polygon, path').forEach((shape) => {
              (shape as SVGElement).style.stroke = '#fbbf24';
              (shape as SVGElement).style.strokeWidth = '3px';
              (shape as SVGElement).style.fill = '#0f172a';
              (shape as SVGElement).style.filter = 'drop-shadow(0 0 8px rgba(251,191,36,0.6))';
              (shape as SVGElement).style.cursor = 'pointer';
              (shape as SVGElement).style.transition = 'filter 0.3s ease';
            });
            nodeEl.querySelectorAll('.label, .nodeLabel, foreignObject p, foreignObject span').forEach((label) => {
              (label as HTMLElement).style.color = '#fbbf24';
              (label as HTMLElement).style.fontWeight = '800';
            });
          });

          // Fallback: if no g.definedNode found, try attaching click via data-id attribute
          // This covers edge cases in Mermaid v11 where classes are applied differently
          if (definedNodeEls.length === 0) {
            Object.keys(definitions).forEach(nodeId => {
              // Try finding by the SVG node id pattern Mermaid generates
              const possibleSelectors = [
                `#${id} g[id*="${nodeId}"]`,
                `g[id*="${nodeId}"]`,
                `[id="${nodeId}"]`,
              ];
              for (const sel of possibleSelectors) {
                const el = container.querySelector(sel);
                if (el) {
                  el.querySelectorAll('rect, circle, polygon, path').forEach((shape) => {
                    (shape as SVGElement).style.stroke = '#fbbf24';
                    (shape as SVGElement).style.strokeWidth = '3px';
                    (shape as SVGElement).style.fill = '#0f172a';
                    (shape as SVGElement).style.filter = 'drop-shadow(0 0 8px rgba(251,191,36,0.6))';
                    (shape as SVGElement).style.cursor = 'pointer';
                  });
                  // Add a direct click handler as backup
                  (el as HTMLElement).style.cursor = 'pointer';
                  el.addEventListener('click', () => {
                    window.showNodeDefinition(nodeId);
                  });
                  break;
                }
              }
            });
          }
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
      }
    };

    renderMermaid();
  }, [isLoaded, content, definitions]);

  const handleObsidianOpen = useCallback((note: string) => {
    // Use window.open for custom protocol links — more reliable across browsers
    // than plain <a href>. The blank target is intentional to avoid navigation.
    const url = `obsidian://open?vault=IT_notes&file=${encodeURIComponent(note)}`;
    window.open(url, '_blank');
  }, []);

  return (
    <div className="mermaid-container relative w-full overflow-hidden bg-slate-950 p-6 rounded-xl border border-slate-800 shadow-2xl flex flex-col items-center min-h-[300px]">
      <div
        ref={containerRef}
        className="mermaid w-full flex justify-center"
      >
        {/* Mermaid SVG renders here */}
      </div>

      {/* Definition Popup */}
      {selectedNode && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4"
          onClick={(e) => {
            // Close on backdrop click
            if (e.target === e.currentTarget) setSelectedNode(null);
          }}
        >
          <div className="max-w-md w-full bg-slate-900 border border-yellow-500/40 rounded-xl p-6 shadow-[0_0_30px_rgba(251,191,36,0.15)] relative animate-in fade-in zoom-in duration-200">
            {/* Close button */}
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-800"
              aria-label="Chiudi"
            >
              <X size={18} />
            </button>

            {/* Title */}
            <h3 className="text-lg font-bold text-yellow-400 mb-3 pr-8 tracking-wide uppercase">
              {selectedNode.title}
            </h3>

            {/* Definition text */}
            <p className="text-slate-300 leading-relaxed text-sm">
              {selectedNode.text}
            </p>

            {/* Footer: Obsidian link + close */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              {selectedNode.note ? (
                <button
                  onClick={() => handleObsidianOpen(selectedNode.note!)}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300 rounded-lg text-xs font-medium transition-all border border-yellow-500/20 hover:border-yellow-500/50"
                  title={`Apri in Obsidian: ${selectedNode.note}`}
                >
                  <Book size={13} />
                  Apri in Obsidian
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={() => setSelectedNode(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-all"
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
        /* Base node styles */
        .mermaid .node rect,
        .mermaid .node circle,
        .mermaid .node polygon {
          stroke-width: 2px;
          transition: filter 0.3s ease;
          cursor: pointer;
        }
        /* Golden pulse animation for defined nodes */
        @keyframes pulse-gold {
          0%   { filter: drop-shadow(0 0 3px rgba(251,191,36,0.4)); }
          50%  { filter: drop-shadow(0 0 12px rgba(251,191,36,0.9)); }
          100% { filter: drop-shadow(0 0 3px rgba(251,191,36,0.4)); }
        }
        .mermaid g.definedNode rect,
        .mermaid g.definedNode circle,
        .mermaid g.definedNode polygon {
          stroke: #fbbf24 !important;
          stroke-width: 3px !important;
          fill: #0f172a !important;
          animation: pulse-gold 2.5s ease-in-out infinite;
          cursor: pointer !important;
        }
        .mermaid g.definedNode .label,
        .mermaid g.definedNode .nodeLabel {
          color: #fbbf24 !important;
          fill: #fbbf24 !important;
          font-weight: 700 !important;
        }
        /* Edges */
        .mermaid .edgePath path {
          stroke: #3b82f6 !important;
          stroke-width: 2px !important;
        }
        /* Labels */
        .mermaid .label {
          color: #f8fafc;
          font-family: 'Inter', 'Orbitron', sans-serif;
        }
      `}} />
    </div>
  );
};
