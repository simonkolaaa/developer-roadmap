import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState as useState$1, useEffect as useEffect$1, useRef as useRef$1 } from 'react';
import { c as cn, u as useOutsideClick, S as Spinner, $ as $$BaseLayout } from '../chunks/BaseLayout_DetAB5fP.mjs';
import { g as guideRenderer } from '../chunks/guide-renderer_CRN7EnLG.mjs';
import { Map, Info, ChevronDown, ChevronUp, X, Book, MapIcon } from 'lucide-react';
import { l as listOfficialRoadmaps, L as LOCAL_ROADMAPS, o as officialRoadmapDetails, i as isNewRoadmap } from '../chunks/official-roadmap_piILD0GP.mjs';
import { $ as $$RoadmapHeader } from '../chunks/RoadmapHeader_Bd2hRXny.mjs';
import { g as generateArticleSchema, a as generateFAQSchema, $ as $$ResourceProgressStats, S as ShareIcons, C as CheckSubscriptionVerification } from '../chunks/CheckSubscriptionVerification_B2Hz3DX1.mjs';
import { g as getOpenGraphImageUrl } from '../chunks/open-graph_CUrL1jUv.mjs';
import '../chunks/markdown_C4ic-9CU.mjs';
import { DateTime } from 'luxon';
import { l as listOfficialProjects } from '../chunks/official-project_D9TvOAl7.mjs';
import { r as replaceChildren } from '../chunks/dom_C6E8wq7N.mjs';
import { M as Modal } from '../chunks/query-client_Cw7dV90V.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

function ChevronDownIcon(props) {
  const { className } = props;
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
        }
      )
    }
  );
}

function Question(props) {
  const { question, isActive = false, children, onClick } = props;
  return /* @__PURE__ */ jsxs("div", { className: "faq-item rounded-md border border-gray-300 bg-white hover:bg-gray-50", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "flex w-full flex-row items-center justify-between p-2 sm:p-3",
        onClick,
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-left text-sm font-medium sm:text-base", children: question }),
          /* @__PURE__ */ jsx(ChevronDownIcon, { className: "hidden h-3.5 stroke-[3] text-gray-400 sm:block" })
        ]
      }
    ),
    isActive && /* @__PURE__ */ jsx("div", { className: cn("answer"), children })
  ] });
}

function FAQs(props) {
  const { faqs } = props;
  if (faqs.length === 0) {
    return null;
  }
  const [activeQuestionIndex, setActiveQuestionIndex] = useState$1(0);
  return /* @__PURE__ */ jsx("div", { className: "mt-8 border-t border-slate-800 bg-slate-950", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("div", { className: "relative -top-5 flex justify-between", children: /* @__PURE__ */ jsx("h2", { className: "rounded-md border border-slate-700 bg-slate-900 px-3 py-1 text-sm font-medium sm:text-base text-slate-100 font-orbitron", children: "Frequently Asked Questions" }) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1 pb-14", children: faqs.map((faq, questionIndex) => {
      const isTextDescription = typeof faq?.description === "string" && faq?.description?.length > 0;
      return /* @__PURE__ */ jsx(
        Question,
        {
          isActive: questionIndex === activeQuestionIndex,
          question: faq.title,
          onClick: () => setActiveQuestionIndex(questionIndex),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "text-md rounded-br-md rounded-bl-md border-t border-t-slate-800 bg-slate-900 p-2 text-left text-sm leading-relaxed text-slate-300 sm:p-4 sm:text-base [&>p:not(:last-child)]:mb-3 [&>p>a]:text-blue-400 [&>p>a]:underline",
              ...isTextDescription ? {
                dangerouslySetInnerHTML: {
                  __html: faq.description
                }
              } : {},
              children: !isTextDescription ? guideRenderer.render(faq.description) : null
            }
          )
        },
        faq._id
      );
    }) })
  ] }) });
}

const $$Astro$1 = createAstro("https://simonkolaaa.github.io/");
const $$RelatedRoadmaps = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RelatedRoadmaps;
  const { relatedRoadmaps } = Astro2.props;
  const allRoadmaps = await listOfficialRoadmaps();
  const relatedRoadmapsDetails = allRoadmaps.filter(
    (roadmap) => relatedRoadmaps.includes(roadmap.slug)
  );
  return renderTemplate`${relatedRoadmaps.length && renderTemplate`${maybeRenderHead()}<div${addAttribute(["border-t border-slate-800 bg-slate-950"], "class:list")}><div class="container"><div class="relative -top-5 flex justify-between"><span class="text-md flex items-center rounded-md border border-slate-700 bg-slate-900 px-3 py-1 font-medium text-slate-100 font-orbitron">${renderComponent($$result, "Map", Map, { "className": "text-blue-400 mr-1.5", "size": "17px" })}
Related <span class="hidden sm:inline">Roadmaps</span></span><a href="/roadmaps" class="text-md rounded-md border border-slate-700 bg-slate-900 px-3 py-1 font-medium hover:bg-slate-800 text-slate-300 transition-colors"><span class="hidden sm:inline">All Roadmaps &rarr;</span><span class="inline sm:hidden">More &rarr;</span></a></div><div class="flex flex-col gap-1 pb-8">${relatedRoadmapsDetails.map((relatedRoadmap) => renderTemplate`<a${addAttribute(`/${relatedRoadmap.slug}`, "href")} class="flex flex-col gap-0.5 rounded-md border border-slate-800 bg-slate-900 px-3.5 py-3 hover:bg-slate-800 hover:border-blue-500/30 transition-all sm:flex-row sm:gap-4"><span class="inline-block min-w-[195px] font-medium text-blue-400 font-orbitron text-sm">${relatedRoadmap.title.card}</span><span class="text-slate-400 text-sm">${relatedRoadmap.description}</span></a>`)}</div></div></div>`}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/RelatedRoadmaps.astro", void 0);

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState$1({
    x: 0,
    y: 0
  });
  useEffect$1(() => {
    const handleScroll = () => {
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollPosition;
}

function RoadmapTitleQuestion(props) {
  const { question, answer, roadmapId } = props;
  const [isAnswerVisible, setIsAnswerVisible] = useState$1(false);
  const ref = useRef$1(null);
  const h2Ref = useRef$1(null);
  useOutsideClick(ref, () => {
    setIsAnswerVisible(false);
  });
  const { y: scrollY } = useScrollPosition();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative block rounded-b-[5px] border-t bg-white text-sm font-medium hover:bg-gray-50 sm:block",
        {
          "rounded-0 -mx-4 sm:mx-0": isAnswerVisible
          // @FIXME:
          // The line below is to keep the question hidden on mobile devices except for
          // the frontend roadmap. This is because we did not use to have the question
          // on mobile devices before and we don't want to cause any SEO issues. It will
          // be enabled on other roadmaps in the future.
        }
      ),
      children: [
        isAnswerVisible && /* @__PURE__ */ jsx("div", { className: "fixed top-0 right-0 left-0 z-100 h-full items-center justify-center overflow-x-hidden overflow-y-auto overscroll-contain bg-black/50" }),
        /* @__PURE__ */ jsxs(
          "h2",
          {
            className: "z-50 flex cursor-pointer items-center px-2 py-2 text-sm font-medium select-none",
            "aria-expanded": isAnswerVisible ? "true" : "false",
            onClick: (e) => {
              e.preventDefault();
              setIsAnswerVisible(!isAnswerVisible);
            },
            children: [
              /* @__PURE__ */ jsxs("span", { className: "flex grow items-center select-none", children: [
                /* @__PURE__ */ jsx(Info, { className: "mr-1.5 inline-block h-4 w-4", strokeWidth: 2.5 }),
                question
              ] }),
              /* @__PURE__ */ jsx("span", { className: "relative -top-px shrink-0 text-gray-400", children: /* @__PURE__ */ jsx(ChevronDown, { className: `inline-block h-5 w-5` }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `absolute top-0 right-0 left-0 z-100 mt-0 border bg-white ${isAnswerVisible ? "rounded-0 block sm:rounded-md" : "hidden"}`,
            ref,
            children: [
              isAnswerVisible && /* @__PURE__ */ jsxs(
                "h2",
                {
                  className: cn(
                    "sticky top-0 flex cursor-pointer items-center rounded-t-md border-b bg-white px-[7px] py-[9px] text-base font-medium select-none"
                  ),
                  onClick: () => {
                    setIsAnswerVisible(false);
                    if (scrollY > (h2Ref?.current?.getBoundingClientRect().top || 0)) {
                      ref.current?.scrollIntoView();
                    }
                  },
                  ref: h2Ref,
                  children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex grow items-center", children: [
                      /* @__PURE__ */ jsx(Info, { className: "mr-2 inline-block h-4 w-4", strokeWidth: 2.5 }),
                      question
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "relative -top-px shrink-0 text-gray-400", children: /* @__PURE__ */ jsx(ChevronUp, { className: `inline-block h-5 w-5` }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "bg-gray-100 p-3 text-base [&>h2]:mt-5 [&>h2]:mb-2 [&>h2]:text-[17px] [&>h2]:font-medium [&>p]:mb-3 [&>p]:leading-relaxed [&>p]:font-normal [&>p]:text-gray-800 [&>p:last-child]:mb-0 [&>p>a]:font-semibold [&>p>a]:underline [&>p>a]:underline-offset-2 [&>ul>li]:mb-2 [&>ul>li]:font-normal",
                  children: guideRenderer.render(answer)
                }
              )
            ]
          }
        )
      ]
    }
  );
}

const MermaidRenderer = ({ content, definitions = {} }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  useEffect(() => {
    window.showNodeDefinition = (nodeId) => {
      const def = definitions[nodeId];
      if (def) {
        setSelectedNode(def);
      }
    };
    if (!window.mermaid) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
      script.async = true;
      script.onload = () => {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          themeVariables: {
            primaryColor: "#3b82f6",
            primaryTextColor: "#f8fafc",
            primaryBorderColor: "#3b82f6",
            lineColor: "#3b82f6",
            secondaryColor: "#1e293b",
            tertiaryColor: "#0f172a",
            mainBkg: "#0f172a",
            nodeBorder: "#3b82f6",
            clusterBkg: "#1e293b",
            titleColor: "#f8fafc",
            fontFamily: "Orbitron, sans-serif"
          },
          flowchart: {
            htmlLabels: true,
            curve: "basis"
          }
        });
        setIsLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }
    return () => {
      delete window.showNodeDefinition;
    };
  }, [definitions]);
  useEffect(() => {
    if (isLoaded && containerRef.current) {
      try {
        let enhancedContent = content;
        enhancedContent += "\n    classDef definedNode fill:#0f172a,stroke:#fbbf24,stroke-width:2px,color:#fbbf24,filter:drop-shadow(0 0 5px rgba(251, 191, 36, 0.4))";
        Object.keys(definitions).forEach((nodeId) => {
          if (!enhancedContent.includes(`click ${nodeId}`)) {
            enhancedContent += `
    click ${nodeId} call showNodeDefinition("${nodeId}")`;
            enhancedContent += `
    class ${nodeId} definedNode`;
          }
        });
        containerRef.current.innerHTML = enhancedContent;
        window.mermaid.contentLoaded();
        window.mermaid.init(void 0, containerRef.current);
      } catch (err) {
        console.error("Mermaid render error:", err);
      }
    }
  }, [isLoaded, content, definitions]);
  return /* @__PURE__ */ jsxs("div", { className: "mermaid-container relative w-full overflow-hidden bg-slate-950 p-6 rounded-xl border border-slate-800 shadow-2xl flex flex-col items-center min-h-[300px]", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: containerRef,
        className: "mermaid w-full flex justify-center cursor-pointer"
      }
    ),
    selectedNode && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full bg-slate-900 border border-blue-500/30 rounded-lg p-6 shadow-[0_0_20px_rgba(59,130,246,0.2)] relative", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSelectedNode(null),
          className: "absolute top-4 right-4 text-slate-400 hover:text-white transition-colors",
          children: /* @__PURE__ */ jsx(X, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-orbitron text-blue-400 mb-4 uppercase tracking-tighter", children: selectedNode.title }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-300 leading-relaxed font-sans", children: selectedNode.text }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-slate-800 flex justify-between items-center", children: [
        selectedNode.note ? /* @__PURE__ */ jsxs(
          "a",
          {
            href: `obsidian://open?vault=IT_notes&file=${encodeURIComponent(selectedNode.note)}`,
            className: "flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded font-orbitron text-[10px] transition-all uppercase tracking-widest border border-blue-500/20",
            children: [
              /* @__PURE__ */ jsx(Book, { size: 14 }),
              "Apri Appunti"
            ]
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedNode(null),
            className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-orbitron text-xs transition-all uppercase tracking-widest shadow-[0_0_10px_rgba(59,130,246,0.4)]",
            children: "Chiudi"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
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
        .mermaid g.definedNode rect, .mermaid g.definedNode circle, .mermaid g.definedNode polygon, .mermaid g.definedNode path {
          stroke: #fbbf24 !important;
          stroke-width: 3px !important;
          fill: #1e293b !important;
          animation: pulse-gold 2s infinite !important;
        }
        .mermaid g.definedNode .label, .mermaid g.definedNode span, .mermaid g.definedNode div {
          color: #fbbf24 !important;
          font-weight: bold !important;
        }
        @keyframes pulse-gold {
          0% { filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.3)); stroke: #fbbf24; }
          50% { filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.8)); stroke: #fff; }
          100% { filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.3)); stroke: #fbbf24; }
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
      ` } })
  ] });
};

function SubRoadmapRenderer(props) {
  const { jsonUrl, className } = props;
  const containerEl = useRef$1(null);
  const [isLoading, setIsLoading] = useState$1(true);
  const [error, setError] = useState$1(null);
  const [mermaidData, setMermaidData] = useState$1(null);
  async function fetchAndRender() {
    try {
      setIsLoading(true);
      setError(null);
      setMermaidData(null);
      const res = await fetch(jsonUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch sub-roadmap data: ${res.statusText}`);
      }
      const json = await res.json();
      if (json.type === "mermaid" || json.mermaid) {
        setMermaidData({
          content: json.mermaid,
          definitions: json.definitions || {}
        });
        setIsLoading(false);
        return;
      }
      const { wireframeJSONToSVG } = await import('roadmap-renderer');
      const svg = await wireframeJSONToSVG(json, {
        fontURL: "/fonts/balsamiq.woff2"
      });
      if (svg && containerEl.current) {
        svg.classList.add("simon-kola-svg");
        replaceChildren(containerEl.current, svg);
        const rects = svg.querySelectorAll("rect");
        rects.forEach((rect) => {
          rect.setAttribute("fill", "#0f172a");
          rect.setAttribute("stroke", "#3b82f6");
          rect.setAttribute("stroke-width", "2");
        });
        const texts = svg.querySelectorAll("text");
        texts.forEach((text) => {
          text.setAttribute("fill", "#f8fafc");
          text.style.fontFamily = "'Orbitron', sans-serif";
          text.style.textTransform = "uppercase";
          text.style.letterSpacing = "1px";
        });
        const lines = svg.querySelectorAll("line, path");
        lines.forEach((line) => {
          line.setAttribute("stroke", "#1e293b");
          if (line.getAttribute("stroke") === "#000" || line.getAttribute("stroke") === "black") {
            line.setAttribute("stroke", "#3b82f6");
          }
        });
      }
    } catch (err) {
      console.error("Sub-Roadmap rendering error:", err);
      setError(err.message || "Error rendering sub-roadmap.");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect$1(() => {
    fetchAndRender();
  }, [jsonUrl]);
  if (mermaidData) {
    return /* @__PURE__ */ jsx(
      MermaidRenderer,
      {
        content: mermaidData.content,
        definitions: mermaidData.definitions
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("relative w-full overflow-hidden bg-slate-950 rounded-lg border border-slate-800 min-h-[400px]", className), children: [
    isLoading && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md", children: [
      /* @__PURE__ */ jsx(Spinner, { className: "h-10 w-10 animate-spin text-blue-500" }),
      /* @__PURE__ */ jsx("span", { className: "mt-4 font-orbitron text-xs text-slate-400 tracking-widest uppercase", children: "Decrypting Map..." })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-red-500 font-bold mb-2 font-orbitron", children: "RENDER_FAILED" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm max-w-sm", children: error })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: containerEl,
        className: cn("w-full h-full p-4 flex justify-center", isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-700")
      }
    ),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
        .simon-kola-svg {
          max-width: 100%;
          height: auto;
        }
        .simon-kola-svg rect {
          filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.2));
          transition: all 0.3s ease;
        }
        .simon-kola-svg rect:hover {
          stroke: #60a5fa;
          filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.4));
          cursor: pointer;
        }
      ` } })
  ] });
}

function VisualRoadmapRenderer(props) {
  const { roadmapId, className, isCustom } = props;
  const containerEl = useRef$1(null);
  const [isLoading, setIsLoading] = useState$1(true);
  const [error, setError] = useState$1(null);
  async function fetchAndRender() {
    try {
      setIsLoading(true);
      setError(null);
      const local = LOCAL_ROADMAPS.find((r) => r.slug === roadmapId);
      if (local?.topics) {
        setIsLoading(false);
        return;
      }
      let roadmapJsonUrl = `https://roadmap.sh/${roadmapId}.json`;
      const res = await fetch(roadmapJsonUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch roadmap data: ${res.statusText}`);
      }
      const json = await res.json();
      const { wireframeJSONToSVG } = await import('roadmap-renderer');
      const svg = await wireframeJSONToSVG(json, {
        fontURL: "/fonts/balsamiq.woff2"
        // Fallback for old renderer logic
      });
      if (svg && containerEl.current) {
        replaceChildren(containerEl.current, svg);
      }
    } catch (err) {
      console.error("Roadmap rendering error:", err);
      const local = LOCAL_ROADMAPS.find((r) => r.slug === roadmapId);
      if (!local?.topics) {
        setError(err.message || "Something went wrong while rendering the roadmap.");
      }
    } finally {
      setIsLoading(false);
    }
  }
  useEffect$1(() => {
    fetchAndRender();
  }, [roadmapId]);
  const [selectedMap, setSelectedMap] = useState$1(null);
  const localData = LOCAL_ROADMAPS.find((r) => r.slug === roadmapId);
  return /* @__PURE__ */ jsxs("div", { className: cn("relative w-full overflow-hidden rounded-xl bg-slate-900 p-6 border border-slate-800 neo-glow", className), children: [
    selectedMap && /* @__PURE__ */ jsx(
      Modal,
      {
        onClose: () => setSelectedMap(null),
        bodyClassName: "bg-slate-900 border border-slate-700 max-w-4xl",
        wrapperClassName: "max-w-4xl",
        children: /* @__PURE__ */ jsxs("div", { className: "p-1", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4 px-3 pt-3", children: /* @__PURE__ */ jsx("h4", { className: "text-xl font-orbitron text-blue-400", children: selectedMap.title }) }),
          /* @__PURE__ */ jsx("div", { className: "rounded overflow-hidden bg-slate-950 border border-slate-800", children: selectedMap.json ? /* @__PURE__ */ jsx(SubRoadmapRenderer, { jsonUrl: selectedMap.json }) : selectedMap.image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: selectedMap.image,
              alt: selectedMap.title,
              className: "w-full h-auto max-h-[80vh] object-contain mx-auto"
            }
          ) : null })
        ] })
      }
    ),
    isLoading && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsx(Spinner, { className: "h-12 w-12 animate-spin text-blue-500" }),
      /* @__PURE__ */ jsx("span", { className: "mt-4 font-medium text-slate-300 font-orbitron tracking-widest uppercase", children: "Initializing..." })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-red-500 font-bold mb-2 font-orbitron", children: "ERROR_DATA_FETCH_FAILED" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm max-w-md", children: error })
    ] }),
    !isLoading && !error && !containerEl.current?.hasChildNodes() && localData?.topics && /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-orbitron text-blue-400 mb-8 border-b border-slate-800 pb-2", children: "Programma di Studio" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: localData.topics.map((topic, index) => {
        const topicTitle = typeof topic === "string" ? topic : topic.title;
        const topicImage = typeof topic === "object" ? topic.image : void 0;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "flex items-center p-4 bg-slate-950 border border-slate-800 rounded-lg group transition-all",
              topicImage || topic.json ? "cursor-pointer hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "opacity-80"
            ),
            onClick: () => {
              if (typeof topic === "object") {
                if (topic.json || topic.image) {
                  setSelectedMap({
                    title: topicTitle,
                    image: topic.image,
                    json: topic.json
                  });
                }
              }
            },
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-blue-400 font-orbitron text-xs mr-4 group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors", children: index + 1 }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-200 group-hover:text-white font-medium", children: topicTitle }),
                topicImage && /* @__PURE__ */ jsx(MapIcon, { className: "w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" })
              ] })
            ]
          },
          index
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: containerEl,
        id: "resource-svg-wrap",
        className: cn("w-full h-full", isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500")
      }
    )
  ] });
}

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { roadmapId } = Astro2.params;
  const roadmapData = await officialRoadmapDetails(roadmapId);
  if (!roadmapData) {
    Astro2.response.status = 404;
    Astro2.response.statusText = "Not found";
    return Astro2.rewrite("/404");
  }
  let jsonLdSchema = [];
  const createdAt = roadmapData?.createdAt ? new Date(roadmapData.createdAt) : /* @__PURE__ */ new Date();
  const updatedAt = roadmapData?.updatedAt ? new Date(roadmapData.updatedAt) : /* @__PURE__ */ new Date();
  const datePublished = DateTime.fromJSDate(createdAt).toFormat("yyyy-MM-dd");
  const dateModified = DateTime.fromJSDate(updatedAt).toFormat("yyyy-MM-dd");
  const baseUrl = `https://roadmap.sh`;
  jsonLdSchema.push(
    generateArticleSchema({
      url: `https://roadmap.sh/${roadmapId}`,
      headline: roadmapData?.seo?.title || roadmapData?.title?.page,
      description: roadmapData?.seo?.description || roadmapData?.description,
      datePublished,
      dateModified,
      imageUrl: `${baseUrl}/roadmaps/${roadmapId}.png`
    })
  );
  const ogImageUrl = roadmapData?.openGraph?.image || getOpenGraphImageUrl({
    group: "roadmap",
    resourceId: roadmapId
  });
  const question = roadmapData?.questions?.find(
    (question2) => question2.type === "main"
  );
  const faqs = roadmapData?.questions?.filter((question2) => question2.type === "faq") || [];
  if (faqs.length) {
    jsonLdSchema.push(generateFAQSchema(faqs));
  }
  const projects = await listOfficialProjects({ roadmapId });
  const courses = roadmapData.courses || [];
  const isNew = isNewRoadmap(roadmapData.createdAt);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "permalink": `/${roadmapId}`, "title": roadmapData?.seo?.title || roadmapData?.title?.page, "briefTitle": roadmapData?.title?.card, "ogImageUrl": ogImageUrl, "description": roadmapData?.seo?.description || roadmapData?.description, "keywords": roadmapData?.seo?.keywords || [], "noIndex": false, "jsonLd": jsonLdSchema, "resourceId": roadmapId, "resourceType": "roadmap" }, { "after-header": async ($$result2) => renderTemplate`<link rel="preload" href="/fonts/balsamiq.woff2" as="font" type="font/woff2" crossorigin>`, "changelog-banner": async ($$result2) => renderTemplate`${maybeRenderHead()}<div></div>`, "default": async ($$result2) => renderTemplate`  <div class="bg-slate-950"> ${renderComponent($$result2, "RoadmapHeader", $$RoadmapHeader, { "title": roadmapData?.title?.page, "description": roadmapData?.description, "partner": roadmapData?.partner, "roadmapId": roadmapId, "isForkable": true, "isNew": isNew, "projectCount": projects.length, "coursesCount": courses.length })} <div class="container mt-2.5 px-0 sm:px-4"> <div class="rounded-md border border-slate-800 bg-slate-900 neo-glow"> ${renderComponent($$result2, "ResourceProgressStats", $$ResourceProgressStats, { "resourceId": roadmapId, "resourceType": "roadmap" })} ${question?.title && renderTemplate`${renderComponent($$result2, "RoadmapTitleQuestion", RoadmapTitleQuestion, { "client:load": true, "roadmapId": roadmapId, "question": question?.title, "answer": question?.description, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/RoadmapTitleQuestion", "client:component-export": "RoadmapTitleQuestion" })}`} </div> </div> <div class="relative container max-w-[1000px]!"> ${renderComponent($$result2, "ShareIcons", ShareIcons, { "resourceId": roadmapId, "resourceType": "roadmap", "description": roadmapData.description, "pageUrl": `https://roadmap.sh/${roadmapId}`, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/ShareIcons/ShareIcons", "client:component-export": "ShareIcons" })} ${renderComponent($$result2, "VisualRoadmapRenderer", VisualRoadmapRenderer, { "roadmapId": roadmapId, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/VisualRoadmapRenderer", "client:component-export": "VisualRoadmapRenderer" })} </div>   ${roadmapId === "docker" && renderTemplate`<p class="mb-8 px-5 text-center text-xs text-gray-400 sm:mb-12">
Roadmap owner Insight Partners is an investor in Docker.
</p>`} ${renderComponent($$result2, "FAQs", FAQs, { "faqs": faqs, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/FAQs/FAQs", "client:component-export": "FAQs" })} ${renderComponent($$result2, "RelatedRoadmaps", $$RelatedRoadmaps, { "relatedRoadmaps": roadmapData?.relatedRoadmaps || [] })} </div> ${renderComponent($$result2, "CheckSubscriptionVerification", CheckSubscriptionVerification, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/Billing/CheckSubscriptionVerification", "client:component-export": "CheckSubscriptionVerification" })}  ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/[roadmapId]/index.astro", void 0);
const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/[roadmapId]/index.astro";
const $$url = "/[roadmapId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
