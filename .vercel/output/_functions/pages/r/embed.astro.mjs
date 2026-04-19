import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { $ as $$Loader } from '../../chunks/Loader_MzwdiPWM.mjs';
import { $ as $$SkeletonLayout } from '../../chunks/SkeletonLayout_kisaEpU0.mjs';
import { a as $$AstroIcon } from '../../chunks/BaseLayout_DetAB5fP.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const $$Embed = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Embed;
  return renderTemplate`${renderComponent($$result, "SkeletonLayout", $$SkeletonLayout, { "title": "Roadmaps", "noIndex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative flex min-h-[550px] flex-col"> <div data-roadmap-loader class="flex w-full grow flex-col"> <div class="flex grow items-center justify-center"> ${renderComponent($$result2, "Loader", $$Loader, {})} </div> </div> ${renderComponent($$result2, "CustomRoadmap", null, { "isEmbed": true, "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/CustomRoadmap/CustomRoadmap", "client:component-export": "CustomRoadmap" })} <div class="fixed bottom-5 right-4"> <a target="_blank" class="rounded-md bg-gray-600 py-2 pr-2 pl-1.5 text-white hover:bg-black flex items-center gap-0.5" href="https://roadmap.sh"> ${renderComponent($$result2, "Icon", $$AstroIcon, { "icon": "logo", "class": "h-5" })}
roadmap.sh
</a> </div> </div> ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/r/embed.astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/r/embed.astro";
const $$url = "/r/embed";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Embed,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
