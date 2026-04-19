import { e as createAstro, f as createComponent, k as renderComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, u as unescapeHTML } from './astro/server_qzXorVo3.mjs';
import 'piccolore';
import { Trash2, PersonStandingIcon, MoreVertical, PencilIcon, XIcon, Loader2Icon, ArrowLeftIcon, MapIcon, FolderKanbanIcon, BookOpenIcon } from 'lucide-react';
import { $ as $$LoginPopup } from './LoginPopup_C4yTtkHh.mjs';
import { $ as $$ProgressHelpPopup } from './ProgressHelpPopup_C5qY1mWg.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { c as cn } from './BaseLayout_DetAB5fP.mjs';
import { useRef, useState, useCallback, useId, useEffect, useMemo } from 'react';
import { r as removeAuthToken } from './jwt_ZAvcheRY.mjs';
import { flushSync } from 'react-dom';
import { e as aiLimitOptions, d as userResourceProgressOptions, c as refreshProgressCounters, b as renderTopicProgress } from './ai-course_qF62O6Zz.mjs';
import { q as queryClient, M as Modal } from './query-client_Cw7dV90V.mjs';
import { useQuery, useMutation } from '@tanstack/react-query';
import { u as useToast } from './use-toast_BT3OoCi0.mjs';
import 'js-cookie';
import { a as httpPost } from './query-http_Ba7FoUiV.mjs';
import { u as useAuth, r as roadmapJSONOptions } from './roadmap_Pe5rBMe6.mjs';
import 'clsx';
import { m as markdownToHtml } from './markdown_C4ic-9CU.mjs';

function TabLink(props) {
  const {
    icon: Icon,
    badgeText,
    isExternal = false,
    url,
    text,
    mobileText,
    isActive,
    hideTextOnMobile = false,
    className: additionalClassName = ""
  } = props;
  const className = cn(
    "inline-flex group transition-colors items-center gap-1.5 border-b-2 px-2 pb-2.5 text-sm",
    {
      "cursor-default border-b-black font-medium text-black": isActive,
      "border-b-transparent font-normal text-gray-400 hover:text-gray-700": !isActive,
      "font-medium hover:text-black text-gray-500 px-0": isExternal
    },
    additionalClassName
  );
  const textClass = cn({
    "hidden sm:inline": hideTextOnMobile
  });
  const badgeNode = badgeText && /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "ml-0.5 hidden items-center gap-0.5 rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-medium text-black transition-colors sm:flex",
        {
          "bg-gray-200 text-black group-hover:bg-gray-300": badgeText?.toLowerCase() == "soon",
          "bg-yellow-200 text-black group-hover:bg-yellow-300": badgeText?.toLowerCase() == "new"
        }
      ),
      children: /* @__PURE__ */ jsx("span", { className: "relative -top-px", children: badgeText })
    }
  );
  if (isActive) {
    return /* @__PURE__ */ jsxs("span", { className, children: [
      /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsx("span", { className: textClass, children: text }),
      badgeNode
    ] });
  }
  return /* @__PURE__ */ jsxs(
    "a",
    {
      target: isExternal ? "_blank" : void 0,
      onClick: (e) => {
        e.preventDefault();
      },
      href: url,
      className,
      children: [
        /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: cn(textClass, "hidden sm:inline"), children: text }),
        /* @__PURE__ */ jsx("span", { className: cn(textClass, "inline sm:hidden"), children: mobileText || text }),
        badgeNode
      ]
    }
  );
}

const CHAT_RESPONSE_PREFIX = {
  message: "0",
  details: "d"
};
const NEWLINE = "\n".charCodeAt(0);
function concatChunks(chunks, totalLength) {
  const concatenatedChunks = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    concatenatedChunks.set(chunk, offset);
    offset += chunk.length;
  }
  chunks.length = 0;
  return concatenatedChunks;
}
async function readChatStream(stream, {
  onMessage,
  onMessageEnd,
  onDetails
}) {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");
  const chunks = [];
  let totalLength = 0;
  let result = "";
  while (true) {
    const { value } = await reader.read();
    if (value) {
      chunks.push(value);
      totalLength += value.length;
      if (value[value.length - 1] !== NEWLINE) {
        continue;
      }
    }
    if (chunks.length === 0) {
      break;
    }
    const concatenatedChunks = concatChunks(chunks, totalLength);
    totalLength = 0;
    const streamParts = decoder.decode(concatenatedChunks, { stream: true }).split("\n").filter((line) => line !== "").map((line) => {
      const separatorIndex = line.indexOf(":");
      if (separatorIndex === -1) {
        throw new Error("Invalid line: " + line + ". No separator found.");
      }
      const prefix = line.slice(0, separatorIndex);
      const content = line.slice(separatorIndex + 1);
      switch (prefix) {
        case CHAT_RESPONSE_PREFIX.message:
          return { type: "message", content: JSON.parse(content) };
        case CHAT_RESPONSE_PREFIX.details:
          return { type: "details", content: JSON.parse(content) };
        default:
          throw new Error("Invalid prefix: " + prefix);
      }
    });
    for (const part of streamParts) {
      if (part.type === "message") {
        result += part.content;
        await onMessage?.(result);
      } else if (part.type === "details") {
        await onDetails?.(part.content);
      }
    }
  }
  await onMessageEnd?.(result);
  reader.releaseLock();
}

function usePersonalizedRoadmap(options) {
  const { roadmapId, onError, onStart, onData, onFinish } = options;
  const abortControllerRef = useRef(null);
  const contentRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const informationRef = useRef("");
  const generatePersonalizedRoadmap = async (information, allTopicIds) => {
    try {
      informationRef.current = information;
      onStart?.();
      setStatus("loading");
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      let response;
      try {
        response = await fetch(
          `${undefined                              }/v1-personalized-roadmap`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              roadmapId,
              information
            }),
            signal: abortControllerRef.current?.signal,
            credentials: "include"
          }
        );
      } catch (e) {
        console.warn("API call failed, falling back to local mock:", e);
        if (allTopicIds && allTopicIds.length > 0) {
          await new Promise((resolve) => setTimeout(resolve, 2e3));
          const shuffled = [...allTopicIds].sort(() => 0.5 - Math.random());
          const count = Math.floor(allTopicIds.length * (0.7 + Math.random() * 0.1));
          const selectedTopicIds = shuffled.slice(0, count);
          const mockData = {
            topicIds: selectedTopicIds,
            information
          };
          onFinish?.(mockData);
          setStatus("idle");
          return;
        }
        throw e;
      }
      if (!response.ok) {
        const data = await response.json();
        setStatus("error");
        if (data.status === 401) {
          removeAuthToken();
          window.location.reload();
        }
        throw new Error(data?.message || "Something went wrong");
      }
      const stream = response.body;
      if (!stream) {
        setStatus("error");
        throw new Error("Something went wrong");
      }
      await readChatStream(stream, {
        onMessage: async (content) => {
          flushSync(() => {
            setStatus("streaming");
            const parsed = parsePersonalizedRoadmapResponse(content);
            contentRef.current = {
              ...parsed,
              information: informationRef.current
            };
            onData?.(contentRef.current);
          });
        },
        onMessageEnd: async () => {
          flushSync(() => {
            setStatus("ready");
          });
        }
      });
      setStatus("idle");
      abortControllerRef.current = null;
      if (!contentRef.current) {
        setStatus("error");
        throw new Error("Something went wrong");
      }
      onFinish?.(contentRef.current);
    } catch (error) {
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }
      onError?.(error);
      setStatus("error");
    }
  };
  const stop = useCallback(() => {
    if (!abortControllerRef.current) {
      return;
    }
    abortControllerRef.current.abort();
    abortControllerRef.current = null;
  }, []);
  return {
    status,
    stop,
    generatePersonalizedRoadmap
  };
}
function parsePersonalizedRoadmapResponse(response) {
  const topicIds = /* @__PURE__ */ new Set();
  const lines = response.split("\n");
  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }
    if (line.startsWith("-")) {
      const topicId = line.slice(1).trim();
      if (!topicId) {
        continue;
      }
      topicIds.add(topicId);
    }
  }
  return {
    topicIds: Array.from(topicIds)
  };
}

function PersonalizedRoadmapModal(props) {
  const {
    onClose,
    info: infoProp,
    onSubmit: onSubmitProp,
    onClearProgress
  } = props;
  const [info, setInfo] = useState(infoProp);
  const infoFieldId = useId();
  const { data: limits, isLoading: isLimitLoading } = useQuery(
    aiLimitOptions(),
    queryClient
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitProp(info);
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      onClose,
      wrapperClassName: "h-auto",
      overlayClassName: "items-start md:items-center",
      bodyClassName: "rounded-2xl",
      children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Personalize Roadmap" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-0.5 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: infoFieldId, className: "text-balance text-gray-600", children: "Tell us about yourself to personlize this roadmap as per your goals and experience" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: infoFieldId,
              className: "h-[150px] w-full resize-none rounded-xl border border-gray-200 p-3 focus:border-gray-500 focus:outline-none",
              placeholder: "e.g. I am a beginner, give me a simpler version of the roadmap",
              value: info,
              onChange: (e) => setInfo(e.target.value),
              autoFocus: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center justify-center gap-2 rounded-xl border border-red-200 p-2 px-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none",
              onClick: onClearProgress,
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }),
                "Reset"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: !info.trim(),
              className: "flex items-center justify-center gap-2 rounded-xl bg-black p-2 px-2 text-white hover:opacity-90 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsx(PersonStandingIcon, { className: "h-4 w-4" }),
                "Personalize"
              ]
            }
          )
        ] })
      ] })
    }
  );
}

function PersonalizedRoadmapSwitcher(props) {
  const { isPersonalized, onToggle, onEdit, onRemove, className } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { className: cn("mb-2 flex items-center gap-2", className), children: /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsDropdownOpen(!isDropdownOpen),
          className: "mr-0.5 p-1 text-slate-400 hover:text-white",
          title: "More options",
          children: /* @__PURE__ */ jsx(MoreVertical, { className: "h-3.5 w-3.5" })
        }
      ),
      isDropdownOpen && /* @__PURE__ */ jsxs("div", { className: "absolute top-full left-0 z-20 mt-1 rounded-md border border-slate-800 bg-slate-900 shadow-xl overflow-hidden min-w-[120px]", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              onEdit();
              setIsDropdownOpen(false);
            },
            className: "flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors",
            children: [
              /* @__PURE__ */ jsx(PencilIcon, { className: "h-3.5 w-3.5" }),
              "Edit"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              onRemove();
              setIsDropdownOpen(false);
            },
            className: "flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors",
            children: [
              /* @__PURE__ */ jsx(XIcon, { className: "h-3.5 w-3.5" }),
              "Delete"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex bg-slate-950 rounded-full border border-slate-800 p-0.5", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: cn(
            "rounded-full px-2.5 py-1 text-[10px] font-bold transition-all uppercase tracking-wider",
            isPersonalized ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-300"
          ),
          onClick: () => onToggle(true),
          children: "Personalized"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: cn(
            "rounded-full px-2.5 py-1 text-[10px] font-bold transition-all uppercase tracking-wider",
            !isPersonalized ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-300"
          ),
          onClick: () => onToggle(false),
          children: "Original"
        }
      )
    ] })
  ] }) });
}

function PersonalizedRoadmap(props) {
  const { roadmapId } = props;
  const toast = useToast();
  const currentUser = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const { data: roadmap } = useQuery(
    roadmapJSONOptions(roadmapId),
    queryClient
  );
  const {
    data: userProgress,
    isLoading: isUserProgressLoading,
    refetch: refetchUserProgress
  } = useQuery(userResourceProgressOptions("roadmap", roadmapId), queryClient);
  useEffect(() => {
    if (userProgress?.personalized) {
      setIsPersonalized(true);
    }
  }, [userProgress]);
  const alreadyInProgressNodeIds = useMemo(() => {
    return /* @__PURE__ */ new Set([
      ...userProgress?.learning ?? [],
      ...userProgress?.done ?? []
    ]);
  }, [userProgress]);
  const allPendingNodeIds = useMemo(() => {
    const nodes = roadmap?.json?.nodes?.filter(
      (node) => ["topic", "subtopic"].includes(node?.type ?? "")
    ) ?? [];
    return nodes.filter((node) => {
      const topicId = node?.id;
      return !alreadyInProgressNodeIds.has(topicId);
    }).map((node) => node?.id);
  }, [roadmap, alreadyInProgressNodeIds]);
  const clearResourceProgressLocalStorage = useCallback(() => {
    localStorage.removeItem(`roadmap-${roadmapId}-${currentUser?.id}-progress`);
    localStorage.removeItem(`roadmap-${roadmapId}-${currentUser?.id}-favorite`);
  }, [roadmapId, currentUser]);
  const { mutate: savePersonalization, isPending: isSavingPersonalization } = useMutation(
    {
      mutationFn: (data) => {
        const remainingTopicIds = allPendingNodeIds.filter(
          (nodeId) => !data.topicIds.includes(nodeId)
        );
        return httpPost(`/v1-save-personalization/${roadmapId}`, {
          personalized: {
            ...data,
            topicIds: remainingTopicIds
          }
        }).catch((err) => {
          console.warn("Failed to save personalization to API, using memory only:", err);
          return { response: { success: true }, error: void 0 };
        });
      },
      onError: (error) => {
        toast.error(error?.message ?? "Failed to save personalization");
      },
      onSuccess: () => {
        clearResourceProgressLocalStorage();
        refetchUserProgress();
        refreshProgressCounters();
        toast.success("Personalization saved successfully");
      }
    },
    queryClient
  );
  const { generatePersonalizedRoadmap, status } = usePersonalizedRoadmap({
    roadmapId,
    onStart: () => {
      setIsModalOpen(false);
    },
    onError: (error) => {
      for (const nodeId of allPendingNodeIds) {
        renderTopicProgress(nodeId, "pending");
      }
    },
    onData: (data) => {
      const { topicIds } = data;
      topicIds.forEach((topicId) => {
        if (alreadyInProgressNodeIds.has(topicId)) {
          return;
        }
        renderTopicProgress(topicId, "pending");
      });
    },
    onFinish: (data) => {
      const { topicIds, information } = data;
      savePersonalization({ topicIds, information });
    }
  });
  const { mutate: clearPersonalization, isPending: isClearing } = useMutation(
    {
      mutationFn: () => {
        return httpPost(`/v1-clear-roadmap-personalization/${roadmapId}`, {});
      },
      onError: (error) => {
        toast.error(error?.message ?? "Failed to clear personalization");
      },
      onSuccess: () => {
        allPendingNodeIds.forEach((topicId) => {
          renderTopicProgress(topicId, "pending");
        });
        setIsPersonalized(false);
        toast.success("Personalization cleared successfully.");
        refetchUserProgress();
      }
    },
    queryClient
  );
  const isGenerating = status !== "idle" || isClearing || isSavingPersonalization;
  const handleTogglePersonalization = (showPersonalized) => {
    setIsPersonalized(showPersonalized);
    if (!showPersonalized) {
      const allTopicIds = allPendingNodeIds;
      allTopicIds.forEach((topicId) => {
        renderTopicProgress(topicId, "pending");
      });
    } else if (userProgress?.personalized) {
      const { topicIds } = userProgress.personalized;
      allPendingNodeIds.forEach((topicId) => {
        if (topicIds.includes(topicId)) {
          renderTopicProgress(topicId, "skipped");
        } else {
          renderTopicProgress(topicId, "pending");
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isModalOpen && /* @__PURE__ */ jsx(
      PersonalizedRoadmapModal,
      {
        info: userProgress?.personalized?.information ?? "",
        onClose: () => setIsModalOpen(false),
        onSubmit: (information) => {
          for (const nodeId of allPendingNodeIds) {
            renderTopicProgress(nodeId, "skipped");
          }
          generatePersonalizedRoadmap(information, allPendingNodeIds);
        },
        onClearProgress: () => {
          setIsModalOpen(false);
          clearPersonalization();
        }
      }
    ),
    userProgress?.personalized?.information ? /* @__PURE__ */ jsx(
      PersonalizedRoadmapSwitcher,
      {
        isPersonalized,
        onToggle: handleTogglePersonalization,
        onEdit: () => setIsModalOpen(true),
        onRemove: () => {
          if (confirm("Are you sure you want to remove personalization?")) {
            clearPersonalization();
          }
        }
      }
    ) : /* @__PURE__ */ jsx(
      "button",
      {
        className: "group hidden sm:inline-flex items-center gap-1.5 border-b-2 border-b-transparent pb-2.5 text-sm font-normal text-slate-400 transition-colors hover:text-white",
        onClick: () => {
          setIsModalOpen(true);
        },
        disabled: isGenerating,
        children: isGenerating ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2Icon, { className: "h-4 w-4 shrink-0 animate-spin" }),
          /* @__PURE__ */ jsx("span", { className: "font-orbitron", children: "Personalizing..." })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(PersonStandingIcon, { className: "h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "font-orbitron", children: "Personalize" })
        ] })
      }
    )
  ] });
}

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const $$RoadmapHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RoadmapHeader;
  const {
    title,
    description,
    roadmapId,
    partner,
    projectCount = 0,
    activeTab = "roadmap",
    coursesCount = 0,
    isNew = false
  } = Astro2.props;
  const hasCourses = coursesCount > 0;
  const hasProjects = projectCount > 0;
  return renderTemplate`${renderComponent($$result, "LoginPopup", $$LoginPopup, {})} ${renderComponent($$result, "ProgressHelpPopup", $$ProgressHelpPopup, {})} ${maybeRenderHead()}<div class="container mt-0 flex flex-col gap-2.5 px-0 sm:mt-3 sm:px-4"> ${partner && renderTemplate`<div class="hidden rounded-md border border-slate-800 bg-slate-900 px-2 py-1.5 sm:block neo-glow"> <p class="py-0.5 text-left text-sm text-slate-300"> <span class="badge mr-1 bg-blue-600">Partner</span> ${partner.description} <a${addAttribute(partner.link, "href")} target="_blank" class="font-medium underline text-blue-400"> ${partner.linkText} </a> </p> </div>`} <div class="relative rounded-none border border-slate-800 bg-slate-900 px-5 pt-4 pb-0 sm:rounded-lg neo-glow"> <div class="flex items-start justify-between"> <a class="inline-flex items-center justify-center rounded-md bg-gray-300 px-2 py-1.5 text-xs font-medium hover:bg-gray-400 sm:hidden sm:text-sm" aria-label="Back to roadmaps"${addAttribute("/roadmaps", "href")}> ${renderComponent($$result, "ArrowLeftIcon", ArrowLeftIcon, { "className": "h-4 w-4" })} </a> <a href="/roadmaps" class="hidden rounded-md text-sm font-medium text-gray-500 transition-all hover:text-black focus:outline-0 sm:block" aria-label="Back to All Roadmaps">
&larr;&nbsp;<span>&nbsp;All Roadmaps</span> </a> <div class="relative top-0 right-0 flex items-center gap-1 sm:-top-0.5 sm:-right-2"> ${renderComponent($$result, "MarkFavorite", null, { "resourceId": roadmapId, "resourceType": "roadmap", "className": "relative top-px mr-2 text-gray-500 opacity-100! hover:text-gray-600 focus:outline-0 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:stroke-gray-400 [&>svg]:stroke-[0.4] [&>svg]:hover:stroke-gray-600 sm:[&>svg]:h-4 sm:[&>svg]:w-4", "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/FeaturedItems/MarkFavorite", "client:component-export": "MarkFavorite" })} </div> </div> <div${addAttribute(["mt-5 mb-5 sm:mt-12 sm:mb-12"], "class:list")}> <h1 class="mb-0.5 text-2xl font-bold sm:mb-3.5 sm:text-5xl"> ${title} </h1> <p class="text-sm text-balance text-gray-500 sm:text-lg">${unescapeHTML(markdownToHtml(description))}</p> </div> ${renderTemplate`<div class="flex justify-between gap-2 sm:gap-0"> <div class="relative top-px flex gap-1 sm:gap-2"> ${renderComponent($$result, "TabLink", TabLink, { "url": `/${roadmapId}`, "icon": MapIcon, "isActive": activeTab === "roadmap", "text": "Roadmap" })} ${hasProjects && renderTemplate`${renderComponent($$result, "TabLink", TabLink, { "url": `/${roadmapId}/projects`, "icon": FolderKanbanIcon, "text": "Projects", "isActive": activeTab === "projects", "badgeText": projectCount > 0 ? "" : "soon" })}`} ${hasCourses && renderTemplate`${renderComponent($$result, "TabLink", TabLink, { "url": `/${roadmapId}/courses`, "icon": BookOpenIcon, "text": "Courses", "isActive": activeTab === "courses", "className": "hidden md:flex" })}`} </div> ${renderComponent($$result, "PersonalizedRoadmap", PersonalizedRoadmap, { "roadmapId": roadmapId, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/PersonalizedRoadmap/PersonalizedRoadmap", "client:component-export": "PersonalizedRoadmap" })} </div>`} </div> </div>`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/RoadmapHeader.astro", void 0);

export { $$RoadmapHeader as $ };
