import { f as createComponent, m as maybeRenderHead, r as renderTemplate, e as createAstro, k as renderComponent } from '../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import 'clsx';
import { V as VideoListItem } from '../chunks/VideoListItem_IsCOgXNU.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DetAB5fP.mjs';
import { a as getAllVideos } from '../chunks/video_CH16DpkM.mjs';
export { renderers } from '../renderers.mjs';

const $$YouTubeAlert = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="https://youtube.com/theroadmap?sub_confirmation=1" target="_blank" class="text-md hidden sm:flex items-center text-red-600 group hover:text-red-900"> <span class="bg-red-600 group-hover:bg-red-800 group-hover: px-1.5 py-0.5 rounded-xs text-white text-xs uppercase font-medium mr-2">New</span> <span class="underline mr-1">We also have a YouTube channel with visual content</span> <span>&raquo;</span> </a>`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/YouTubeAlert.astro", void 0);

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const $$SimplePageHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SimplePageHeader;
  const { title, description, showYouTubeAlert = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white border-b pt-6 pb-5 sm:pt-12 sm:pb-10"> <div class="container"> ${showYouTubeAlert && renderTemplate`<div class="mb-4 hidden sm:block"> ${renderComponent($$result, "YouTubeAlert", $$YouTubeAlert, {})} </div>`} <h1 class="text-3xl sm:text-5xl mb-1 sm:mb-2 font-bold">${title}</h1> <p class="text-gray-500 text-sm sm:text-lg">${description}</p> </div> </div>`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/SimplePageHeader.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const videos = await getAllVideos();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Illustrated Videos - roadmap.sh", "description": "Graphical video demonstrations on software engineering topics.", "permalink": `/videos` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SimplePageHeader", $$SimplePageHeader, { "title": "Videos", "description": "Graphical video demonstrations on software engineering topics." })} ${maybeRenderHead()}<div class="pb-20 pt-2 bg-gray-50"> <div class="container"> <div class="mt-3 sm:my-5"> ${videos.map((video) => renderTemplate`${renderComponent($$result2, "VideoListItem", VideoListItem, { "video": video })}`)} </div> </div> </div> ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/videos/index.astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/videos/index.astro";
const $$url = "/videos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
