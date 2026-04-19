import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, k as renderComponent, r as renderTemplate } from './astro/server_qzXorVo3.mjs';
import 'piccolore';
import { a as $$AstroIcon, c as cn } from './BaseLayout_DetAB5fP.mjs';
import { jsx } from 'react/jsx-runtime';
import { useRef, useEffect, useState } from 'react';
import { G as GitHubIcon } from './ai-course_qF62O6Zz.mjs';
import { g as getUrlParams } from './use-toast_BT3OoCi0.mjs';
import { V as VerifyUpgrade } from './VerifyUpgrade_DAgm5ZaN.mjs';

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const $$ResourceProgressStats = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ResourceProgressStats;
  const { resourceId, resourceType } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div data-progress-nums-container${addAttribute([
    "striped-loader relative flex items-center justify-between rounded-md bg-slate-900 border border-slate-800 px-2 sm:px-2.5 py-2 sm:py-2.5 neo-glow"
  ], "class:list")}> <p class="flex text-xs sm:text-sm opacity-0 transition-opacity duration-300 text-slate-300 font-medium" data-progress-nums> <span class="mr-2.5 hidden rounded-xs bg-blue-600 px-1.5 py-0.5 text-xs font-bold uppercase text-white sm:block font-orbitron"> <span data-progress-percentage>0</span>% Done
</span> <span> <span data-progress-done>0</span> of <span data-progress-total>0</span> Done
</span> </p> <div class="flex items-center gap-3 opacity-0 transition-opacity duration-300" data-progress-nums> ${renderComponent($$result, "ProgressShareButton", null, { "resourceId": resourceId, "resourceType": resourceType, "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/UserProgress/ProgressShareButton", "client:component-export": "ProgressShareButton" })} <button data-popup="progress-help" class="hidden items-center gap-1 text-sm font-medium text-gray-500 opacity-0 transition-opacity hover:text-black sm:flex" data-progress-nums> ${renderComponent($$result, "AstroIcon", $$AstroIcon, { "icon": "question" })}
Track Progress
</button> </div> </div>`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/ResourceProgressStats.astro", void 0);

function ShareIcons(props) {
  const { pageUrl, description, resourceType, resourceId } = props;
  const shareIconsRef = useRef(null);
  const icons = [
    {
      url: "https://github.com/simonkolaaa",
      icon: /* @__PURE__ */ jsx(
        GitHubIcon,
        {
          className: "size-[24px] [&>path]:fill-[#E5E5E5]"
        }
      )
    }
  ];
  useEffect(() => {
    const shareIcons = shareIconsRef.current;
    if (!shareIcons) {
      return;
    }
    const onScroll = () => {
      if (window.scrollY < 100 || window.innerWidth < 1050) {
        shareIcons.classList.add("hidden");
        return null;
      }
      shareIcons.classList.remove("hidden");
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "absolute left-[-18px] top-[110px] hidden h-full",
      ref: shareIconsRef,
      children: /* @__PURE__ */ jsx("div", { className: "sticky top-[100px] flex flex-col items-center gap-1.5", children: icons.map((icon, index) => {
        const host = new URL(icon.url).host;
        return /* @__PURE__ */ jsx(
          "a",
          {
            href: icon.url,
            target: "_blank",
            className: cn(
              "text-gray-500 hover:text-gray-700",
              index === 0 && "mt-0.5"
            ),
            onClick: () => {
              window.fireEvent({
                category: "RoadmapShareLink",
                action: `Share Roadmap / ${resourceType} / ${resourceId} / ${host}`,
                label: icon.url
              });
            },
            children: icon.icon
          },
          index
        );
      }) })
    }
  );
}

class MarkdownRenderer {
  marksOrder = ["underline", "bold", "italic", "textStyle", "link"];
  render(content, options = {}) {
    const nodes = content.content || [];
    return nodes.map((node) => this.renderNode(node)).join(options?.join || "\n\n");
  }
  renderNode(node) {
    const type = node.type || "";
    if (type in this) {
      return this[type]?.(node);
    }
    console.warn(`Node type "${type}" is not supported.`);
    return "";
  }
  getText(node) {
    if (node.type === "text") return node.text || "";
    if (node.content)
      return node.content.map((child) => this.getText(child)).join("");
    return "";
  }
  content(node) {
    return (node.content || []).map((child) => this.renderNode(child)).join("");
  }
  renderMark(node) {
    let text = node.text || "";
    let marks = node.marks || [];
    marks.sort(
      (a, b) => this.marksOrder.indexOf(a.type) - this.marksOrder.indexOf(b.type)
    );
    return marks.reduce((acc, mark) => {
      if (mark.type === "bold") return `**${acc}**`;
      if (mark.type === "italic") return `*${acc}*`;
      if (mark.type === "underline") return `_${acc}_`;
      if (mark.type === "code") return `\`${acc}\``;
      if (mark.type === "link") return `[${acc}](${mark.attrs?.href})`;
      return acc;
    }, text);
  }
  // ---- Nodes ----
  paragraph(node) {
    return this.content(node);
  }
  text(node) {
    return node.marks ? this.renderMark(node) : node.text || "";
  }
  heading(node) {
    const level = node.attrs?.level || 1;
    const prefix = "#".repeat(level);
    return `${prefix} ${this.content(node)}`;
  }
  bulletList(node) {
    return (node.content || []).map((child) => `- ${this.renderNode(child)}`).join("\n");
  }
  orderedList(node) {
    return (node.content || []).map((child, i) => `${i + 1}. ${this.renderNode(child)}`).join("\n");
  }
  listItem(node) {
    return this.content(node);
  }
  blockquote(node) {
    return this.content(node).split("\n").map((line) => `> ${line}`).join("\n");
  }
  codeBlock(node) {
    const code = this.getText(node);
    const language = node.attrs?.language || "";
    return `\`\`\`${language}
${code}
\`\`\``;
  }
  horizontalRule() {
    return `---`;
  }
  image(node) {
    const { src, alt } = node.attrs || {};
    return `![${alt || ""}](${src})`;
  }
  table(node) {
    const rows = (node.content || []).filter((n) => n.type === "tableRow");
    return rows.map((row) => this.renderNode(row)).join("\n");
  }
  tableRow(node) {
    return `| ${this.content(node)} |`;
  }
  tableHeader(node) {
    return this.content(node);
  }
  tableCell(node) {
    return this.content(node);
  }
}
function renderMarkdownFromJson(json, options = {}) {
  return new MarkdownRenderer().render(json, options);
}

function generateArticleSchema(article) {
  const { url, headline, description, imageUrl, datePublished, dateModified } = article;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    headline,
    description,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: "Kamran Ahmed",
      url: "https://twitter.com/kamrify"
    },
    publisher: {
      "@type": "Organization",
      name: "roadmap.sh",
      logo: {
        "@type": "ImageObject",
        url: "https://roadmap.sh/img/brand-square.png"
      }
    },
    datePublished,
    dateModified
  };
}
function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: renderMarkdownFromJson(faq.description, { join: " " })
      }
    }))
  };
}

function CheckSubscriptionVerification() {
  const [shouldVerifyUpgrade, setShouldVerifyUpgrade] = useState(false);
  useEffect(() => {
    const params = getUrlParams();
    if (params.s !== "1") {
      return;
    }
    setShouldVerifyUpgrade(true);
  }, []);
  if (!shouldVerifyUpgrade) {
    return null;
  }
  return /* @__PURE__ */ jsx(VerifyUpgrade, {});
}

export { $$ResourceProgressStats as $, CheckSubscriptionVerification as C, ShareIcons as S, generateFAQSchema as a, generateArticleSchema as g };
