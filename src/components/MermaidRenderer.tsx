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
  githubUrl?: string;
}

interface MermaidRendererProps {
  content: string;
  definitions?: Record<string, NodeDef>;
}

export const MermaidRenderer = ({
  content,
  definitions = {},
}: MermaidRendererProps) => {
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
      script.src =
        'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
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

        let progress: string[] = [];
        try {
          const roadmapId =
            window.location.pathname.split('/').pop() || 'default';
          const storageKey = `simonkola-roadmap-progress-${roadmapId}`;
          progress = JSON.parse(localStorage.getItem(storageKey) || '[]');
        } catch (e) {}

        Object.keys(definitions).forEach((nodeId) => {
          if (!diagram.includes(`click ${nodeId}`)) {
            clickLines.push(`    click ${nodeId} showNodeDefinition`);
            if (progress.includes(nodeId)) {
              styleLines.push(
                `    style ${nodeId} fill:#0f172a,stroke:#22c55e,stroke-width:3px,color:#22c55e`,
              );
              classLines.push(`    class ${nodeId} completedNode`);
            } else {
              styleLines.push(
                `    style ${nodeId} fill:#0f172a,stroke:#fbbf24,stroke-width:3px,color:#fbbf24`,
              );
              classLines.push(`    class ${nodeId} definedNode`);
            }
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
            container.querySelectorAll('g.definedNode, .node.definedNode'),
          );

          // Strategy B (fallback): match node elements by their text label
          // In Mermaid v11 the node wrapper g gets id like "flowchart-BO-12"
          if (definedNodeEls.length === 0) {
            Object.keys(definitions).forEach((nodeId) => {
              const byId = container.querySelector(
                `g[id*="flowchart-${nodeId}-"], g[id="${nodeId}"]`,
              );
              if (byId && !definedNodeEls.includes(byId)) {
                definedNodeEls.push(byId);
              }
            });
          }

          definedNodeEls.forEach((nodeEl) => {
            nodeEl.classList.add('definedNode'); // Ensure animation class is present
            nodeEl
              .querySelectorAll('rect, circle, polygon, path')
              .forEach((shape) => {
                const el = shape as SVGElement;
                el.style.stroke = '#fbbf24';
                el.style.strokeWidth = '3px';
                el.style.fill = '#0f172a';
                el.style.filter = 'drop-shadow(0 0 8px rgba(251,191,36,0.6))';
                el.style.cursor = 'pointer';
              });
            nodeEl
              .querySelectorAll(
                '.label, .nodeLabel, foreignObject p, foreignObject span, text',
              )
              .forEach((label) => {
                const el = label as HTMLElement;
                el.style.color = '#fbbf24';
                el.style.fill = '#fbbf24';
                el.style.fontWeight = '700';
              });
          });

          // Strategy C: completed nodes
          let completedNodeEls = Array.from(
            container.querySelectorAll('g.completedNode, .node.completedNode'),
          );
          if (completedNodeEls.length === 0) {
            progress.forEach((nodeId) => {
              const byId = container.querySelector(
                `g[id*="flowchart-${nodeId}-"], g[id="${nodeId}"]`,
              );
              if (byId && !completedNodeEls.includes(byId)) {
                completedNodeEls.push(byId);
              }
            });
          }
          completedNodeEls.forEach((nodeEl) => {
            nodeEl.classList.add('completedNode');
            nodeEl.classList.remove('definedNode');
            nodeEl
              .querySelectorAll('rect, circle, polygon, path')
              .forEach((shape) => {
                const el = shape as SVGElement;
                el.style.stroke = '#22c55e';
                el.style.filter = 'drop-shadow(0 0 8px rgba(34,197,94,0.6))';
              });
            nodeEl
              .querySelectorAll(
                '.label, .nodeLabel, foreignObject p, foreignObject span, text',
              )
              .forEach((label) => {
                const el = label as HTMLElement;
                el.style.color = '#22c55e';
                el.style.fill = '#22c55e';
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
    <div className="mermaid-container relative flex min-h-[300px] w-full flex-col items-center overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
      {/* Mermaid SVG is injected here */}
      <div ref={containerRef} className="mermaid flex w-full justify-center" />

      {/* ── Definition Popup Overlay ─────────────────────────────────────── */}
      {selectedNode && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedNode(null);
          }}
        >
          <div className="relative w-full max-w-md rounded-xl border border-yellow-500/40 bg-slate-900 p-6 shadow-[0_0_30px_rgba(251,191,36,0.15)]">
            {/* X close button */}
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 rounded p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label="Chiudi"
            >
              <X size={18} />
            </button>

            {/* Node title */}
            <h3 className="mb-3 pr-8 text-lg font-bold tracking-wide text-yellow-400 uppercase">
              {selectedNode.title}
            </h3>

            {/* Definition text */}
            <p className="text-sm leading-relaxed text-slate-300">
              {selectedNode.text}
            </p>

            {/* Footer row */}
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-800 pt-4">
              <div className="flex flex-wrap gap-2">
                {selectedNode.note ? (
                  <button
                    onClick={() => {
                      const url = `obsidian://open?vault=IT_notes&file=${encodeURIComponent(selectedNode.note!)}`;
                      window.location.href = url;
                    }}
                    className="flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-slate-800 px-3 py-2 text-xs font-medium text-yellow-400 transition-all hover:border-yellow-500/50 hover:bg-yellow-500/10 hover:text-yellow-300"
                    title={`Apri in Obsidian: ${selectedNode.note}`}
                  >
                    <Book size={13} />
                    Apri in Obsidian
                  </button>
                ) : null}

                {selectedNode.githubUrl ? (
                  <a
                    href={selectedNode.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-blue-500/20 bg-slate-800 px-3 py-2 text-xs font-medium text-blue-400 transition-all hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-300"
                    title="Apri su GitHub"
                  >
                    <Book size={13} />
                    Apri su GitHub
                  </a>
                ) : null}

                {!selectedNode.note && !selectedNode.githubUrl && (
                  <span className="mt-2 text-xs text-slate-600 italic">
                    Nessun appunto collegato
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const roadmapId =
                      window.location.pathname.split('/').pop() || 'default';
                    const storageKey = `simonkola-roadmap-progress-${roadmapId}`;
                    try {
                      let progress = JSON.parse(
                        localStorage.getItem(storageKey) || '[]',
                      );
                      const nodeId = (selectedNode as any).id;
                      if (progress.includes(nodeId)) {
                        progress = progress.filter(
                          (id: string) => id !== nodeId,
                        );
                      } else {
                        progress.push(nodeId);
                      }
                      localStorage.setItem(
                        storageKey,
                        JSON.stringify(progress),
                      );
                      // Force re-render to apply new colors
                      setSelectedNode(null);
                      setTimeout(() => setIsLoaded(false), 0);
                      setTimeout(() => setIsLoaded(true), 10);
                    } catch (e) {}
                  }}
                  className="rounded-lg border border-green-500/30 bg-slate-800 px-3 py-2 text-xs font-medium text-green-400 transition-all hover:bg-green-500/20"
                  title="Segna/Rimuovi Completato"
                >
                  ✔ Completato
                </button>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-blue-500"
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
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
        @keyframes pulse-green {
          0%   { filter: drop-shadow(0 0 3px rgba(34,197,94,0.4)); }
          50%  { filter: drop-shadow(0 0 14px rgba(34,197,94,1)); }
          100% { filter: drop-shadow(0 0 3px rgba(34,197,94,0.4)); }
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
        .mermaid g.completedNode rect,
        .mermaid g.completedNode circle,
        .mermaid g.completedNode polygon {
          stroke: #22c55e !important;
          stroke-width: 3px !important;
          fill: #0f172a !important;
          animation: pulse-green 2.5s ease-in-out infinite;
          cursor: pointer !important;
        }
        .mermaid g.completedNode .label,
        .mermaid g.completedNode .nodeLabel {
          color: #22c55e !important;
          fill: #22c55e !important;
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
      `,
        }}
      />
    </div>
  );
};
