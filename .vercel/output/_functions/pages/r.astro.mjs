import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DetAB5fP.mjs';
import { S as SkeletonRoadmapHeader } from '../chunks/SkeletonRoadmapHeader_B2JB4ZcL.mjs';
import { $ as $$Loader } from '../chunks/Loader_MzwdiPWM.mjs';
import { $ as $$ProgressHelpPopup } from '../chunks/ProgressHelpPopup_C5qY1mWg.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Roadmaps", "noIndex": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProgressHelpPopup", $$ProgressHelpPopup, {})} ${maybeRenderHead()}<div> <div class="flex min-h-[550px] flex-col"> <div data-roadmap-loader class="flex w-full grow flex-col"> ${renderComponent($$result2, "SkeletonRoadmapHeader", SkeletonRoadmapHeader, {})} <div class="flex grow items-center justify-center"> ${renderComponent($$result2, "Loader", $$Loader, {})} </div> </div> ${renderComponent($$result2, "CustomRoadmap", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/CustomRoadmap/CustomRoadmap", "client:component-export": "CustomRoadmap" })} </div> </div> ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/r/index.astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/r/index.astro";
const $$url = "/r";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
