import { f as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { c as cn, h as httpGet, $ as $$BaseLayout } from '../chunks/BaseLayout_DetAB5fP.mjs';
import { Filter, X } from 'lucide-react';
import { g as getUrlParams, d as deleteUrlParam, s as setUrlParams } from '../chunks/use-toast_BT3OoCi0.mjs';
import { M as MarkFavorite } from '../chunks/MarkFavorite_CJJTTTVO.mjs';
import { i as isLoggedIn } from '../chunks/jwt_ZAvcheRY.mjs';
import { s as showLoginPopup } from '../chunks/popup_DWUkHIfQ.mjs';
import { $ as $$ChangelogBanner } from '../chunks/ChangelogBanner_C-UEhkmG.mjs';
export { renderers } from '../renderers.mjs';

function CategoryFilterButton(props) {
  const { category, selected, onClick } = props;
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: cn(
        "border-b bg-linear-to-l py-1.5 pr-3 text-center text-sm text-gray-500 hover:text-gray-900 sm:text-right",
        {
          "from-white font-semibold text-gray-900": selected && category !== "All Roadmaps",
          "font-semibold text-gray-900": selected && category === "All Roadmaps",
          "hover:from-white": category !== "All Roadmaps"
        }
      ),
      type: "button",
      onClick,
      children: category
    }
  );
}

function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  return isMounted;
}

function RoadmapCard(props) {
  const { roadmap } = props;
  const isMounted = useIsMounted();
  return /* @__PURE__ */ jsxs(
    "a",
    {
      className: "relative rounded-md border bg-white px-3 py-2 text-left text-sm shadow-xs transition-all hover:border-gray-300 hover:bg-gray-50",
      href: roadmap.link,
      children: [
        roadmap.title,
        isMounted && /* @__PURE__ */ jsx(
          MarkFavorite,
          {
            resourceId: roadmap.link.split("/").pop(),
            resourceType: "roadmap",
            className: "data-[is-favorite=true]:opacity-35"
          }
        )
      ]
    },
    roadmap.link
  );
}

const groups = [
  {
    group: "Absolute Beginners",
    roadmaps: [
      {
        title: "Frontend Beginner",
        link: "/frontend?r=frontend-beginner",
        type: "role",
        otherGroups: ["Web Development"]
      },
      {
        title: "Backend Beginner",
        link: "/backend?r=backend-beginner",
        type: "role",
        otherGroups: ["Web Development"]
      },
      {
        title: "DevOps Beginner",
        link: "/devops?r=devops-beginner",
        type: "role",
        otherGroups: ["Web Development"]
      }
    ]
  },
  {
    group: "Web Development",
    roadmaps: [
      {
        title: "Frontend",
        link: "/frontend",
        type: "role",
        otherGroups: ["Web Development"]
      },
      {
        title: "Backend",
        link: "/backend",
        type: "role",
        otherGroups: ["Web Development"]
      },
      {
        title: "Full Stack",
        link: "/full-stack",
        type: "role",
        otherGroups: ["Web Development", "Absolute Beginners"]
      },
      {
        title: "API Design",
        link: "/api-design",
        type: "role",
        otherGroups: ["Web Development"]
      },
      {
        title: "QA",
        link: "/qa",
        type: "role"
      },
      {
        title: "GraphQL",
        link: "/graphql",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Git and GitHub",
        link: "/git-github",
        type: "skill",
        otherGroups: ["Web Development", "DevOps"]
      }
    ]
  },
  {
    group: "Frameworks",
    roadmaps: [
      {
        title: "React",
        link: "/react",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Vue",
        link: "/vue",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Angular",
        link: "/angular",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Next.js",
        link: "/nextjs",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Spring Boot",
        link: "/spring-boot",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "ASP.NET Core",
        link: "/aspnet-core",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Laravel",
        link: "/laravel",
        type: "skill",
        otherGroups: ["Web Development"]
      }
    ]
  },
  {
    group: "Languages / Platforms",
    roadmaps: [
      {
        title: "HTML",
        link: "/html",
        type: "skill",
        otherGroups: ["Web Development", "Absolute Beginners"]
      },
      {
        title: "CSS",
        link: "/css",
        type: "skill",
        otherGroups: ["Web Development", "Absolute Beginners"]
      },
      {
        title: "JavaScript",
        link: "/javascript",
        type: "skill",
        otherGroups: [
          "Web Development",
          "DevOps",
          "Mobile Development",
          "Absolute Beginners"
        ]
      },
      {
        title: "Kotlin",
        link: "/kotlin",
        type: "skill",
        otherGroups: ["Web Development", "DevOps", "Mobile Development"]
      },
      {
        title: "Swift & Swift-UI",
        link: "/swift-ui",
        type: "skill",
        otherGroups: ["Mobile Development"]
      },
      {
        title: "TypeScript",
        link: "/typescript",
        type: "skill",
        otherGroups: ["Web Development", "Mobile Development"]
      },
      {
        title: "Node.js",
        link: "/nodejs",
        type: "skill",
        otherGroups: ["Web Development", "DevOps", "Absolute Beginners"]
      },
      {
        title: "PHP",
        link: "/php",
        type: "skill",
        otherGroups: ["Web Development", "DevOps", "Absolute Beginners"]
      },
      {
        title: "C++",
        link: "/cpp",
        type: "skill"
      },
      {
        title: "Go",
        link: "/golang",
        type: "skill",
        otherGroups: ["Web Development", "DevOps", "Absolute Beginners"]
      },
      {
        title: "Rust",
        link: "/rust",
        type: "skill",
        otherGroups: ["Web Development", "DevOps"]
      },
      {
        title: "Python",
        link: "/python",
        type: "skill",
        otherGroups: ["Web Development", "DevOps"]
      },
      {
        title: "Java",
        link: "/java",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "SQL",
        link: "/sql",
        type: "skill",
        otherGroups: ["Web Development", "Databases", "DevOps"]
      },
      {
        title: "Shell / Bash",
        link: "/shell-bash",
        type: "skill",
        otherGroups: ["Web Development", "DevOps"]
      }
    ]
  },
  {
    group: "DevOps",
    roadmaps: [
      {
        title: "DevOps",
        link: "/devops",
        type: "role",
        otherGroups: ["Web Development"]
      },
      {
        title: "Docker",
        link: "/docker",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Kubernetes",
        link: "/kubernetes",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "AWS",
        link: "/aws",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Cloudflare",
        link: "/cloudflare",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Linux",
        link: "/linux",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Terraform",
        link: "/terraform",
        type: "skill",
        otherGroups: ["Web Development"]
      }
    ]
  },
  {
    group: "Mobile Development",
    roadmaps: [
      {
        title: "Android",
        link: "/android",
        type: "role"
      },
      {
        title: "iOS",
        link: "/ios",
        type: "role"
      },
      {
        title: "React Native",
        link: "/react-native",
        type: "skill"
      },
      {
        title: "Flutter",
        link: "/flutter",
        type: "skill"
      }
    ]
  },
  {
    group: "Databases",
    roadmaps: [
      {
        title: "PostgreSQL",
        link: "/postgresql-dba",
        type: "role",
        otherGroups: ["Web Development"]
      },
      {
        title: "MongoDB",
        link: "/mongodb",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Redis",
        link: "/redis",
        type: "skill",
        otherGroups: ["Web Development"]
      }
    ]
  },
  {
    group: "Computer Science",
    roadmaps: [
      {
        title: "Computer Science",
        link: "/computer-science",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Data Structures",
        link: "/datastructures-and-algorithms",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "System Design",
        link: "/system-design",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Design and Architecture",
        link: "/software-design-architecture",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Software Architect",
        link: "/software-architect",
        type: "role",
        otherGroups: ["Web Development"]
      },
      {
        title: "Code Review",
        link: "/code-review",
        type: "skill",
        otherGroups: ["Web Development"]
      },
      {
        title: "Technical Writer",
        link: "/technical-writer",
        type: "role"
      },
      {
        title: "DevRel Engineer",
        link: "/devrel",
        type: "role"
      }
    ]
  },
  {
    group: "Machine Learning",
    roadmaps: [
      {
        title: "Machine Learning",
        link: "/machine-learning",
        type: "role"
      },
      {
        title: "AI and Data Scientist",
        link: "/ai-data-scientist",
        type: "role"
      },
      {
        title: "AI Engineer",
        link: "/ai-engineer",
        type: "role"
      },
      {
        title: "AI Agents",
        link: "/ai-agents",
        type: "role"
      },
      {
        title: "AI Red Teaming",
        link: "/ai-red-teaming",
        type: "skill"
      },
      {
        title: "Data Analyst",
        link: "/data-analyst",
        type: "role"
      },
      {
        title: "BI Analyst",
        link: "/bi-analyst",
        type: "role"
      },
      {
        title: "Data Engineer",
        link: "/data-engineer",
        type: "role"
      },
      {
        title: "MLOps",
        link: "/mlops",
        type: "role"
      },
      {
        title: "Prompt Engineering",
        link: "/prompt-engineering",
        type: "skill"
      }
    ]
  },
  {
    group: "Management",
    roadmaps: [
      {
        title: "Product Manager",
        link: "/product-manager",
        type: "role"
      },
      {
        title: "Engineering Manager",
        link: "/engineering-manager",
        type: "role"
      }
    ]
  },
  {
    group: "Game Development",
    roadmaps: [
      {
        title: "Client Side Game Dev.",
        link: "/game-developer",
        type: "role"
      },
      {
        title: "Server Side Game Dev.",
        link: "/server-side-game-developer",
        type: "role"
      }
    ]
  },
  {
    group: "Design",
    roadmaps: [
      {
        title: "UX Design",
        link: "/ux-design",
        type: "role"
      },
      {
        title: "Design System",
        link: "/design-system",
        type: "skill",
        otherGroups: ["Web Development"]
      }
    ]
  },
  {
    group: "Blockchain",
    roadmaps: [
      {
        title: "Blockchain",
        link: "/blockchain",
        type: "role"
      }
    ]
  },
  {
    group: "Cyber Security",
    roadmaps: [
      {
        title: "Cyber Security",
        link: "/cyber-security",
        type: "role"
      }
    ]
  },
  {
    group: "Best Practices",
    roadmaps: [
      {
        title: "Backend Performance",
        link: "/backend-performance-best-practices",
        type: "best-practice",
        otherGroups: ["Web Development"]
      },
      {
        title: "Frontend Performance",
        link: "/frontend-performance-best-practices",
        type: "best-practice",
        otherGroups: ["Web Development"]
      },
      {
        title: "Code Review",
        link: "/code-review-best-practices",
        type: "best-practice",
        otherGroups: ["Web Development"]
      },
      {
        title: "AWS",
        link: "/aws-best-practices",
        type: "best-practice",
        otherGroups: ["Web Development", "DevOps"]
      },
      {
        title: "API Security",
        link: "/api-security-best-practices",
        type: "best-practice",
        otherGroups: ["Web Development"]
      }
    ]
  }
];
const roleRoadmaps = groups.flatMap(
  (group) => group.roadmaps.filter((roadmap) => roadmap.type === "role")
);
const skillRoadmaps = groups.flatMap(
  (group) => group.roadmaps.filter((roadmap) => roadmap.type === "skill")
);
const bestPracticeRoadmaps = groups.flatMap(
  (group) => group.roadmaps.filter((roadmap) => roadmap.type === "best-practice")
);
const allGroups = [
  {
    group: "Role Based Roadmaps",
    roadmaps: roleRoadmaps
  },
  {
    group: "Skill Based Roadmaps",
    roadmaps: skillRoadmaps
  },
  {
    group: "Best Practices",
    roadmaps: bestPracticeRoadmaps
  }
];
function RoadmapsPage() {
  const [activeGroup, setActiveGroup] = useState("");
  const [visibleGroups, setVisibleGroups] = useState(allGroups);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(() => {
    if (!activeGroup) {
      setVisibleGroups(allGroups);
      return;
    }
    const group = groups.find((group2) => group2.group === activeGroup);
    if (!group) {
      return;
    }
    const otherGroups = groups.filter((g) => {
      return g.group !== group.group && g.roadmaps.some((roadmap) => {
        return roadmap.otherGroups?.includes(group.group);
      });
    });
    setVisibleGroups([
      group,
      ...otherGroups.map((g) => ({
        ...g,
        roadmaps: g.roadmaps.filter(
          (roadmap) => roadmap.otherGroups?.includes(group.group)
        )
      }))
    ]);
  }, [activeGroup]);
  async function loadProgress() {
    const { response: progressList, error } = await httpGet(
      `${undefined                              }/v1-get-hero-roadmaps`
    );
    if (error || !progressList) {
      return;
    }
    progressList?.forEach((progress) => {
      window.dispatchEvent(
        new CustomEvent("mark-favorite", {
          detail: {
            resourceId: progress.resourceId,
            resourceType: progress.resourceType,
            isFavorite: progress.isFavorite
          }
        })
      );
    });
  }
  useEffect(() => {
    if (!isLoggedIn()) {
      return;
    }
    loadProgress().finally(() => {
    });
  }, []);
  useEffect(() => {
    const { g } = getUrlParams();
    if (!g) {
      return;
    }
    setActiveGroup(g);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "border-t bg-gray-100", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          setIsFilterOpen(!isFilterOpen);
        },
        id: "filter-button",
        className: cn(
          "-mt-1 flex w-full items-center justify-center bg-gray-300 py-2 text-sm text-black focus:shadow-none focus:outline-0 sm:hidden",
          {
            "mb-3": !isFilterOpen
          }
        ),
        children: [
          !isFilterOpen && /* @__PURE__ */ jsx(Filter, { size: 13, className: "mr-1" }),
          isFilterOpen && /* @__PURE__ */ jsx(X, { size: 13, className: "mr-1" }),
          "Categories"
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative container flex flex-col gap-4 sm:flex-row", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "hidden w-full flex-col from-gray-100 sm:w-[180px] sm:border-r sm:bg-linear-to-l sm:pt-6",
            {
              "hidden sm:flex": !isFilterOpen,
              "z-50 flex": isFilterOpen
            }
          ),
          children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 -mx-4 w-full bg-white pb-0 shadow-xl sm:sticky sm:top-10 sm:mx-0 sm:bg-transparent sm:pb-20 sm:shadow-none", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1", children: [
            /* @__PURE__ */ jsx(
              CategoryFilterButton,
              {
                onClick: () => {
                  setActiveGroup("");
                  setIsFilterOpen(false);
                  deleteUrlParam("g");
                },
                category: "All Roadmaps",
                selected: activeGroup === ""
              }
            ),
            groups.map((group) => /* @__PURE__ */ jsx(
              CategoryFilterButton,
              {
                onClick: () => {
                  setActiveGroup(group.group);
                  setIsFilterOpen(false);
                  document?.getElementById("filter-button")?.scrollIntoView();
                  setUrlParams({ g: group.group });
                },
                category: group.group,
                selected: activeGroup === group.group
              },
              group.group
            ))
          ] }) })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex grow flex-col gap-6 pt-2 pb-20 sm:pt-8", children: visibleGroups.map((group) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xs tracking-wide text-gray-400 uppercase", children: group.group }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3", children: group.roadmaps.map((roadmap) => /* @__PURE__ */ jsx(RoadmapCard, { roadmap }, roadmap.link)) })
      ] }, `${group.group}-${group.roadmaps.length}`)) })
    ] })
  ] });
}

function RoadmapsPageHeader() {
  return /* @__PURE__ */ jsx("div", { className: "bg-white py-3 sm:py-12", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start bg-white sm:items-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold sm:text-5xl", children: "Developer Roadmaps" }),
    /* @__PURE__ */ jsx("p", { className: "mb-3 mt-1 text-sm sm:my-3 sm:text-lg", children: "Browse the ever-growing list of up-to-date, community driven roadmaps" }),
    /* @__PURE__ */ jsxs("p", { className: "mb-3 flex w-full flex-col gap-1.5 sm:mb-0 sm:w-auto sm:flex-row sm:gap-3", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "inline-block rounded-md bg-black px-3.5 py-2 text-sm text-white sm:py-1.5 sm:text-base",
          href: "https://draw.roadmap.sh",
          onClick: (e) => {
            if (!isLoggedIn()) {
              e.preventDefault();
              showLoginPopup();
            }
          },
          children: "Draw your own roadmap"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "inline-block rounded-md bg-gray-300 px-3.5 py-2 text-sm text-black sm:py-1.5 sm:text-base",
          href: "https://roadmap.sh/ai",
          onClick: (e) => {
            if (!isLoggedIn()) {
              e.preventDefault();
              showLoginPopup();
            }
          },
          children: "Generate Roadmaps with AI"
        }
      )
    ] })
  ] }) }) });
}

const $$Roadmaps = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Developer Roadmaps", "description": "Step by step guides and paths to learn different tools or technologies", "permalink": "/roadmaps" }, { "changelog-banner": ($$result2) => renderTemplate`${renderComponent($$result2, "ChangelogBanner", $$ChangelogBanner, { "slot": "changelog-banner" })}`, "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "RoadmapsPageHeader", RoadmapsPageHeader, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/Roadmaps/RoadmapsPageHeader", "client:component-export": "RoadmapsPageHeader" })} ${renderComponent($$result2, "RoadmapsPage", RoadmapsPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/Roadmaps/RoadmapsPage", "client:component-export": "RoadmapsPage" })}  ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/roadmaps.astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/roadmaps.astro";
const $$url = "/roadmaps";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Roadmaps,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
