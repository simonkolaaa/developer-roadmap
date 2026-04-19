import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DetAB5fP.mjs';
import { S as SkeletonRoadmapHeader } from '../../chunks/SkeletonRoadmapHeader_B2JB4ZcL.mjs';
import { $ as $$Loader } from '../../chunks/Loader_MzwdiPWM.mjs';
import { $ as $$ProgressHelpPopup } from '../../chunks/ProgressHelpPopup_C5qY1mWg.mjs';
import { r as roadmapApi } from '../../chunks/roadmap_hDtrzt-r.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const prerender = false;
const $$customRoadmapSlug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$customRoadmapSlug;
  const { customRoadmapSlug } = Astro2.params;
  const roadmapClient = roadmapApi(Astro2);
  const { response, error } = await roadmapClient.isShowcaseRoadmap(
    customRoadmapSlug
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Roadmaps", "noIndex": !response?.isShowcase, "permalink": `/r/${customRoadmapSlug}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ProgressHelpPopup", $$ProgressHelpPopup, {})} ${maybeRenderHead()}<div> <div class="flex min-h-[550px] flex-col"> <div data-roadmap-loader class="flex w-full grow flex-col"> ${renderComponent($$result2, "SkeletonRoadmapHeader", SkeletonRoadmapHeader, {})} <div class="flex grow items-center justify-center"> ${renderComponent($$result2, "Loader", $$Loader, {})} </div> </div> ${renderComponent($$result2, "CustomRoadmap", null, { "slug": customRoadmapSlug, "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/CustomRoadmap/CustomRoadmap", "client:component-export": "CustomRoadmap" })} </div> </div> ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/r/[customRoadmapSlug].astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/r/[customRoadmapSlug].astro";
const $$url = "/r/[customRoadmapSlug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$customRoadmapSlug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
