import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, o as renderSlot, m as maybeRenderHead } from './astro/server_qzXorVo3.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from './BaseLayout_DetAB5fP.mjs';

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const $$SkeletonLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SkeletonLayout;
  const props = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { ...props }, { "ad-slot": ($$result2) => renderTemplate`${maybeRenderHead()}<div></div>`, "ad-slot-script": ($$result2) => renderTemplate`<div></div>`, "course-announcement": ($$result2) => renderTemplate`<div></div>`, "default": ($$result2) => renderTemplate`     ${renderSlot($$result2, $$slots["default"])}  `, "page-footer": ($$result2) => renderTemplate`<div></div>`, "page-header": ($$result2) => renderTemplate`<div></div>` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/layouts/SkeletonLayout.astro", void 0);

export { $$SkeletonLayout as $ };
