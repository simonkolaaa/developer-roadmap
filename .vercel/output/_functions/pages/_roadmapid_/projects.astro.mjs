import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { $ as $$RoadmapHeader } from '../../chunks/RoadmapHeader_Bd2hRXny.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { FolderKanbanIcon, Bell, Check, Users, Trash2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { c as cn, e as httpPost, $ as $$BaseLayout } from '../../chunks/BaseLayout_DetAB5fP.mjs';
import { i as isLoggedIn } from '../../chunks/jwt_ZAvcheRY.mjs';
import { s as showLoginPopup } from '../../chunks/popup_DWUkHIfQ.mjs';
import { f as formatCommaNumber } from '../../chunks/number_D99vRsz6.mjs';
import { g as getUrlParams, s as setUrlParams, d as deleteUrlParam } from '../../chunks/use-toast_BT3OoCi0.mjs';
import { a as allowedOfficialProjectDifficulty, l as listOfficialProjects } from '../../chunks/official-project_D9TvOAl7.mjs';
import { g as getOpenGraphImageUrl } from '../../chunks/open-graph_CUrL1jUv.mjs';
import { a as api } from '../../chunks/api_BzJCsl49.mjs';
import { o as officialRoadmapDetails } from '../../chunks/official-roadmap_piILD0GP.mjs';
export { renderers } from '../../renderers.mjs';

function EmptyProjects() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsSubscribed(isLoggedIn());
    setIsLoading(false);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "relative mt-2.5 mb-5 flex min-h-[400px] flex-col items-center justify-center rounded-lg border bg-white", children: [
    /* @__PURE__ */ jsx(FolderKanbanIcon, { className: "h-14 w-14 text-gray-300", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsxs("h2", { className: "mb-0.5 mt-2 text-center text-base font-medium text-gray-900 sm:text-xl", children: [
      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Projects are coming soon!" }),
      /* @__PURE__ */ jsx("span", { className: "inline sm:hidden", children: "Coming soon!" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-3 text-balance text-center text-sm text-gray-500 sm:text-base", children: "Sign up to get notified when projects are available." }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          if (isSubscribed) {
            return;
          }
          showLoginPopup();
        },
        className: cn(
          "flex items-center rounded-md bg-gray-800 py-1.5 pl-3 pr-4 text-xs text-white opacity-0 transition-opacity duration-500 hover:bg-black sm:text-sm",
          {
            "cursor-default bg-gray-300 text-black hover:bg-gray-300": isSubscribed,
            "opacity-100": !isLoading
          }
        ),
        children: [
          !isSubscribed && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Bell, { className: "mr-2 h-4 w-4" }),
            "Signup to get Notified"
          ] }),
          isSubscribed && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Check, { className: "mr-2 h-4 w-4" }),
            "We will notify you by email"
          ] })
        ]
      }
    )
  ] });
}

function Badge(type) {
  const { variant, text } = type;
  const colors = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    green: "bg-green-100 text-green-700 border-green-200",
    red: "bg-red-100 text-red-700 border-red-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    grey: "bg-gray-100 text-gray-700 border-gray-200",
    white: "bg-white text-black border-gray-200",
    teal: "bg-teal-100 text-teal-700 border-teal-200",
    black: "bg-gray-500 text-white border-gray-500"
  };
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `rounded-md border capitalize ${colors[variant]} px-1 py-0.5 text-xs tracking-wide`,
      children: text
    }
  );
}

const badgeVariants = {
  beginner: "yellow",
  intermediate: "green",
  advanced: "blue"
};
function ProjectCard(props) {
  const { project, userCount = 0, status } = props;
  const { difficulty, title, description, slug, topics = [] } = project;
  const isLoadingStatus = status === void 0;
  const userStartedCount = status !== "none" && userCount === 0 ? userCount + 1 : userCount;
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: `/projects/${slug}`,
      className: "flex flex-col rounded-md border bg-white p-3 transition-colors hover:border-gray-300 hover:bg-gray-50",
      children: [
        /* @__PURE__ */ jsxs("span", { className: "flex justify-between gap-1.5", children: [
          /* @__PURE__ */ jsx(Badge, { variant: badgeVariants[difficulty], text: difficulty }),
          topics?.map((topic, index) => /* @__PURE__ */ jsx(Badge, { variant: "grey", text: topic }, `${topic}-${index}`))
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "my-3 flex min-h-[100px] flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "mb-1 font-medium", children: title }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: description })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "flex min-h-[22px] items-center justify-between gap-2 text-xs text-gray-400", children: isLoadingStatus ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "h-5 w-24 animate-pulse rounded-sm bg-gray-200" }),
          " ",
          /* @__PURE__ */ jsx("span", { className: "h-5 w-20 animate-pulse rounded-sm bg-gray-200" }),
          " "
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Users, { className: "size-3.5" }),
            userStartedCount > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              formatCommaNumber(userStartedCount),
              " Started"
            ] }) : /* @__PURE__ */ jsx(Fragment, { children: "Be the first to solve!" })
          ] }),
          status !== "none" && /* @__PURE__ */ jsxs(
            "span",
            {
              className: cn(
                "flex items-center gap-1.5 rounded-full border border-current px-2 py-0.5 capitalize",
                status === "completed" && "text-green-500",
                status === "started" && "text-yellow-500"
              ),
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cn("inline-block h-2 w-2 rounded-full", {
                      "bg-green-500": status === "completed",
                      "bg-yellow-500": status === "started"
                    })
                  }
                ),
                status
              ]
            }
          )
        ] }) })
      ]
    }
  );
}

function DifficultyButton(props) {
  const { difficulty, onClick, isActive } = props;
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      className: cn(
        "rounded-md border bg-white px-3 py-1 text-sm capitalize transition-colors hover:border-gray-300 hover:bg-gray-100",
        {
          "border-black bg-gray-100 hover:border-black hover:bg-gray-100 hover:text-black": isActive
        }
      ),
      children: difficulty
    }
  );
}
function ProjectsList(props) {
  const { projects, userCounts } = props;
  const { difficulty: urlDifficulty } = getUrlParams();
  const [difficulty, setDifficulty] = useState(urlDifficulty);
  const [projectStatuses, setProjectStatuses] = useState();
  const loadProjectStatuses = async () => {
    if (!isLoggedIn()) {
      setProjectStatuses({});
      return;
    }
    const projectIds = projects.map((project) => project.slug);
    const { response, error } = await httpPost(
      `${undefined                              }/v1-list-project-statuses`,
      {
        projectIds
      }
    );
    if (error || !response) {
      console.error(error);
      return;
    }
    setProjectStatuses(response);
  };
  const projectsByDifficulty = useMemo(() => {
    const result = /* @__PURE__ */ new Map();
    for (const project of projects) {
      const difficulty2 = project.difficulty;
      if (!result.has(difficulty2)) {
        result.set(difficulty2, []);
      }
      result.get(difficulty2)?.push(project);
    }
    return result;
  }, [projects]);
  const matchingProjects = difficulty ? projectsByDifficulty.get(difficulty) || [] : projects;
  useEffect(() => {
    loadProjectStatuses().finally();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "my-2.5 flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1", children: [
      allowedOfficialProjectDifficulty.map((projectDifficulty) => /* @__PURE__ */ jsx(
        DifficultyButton,
        {
          onClick: () => {
            setDifficulty(projectDifficulty);
            setUrlParams({ difficulty: projectDifficulty });
          },
          difficulty: projectDifficulty,
          isActive: projectDifficulty === difficulty
        },
        projectDifficulty
      )),
      difficulty && /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            setDifficulty(void 0);
            deleteUrlParam("difficulty");
          },
          className: "flex items-center gap-1.5 rounded-md border border-red-500 bg-transparent px-2 py-0.5 text-sm text-red-500 transition-colors hover:bg-red-500 hover:text-white",
          children: [
            /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5", strokeWidth: 2.25 }),
            "Clear"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-24 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3", children: [
      matchingProjects.length === 0 && /* @__PURE__ */ jsx("div", { className: "col-span-3 rounded-md border bg-white p-4 text-left text-sm text-gray-500", children: /* @__PURE__ */ jsx("p", { children: "No matching projects found." }) }),
      matchingProjects.sort((project) => {
        return project.difficulty === "beginner" ? -1 : project.difficulty === "intermediate" ? 0 : 1;
      }).sort((a, b) => {
        return a.order - b.order;
      }).map((matchingProject) => {
        const count = userCounts[matchingProject?.slug] || 0;
        return /* @__PURE__ */ jsx(
          ProjectCard,
          {
            project: matchingProject,
            userCount: count,
            status: projectStatuses ? projectStatuses?.[matchingProject.slug] || "none" : void 0
          },
          matchingProject.slug
        );
      })
    ] })
  ] });
}

function projectApi(context) {
  return {
    listProjectsUserCount: async function(projectIds) {
      return api(context).post(
        `${undefined                              }/v1-list-projects-user-count`,
        {
          projectIds
        }
      );
    }
  };
}

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const prerender = false;
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Projects;
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
  const title = `${roadmapData.title.card} Projects`;
  const description = `Project ideas to take you from beginner to advanced in ${descriptionNoun[roadmapData.title.card] || roadmapData.title.card}`;
  const seoTitle = `${roadmapData.title.card} Projects`;
  const nounTitle = descriptionNoun[roadmapData?.title.card] || roadmapData.title.card;
  const seoDescription = `Seeking ${nounTitle.toLowerCase()} projects to enhance your skills? Explore our top 20 project ideas, from simple apps to complex systems. Start building today!`;
  const projects = await listOfficialProjects({ roadmapId });
  const projectIds = projects.map((project) => project.slug);
  const projectApiClient = projectApi(Astro2);
  const { response: userCounts } = await projectApiClient.listProjectsUserCount(projectIds);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "permalink": `/${roadmapId}/projects`, "title": seoTitle, "description": seoDescription, "briefTitle": roadmapData.title.card, "ogImageUrl": ogImageUrl, "keywords": roadmapData.seo.keywords, "noIndex": projects.length === 0, "resourceId": roadmapId, "resourceType": "roadmap" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-gray-50"> ${renderComponent($$result2, "RoadmapHeader", $$RoadmapHeader, { "title": title, "description": description, "partner": roadmapData.partner, "roadmapId": roadmapId, "isForkable": true, "activeTab": "projects", "projectCount": projects.length, "coursesCount": roadmapData.courses?.length || 0, "hasAIChat": true })} <div class="container"> ${projects.length === 0 && renderTemplate`${renderComponent($$result2, "EmptyProjects", EmptyProjects, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/Projects/EmptyProjects", "client:component-export": "EmptyProjects" })}`} ${projects.length > 0 && renderTemplate`${renderComponent($$result2, "ProjectsList", ProjectsList, { "projects": projects, "userCounts": userCounts || {}, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/Projects/ProjectsList", "client:component-export": "ProjectsList" })}`} </div> </div> ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/[roadmapId]/projects.astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/[roadmapId]/projects.astro";
const $$url = "/[roadmapId]/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
