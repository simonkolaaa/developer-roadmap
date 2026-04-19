import { e as createAstro, f as createComponent, n as renderScript, m as maybeRenderHead, h as addAttribute, k as renderComponent, o as renderSlot, r as renderTemplate } from './astro/server_qzXorVo3.mjs';
import 'piccolore';
import { a as $$AstroIcon } from './BaseLayout_DetAB5fP.mjs';

const $$Astro$1 = createAstro("https://simonkolaaa.github.io/");
const $$Popup = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Popup;
  const { id, title, subtitle } = Astro2.props;
  return renderTemplate`${renderScript($$result, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/Popup/Popup.astro?astro&type=script&index=0&lang.ts")} ${maybeRenderHead()}<div${addAttribute(id, "id")} tabindex="-1" class="hidden bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-999 h-full items-center justify-center popup"> <div class="relative p-4 w-full max-w-md h-full md:h-auto"> <div class="relative bg-white rounded-lg shadow-sm popup-body"> <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"> ${renderComponent($$result, "Icon", $$AstroIcon, { "icon": "close" })} <span class="sr-only">Close popup</span> </button> <div class="p-5"> <h3 class="text-2xl mb-0.5 font-medium"> ${title} </h3> <p class="mb-4 text-sm font-normal text-gray-800"> ${subtitle} </p> ${renderSlot($$result, $$slots["default"])} </div> </div> </div> </div>`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/Popup/Popup.astro", void 0);

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const $$ProgressHelpPopup = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProgressHelpPopup;
  return renderTemplate`${renderComponent($$result, "Popup", $$Popup, { "id": "progress-help", "title": "", "subtitle": "" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="-mt-2.5"> <p class="mb-3 text-2xl font-semibold leading-5 text-gray-900">
Track your Progress
</p> <p class="text-sm leading-4 text-gray-600">
Login and use one of the options listed below.
</p> <div class="mt-4 flex flex-col gap-1.5"> <div class="rounded-md border px-3 py-3 text-gray-500"> <span class="mb-1.5 block text-xs font-medium uppercase text-green-600">Option 1</span> <p class="text-sm">
Click the roadmap topics and use <span class="underline">Update Progress</span> dropdown to update your progress.
</p> </div> <div class="rounded-md border border-yellow-300 bg-yellow-50 px-3 py-3 text-gray-500"> <span class="mb-1.5 block text-xs font-medium uppercase text-green-600">Option 2</span> <p class="text-sm">Use the keyboard shortcuts listed below.</p> <ul class="flex flex-col gap-1 mt-3 mb-1.5"> <li class="text-sm leading-loose"> <kbd class="px-2 py-1.5 text-xs text-white bg-gray-900 rounded-md">Right Mouse Click</kbd> to mark as Done.
</li> <li class="text-sm leading-loose"> <kbd class="px-2 py-1.5 text-xs text-white bg-gray-900 rounded-md">Shift</kbd> + <kbd class="px-2 py-1.5 text-xs text-white bg-gray-900 rounded-md">Click</kbd> to mark as in progress.
</li> <li class="text-sm leading-loose"> <kbd class="px-2 py-1.5 text-xs text-white bg-gray-900 rounded-md">Option / Alt</kbd> + <kbd class="px-2 py-1.5 text-xs text-white bg-gray-900 rounded-md">Click</kbd> to mark as skipped.
</li> </ul> </div> </div> </div> ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/ProgressHelpPopup.astro", void 0);

export { $$ProgressHelpPopup as $, $$Popup as a };
