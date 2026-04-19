import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { ExternalLink, Bot, MessageCircle, Globe2, ServerCog, GraduationCap, Blocks, Braces, Server, Smartphone, MessageCircleCode, Shield, SquareKanban, UsersRound, ShieldHalf, Workflow, Coins, Gamepad2, PenSquare, Megaphone, FolderKanban, Component, GitBranch, Waypoints, CheckSquare } from 'lucide-react';
import { $ as $$ChangelogBanner } from '../chunks/ChangelogBanner_C-UEhkmG.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DetAB5fP.mjs';
export { renderers } from '../renderers.mjs';

function RoadmapCard(props) {
  const {
    isUpcoming,
    link,
    title,
    description,
    icon: Icon,
    icon2: Icon2
  } = props;
  if (isUpcoming) {
    return /* @__PURE__ */ jsxs("div", { className: "group relative block rounded-xl border border-gray-300 bg-linear-to-br from-gray-100 to-gray-50 p-5 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-2 sm:mb-5 flex flex-row items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-900 text-white", children: /* @__PURE__ */ jsx(Icon, { className: "h-3 sm:h-5" }) }),
        Icon2 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "mx-2 text-gray-400", children: "+" }),
          /* @__PURE__ */ jsx("div", { className: "flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-900 text-white", children: /* @__PURE__ */ jsx(Icon2, { className: "h-3 sm:h-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "mb-0.5 block text-lg sm:text-xl font-semibold sm:mb-2", children: title }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: description }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-gray-100/70", children: /* @__PURE__ */ jsx("span", { className: "text-sm bg-black rounded-lg text-white font-semibold py-1 px-2 -rotate-45 transform", children: "Coming soon" }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: link,
      target: "_blank",
      className: "group relative block rounded-xl border border-gray-300 bg-linear-to-br from-gray-100 to-gray-50\r\n       p-3.5 sm:p-5 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:border-black/30 hover:bg-gray-50/70 hover:shadow-xs",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-2 sm:mb-5 flex flex-row items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-900 text-white", children: /* @__PURE__ */ jsx(Icon, { className: "h-4 sm:h-5" }) }),
          Icon2 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "mx-2 text-gray-400", children: "+" }),
            /* @__PURE__ */ jsx("div", { className: "flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-900 text-white", children: /* @__PURE__ */ jsx(Icon2, { className: "h-4 sm:h-5" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(ExternalLink, { className: "lucide lucide-external-link absolute right-2 top-2 h-4 text-gray-300 transition group-hover:text-gray-700" }),
        /* @__PURE__ */ jsx("span", { className: "mb-0 block text-lg sm:text-xl font-semibold sm:mb-2", children: title }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: description })
      ]
    }
  );
}

function RoadmapMultiCard(props) {
  const { roadmaps, description, secondaryRoadmaps, secondaryDescription } = props;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-linear-to-br from-gray-100\r\n       to-gray-50 ease-in-out",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col divide-y", children: roadmaps.map((roadmap, index) => /* @__PURE__ */ jsxs(
          "a",
          {
            target: "_blank",
            href: roadmap.link,
            className: "group text-sm sm:text-base flex w-full items-center justify-between gap-2 bg-linear-to-br from-gray-100 to-gray-50 px-4 sm:px-5 py-2 transition-colors duration-200",
            children: [
              roadmap.title,
              /* @__PURE__ */ jsx(ExternalLink, { className: "lucide lucide-external-link h-4 text-gray-300 transition group-hover:text-gray-700" })
            ]
          },
          index
        )) }),
        /* @__PURE__ */ jsx("p", { className: "grow bg-gray-200/70 p-4 sm:p-5 text-sm text-gray-500", children: description }),
        secondaryRoadmaps && /* @__PURE__ */ jsx("div", { className: "flex flex-col divide-y", children: secondaryRoadmaps.map((roadmap, index) => /* @__PURE__ */ jsxs(
          "a",
          {
            target: "_blank",
            href: roadmap.link,
            className: "group text-sm sm:text-base flex w-full items-center justify-between gap-2 bg-linear-to-br from-gray-100 to-gray-50 px-5 py-2 transition-colors duration-200",
            children: [
              roadmap.title,
              /* @__PURE__ */ jsx(ExternalLink, { className: "lucide lucide-external-link h-4 text-gray-300 transition group-hover:text-gray-700" })
            ]
          },
          index
        )) }),
        secondaryDescription && /* @__PURE__ */ jsx("p", { className: "grow bg-gray-200/70 p-4 sm:p-5 text-sm text-gray-500", children: secondaryDescription })
      ]
    }
  );
}

function SectionBadge(props) {
  const { title } = props;
  return /* @__PURE__ */ jsx("span", { className: "rounded-full bg-black px-3 py-1 text-sm text-white", children: title });
}

function RoleRoadmaps(props) {
  const { badge, title, description, children } = props;
  return /* @__PURE__ */ jsx("div", { className: "bg-linear-to-b from-gray-100 to-white py-5 sm:py-8 md:py-12", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("div", { className: "text-left", children: /* @__PURE__ */ jsx(SectionBadge, { title: badge }) }),
    /* @__PURE__ */ jsxs("div", { className: "my-4 sm:my-7 text-left", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-1 text-balance text-xl sm:text-3xl font-semibold", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-500", children: description }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 sm:mt-7 grid sm:grid-cols-2 md:grid-cols-3 gap-3", children })
    ] })
  ] }) });
}

function TipItem(props) {
  const { title, description } = props;
  const [isToggled, setIsToggled] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    !isToggled && /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => setIsToggled(true),
        className: "cursor-pointer rounded-lg sm:rounded-xl bg-black px-3 py-2 text-sm sm:text-base text-white",
        children: title
      }
    ),
    isToggled && /* @__PURE__ */ jsx(
      "p",
      {
        className: "rounded-lg sm:rounded-xl bg-gray-200 px-3 py-2 text-black text-sm sm:text-base",
        children: description
      }
    )
  ] });
}

const $$GetStarted = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Developer Roadmaps", "description": "Step by step guides and paths to learn different tools or technologies", "permalink": "/get-started" }, { "changelog-banner": ($$result2) => renderTemplate`${renderComponent($$result2, "ChangelogBanner", $$ChangelogBanner, { "slot": "changelog-banner" })}`, "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="border-b bg-linear-to-b from-gray-200 to-white py-12 sm:py-16"> <div class="container"> <div class="max-w-3xl"> ${renderComponent($$result2, "Bot", Bot, { "className": "mb-4 size-8 text-black sm:size-12" })} <h2 class="mb-3 text-2xl font-bold text-black sm:text-3xl">
Get AI-Powered Learning Guidance
</h2> <p class="mb-6 text-sm text-gray-600 sm:text-base">
Our AI Tutor analyzes your experience, suggests relevant roadmaps, and
          provides detailed answers to help you progress in your tech career.
</p> <a href="/ai/chat" class="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-80 sm:px-6 sm:py-3 sm:text-base"> ${renderComponent($$result2, "MessageCircle", MessageCircle, { "className": "size-3 fill-current sm:size-5" })}
Chat with AI Tutor
</a> </div> </div> </div> <div class="bg-linear-to-b from-gray-200 to-white py-4 sm:py-8 md:py-12"> <div class="container"> <div class="text-left"> ${renderComponent($$result2, "SectionBadge", SectionBadge, { "title": "Beginner Roadmaps" })} </div> <div class="my-3 text-left md:my-5"> <h2 class="mb-0 text-xl font-semibold sm:mb-1 sm:text-3xl">
Are you an Absolute beginner?
</h2> <p class="text-sm text-gray-500 sm:text-base">
Here are some beginner friendly roadmaps you should start with.
</p> </div> <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3"> ${renderComponent($$result2, "RoadmapCard", RoadmapCard, { "icon": Globe2, "title": "Frontend Developer", "link": "/frontend?r=frontend-beginner", "description": "Develop the part of web apps that users interact with i.e. things rendered in the browser." })} ${renderComponent($$result2, "RoadmapCard", RoadmapCard, { "icon": ServerCog, "title": "Backend Developer", "link": "/backend?r=backend-beginner", "description": "Develop the part hidden from the user e.g. things like APIs, databases, search engines etc." })} ${renderComponent($$result2, "RoadmapCard", RoadmapCard, { "icon": Globe2, "icon2": ServerCog, "title": "Full Stack Developer", "link": "/full-stack", "description": "Develop both the frontend and backend side of the web apps i.e. the whole development stack." })} </div> <p class="my-4 text-sm sm:my-7 sm:text-base">
There is also a <a target="_blank" class="font-medium underline underline-offset-2" href="/devops?r=devops-beginner">beginner DevOps roadmap</a> which requires you to have some backend knowledge and entails a lot of
        operations work i.e. deploying, scaling, monitoring, and maintaining applications.
</p> <div class="rounded-xl border bg-white p-3 sm:p-4"> <h2 class="mb-0 text-lg font-semibold sm:mb-1 sm:text-xl">
Tips for Beginners
</h2> <p class="text-sm sm:text-base">
Learning to code can be overwhelming, here are some tips to help you
          get started:
</p> <div class="mt-3 flex flex-col gap-1"> ${renderComponent($$result2, "TipItem", TipItem, { "title": "Avoid Tutorial Hell", "description": "Don't get stuck in tutorial hell. It's easy to get caught up in tutorials and never actually build anything. Tutorials are great for learning, but the best way to learn is by doing. An example of this is to watch a project-based tutorial, code along with the instructor. After finishing the tutorial, try to build the same project from scratch without the tutorial (if you can't, it's okay to go back to the tutorial). Repeat this process until you can build the project without the tutorial. After that, try to add new features to the project or build something similar from scratch.", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/GetStarted/TipItem", "client:component-export": "TipItem" })} ${renderComponent($$result2, "TipItem", TipItem, { "title": "Consistent study habits", "description": "Commit to regular, consistent study sessions. It's better to study for 30 minutes every day than to cram for 10 hours once a week.", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/GetStarted/TipItem", "client:component-export": "TipItem" })} ${renderComponent($$result2, "TipItem", TipItem, { "title": "Set a clear goal", "description": "Establish a clear, significant goal that motivates you. It could be building a company, an app, a website, or anything that personally resonates with you.", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/GetStarted/TipItem", "client:component-export": "TipItem" })} ${renderComponent($$result2, "TipItem", TipItem, { "title": "Embrace the marathon mindset", "description": "You will feel lost in the beginning. Avoid comparing yourself to others; everyone progresses at their own pace. Understand that challenges are part of the journey, and it's okay to take your time.", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/GetStarted/TipItem", "client:component-export": "TipItem" })} ${renderComponent($$result2, "TipItem", TipItem, { "title": "Build projects", "description": "The best way to learn is by doing. Start building projects as soon as possible. It's okay if they're simple at first; the goal is to learn and improve. Build upon code-alongs and tutorials to create your projects and learn through hands-on experience", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/GetStarted/TipItem", "client:component-export": "TipItem" })} ${renderComponent($$result2, "TipItem", TipItem, { "title": "Learn to get unstuck", "description": "Once you start learning to code, you're going to run into problems that you don't know how to solve. This is normal and part of the process. You don't really learn unless you struggle through it. That said, you won't always be able to move forward without some help. So how do you find that help? First off, forget books. They aren't a great place to start here, because the number and types of errors they can cover is so small. Online is the easiest place to find help. Most devs look for solutions on StackOverflow or just google the error message (if they have one). Other solutions are to find newsgroups or forums dedicated to the language you're using.", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/GetStarted/TipItem", "client:component-export": "TipItem" })} ${renderComponent($$result2, "TipItem", TipItem, { "title": "Join a community", "description": "Join a community of learners, such as a local coding group, a Discord server, or a subreddit. It's a great way to get help, share your progress, and learn from others.", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/GetStarted/TipItem", "client:component-export": "TipItem" })} </div> </div> </div> </div> ${renderComponent($$result2, "RoleRoadmaps", RoleRoadmaps, { "badge": "Self-taught Developer", "title": "Are you a self-taught developer?", "description": "How about taking a peek at the Computer Science roadmap aimed at self-taught developers?" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": GraduationCap, "title": "Computer Science", "link": "/computer-science", "description": "Learn the fundamental concepts of computer science and programming." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Blocks, "title": "Data Structures", "link": "/datastructures-and-algorithms", "description": "Learn all about data structures and algorithms." })} ${renderComponent($$result3, "RoadmapMultiCard", RoadmapMultiCard, { "roadmaps": [{ title: "System Design", link: "/system-design" }], "description": "Learn how to design large scale systems and prepare for system design interviews.", "secondaryRoadmaps": [
    {
      title: "Design and Architecture",
      link: "/software-design-architecture"
    }
  ], "secondaryDescription": "Or learn how to design and architect software systems." })} ` })} ${renderComponent($$result2, "RoleRoadmaps", RoleRoadmaps, { "badge": "Frontend Developer", "title": "Are you a Frontend Developer?", "description": "How about skimming through the frontend or JavaScript roadmaps to see if there is anything you missed? TypeScript is all the rage these days, maybe it is time to learn it?" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Globe2, "title": "Frontend", "link": "/frontend", "description": "Learn all you need to know to become a frontend developer." })} ${renderComponent($$result3, "RoadmapMultiCard", RoadmapMultiCard, { "roadmaps": [
    { title: "HTML", link: "/html" },
    { title: "CSS", link: "/css" },
    { title: "JavaScript", link: "/javascript" },
    { title: "TypeScript", link: "/typescript" }
  ], "description": "How about mastering the language of the web: JavaScript? or maybe TypeScript? or maybe HTML or CSS?", "secondaryRoadmaps": [
    {
      title: "Frontend Performance",
      link: "/best-practices/frontend-performance"
    }
  ], "secondaryDescription": "Or learn how to improve the performance of your web apps?" })} ${renderComponent($$result3, "RoadmapMultiCard", RoadmapMultiCard, { "roadmaps": [
    { title: "React", link: "/react" },
    { title: "Vue", link: "/vue" },
    { title: "Angular", link: "/angular" },
    { title: "Next.js", link: "/nextjs" }
  ], "description": "Or learn a framework?", "secondaryRoadmaps": [{ title: "Design Systems", link: "/design-system" }], "secondaryDescription": "or learn about design systems?" })} ` })} ${renderComponent($$result2, "RoleRoadmaps", RoleRoadmaps, { "badge": "Backend Developer", "title": "Are you a Backend Developer?", "description": "Explore the general backend roadmap or dive into a specific technology like Node.js, Python, Java etc" }, { "default": ($$result3) => renderTemplate` <div class="flex flex-col gap-3"> ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": ServerCog, "title": "Backend", "link": "/backend", "description": "Learn all you need to know to become a backend developer." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Braces, "title": "API Design", "link": "/api-design", "description": "Learn all you need to know to design robust APIs." })} </div> ${renderComponent($$result3, "RoadmapMultiCard", RoadmapMultiCard, { "roadmaps": [
    { title: "Node.js", link: "/nodejs" },
    { title: "PHP", link: "/php" },
    { title: "Rust", link: "/rust" },
    { title: "Go", link: "/golang" },
    { title: "Python", link: "/python" },
    { title: "Java", link: "/java" },
    { title: "Kotlin", link: "/kotlin" },
    { title: "ASP.NET Core", link: "/aspnet-core" },
    { title: "C++", link: "/cpp" }
  ], "description": "Or learn a specific technology?" })} ${renderComponent($$result3, "RoadmapMultiCard", RoadmapMultiCard, { "roadmaps": [
    { title: "System Design", link: "/system-design" },
    {
      title: "Design and Architecture",
      link: "/software-design-architecture"
    }
  ], "description": "How about improving your System Design skills?", "secondaryRoadmaps": [
    { title: "SQL", link: "/sql" },
    { title: "PostgreSQL", link: "/postgresql-dba" },
    { title: "MongoDB", link: "/mongodb" },
    { title: "Redis", link: "/redis" }
  ], "secondaryDescription": "Or perhaps improve your database skills?" })} ` })} ${renderComponent($$result2, "RoleRoadmaps", RoleRoadmaps, { "badge": "DevOps Engineer", "title": "DevOps or a Wanna-be DevOps Engineer?", "description": "Explore the general DevOps roadmap or dive into a specific technology like Docker, Kubernetes etc" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Server, "title": "DevOps", "link": "/devops", "description": "Learn all you need to know to become a DevOps Engineer." })} ${renderComponent($$result3, "RoadmapMultiCard", RoadmapMultiCard, { "roadmaps": [
    { title: "AWS", link: "/aws" },
    { title: "Cloudflare", link: "/cloudflare" }
  ], "description": "or perhaps you want to learn AWS or Cloudflare?", "secondaryRoadmaps": [{ title: "Terraform", link: "/terraform" }], "secondaryDescription": "Or learn to automate your infrastructure using Terraform?" })} ${renderComponent($$result3, "RoadmapMultiCard", RoadmapMultiCard, { "roadmaps": [
    { title: "Docker", link: "/docker" },
    { title: "Kubernetes", link: "/kubernetes" },
    { title: "Linux", link: "/linux" }
  ], "description": "or perhaps you want to learn Docker, Kubernetes or Linux?", "secondaryRoadmaps": [
    { title: "Python", link: "/python" },
    { title: "Go", link: "/golang" },
    { title: "Rust", link: "/rust" },
    { title: "Shell / Bash", link: "/shell-bash" }
  ], "secondaryDescription": "Or maybe improve your automation skills?" })} ` })} ${renderComponent($$result2, "RoleRoadmaps", RoleRoadmaps, { "badge": "Mobile Developer", "title": "Are you a Mobile Developer?", "description": "How about beefing up your mobile development skills?" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Smartphone, "title": "Android", "link": "/android", "description": "Learn all you need to know to become an Android Developer." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Smartphone, "title": "iOS", "link": "/ios", "description": "Learn all you need to know to become an iOS Developer." })} ${renderComponent($$result3, "RoadmapMultiCard", RoadmapMultiCard, { "roadmaps": [
    { title: "React Native", link: "/react-native" },
    { title: "Flutter", link: "/flutter" },
    { title: "Kotlin", link: "/kotlin" }
  ], "description": "Or learn a cross-platform framework?" })} ` })} ${renderComponent($$result2, "RoleRoadmaps", RoleRoadmaps, { "badge": "AI and Machine Learning", "title": "Are you an AI or Machine Learning enthusiast?", "description": "How about diving into the AI or Machine Learning roadmaps?" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Bot, "title": "Machine Learning", "link": "/machine-learning", "description": "Learn all you need to know to become an ML Engineer." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Bot, "title": "AI and Data Science", "link": "/ai-data-scientist", "description": "Learn all you need to know to become an AI or Data Scientist." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Bot, "title": "AI Engineer", "link": "/ai-engineer", "description": "Learn all you need to become an AI Engineer." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": ServerCog, "title": "AI Agents", "link": "/ai-agents", "description": "Learn how to design, build and ship AI agents in 2025." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Bot, "title": "Data Analyst", "link": "/data-analyst", "description": "Learn all you need to know to become a Data Analyst." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Bot, "title": "BI Analyst", "link": "/bi-analyst", "description": "Learn to become a Business Intelligence Analyst in 2025." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Bot, "title": "Data Engineer", "link": "/data-engineer", "description": "Learn all you need to know to become a Data Engineer." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": MessageCircleCode, "title": "Prompt Engineering", "link": "/prompt-engineering", "description": "Learn how to write better prompts for GPT-* and other language models." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Shield, "title": "AI Red Teaming", "link": "/ai-red-teaming", "description": "Learn how to red team your AI applications with this interactive step by step guide." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Bot, "icon2": ServerCog, "title": "MLOps", "link": "/mlops", "description": "Learn how to deploy and manage machine learning models." })} ` })} ${renderComponent($$result2, "RoleRoadmaps", RoleRoadmaps, { "badge": "Product or Engineering Management", "title": "Thinking about a career in management?", "description": "How about diving into our product or engineering management roadmaps?" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": SquareKanban, "title": "Product Manager", "link": "/product-manager", "description": "Learn all you need to know to become a Product Manager." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": UsersRound, "title": "Engineering Manager", "link": "/engineering-manager", "description": "Learn all you need to become an Engineering Manager." })} ` })} ${renderComponent($$result2, "RoleRoadmaps", RoleRoadmaps, { "badge": "More Roles", "title": "Fancy something else?", "description": "Explore the following roadmaps about UX, Game Development, Software Architect and more" }, { "default": ($$result3) => renderTemplate` <div class="flex flex-col justify-start gap-3"> ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": ShieldHalf, "title": "Cyber Security", "link": "/cyber-security", "description": "Learn to become a Cyber Security Expert." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Workflow, "title": "UX Designer", "link": "/ux-design", "description": "Learn all you need to know to become a UX Designer." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Coins, "title": "Blockchain", "link": "/blockchain", "description": "Learn all you need to know to become a Blockchain Developer." })} </div> <div class="flex flex-col justify-start gap-3"> ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Gamepad2, "title": "Game Development", "link": "/game-developer", "description": "Learn all you need to know to become a Game Developer." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": PenSquare, "title": "Technical Writer", "link": "/technical-writer", "description": "Learn all you need to know to become a Technical Writer." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Megaphone, "title": "DevRel Engineer", "link": "/devrel", "description": "Learn all you need to know to become a DevRel Engineer." })} </div> <div class="flex flex-col justify-start gap-3"> ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": FolderKanban, "title": "Product Manager", "link": "/product-manager", "description": "Learn all you need to know to become a Project Manager." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": Component, "title": "Software Architect", "link": "/software-architect", "description": "Learn all you need to know to become a Software Architect." })} ${renderComponent($$result3, "RoadmapCard", RoadmapCard, { "icon": GitBranch, "title": "Git and GitHub", "link": "/git-github", "description": "Learn all you need to know to become a Git and GitHub expert." })} </div> ` })} <div class="container"> <div class="-mt-5 mb-12 rounded-3xl bg-black p-5"> <h2 class="mb-0.5 text-xl font-semibold text-white sm:mb-1 sm:text-2xl">
There is more!
</h2> <p class="text-sm text-gray-400 sm:text-base">
We have a lot more content for you to explore.
</p> <div class="my-4 grid grid-cols-1 gap-2 sm:my-5 sm:grid-cols-2 sm:gap-3 md:grid-cols-3"> <a href="/roadmaps" class="grow rounded-lg bg-linear-to-br from-gray-800 to-gray-700 p-4 text-sm text-white transition-all hover:from-gray-700 hover:to-gray-700 sm:text-base"> ${renderComponent($$result2, "Waypoints", Waypoints, { "className": "mb-3 h-5 w-5 text-gray-500 sm:mb-2" })}
Explore all Roadmaps
</a> <a href="/best-practices" class="grow rounded-lg bg-linear-to-br from-gray-800 to-gray-700 p-4 text-sm text-white transition-all hover:from-gray-700 hover:to-gray-700 sm:text-base"> ${renderComponent($$result2, "CheckSquare", CheckSquare, { "className": "mb-3 h-5 w-5 text-gray-500 sm:mb-2" })}
Explore Best Practices
</a> <a href="/questions" class="grow rounded-lg bg-linear-to-br from-gray-800 to-gray-700 p-4 text-sm text-white transition-all hover:from-gray-700 hover:to-gray-700 sm:text-base"> ${renderComponent($$result2, "CheckSquare", CheckSquare, { "className": "mb-3 h-5 w-5 text-gray-500 sm:mb-2" })}
Explore Questions
</a> </div> <p class="text-sm text-gray-400 sm:text-base">
Or visit our <a href="/guides" class="rounded-lg bg-gray-700 px-2 py-1 text-gray-300 transition-colors hover:bg-gray-600 hover:text-white">guides</a> and <a href="/videos" class="rounded-lg bg-gray-700 px-2 py-1 text-gray-300 transition-colors hover:bg-gray-600 hover:text-white">videos</a> for long-form content.
</p> </div> </div>  ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/get-started.astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/get-started.astro";
const $$url = "/get-started";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$GetStarted,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
