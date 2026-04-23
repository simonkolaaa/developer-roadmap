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

  // Use a ref so the global callback always sees the LATEST definitions
  // without needing to re-register it on every render.
  const definitionsRef = useRef(definitions);
  useEffect(() => {
    definitionsRef.current = definitions;
  }, [definitions]);

  // Register the global Mermaid click callback ONCE on mount.
  // Mermaid v11 calls window.showNodeDefinition(nodeId) automatically
  // when a node is clicked — it passes the node ID as the first argument.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.showNodeDefinition = (nodeId: string) => {
      const def = definitionsRef.current[nodeId];
      if (def) {
        setSelectedNode(def);
      }
    };

    // Load Mermaid from CDN if not already loaded
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

    // Keep the function alive for the lifetime of the component.
    // We intentionally do NOT delete it on cleanup to avoid a race
    // condition where Mermaid tries to call it just after unmount.
  }, []); // empty → runs once on mount only

  // Re-render the Mermaid SVG whenever content or mermaid becomes ready
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const renderMermaid = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        let diagram = content;

        // ── Mermaid click syntax (securityLevel: 'loose') ──────────────────────
        // WITHOUT quotes: click nodeId callbackFn
        //   → Mermaid calls window.callbackFn(nodeId)  ✅
        // WITH quotes:    click nodeId "callbackFn"
        //   → Mermaid treats it as a URL → navigates → 404  ❌
        // ────────────────────────────────────────────────────────────────────────
        const clickLines: string[] = [];
        const styleLines: string[] = [];
        const classLines: string[] = [];

        Object.keys(definitions).forEach(nodeId => {
          if (!diagram.includes(`click ${nodeId}`)) {
            clickLines.push(`    click ${nodeId} showNodeDefinition`);
            styleLines.push(`    style ${nodeId} fill:#0f172a,stroke:#fbbf24,stroke-width:3px,color:#fbbf24`);
            classLines.push(`    class ${nodeId} definedNode`);
          }
        });

        if (clickLines.length > 0) {
          diagram += '\n\n    %% Auto-generated clicks and styles';
          diagram += '\n' + clickLines.join('\n');
          diagram += '\n' + styleLines.join('\n');
          diagram += '\n' + classLines.join('\n');
        }

        const { svg, bindFunctions } = await window.mermaid.render(id, diagram);

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          if (bindFunctions) {
            bindFunctions(containerRef.current);
          }

          // POST-RENDER: Apply golden border styles inline.
          // Pure CSS selectors are unreliable in Mermaid v11's SVG output.
          const container = containerRef.current;

          // Strategy A: find by class .definedNode (works when Mermaid applies class correctly)
          let definedNodeEls = Array.from(
            container.querySelectorAll('g.definedNode, .node.definedNode')
          );

          // Strategy B (fallback): match node elements by their text label
          // In Mermaid v11 the node wrapper g gets id like "flowchart-BO-12"
          if (definedNodeEls.length === 0) {
            Object.keys(definitions).forEach(nodeId => {
              const byId = container.querySelector(`g[id*="flowchart-${nodeId}-"], g[id="${nodeId}"]`);
              if (byId && !definedNodeEls.includes(byId)) {
                definedNodeEls.push(byId);
              }
            });
          }

          definedNodeEls.forEach(nodeEl => {
            nodeEl.classList.add('definedNode'); // Ensure animation class is present
            nodeEl.querySelectorAll('rect, circle, polygon, path').forEach(shape => {
              const el = shape as SVGElement;
              el.style.stroke = '#fbbf24';
              el.style.strokeWidth = '3px';
              el.style.fill = '#0f172a';
              el.style.filter = 'drop-shadow(0 0 8px rgba(251,191,36,0.6))';
              el.style.cursor = 'pointer';
            });
            nodeEl.querySelectorAll('.label, .nodeLabel, foreignObject p, foreignObject span, text').forEach(label => {
              const el = label as HTMLElement;
              el.style.color = '#fbbf24';
              el.style.fill = '#fbbf24';
              el.style.fontWeight = '700';
            });
          });
        }
      } catch (err) {
        console.error('[MermaidRenderer] render error:', err);
      }
    };

    renderMermaid();
  }, [isLoaded, content, definitions]);


  return (
    <div className="mermaid-container relative w-full overflow-hidden bg-slate-950 p-6 rounded-xl border border-slate-800 shadow-2xl flex flex-col items-center min-h-[300px]">

      {/* Mermaid SVG is injected here */}
      <div
        ref={containerRef}
        className="mermaid w-full flex justify-center"
      />

      {/* ── Definition Popup Overlay ─────────────────────────────────────── */}
      {selectedNode && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedNode(null);
          }}
        >
          <div className="max-w-md w-full bg-slate-900 border border-yellow-500/40 rounded-xl p-6 shadow-[0_0_30px_rgba(251,191,36,0.15)] relative">
            {/* X close button */}
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Chiudi"
            >
              <X size={18} />
            </button>

            {/* Node title */}
            <h3 className="text-lg font-bold text-yellow-400 mb-3 pr-8 uppercase tracking-wide">
              {selectedNode.title}
            </h3>

            {/* Definition text */}
            <p className="text-slate-300 leading-relaxed text-sm">
              {selectedNode.text}
            </p>

            {/* Footer row */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              {selectedNode.note ? (
                <a
                  href={`obsidian://open?vault=IT_notes&file=${encodeURIComponent(selectedNode.note)}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all bg-slate-800 hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300 border border-yellow-500/20 hover:border-yellow-500/50"
                  title={`Apri in Obsidian: ${selectedNode.note}`}
                >
                  <Book size={13} />
                  Apri in Obsidian
                </a>
              ) : (
                <span className="text-slate-600 text-xs italic">Nessun appunto collegato</span>
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

      {/* Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .mermaid svg {
          height: auto !important;
          max-width: 100% !important;
        }
        .mermaid .node rect,
        .mermaid .node circle,
        .mermaid .node polygon {
          stroke-width: 2px;
          transition: filter 0.3s ease;
          cursor: pointer;
        }
        @keyframes pulse-gold {
          0%   { filter: drop-shadow(0 0 3px rgba(251,191,36,0.4)); }
          50%  { filter: drop-shadow(0 0 14px rgba(251,191,36,1)); }
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
        .mermaid .edgePath path {
          stroke: #3b82f6 !important;
          stroke-width: 2px !important;
        }
        .mermaid .label {
          color: #f8fafc;
          font-family: 'Inter', sans-serif;
        }
      `}} />
    </div>
  );
};
