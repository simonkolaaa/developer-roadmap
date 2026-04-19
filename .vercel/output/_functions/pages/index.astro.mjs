import { f as createComponent, s as spreadAttributes, u as unescapeHTML, r as renderTemplate, e as createAstro, m as maybeRenderHead, h as addAttribute, k as renderComponent } from '../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { $ as $$ChangelogBanner } from '../chunks/ChangelogBanner_C-UEhkmG.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { DateTime } from 'luxon';
import { b as getOfficialGuideHref, l as listOfficialGuides } from '../chunks/official-guide_DMwU6W_K.mjs';
import { Loader2, Plus } from 'lucide-react';
import { i as isLoggedIn } from '../chunks/jwt_ZAvcheRY.mjs';
import { s as showLoginPopup } from '../chunks/popup_DWUkHIfQ.mjs';
import { c as cn, e as httpPost, $ as $$BaseLayout } from '../chunks/BaseLayout_DetAB5fP.mjs';
import { useRef, useState, useEffect } from 'react';
import { M as Modal } from '../chunks/query-client_Cw7dV90V.mjs';
import { u as useToast } from '../chunks/use-toast_BT3OoCi0.mjs';
import { u as useIsPaidUser } from '../chunks/VerifyUpgrade_DAgm5ZaN.mjs';
import { U as UpgradeAccountModal } from '../chunks/UpgradeAccountModal_Cogelfxg.mjs';
import 'js-cookie';
import 'clsx';
import { atom, computed } from 'nanostores';
import { V as VideoListItem } from '../chunks/VideoListItem_IsCOgXNU.mjs';
import { a as getAllVideos } from '../chunks/video_CH16DpkM.mjs';
import { l as listOfficialRoadmaps, i as isNewRoadmap } from '../chunks/official-roadmap_piILD0GP.mjs';
export { renderers } from '../renderers.mjs';

function GuideListItem(props) {
  const { guide } = props;
  const { title, slug, publishedAt, roadmapId } = guide;
  let guideType = "Textual";
  if (roadmapId === "questions") {
    guideType = "Question";
  }
  const publishedAtDate = publishedAt ? DateTime.fromJSDate(new Date(publishedAt)) : null;
  const isNew = publishedAtDate && DateTime.now().diff(publishedAtDate, "days").days < 15;
  const publishedAtMonth = publishedAtDate ? publishedAtDate.toFormat("MMMM") : "";
  return /* @__PURE__ */ jsxs(
    "a",
    {
      className: "text-md group flex items-center justify-between border-b py-2 text-gray-600 no-underline hover:text-blue-600",
      href: getOfficialGuideHref(slug, roadmapId),
      children: [
        /* @__PURE__ */ jsxs("span", { className: "text-sm transition-transform group-hover:translate-x-2 md:text-base", children: [
          title,
          isNew && /* @__PURE__ */ jsxs("span", { className: "ml-2.5 rounded-xs bg-green-300 px-1.5 py-0.5 text-xs font-medium text-green-900 uppercase", children: [
            "New",
            /* @__PURE__ */ jsxs("span", { className: "hidden sm:inline", children: [
              " · ",
              publishedAtMonth
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "hidden text-xs text-gray-500 capitalize sm:block", children: guideType }),
        /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-400 sm:hidden", children: " »" })
      ]
    }
  );
}

function FeaturedGuideList(props) {
  const { heading, guides, questions = [] } = props;
  const sortedGuides = [...guides, ...questions].sort((a, b) => {
    const aDate = new Date(a.publishedAt ?? /* @__PURE__ */ new Date());
    const bDate = new Date(b.publishedAt ?? /* @__PURE__ */ new Date());
    return bDate.getTime() - aDate.getTime();
  });
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("h2", { className: "block text-2xl font-bold sm:text-3xl", children: heading }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 sm:my-5", children: sortedGuides.map((guide) => /* @__PURE__ */ jsx(GuideListItem, { guide }, guide._id)) }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/guides",
        className: "hidden rounded-full bg-linear-to-r from-slate-600 to-black px-3 py-2 text-xs font-medium text-white transition-colors hover:from-blue-600 hover:to-blue-800 sm:inline",
        children: "View All Guides →"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-3 block sm:hidden", children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "/guides",
        className: "font-regular block rounded-md border border-black p-2 text-center text-sm text-black hover:bg-black hover:text-gray-50",
        children: "View All Guides  →"
      }
    ) })
  ] });
}

function CreateRoadmapModal(props) {
  const { onClose, onCreated, teamId } = props;
  const titleRef = useRef(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const isInvalidDescription = description?.trim().length > 80;
  async function handleSubmit(e, redirect = true) {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    if (title.trim() === "" || isInvalidDescription) {
      toast.error("Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const { response, error } = await httpPost(
      `${undefined                              }/v1-create-roadmap`,
      {
        title,
        description,
        ...teamId && {
          teamId
        },
        nodes: [],
        edges: []
      }
    );
    if (error) {
      setIsLoading(false);
      toast.error(error?.message || "Something went wrong, please try again");
      return;
    }
    toast.success("Roadmap created successfully");
    if (redirect) {
      window.location.href = `${undefined                                     }/${response?._id}`;
      return;
    }
    if (onCreated) {
      onCreated(response);
      return;
    }
    onClose();
    setTitle("");
    setDescription("");
    setIsLoading(false);
  }
  useEffect(() => {
    titleRef.current?.focus();
  }, []);
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      onClose,
      bodyClassName: "p-4",
      wrapperClassName: cn(teamId && "max-w-lg"),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Create Roadmap" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Add a title and description to your roadmap." })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "title",
                className: "block text-xs uppercase text-gray-400",
                children: "Roadmap Title"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(
              "input",
              {
                ref: titleRef,
                type: "text",
                name: "title",
                id: "title",
                required: true,
                className: "block w-full rounded-md border border-gray-300 px-2.5 py-2 text-black outline-hidden focus:border-black sm:text-sm",
                placeholder: "Enter Title",
                value: title,
                onChange: (e) => setTitle(e.target.value)
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "description",
                className: "block text-xs uppercase text-gray-400",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "description",
                  name: "description",
                  required: true,
                  className: cn(
                    "block h-24 w-full resize-none rounded-md border border-gray-300 px-2.5 py-2 text-black outline-hidden focus:border-black sm:text-sm",
                    isInvalidDescription && "border-red-300 bg-red-100"
                  ),
                  placeholder: "Enter Description",
                  value: description,
                  onChange: (e) => setDescription(e.target.value)
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 right-2 text-xs text-gray-400", children: [
                description.length,
                "/80"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn("mt-4 flex justify-between gap-2", teamId && "mt-8"),
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: onClose,
                    type: "button",
                    className: cn(
                      "block h-9 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-black outline-hidden hover:border-gray-300 hover:bg-gray-50 focus:border-gray-300 focus:bg-gray-100",
                      !teamId && "w-full"
                    ),
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2", !teamId && "w-full"), children: [
                  teamId && !isLoading && /* @__PURE__ */ jsx(
                    "button",
                    {
                      disabled: isLoading,
                      type: "button",
                      onClick: (e) => handleSubmit(e, false),
                      className: "flex h-9 items-center justify-center rounded-md border border-black bg-white px-4 py-2 text-sm font-medium text-black outline-hidden hover:bg-black hover:text-white focus:bg-black focus:text-white",
                      children: isLoading ? /* @__PURE__ */ jsx(Loader2, { size: 16, className: "animate-spin" }) : "Save as Placeholder"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      disabled: isLoading,
                      type: "submit",
                      className: cn(
                        "flex h-9 items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white outline-hidden hover:bg-gray-800 focus:bg-gray-800",
                        teamId ? "hidden sm:flex" : "w-full"
                      ),
                      children: isLoading ? /* @__PURE__ */ jsx(Loader2, { size: 16, className: "animate-spin" }) : teamId ? "Continue to Editor" : "Create"
                    }
                  )
                ] })
              ]
            }
          ),
          teamId && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("p", { className: "mt-4 hidden rounded-md border border-orange-200 bg-orange-50 p-2.5 text-sm text-orange-600 sm:block", children: [
              "Preparing the roadmap might take some time, feel free to save it as a placeholder and anyone with the role ",
              /* @__PURE__ */ jsx("strong", { children: "admin" }),
              " ",
              "or ",
              /* @__PURE__ */ jsx("strong", { children: "manager" }),
              " can prepare it later."
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 rounded-md border border-orange-200 bg-orange-50 p-2.5 text-sm text-orange-600 sm:hidden", children: "Create a placeholder now and prepare it later." })
          ] })
        ] })
      ]
    }
  );
}

atom([]);
const $currentTeam = atom();
const $currentTeamRole = computed($currentTeam, (team) => team?.role);
computed(
  $currentTeamRole,
  (role) => ["admin"].includes(role)
);
computed(
  $currentTeamRole,
  (role) => ["admin", "manager"].includes(role)
);

function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

createSvgComponent({"meta":{"src":"/_astro/roadmap._4l9lKWu.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"1.5","stroke-linecap":"round","strokeLinejoin":"round","class":"lucide lucide-milestone"},"children":"<path d=\"M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z\"></path><path d=\"M12 13v8\"></path><path d=\"M12 3v3\"></path>"});

const MAX_ROADMAP_LIMIT = 3;

function CreateRoadmapButton(props) {
  const {
    teamId,
    className,
    text = "Create your own Roadmap",
    existingRoadmapCount = 0
  } = props;
  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { isPaidUser} = useIsPaidUser();
  function toggleCreateRoadmapHandler() {
    if (!isLoggedIn()) {
      return showLoginPopup();
    }
    const hasExceededLimit = !isPaidUser && existingRoadmapCount > 0 && existingRoadmapCount >= MAX_ROADMAP_LIMIT;
    if (hasExceededLimit) {
      setShowUpgradeModal(true);
      return;
    }
    setIsCreatingRoadmap(true);
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    showUpgradeModal && /* @__PURE__ */ jsx(UpgradeAccountModal, { onClose: () => setShowUpgradeModal(false) }),
    isCreatingRoadmap && /* @__PURE__ */ jsx(
      CreateRoadmapModal,
      {
        teamId,
        onClose: () => {
          setIsCreatingRoadmap(false);
        }
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: cn(
          "flex h-full w-full items-center justify-center gap-1 overflow-hidden rounded-md border border-dashed border-gray-800 p-3 text-sm text-gray-400 hover:border-gray-600 hover:bg-gray-900 hover:text-gray-300",
          className
        ),
        onClick: toggleCreateRoadmapHandler,
        children: [
          /* @__PURE__ */ jsx(Plus, { size: 16 }),
          text
        ]
      }
    )
  ] });
}

const $$Astro$1 = createAstro("https://simonkolaaa.github.io/");
const $$FeaturedItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FeaturedItem;
  const {
    isUpcoming = false,
    isNew = false,
    text,
    url,
    allowBookmark = true
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute([
    "group border border-slate-800 bg-slate-900 p-2.5 sm:p-3.5 block no-underline rounded-lg relative text-slate-400 font-regular text-md hover:border-slate-600 hover:text-slate-100 overflow-hidden",
    {
      "opacity-50": isUpcoming
    }
  ], "class:list")}${addAttribute(url, "href")}> <span class="relative z-20 text-slate-400"> ${text} </span> ${allowBookmark && renderTemplate`${renderComponent($$result, "MarkFavorite", null, { "resourceId": url.split("/").pop(), "resourceType": url.includes("best-practices") ? "best-practice" : "roadmap", "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/FeaturedItems/MarkFavorite", "client:component-export": "MarkFavorite" })}`} ${isNew && renderTemplate`<span class="absolute bottom-1.5 right-2 flex items-center rounded-br rounded-tl text-xs font-medium text-purple-300"> <span class="mr-1.5 flex h-2 w-2"> <span class="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-purple-400 opacity-75"></span> <span class="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span> </span>
New
</span>`} ${isUpcoming && renderTemplate`<span class="absolute bottom-1.5 right-2 flex items-center rounded-br rounded-tl text-xs font-medium text-slate-500"> <span class="mr-1.5 flex h-2 w-2"> <span class="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-slate-500 opacity-75"></span> <span class="relative inline-flex h-2 w-2 rounded-full bg-slate-600"></span> </span>
Upcoming
</span>`} <span data-progress class="absolute bottom-0 left-0 top-0 z-10 w-0 bg-[#172a3a] transition-[width] duration-300"></span> </a>`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/FeaturedItems/FeaturedItem.astro", void 0);

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const $$FeaturedItems = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FeaturedItems;
  const {
    featuredItems,
    heading,
    showCreateRoadmap,
    allowBookmark = true
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative border-b border-b-[#1e293c] py-10 sm:py-14"> <div class="container"> <h2 class="text-md font-regular absolute -top-[17px] flex rounded-lg border border-[#1e293c] bg-slate-900 px-3 py-1 text-slate-400 sm:left-1/2 sm:-translate-x-1/2"> ${heading} </h2> <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3"> ${featuredItems.map((featuredItem) => renderTemplate`<li> ${renderComponent($$result, "FeaturedItem", $$FeaturedItem, { "allowBookmark": allowBookmark, "text": featuredItem.text, "url": featuredItem.url, "isNew": featuredItem.isNew, "isUpcoming": featuredItem.isUpcoming })} </li>`)} ${showCreateRoadmap && renderTemplate`<li> ${renderComponent($$result, "CreateRoadmapButton", CreateRoadmapButton, { "client:load": true, "className": "min-h-[54px]", "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/CustomRoadmap/CreateRoadmap/CreateRoadmapButton", "client:component-export": "CreateRoadmapButton" })} </li>`} </ul> </div> </div>`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/FeaturedItems/FeaturedItems.astro", void 0);

function FeaturedVideoList(props) {
  const { heading, videos } = props;
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("h2", { className: "block text-2xl font-bold sm:text-3xl", children: heading }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 sm:my-5", children: videos.map((video) => /* @__PURE__ */ jsx(VideoListItem, { video }, video.id)) }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/videos",
        className: "hidden rounded-full bg-linear-to-r from-slate-600 to-black px-3 py-2 text-xs font-medium text-white transition-colors hover:from-blue-600 hover:to-blue-800 sm:inline",
        children: "View All Videos →"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-3 block sm:hidden", children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "/videos",
        className: "font-regular block rounded-md border border-black p-2 text-center text-sm text-black hover:bg-black hover:text-gray-50",
        children: "View All Videos  →"
      }
    ) })
  ] });
}

function FeatureAnnouncement(props) {
  return null;
}

const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="min-h-auto relative min-h-[192px] border-b border-b-[#1e293c] transition-all sm:min-h-[281px]"> <div class="container px-5 py-6 pb-14 text-left transition-opacity duration-300 sm:px-0 sm:py-20 sm:text-center" id="hero-text"> <p class="-mt-4 mb-7 sm:-mt-10 sm:mb-4"> ${renderComponent($$result, "FeatureAnnouncement", FeatureAnnouncement, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/FeatureAnnouncement", "client:component-export": "FeatureAnnouncement" })} </p> <h1 class="mb-2 bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-3xl font-extrabold text-transparent sm:mb-4 sm:text-6xl sm:leading-tight">
Simon Kola Roadmaps
</h1> <p class="hidden px-4 text-xl text-slate-400 sm:block max-w-2xl mx-auto"> <span class="font-bold text-blue-400">My Personal Journey</span>. A curated collection of computer science roadmaps, university notes and essential resources for modern development.
</p> <p class="text-md block px-0 text-slate-400 sm:hidden">
Personal roadmaps, university notes and articles to master software engineering.
</p> </div> </div>`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/HeroSection/HeroSection.astro", void 0);

const projectGroups = [
  {
    title: "Frontend",
    id: "frontend"
  },
  {
    title: "Backend",
    id: "backend"
  },
  {
    title: "DevOps",
    id: "devops"
  }
];
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const roadmaps = await listOfficialRoadmaps();
  const roleRoadmaps = roadmaps.filter((roadmap) => roadmap.type === "role");
  const skillRoadmaps = roadmaps.filter((roadmap) => roadmap.type === "skill");
  const bestPractices = roadmaps.filter(
    (roadmap) => roadmap.type === "best-practice"
  );
  const allGuides = await listOfficialGuides();
  const questionGuides = allGuides.filter(
    (guide) => guide.roadmapId === "questions"
  );
  const guides = allGuides.filter((guide) => guide.roadmapId !== "questions");
  const videos = await getAllVideos();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Developer Roadmaps - roadmap.sh", "description": "Community driven roadmaps, articles and guides for developers to grow in their career.", "permalink": "/" }, { "ad-slot": async ($$result2) => renderTemplate`${maybeRenderHead()}<div></div>`, "ad-slot-script": async ($$result2) => renderTemplate`<div></div>`, "changelog-banner": async ($$result2) => renderTemplate`${renderComponent($$result2, "ChangelogBanner", $$ChangelogBanner, { "slot": "changelog-banner" })}`, "default": async ($$result2) => renderTemplate`   <div class="bg-linear-to-b from-slate-900 to-black"> ${renderComponent($$result2, "HeroSection", $$HeroSection, {})} ${renderComponent($$result2, "FeaturedItems", $$FeaturedItems, { "heading": "Role-based Roadmaps", "featuredItems": roleRoadmaps.map((roadmapItem) => {
    const isNew = isNewRoadmap(roadmapItem.createdAt);
    return {
      text: roadmapItem.title.card,
      url: `/${roadmapItem.slug}`,
      isNew
    };
  }), "showCreateRoadmap": true })} ${renderComponent($$result2, "FeaturedItems", $$FeaturedItems, { "heading": "Skill-based Roadmaps", "featuredItems": skillRoadmaps.map((roadmapItem) => {
    const isNew = isNewRoadmap(roadmapItem.createdAt);
    return {
      text: roadmapItem.title.card === "Go" ? "Go Roadmap" : roadmapItem.title.card.replace("Software Design", "Design"),
      url: `/${roadmapItem.slug}`,
      isNew
    };
  }), "showCreateRoadmap": true })} ${renderComponent($$result2, "FeaturedItems", $$FeaturedItems, { "heading": "Project Ideas", "allowBookmark": false, "featuredItems": projectGroups.map((projectGroup) => ({
    text: projectGroup.title,
    url: `${projectGroup.id}/projects`
  })) })} ${renderComponent($$result2, "FeaturedItems", $$FeaturedItems, { "heading": "Best Practices", "featuredItems": bestPractices.map((bestPracticeItem) => {
    const isNew = isNewRoadmap(bestPracticeItem.createdAt);
    return {
      text: bestPracticeItem.title.card,
      url: `/${bestPracticeItem.slug}`,
      isNew
    };
  }), "showCreateRoadmap": false })} <div class="grid grid-cols-1 gap-7 bg-gray-50 py-7 sm:gap-16 sm:py-16"> ${renderComponent($$result2, "FeaturedGuideList", FeaturedGuideList, { "heading": "Guides", "guides": guides.slice(0, 7), "questions": questionGuides.slice(0, 7) })} ${renderComponent($$result2, "FeaturedVideoList", FeaturedVideoList, { "heading": "Videos", "videos": videos.slice(0, 7) })} </div> </div>  ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/index.astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  projectGroups,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
