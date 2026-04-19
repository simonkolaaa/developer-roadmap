import { e as createAstro, f as createComponent, m as maybeRenderHead, k as renderComponent, r as renderTemplate } from './astro/server_qzXorVo3.mjs';
import 'piccolore';
import { a as $$AstroIcon } from './BaseLayout_DetAB5fP.mjs';

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const $$Loader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Loader;
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-center w-full"> ${renderComponent($$result, "Icon", $$AstroIcon, { "icon": "spinner", "class": "h-6 w-6 sm:w-12 sm:h-12 text-gray-200 animate-spin fill-blue-600" })} </div>`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/Loader.astro", void 0);

export { $$Loader as $ };
