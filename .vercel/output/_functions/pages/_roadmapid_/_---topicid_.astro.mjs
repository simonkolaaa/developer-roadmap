import { e as createAstro, f as createComponent, k as renderComponent, p as Fragment, r as renderTemplate, m as maybeRenderHead, h as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import path from 'node:path';
import MarkdownItAsync from 'markdown-it-async';
import { fileURLToPath } from 'node:url';
import { g as getOfficialGuide } from '../../chunks/official-guide_DMwU6W_K.mjs';
import { c as cn, $ as $$BaseLayout } from '../../chunks/BaseLayout_DetAB5fP.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { g as guideRenderer } from '../../chunks/guide-renderer_CRN7EnLG.mjs';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { g as getOpenGraphImageUrl } from '../../chunks/open-graph_CUrL1jUv.mjs';
import { h as httpGet, F as FetchError } from '../../chunks/query-http_Ba7FoUiV.mjs';
export { renderers } from '../../renderers.mjs';

function TableOfContent(props) {
  const { toc } = props;
  const [isOpen, setIsOpen] = useState(false);
  if (toc.length === 0) {
    return null;
  }
  const totalRows = toc.flatMap((heading) => {
    return [heading, ...heading.children];
  }).length;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative min-w-[250px] px-5 pt-0 max-lg:max-w-full max-lg:min-w-full max-lg:border-none max-lg:px-0 lg:pt-5",
        {
          "top-[36px] lg:sticky!": totalRows <= 20
        }
      ),
      children: [
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium max-lg:hidden", children: "In this article" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "flex w-full items-center justify-between gap-2 bg-gray-300 px-3 py-2 text-sm font-medium lg:hidden",
            onClick: () => setIsOpen(!isOpen),
            children: [
              "Table of Contents",
              /* @__PURE__ */ jsx(
                ChevronDown,
                {
                  size: 16,
                  className: cn(
                    "transform transition-transform",
                    isOpen && "rotate-180"
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "ol",
          {
            className: cn(
              "mt-0.5 space-y-0 max-lg:absolute max-lg:top-full max-lg:mt-0 max-lg:w-full max-lg:bg-white max-lg:shadow-sm",
              !isOpen && "hidden lg:block",
              isOpen && "block"
            ),
            children: toc.map((heading) => /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `#${heading.slug}`,
                  className: "text-sm text-gray-500 no-underline hover:text-black max-lg:block max-lg:border-b max-lg:px-3 max-lg:py-1",
                  onClick: () => {
                    if (!isOpen) {
                      return;
                    }
                    setIsOpen(false);
                  },
                  children: heading.text
                }
              ),
              heading.children.length > 0 && /* @__PURE__ */ jsx("ol", { className: "my-0 mt-1 ml-4 space-y-0 max-lg:mt-0 max-lg:ml-0 max-lg:list-none", children: heading.children.map((children) => {
                return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `#${children.slug}`,
                    className: "text-sm text-gray-500 no-underline hover:text-black max-lg:block max-lg:border-b max-lg:px-3 max-lg:py-1 max-lg:pl-8",
                    onClick: () => {
                      if (!isOpen) {
                        return;
                      }
                      setIsOpen(false);
                    },
                    children: children.text
                  }
                ) }, children.slug);
              }) })
            ] }, heading.slug))
          }
        )
      ]
    }
  );
}

function RelatedGuides(props) {
  const { relatedTitle = "Other Guides", relatedGuides } = props;
  const [isOpen, setIsOpen] = useState(false);
  if (relatedGuides.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("relative min-w-[250px] pt-0 lg:px-5 lg:pt-10"), children: [
    /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium max-lg:hidden", children: relatedTitle }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "flex w-full items-center justify-between gap-2 border-b bg-gray-300 px-3 py-2 text-sm font-medium lg:hidden",
        onClick: () => setIsOpen(!isOpen),
        children: [
          relatedTitle,
          /* @__PURE__ */ jsx(
            ChevronDown,
            {
              size: 16,
              className: cn(
                "transform transition-transform",
                isOpen && "rotate-180"
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "ol",
      {
        className: cn(
          "mt-0.5 space-y-0 max-lg:absolute max-lg:top-full max-lg:z-10 max-lg:mt-0 max-lg:w-full max-lg:bg-white max-lg:shadow-sm",
          !isOpen && "hidden lg:block",
          isOpen && "block"
        ),
        children: relatedGuides.map((relatedGuide) => {
          const { roadmapId, slug, title } = relatedGuide;
          const href = roadmapId ? `/${roadmapId}/${slug}` : `/guides/${slug}`;
          const className = cn(
            "text-sm text-gray-500 no-underline hover:text-black max-lg:block max-lg:border-b max-lg:px-3 max-lg:py-1"
          );
          return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href,
              className,
              onClick: () => {
                if (!isOpen) {
                  return;
                }
                setIsOpen(false);
              },
              children: title
            }
          ) }, slug);
        })
      }
    )
  ] });
}

function GuideContent(props) {
  const { guide } = props;
  const content = guideRenderer.render(guide.content);
  const tableOfContents = guideRenderer.tableOfContents(guide.content);
  const showTableOfContent = tableOfContents.length > 0;
  const hasRelatedGuides = guide.relatedGuides && guide.relatedGuides.length > 0;
  return /* @__PURE__ */ jsxs("article", { className: "lg:grid lg:max-w-full lg:grid-cols-[1fr_minmax(0,700px)_1fr]", children: [
    (showTableOfContent || hasRelatedGuides) && /* @__PURE__ */ jsxs("div", { className: "sticky top-[36px] bg-linear-to-r from-gray-50 py-0 lg:relative lg:col-start-3 lg:col-end-4 lg:row-start-1", children: [
      hasRelatedGuides && /* @__PURE__ */ jsx(RelatedGuides, { relatedGuides: guide?.relatedGuides || [] }),
      showTableOfContent && /* @__PURE__ */ jsx(TableOfContent, { toc: tableOfContents })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "col-start-2 col-end-3 row-start-1 mx-auto max-w-[700px] py-5 sm:py-10",
          showTableOfContent && "lg:border-r"
        ),
        children: /* @__PURE__ */ jsxs("div", { className: "prose prose-xl prose-h2:mb-3 prose-h2:mt-10 prose-h2:scroll-mt-5 prose-h2:text-balance prose-h2:text-3xl prose-h3:mt-2 prose-h4:text-2xl prose-h3:scroll-mt-5 prose-h3:text-balance prose-h4:text-balance prose-h5:text-balance prose-h5:font-medium prose-blockquote:font-normal prose-code:bg-transparent prose-img:mt-1 sm:prose-h2:scroll-mt-10 sm:prose-h3:scroll-mt-10 prose-li:[&>p]:m-0 container", children: [
          /* @__PURE__ */ jsx("h1", { className: "mb-3 text-4xl font-bold text-balance", children: guide.title }),
          /* @__PURE__ */ jsx("p", { className: "my-0 mb-6 flex items-center justify-start text-sm text-gray-400", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: `/authors/${guide.author?.slug}`,
              className: "inline-flex items-center font-medium underline-offset-2 hover:text-gray-600 hover:underline",
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    alt: guide.author?.name,
                    src: guide.author?.avatar,
                    className: "mr-2 mb-0 inline h-5 w-5 rounded-full"
                  }
                ),
                guide.author?.name
              ]
            }
          ) }),
          content
        ] })
      }
    )
  ] });
}

async function getOfficialRoadmapTopic(options) {
  const { roadmapSlug, nodeId } = options;
  try {
    const topic = await httpGet(
      `/v1-official-roadmap-topic/${roadmapSlug}/${nodeId}`
    );
    return topic;
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}
function prepareOfficialRoadmapTopicContent(topic) {
  const { description, resources = [] } = topic;
  let content = description;
  if (resources.length > 0) {
    content += `

Visit the following resources to learn more:

${resources.map((resource) => `- [@${resource.type}@${resource.title}](${resource.url})`).join("\n")}`;
  }
  return content;
}

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const prerender = false;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { topicId, roadmapId } = Astro2.params;
  if (!topicId || !roadmapId) {
    Astro2.response.status = 404;
    Astro2.response.statusText = "Not found";
    return Astro2.rewrite("/404");
  }
  const isTopic = topicId?.includes("@") || topicId?.includes("/");
  let gitHubUrl = "";
  let htmlContent = "";
  let guide = null;
  let permalink = "";
  let ogImageUrl = "";
  if (isTopic) {
    const topicPath = Array.isArray(topicId) ? topicId.join("/") : topicId;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const projectRoot = path.resolve(__dirname, "../../..").replace(/dist$/, "");
    let contentPath = path.join(
      projectRoot,
      "src",
      "data",
      "roadmaps",
      roadmapId,
      "content",
      `${topicPath}.md`
    );
    const nodeId = topicPath.split("@")?.[1];
    if (!nodeId) {
      Astro2.response.status = 404;
      Astro2.response.statusText = "Not found";
      return Astro2.rewrite("/404");
    }
    const topic = await getOfficialRoadmapTopic({
      roadmapSlug: roadmapId,
      nodeId
    });
    if (topic) {
      const md = MarkdownItAsync();
      htmlContent = await md.renderAsync(
        prepareOfficialRoadmapTopicContent(topic)
      );
    } else {
      htmlContent = "<h1>Not found</h1>";
    }
    const fileWithoutBasePath = contentPath.replace(
      /.+?\/src\/data/,
      "/src/data"
    );
    gitHubUrl = `https://github.com/kamranahmedse/developer-roadmap/tree/master${fileWithoutBasePath}`;
  } else {
    guide = await getOfficialGuide(topicId, roadmapId);
    if (!guide) {
      Astro2.response.status = 404;
      Astro2.response.statusText = "Not found";
      return Astro2.rewrite("/404");
    }
    permalink = `/${roadmapId}/${topicId}`;
    ogImageUrl = guide?.featuredImage || getOpenGraphImageUrl(
      {
        group: "guide",
        resourceId: topicId
      },
      {
        roadmapId
      }
    );
  }
  return renderTemplate`${isTopic ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${maybeRenderHead()}<div${addAttribute(gitHubUrl, "data-github-url")}></div>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(htmlContent)}` })}` })}` : renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": guide?.seo?.metaTitle ?? guide?.title ?? "", "description": guide?.seo?.metaDescription ?? guide?.description ?? "", "permalink": permalink, "ogImageUrl": ogImageUrl }, { "changelog-banner": async ($$result2) => renderTemplate`<div></div>`, "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "GuideContent", GuideContent, { "guide": guide, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/Guide/GuideContent", "client:component-export": "GuideContent" })}` })}`}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/[roadmapId]/[...topicId].astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/[roadmapId]/[...topicId].astro";
const $$url = "/[roadmapId]/[...topicId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
