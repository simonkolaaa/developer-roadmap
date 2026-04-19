import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, p as Fragment } from '../../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { $ as $$RoadmapHeader } from '../../chunks/RoadmapHeader_BcBYA4J4.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DetAB5fP.mjs';
import { g as getOpenGraphImageUrl } from '../../chunks/open-graph_CUrL1jUv.mjs';
import { l as listOfficialProjects } from '../../chunks/official-project_D9TvOAl7.mjs';
import { o as officialRoadmapDetails } from '../../chunks/official-roadmap_piILD0GP.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const prerender = false;
const $$Courses = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Courses;
  const { roadmapId } = Astro2.params;
  const roadmapData = await officialRoadmapDetails(roadmapId);
  if (!roadmapData) {
    Astro2.response.status = 404;
    Astro2.response.statusText = "Not found";
    return Astro2.rewrite("/404");
  }
  const ogImageUrl = roadmapData?.openGraph?.image || getOpenGraphImageUrl({
    group: "roadmap",
    resourceId: roadmapId
  });
  const descriptionNoun = {
    "AI and Data Scientist": "AI and Data Science",
    "Game Developer": "Game Development",
    "Technical Writer": "Technical Writing",
    "Product Manager": "Product Management"
  };
  const title = `${roadmapData?.title.card} Courses`;
  const description = `Premium courses to help you master ${descriptionNoun[roadmapData?.title.card] || roadmapData?.title.card}`;
  const seoTitle = `${roadmapData?.title.card} Courses`;
  const nounTitle = descriptionNoun[roadmapData.title.card] || roadmapData.title.card;
  const seoDescription = `Seeking ${nounTitle.toLowerCase()} courses to enhance your skills? Explore our top free and paid courses to help you become a ${nounTitle} expert!`;
  const projects = await listOfficialProjects({ roadmapId });
  const courses = roadmapData?.courses || [];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "permalink": `/${roadmapId}`, "title": seoTitle, "description": seoDescription, "briefTitle": roadmapData.title.card, "ogImageUrl": ogImageUrl, "keywords": roadmapData.seo.keywords, "resourceId": roadmapId, "resourceType": "roadmap", "noIndex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gray-50"> ${renderComponent($$result2, "RoadmapHeader", $$RoadmapHeader, { "title": title, "description": description, "partner": roadmapData.partner, "roadmapId": roadmapId, "isForkable": true, "coursesCount": courses.length, "projectCount": projects.length, "activeTab": "courses", "hasAIChat": true })} <div class="container"> <div class="relative mt-2.5 mb-8"> <div class="my-4 flex items-center justify-between"> <p class="border-l-4 border-black pl-2 text-sm text-black">
Official Courses by <span class="font-semibold"> roadmap.sh </span>
team
</p> <div class="hidden text-sm text-gray-500 sm:block">
More coming soon
</div> </div> <div class="grid grid-cols-1 gap-5 md:grid-cols-1"> ${courses.map((course) => renderTemplate`<a${addAttribute(course.link, "href")} class="block rounded-lg border border-gray-200 bg-white p-6 duration-300 hover:border-gray-400/60"> <div class="flex justify-between"> <div class="flex-1"> <h3 class="mb-2 text-2xl font-bold text-black"> ${course.title} </h3> <p class="text-base text-gray-600">${course.description}</p> ${course.features.length > 0 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="my-6 flex flex-wrap gap-2"> ${course.features.map((feature) => renderTemplate`<span class="rounded-full border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-gray-700"> ${feature} </span>`)} </div> <div class="mt-6 flex flex-col items-start justify-between gap-3 sm:mt-0 sm:flex-row sm:items-center sm:gap-0"> <div class="flex items-center"> <img${addAttribute(course.instructor.image, "src")}${addAttribute(course.instructor.name, "alt")} class="mr-3 h-12 w-12 rounded-full border border-gray-200"> <div> <p class="text-base font-medium text-gray-900"> ${course.instructor.name} </p> <p class="text-sm text-gray-500"> ${course.instructor.title} </p> </div> </div> <span class="group mt-3 w-full rounded-lg border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:opacity-80 sm:mt-0 sm:w-auto sm:py-1.5">
View Course <span class="ml-1">&rarr;</span> </span> </div> ` })}`} </div> </div> </a>`)} </div> ${courses.length === 0 && renderTemplate`<div class="rounded-lg border border-gray-200 bg-white py-10 text-center"> <h3 class="mb-2 text-lg font-medium text-gray-700">
No courses available yet
</h3> <p class="text-sm text-gray-500">
We're working on creating premium courses for this roadmap.
                Check back soon!
</p> </div>`} </div> </div> </div> ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/[roadmapId]/courses.astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/[roadmapId]/courses.astro";
const $$url = "/[roadmapId]/courses";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Courses,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
