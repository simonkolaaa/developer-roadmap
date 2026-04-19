import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as defineScriptVars } from '../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { $ as $$BaseLayout, a as $$AstroIcon } from '../chunks/BaseLayout_DetAB5fP.mjs';
import { l as listOfficialRoadmaps } from '../chunks/official-roadmap_piILD0GP.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://simonkolaaa.github.io/");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const roadmapIds = await listOfficialRoadmaps();
  const legacyRoadmapUrls = [
    ...roadmapIds.map((roadmap) => `/${roadmap.slug}/`),
    "/roadmaps/"
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Page not found", "permalink": "/404", "noIndex": true }, { "after-header": async ($$result2) => renderTemplate(_a || (_a = __template(["<script>(function(){", "\n    // If it's a roadmap page and it ends with a slash\n    // redirect to the same page without the slash\n    if (legacyRoadmapUrls.includes(window.location.pathname)) {\n      window.location.pathname = window.location.pathname.slice(0, -1);\n    }\n  })();<\/script>"])), defineScriptVars({ legacyRoadmapUrls })), "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="bg-gray-100"> <div class="container flex flex-col items-center justify-center gap-7 py-10 md:flex-row md:py-32"> ${renderComponent($$result2, "Icon", $$AstroIcon, { "icon": "construction", "class": "hidden md:block" })} <div class="text-left md:text-left"> <h1 class="bg-linear-to-t from-black to-gray-600 bg-clip-text text-2xl leading-normal font-extrabold text-transparent md:text-5xl md:leading-normal">
Page not found!
</h1> <p class="text-md mb-2 md:text-xl">
Sorry, we couldn't find the page you are looking for.
</p> <p> <a class="text-blue-700 underline" href="/">Homepage</a> &middot; <a href="/roadmaps" class="text-blue-700 underline">Roadmaps</a> &middot; <a href="/best-practices" class="text-blue-700 underline">Best Practices</a> </p> </div> </div> </div> ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/404.astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
