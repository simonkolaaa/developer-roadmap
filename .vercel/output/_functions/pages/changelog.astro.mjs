import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, k as renderComponent, r as renderTemplate, u as unescapeHTML } from '../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { DateTime } from 'luxon';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import 'clsx';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DetAB5fP.mjs';
import { l as listChangelog } from '../chunks/changelog_BjeWyoz0.mjs';
export { renderers } from '../renderers.mjs';

const ChangelogImages = ({ images }) => {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const imageArray = images.map((image) => [image.title, image.url]);
  const handleImageClick = (src) => {
    setEnlargedImage(src);
  };
  const handleCloseEnlarged = () => {
    setEnlargedImage(null);
  };
  const handleNavigation = useCallback(
    (direction) => {
      if (!enlargedImage) return;
      const currentIndex = imageArray.findIndex(
        ([_, src]) => src === enlargedImage
      );
      let newIndex;
      if (direction === "prev") {
        newIndex = currentIndex > 0 ? currentIndex - 1 : imageArray.length - 1;
      } else {
        newIndex = currentIndex < imageArray.length - 1 ? currentIndex + 1 : 0;
      }
      setEnlargedImage(imageArray[newIndex][1]);
    },
    [enlargedImage, imageArray]
  );
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseEnlarged();
      } else if (event.key === "ArrowLeft") {
        handleNavigation("prev");
      } else if (event.key === "ArrowRight") {
        handleNavigation("next");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNavigation]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-3 px-6 pb-1", children: imageArray.map(([title, src]) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group relative cursor-pointer overflow-hidden rounded-lg transition hover:scale-105",
        onClick: () => handleImageClick(src),
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src,
              alt: title,
              className: "h-[120px] w-full object-cover object-left-top"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-linear-to-b from-transparent to-black/40 group-hover:opacity-0" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-full flex cursor-pointer items-center justify-center bg-black/50 px-2 py-0.5 text-center text-xs font-medium text-white opacity-0 group-hover:inset-y-0 group-hover:opacity-100", children: /* @__PURE__ */ jsx("span", { className: "rounded-sm bg-black px-1 py-0.5", children: title }) })
        ]
      },
      title
    )) }),
    enlargedImage && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 z-999 flex items-center justify-center bg-black/75",
        onClick: handleCloseEnlarged,
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: enlargedImage,
              alt: "Enlarged view",
              className: "max-h-[90%] max-w-[90%] rounded-xl object-contain"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white/50 p-2 hover:bg-white/100",
              onClick: (e) => {
                e.stopPropagation();
                handleNavigation("prev");
              },
              children: /* @__PURE__ */ jsx(ChevronLeft, { size: 24 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white/50 p-2 hover:bg-white/100",
              onClick: (e) => {
                e.stopPropagation();
                handleNavigation("next");
              },
              children: /* @__PURE__ */ jsx(ChevronRight, { size: 24 })
            }
          )
        ]
      }
    )
  ] });
};

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const $$ChangelogItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ChangelogItem;
  const { changelog } = Astro2.props;
  const formattedDate = DateTime.fromISO(changelog.createdAt).toFormat(
    "dd LLL, yyyy"
  );
  return renderTemplate`${maybeRenderHead()}<div class="relative mb-6"${addAttribute(changelog._id, "id")}> <span class="absolute top-2 -left-6 h-2 w-2 shrink-0 rounded-full bg-gray-300"></span> <div class="mb-3 flex flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-2"> <span class="shrink-0 text-xs tracking-wide text-gray-400"> ${formattedDate} </span> <span class="truncate text-base font-medium text-balance"> ${changelog.title} </span> </div> <div class="rounded-xl border bg-white p-6"> ${changelog.images && renderTemplate`<div class="-mx-6 mb-5 hidden sm:block"> ${renderComponent($$result, "ChangelogImages", ChangelogImages, { "images": changelog.images, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/ChangelogImages", "client:component-export": "default" })} </div>`} <div class="prose prose-sm [&_li_p]:my-0 prose-h2:mt-3 prose-h2:text-lg prose-h2:font-medium prose-p:mb-0 prose-blockquote:font-normal prose-blockquote:text-gray-500 prose-ul:my-0 prose-ul:rounded-lg prose-ul:bg-gray-100 prose-ul:px-4 prose-ul:py-4 prose-ul:pl-7 prose-img:mt-0 prose-img:rounded-lg [&>blockquote>p]:mt-0 [&>ul]:mt-3 [&>ul>li]:my-0 [&>ul>li]:mb-1">${unescapeHTML(changelog.description)}</div> </div> </div>`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/Changelog/ChangelogItem.astro", void 0);

const $$ChangelogLaunch = createComponent(($$result, $$props, $$slots) => {
  const formattedDate = DateTime.fromISO("2024-09-13").toFormat("dd LLL, yyyy");
  return renderTemplate`${maybeRenderHead()}<div class="relative mb-6"> <span class="absolute -left-6 top-2 h-2 w-2 shrink-0 rounded-full bg-gray-300"></span> <div class="mb-3 flex flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-2"> <span class="shrink-0 text-xs tracking-wide text-gray-400"> ${formattedDate} </span> <span class="truncate text-balance text-base font-medium">
Changelog page is launched
</span> </div> <div class="flex flex-col items-center justify-center gap-2 sm:gap-2 rounded-xl border bg-white px-8 py-12 text-center"> <img src="/img/gifs/rocket.gif" class="w-[70px] mb-4"> <h2 class="text-balance text-xl font-medium">Changelog page is launched</h2> <p class="font-normal text-balance text-gray-400 text-sm sm:text-base">
We will be sharing a selected list of updates, improvements, and fixes made to
      the website. Stay tuned!
</p> </div> </div>`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/Changelog/ChangelogLaunch.astro", void 0);

const $$Changelog = createComponent(async ($$result, $$props, $$slots) => {
  const allChangelogs = await listChangelog();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Changelogs", "description": "Changelogs for the updates and changes to roadmap.sh", "permalink": "/changelog", "noIndex": true }, { "changelog-banner": async ($$result2) => renderTemplate`${maybeRenderHead()}<div></div>`, "default": async ($$result2) => renderTemplate` <div class="bg-gray-100 px-4"> <div class="-mx-4 border-b bg-white text-left"> <div class="mx-auto max-w-[500px] px-4 py-5 text-left sm:pb-10 sm:pt-12 sm:text-center"> <h1 class="mb-0.5 text-2xl font-semibold sm:mb-3 sm:text-4xl">
Changelog
</h1> <p class="text-balance text-sm sm:text-base">
We are constantly improving and updating roadmap.sh
</p> </div> </div> <div class="relative mx-auto max-w-[600px] pb-8 pt-8"> <div class="absolute inset-y-0 -left-5 hidden w-px -translate-x-[0.5px] bg-gray-300 sm:block"></div> ${allChangelogs.map((changelog) => renderTemplate`${renderComponent($$result2, "ChangelogItem", $$ChangelogItem, { "changelog": changelog })}`)} ${renderComponent($$result2, "ChangelogLaunch", $$ChangelogLaunch, {})} </div> </div>  ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/changelog.astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/changelog.astro";
const $$url = "/changelog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Changelog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
