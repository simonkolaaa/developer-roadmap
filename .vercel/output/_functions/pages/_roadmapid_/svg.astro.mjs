import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { jsx, jsxs, Fragment as Fragment$1 } from 'react/jsx-runtime';
import * as React from 'react';
import { lazy, useRef, useCallback, useEffect, memo, Fragment, useState, useId, useMemo } from 'react';
/* empty css                                  */
import { a as renderResourceProgress, u as updateResourceProgress, b as renderTopicProgress, c as refreshProgressCounters, d as userResourceProgressOptions, e as aiLimitOptions, f as clearMigratedRoadmapProgress } from '../../chunks/ai-course_qF62O6Zz.mjs';
import { p as pageProgressMessage, c as cn, S as Spinner, d as useKeydown, h as httpGet$1 } from '../../chunks/BaseLayout_DetAB5fP.mjs';
import { u as useToast, g as getUrlParams } from '../../chunks/use-toast_BT3OoCi0.mjs';
import { s as slugify } from '../../chunks/slugger_ChlNJxtz.mjs';
import { i as isLoggedIn } from '../../chunks/jwt_ZAvcheRY.mjs';
import { s as showLoginPopup } from '../../chunks/popup_DWUkHIfQ.mjs';
/* empty css                                  */
import { queryOptions, useMutation, infiniteQueryOptions, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { CheckIcon, CopyIcon, RotateCwIcon, TrashIcon, ChevronDownIcon, Loader2Icon, MessageCircle, ChevronRight, Check, Circle, EllipsisVerticalIcon, Trash2Icon, SearchIcon, XIcon, LockIcon, HistoryIcon, X, ChevronRightIcon, ShareIcon, SquareArrowOutUpRightIcon, User2Icon, BotIcon, BookOpen, Plus, SquareArrowOutUpRight, ChevronDown, PersonStanding, Trash2, PauseCircleIcon, SendIcon, Wand2, MessageCirclePlus } from 'lucide-react';
import { flushSync } from 'react-dom';
import { l as lockBodyScroll } from '../../chunks/dom_C6E8wq7N.mjs';
import { b as billingDetailsOptions } from '../../chunks/VerifyUpgrade_DAgm5ZaN.mjs';
import { h as httpGet, a as httpPost, b as httpDelete } from '../../chunks/query-http_Ba7FoUiV.mjs';
import '../../chunks/markdown_C4ic-9CU.mjs';
import { clsx } from 'clsx';
import { q as queryClient, M as Modal } from '../../chunks/query-client_Cw7dV90V.mjs';
import { u as useCopyText } from '../../chunks/use-copy-text_Bqwbcq8G.mjs';
import { r as roadmapTreeMappingOptions, M as Markdown, u as useIsThinking, c as chatRoadmapTransport, a as useAIChatScroll, C as CLOSE_TOPIC_DETAIL_EVENT } from '../../chunks/TopicDetail_B-0_KKTk.mjs';
import 'js-cookie';
import { r as roadmapJSONOptions, u as useAuth, l as listBuiltInRoadmaps } from '../../chunks/roadmap_BtbCY3zQ.mjs';
import { U as UpgradeAccountModal } from '../../chunks/UpgradeAccountModal_Cogelfxg.mjs';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { DateTime } from 'luxon';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { C as CheckIcon$1 } from '../../chunks/CheckIcon_B3c1RSNy.mjs';
import { useChat } from '@ai-sdk/react';
import { nanoid } from 'nanoid';
import { g as getPercentage } from '../../chunks/number_D99vRsz6.mjs';
import { $ as $$SkeletonLayout } from '../../chunks/SkeletonLayout_kisaEpU0.mjs';
import { g as getOpenGraphImageUrl } from '../../chunks/open-graph_CUrL1jUv.mjs';
import { o as officialRoadmapDetails } from '../../chunks/official-roadmap_piILD0GP.mjs';
export { renderers } from '../../renderers.mjs';

const Renderer = lazy(
  () => import('../../chunks/editor-stub_BjDLITPT.mjs').then((mod) => ({
    default: mod.Renderer
  }))
);
function getNodeDetails(svgElement) {
  const targetGroup = svgElement?.closest("g") || {};
  const nodeId = targetGroup?.dataset?.nodeId;
  const nodeType = targetGroup?.dataset?.type;
  const title = targetGroup?.dataset?.title;
  if (!nodeId || !nodeType) {
    return null;
  }
  return { nodeId, nodeType, targetGroup, title };
}
const allowedNodeTypes = [
  "topic",
  "subtopic",
  "button",
  "link-item",
  "resourceButton",
  "todo",
  "todo-checkbox",
  "checklist-item"
];
function EditorRoadmapRenderer(props) {
  const { resourceId, nodes = [], edges = [] } = props;
  const roadmapRef = useRef(null);
  const toast = useToast();
  async function updateTopicStatus(topicId, newStatus) {
    pageProgressMessage.set("Updating progress");
    updateResourceProgress(
      {
        resourceId,
        resourceType: "roadmap",
        topicId
      },
      newStatus
    ).then(() => {
      renderTopicProgress(topicId, newStatus);
    }).catch((err) => {
      toast.error("Something went wrong, please try again.");
      console.error(err);
    }).finally(() => {
      pageProgressMessage.set("");
      refreshProgressCounters();
    });
    return;
  }
  const handleSvgClick = useCallback((e) => {
    const target = e.target;
    const { nodeId, nodeType, targetGroup, title } = getNodeDetails(target) || {};
    if (!nodeId || !nodeType || !allowedNodeTypes.includes(nodeType)) {
      return;
    }
    if (nodeType === "button" || nodeType === "link-item" || nodeType === "resourceButton") {
      const link = targetGroup?.dataset?.link || "";
      const isExternalLink = link.startsWith("http");
      if (isExternalLink) {
        window.open(link, "_blank");
      } else {
        window.location.href = link;
      }
      return;
    }
    const isCurrentStatusLearning = targetGroup?.classList.contains("learning");
    const isCurrentStatusSkipped = targetGroup?.classList.contains("skipped");
    if (nodeType === "todo-checkbox") {
      e.preventDefault();
      if (!isLoggedIn()) {
        showLoginPopup();
        return;
      }
      const newStatus = targetGroup?.classList.contains("done") ? "pending" : "done";
      updateTopicStatus(nodeId, newStatus);
      return;
    }
    if (e.shiftKey) {
      e.preventDefault();
      if (!isLoggedIn()) {
        showLoginPopup();
        return;
      }
      updateTopicStatus(
        nodeId,
        isCurrentStatusLearning ? "pending" : "learning"
      );
      return;
    } else if (e.altKey) {
      e.preventDefault();
      if (!isLoggedIn()) {
        showLoginPopup();
        return;
      }
      updateTopicStatus(nodeId, isCurrentStatusSkipped ? "pending" : "skipped");
      return;
    }
    if (nodeType === "checklist-item" && target.tagName === "rect") {
      e.preventDefault();
      if (!isLoggedIn()) {
        showLoginPopup();
        return;
      }
      const newStatus = targetGroup?.classList.contains("done") ? "pending" : "done";
      updateTopicStatus(nodeId, newStatus);
      return;
    }
    if (nodeType === "checklist-item" && (target.tagName === "text" || target.tagName === "tspan")) {
      e.preventDefault();
      const textElement = target.tagName === "tspan" ? target.closest("text") : target;
      const clickedText = textElement?.textContent?.trim();
      if (!clickedText) {
        return;
      }
      const parentChecklistId = targetGroup?.dataset?.parentId;
      if (!parentChecklistId) {
        return;
      }
      const parentChecklistGroup = roadmapRef.current?.querySelector(
        `g[data-node-id="${parentChecklistId}"][data-type="checklist"]`
      );
      if (!parentChecklistGroup) {
        return;
      }
      const labelGroup = parentChecklistGroup.querySelector(
        'g[data-type="checklist-label"]'
      );
      if (!labelGroup) {
        return;
      }
      const labelText = labelGroup.querySelector("text")?.textContent?.trim();
      if (!labelText) {
        return;
      }
      window.dispatchEvent(
        new CustomEvent("roadmap.checklist.click", {
          detail: {
            roadmapId: resourceId,
            labelText,
            clickedText
          }
        })
      );
      return;
    }
    if (nodeType === "checklist-item") {
      return;
    }
    if (!title) {
      return;
    }
    const detailsPattern = `${slugify(title)}@${nodeId}`;
    window.dispatchEvent(
      new CustomEvent("roadmap.node.click", {
        detail: {
          topicId: detailsPattern,
          resourceId,
          resourceType: "roadmap"
        }
      })
    );
  }, []);
  const handleSvgRightClick = useCallback((e) => {
    e.preventDefault();
    const target = e.target;
    const { nodeId, nodeType, targetGroup } = getNodeDetails(target) || {};
    if (!nodeId || !nodeType || !allowedNodeTypes.includes(nodeType)) {
      return;
    }
    if (nodeType === "button") {
      return;
    }
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }
    const isCurrentStatusDone = targetGroup?.classList.contains("done");
    updateTopicStatus(nodeId, isCurrentStatusDone ? "pending" : "done");
  }, []);
  useEffect(() => {
    if (!roadmapRef?.current) {
      return;
    }
    roadmapRef?.current?.addEventListener("click", handleSvgClick);
    roadmapRef?.current?.addEventListener("contextmenu", handleSvgRightClick);
    return () => {
      roadmapRef?.current?.removeEventListener("click", handleSvgClick);
      roadmapRef?.current?.removeEventListener(
        "contextmenu",
        handleSvgRightClick
      );
    };
  }, []);
  return /* @__PURE__ */ jsx(
    Renderer,
    {
      ref: roadmapRef,
      roadmap: { nodes, edges },
      onRendered: () => {
        roadmapRef.current?.setAttribute("data-renderer", "editor");
        renderResourceProgress("roadmap", resourceId).finally();
      }
    }
  );
}

function Tooltip(props) {
  const { children, additionalClass = "", position = "right-center" } = props;
  let positionClass = "";
  if (position === "right-center") {
    positionClass = "left-full top-1/2 -translate-y-1/2 translate-x-1 ";
  } else if (position === "top-center") {
    positionClass = "bottom-full left-1/2 -translate-x-1/2 -translate-y-0.5";
  } else if (position === "bottom-center") {
    positionClass = "top-full left-1/2 -translate-x-1/2 translate-y-0.5";
  } else if (position === "left-center") {
    positionClass = "right-full top-1/2 -translate-y-1/2 -translate-x-1";
  } else if (position === "right-top") {
    positionClass = "left-full top-0";
  } else if (position === "right-bottom") {
    positionClass = "left-full bottom-0";
  } else if (position === "left-top") {
    positionClass = "right-full top-0";
  } else if (position === "left-bottom") {
    positionClass = "right-full bottom-0";
  } else if (position === "top-left") {
    positionClass = "bottom-full left-0";
  } else if (position === "top-right") {
    positionClass = "bottom-full right-0";
  } else if (position === "bottom-left") {
    positionClass = "top-full left-0";
  } else if (position === "bottom-right") {
    positionClass = "top-full right-0";
  }
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: clsx(
        "pointer-events-none absolute z-10 block w-max transform rounded-md bg-gray-900 px-2 py-1 text-sm font-medium text-white opacity-0 shadow-xs duration-100 group-hover:opacity-100",
        positionClass,
        additionalClass
      ),
      children
    }
  );
}

memo((props) => {
  const {
    chatHistory,
    onDelete,
    isStreamingMessage,
    streamedMessage,
    onRegenerate
  } = props;
  return /* @__PURE__ */ jsx("div", { className: "flex grow flex-col", children: /* @__PURE__ */ jsx("div", { className: "relative flex grow flex-col justify-end", children: /* @__PURE__ */ jsxs("div", { className: "flex grow flex-col justify-end gap-14 py-5", children: [
    chatHistory.map((chat, index) => {
      return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
        AIChatCard,
        {
          ...chat,
          onDelete: () => {
            onDelete?.(index);
          },
          onRegenerate: () => {
            onRegenerate?.(index);
          }
        }
      ) }, `chat-${index}`);
    }),
    isStreamingMessage && !streamedMessage && /* @__PURE__ */ jsx(
      AIChatCard,
      {
        role: "assistant",
        content: "",
        html: "<p>Thinking...</p>",
        showActions: false
      }
    ),
    streamedMessage && /* @__PURE__ */ jsx(
      AIChatCard,
      {
        role: "assistant",
        content: "",
        jsx: streamedMessage,
        showActions: false
      }
    )
  ] }) }) });
});
const AIChatCard = memo((props) => {
  const {
    role,
    content,
    jsx: jsx2,
    html,
    showActions = true,
    onDelete,
    onRegenerate
  } = props;
  const { copyText, isCopied } = useCopyText();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "group/content relative flex w-full flex-col",
        role === "user" ? "items-end" : "items-start"
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "flex max-w-full items-start gap-2.5 rounded-lg",
              role === "user" ? "max-w-[70%] bg-gray-200 p-3" : "w-full"
            ),
            children: [
              !!jsx2 && jsx2,
              !!html && /* @__PURE__ */ jsx(
                "div",
                {
                  className: "course-content course-ai-content prose prose-sm overflow-hidden text-sm",
                  dangerouslySetInnerHTML: { __html: html }
                }
              )
            ]
          }
        ),
        showActions && /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "absolute -bottom-2 flex translate-y-full items-center gap-1",
              role === "user" ? "right-0" : "left-0"
            ),
            children: [
              /* @__PURE__ */ jsx(
                ActionButton,
                {
                  icon: isCopied ? CheckIcon : CopyIcon,
                  onClick: () => copyText(content ?? ""),
                  tooltip: isCopied ? "Copied" : "Copy"
                }
              ),
              role === "assistant" && onRegenerate && /* @__PURE__ */ jsx(
                ActionButton,
                {
                  icon: RotateCwIcon,
                  onClick: onRegenerate,
                  tooltip: "Regenerate"
                }
              ),
              onDelete && /* @__PURE__ */ jsx(
                ActionButton,
                {
                  icon: TrashIcon,
                  onClick: onDelete,
                  tooltip: "Delete"
                }
              )
            ]
          }
        )
      ]
    }
  );
});
function ActionButton(props) {
  const { icon: Icon, onClick, tooltip } = props;
  return /* @__PURE__ */ jsxs("div", { className: "group relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "flex size-8 items-center justify-center rounded-lg opacity-0 transition-opacity group-hover/content:opacity-100 hover:bg-gray-200",
        onClick,
        children: /* @__PURE__ */ jsx(Icon, { className: "size-4 stroke-[2.5]" })
      }
    ),
    tooltip && /* @__PURE__ */ jsx(Tooltip, { position: "top-center", additionalClass: "-translate-y-1", children: tooltip })
  ] });
}

function SelectNative(props) {
  const { className, children, ...rest } = props;
  return /* @__PURE__ */ jsxs("div", { className: "relative flex", children: [
    /* @__PURE__ */ jsx(
      "select",
      {
        "data-slot": "select-native",
        className: cn(
          "peer inline-flex w-full cursor-pointer appearance-none items-center rounded-lg border border-gray-200 text-sm text-black outline-none focus-visible:border-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-[option[disabled]:checked]:text-gray-500 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40",
          props.multiple ? "[&_option:checked]:bg-accent py-1 *:px-3 *:py-1" : "h-9 ps-3 pe-8",
          className
        ),
        ...rest,
        children
      }
    ),
    !props.multiple && /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-gray-500/80 peer-disabled:opacity-50 peer-aria-invalid:text-red-500/80", children: /* @__PURE__ */ jsx(ChevronDownIcon, { size: 16, "aria-hidden": "true" }) })
  ] });
}

function userRoadmapPersonaOptions(roadmapId) {
  return queryOptions({
    queryKey: ["user-persona", roadmapId],
    queryFn: async () => {
      return httpGet(
        `/v1-user-roadmap-persona/${roadmapId}`
      );
    },
    enabled: !!roadmapId && isLoggedIn(),
    refetchOnMount: false
  });
}
function userPersonaOptions() {
  return queryOptions({
    queryKey: ["user-persona"],
    queryFn: async () => {
      return httpGet("/v1-user-persona");
    },
    enabled: !!isLoggedIn(),
    refetchOnMount: false
  });
}

memo(
  (props) => {
    const { defaultValues, onClose } = props;
    const toast = useToast();
    const [expertise, setExpertise] = useState(defaultValues?.expertise ?? "");
    const [about, setAbout] = useState(defaultValues?.about ?? "");
    const [specialInstructions, setSpecialInstructions] = useState(
      defaultValues?.specialInstructions ?? ""
    );
    const goalOptions = [
      "Finding a job",
      "Learning for fun",
      "Building a side project",
      "Switching careers",
      "Getting a promotion",
      "Filling knowledge gaps",
      "Other"
    ];
    const getInitialGoalSelection = () => {
      if (!defaultValues?.goal) {
        return "";
      }
      for (const option of goalOptions.slice(0, -1)) {
        if (defaultValues.goal.startsWith(option)) {
          return option;
        }
      }
      return "Other";
    };
    const [selectedGoal, setSelectedGoal] = useState(getInitialGoalSelection());
    const [goal, setGoal] = useState(defaultValues?.goal ?? "");
    const expertiseFieldId = useId();
    const goalFieldId = useId();
    const goalSelectId = useId();
    const aboutFieldId = useId();
    const specialInstructionsFieldId = useId();
    const goalRef = useRef(null);
    const handleGoalSelectionChange = (value) => {
      setSelectedGoal(value);
      if (value === "Other") {
        setGoal("");
        setTimeout(() => {
          goalRef.current?.focus();
        }, 0);
      } else {
        setGoal(value);
      }
    };
    const { mutate: setChatPreferences, isPending } = useMutation(
      {
        mutationFn: (data) => {
          return httpPost("/v1-set-chat-preferences", data);
        },
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries(userPersonaOptions());
        },
        onError: (error) => {
          toast.error(error?.message ?? "Something went wrong");
        }
      },
      queryClient
    );
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!isLoggedIn()) {
        showLoginPopup();
        return;
      }
      setChatPreferences({
        expertise,
        goal,
        about,
        specialInstructions
      });
    };
    const hasFormCompleted = !!expertise && !!goal && !!about;
    return /* @__PURE__ */ jsx(Modal, { onClose, children: /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: cn("space-y-8"), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            className: "text-sm font-medium text-gray-700",
            htmlFor: expertiseFieldId,
            children: "Rate your Experience"
          }
        ),
        /* @__PURE__ */ jsxs(
          SelectNative,
          {
            id: expertiseFieldId,
            value: expertise,
            defaultValue: expertise,
            onChange: (e) => setExpertise(e.target.value),
            className: "h-[40px] border-gray-300 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select your expertise" }),
              [
                "No experience (just starting out)",
                "Beginner (less than 1 year of experience)",
                "Intermediate (1-3 years of experience)",
                "Expert (3-5 years of experience)",
                "Master (5+ years of experience)"
              ].map((expertise2) => /* @__PURE__ */ jsx("option", { value: expertise2, children: expertise2 }, expertise2))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            className: "text-sm font-medium text-gray-700",
            htmlFor: goalSelectId,
            children: "What is your goal?"
          }
        ),
        /* @__PURE__ */ jsxs(
          SelectNative,
          {
            id: goalSelectId,
            value: selectedGoal,
            onChange: (e) => handleGoalSelectionChange(e.target.value),
            className: "h-[40px] border-gray-300 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select your goal" }),
              goalOptions.map((goalOption) => /* @__PURE__ */ jsx("option", { value: goalOption, children: goalOption }, goalOption))
            ]
          }
        ),
        selectedGoal === "Other" && /* @__PURE__ */ jsx(
          "textarea",
          {
            ref: goalRef,
            id: goalFieldId,
            className: "block min-h-24 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
            placeholder: "e.g. need to find a job as soon as possible",
            value: goal,
            onChange: (e) => setGoal(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            className: "text-sm font-medium text-gray-700",
            htmlFor: aboutFieldId,
            children: "Tell us more about yourself"
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: aboutFieldId,
            className: "block min-h-24 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
            placeholder: "e.g. I'm a software engineer with 5 years of experience",
            value: about,
            onChange: (e) => setAbout(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            className: "text-sm font-medium text-gray-700",
            htmlFor: specialInstructionsFieldId,
            children: "Special Instructions"
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: specialInstructionsFieldId,
            className: "block min-h-24 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
            placeholder: "e.g. Prefer concise responses with code examples",
            value: specialInstructions,
            onChange: (e) => setSpecialInstructions(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          disabled: !hasFormCompleted || isPending,
          type: "submit",
          className: "mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-black px-6 py-2 text-sm text-white transition-all hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-50",
          children: isPending ? /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin stroke-[2.5]" }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "size-4" }),
            defaultValues ? "Update Preferences" : "Set Preferences"
          ] })
        }
      )
    ] }) }) });
  }
);

function chatHistoryOptions(chatHistoryId) {
  return queryOptions({
    queryKey: ["chat-history-details", chatHistoryId],
    queryFn: async () => {
      const data = await httpGet(
        `/v1-chat-history/${chatHistoryId}`
      );
      if (data.title) {
        document.title = data.title;
      }
      return data;
    },
    enabled: !!isLoggedIn() && !!chatHistoryId
  });
}
function listChatHistoryOptions(query = {
  query: "",
  roadmapId: ""
}) {
  return infiniteQueryOptions({
    queryKey: ["list-chat-history", query],
    queryFn: ({ pageParam }) => {
      return httpGet("/v1-list-chat-history", {
        ...query?.query ? { query: query.query } : {},
        ...query?.roadmapId ? { roadmapId: query.roadmapId } : {},
        ...pageParam ? { currPage: pageParam } : {},
        perPage: "21"
      });
    },
    enabled: !!isLoggedIn(),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.currPage < lastPage.totalPages ? lastPage.currPage + 1 : void 0;
    },
    initialPageParam: 1
  });
}

function roadmapQuestionsOptions(roadmapId) {
  return queryOptions({
    queryKey: ["roadmap-questions", roadmapId],
    queryFn: () => {
      return httpGet(`/v1-official-roadmap-questions/${roadmapId}`);
    },
    refetchOnMount: false
  });
}

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-lg border border-gray-200 bg-white p-2 text-black shadow-sm outline-none",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

function groupChatHistory(chatHistories) {
  const today = DateTime.now().startOf("day");
  return chatHistories?.reduce(
    (acc, chatHistory) => {
      const updatedAt = DateTime.fromJSDate(
        new Date(chatHistory.updatedAt)
      ).startOf("day");
      const diffInDays = Math.abs(updatedAt.diff(today, "days").days);
      if (diffInDays === 0) {
        acc.today.histories.push(chatHistory);
      } else if (diffInDays <= 7) {
        acc.last7Days.histories.push(chatHistory);
      } else {
        acc.older.histories.push(chatHistory);
      }
      return acc;
    },
    {
      today: {
        title: "Today",
        histories: []
      },
      last7Days: {
        title: "Last 7 Days",
        histories: []
      },
      older: {
        title: "Older",
        histories: []
      }
    }
  );
}

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none focus-visible:bg-gray-100 data-[state=open]:bg-gray-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-45 overflow-hidden rounded-lg border border-gray-200 bg-white p-0.5 text-black shadow-md",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm text-black outline-none select-none focus:bg-gray-100 focus:text-black data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-0.5 h-px bg-gray-200", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

function ChatHistoryAction(props) {
  const { chatHistoryId, onDelete } = props;
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate: deleteChatHistory, isPending: isDeletingLoading } = useMutation(
    {
      mutationFn: (chatHistoryId2) => {
        return httpDelete(`/v1-delete-chat/${chatHistoryId2}`);
      },
      onSettled: () => {
        return queryClient.invalidateQueries({
          predicate: (query) => {
            return query.queryKey[0] === "list-chat-history";
          }
        });
      },
      onSuccess: () => {
        toast.success("Chat history deleted");
        setIsOpen(false);
        onDelete?.();
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to delete chat history");
      }
    },
    queryClient
  );
  return /* @__PURE__ */ jsxs(DropdownMenu, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { className: "rounded-lg p-2 opacity-0 group-hover/item:opacity-100 hover:bg-gray-100 focus:outline-none data-[state=open]:bg-gray-100 data-[state=open]:opacity-100", children: /* @__PURE__ */ jsx(EllipsisVerticalIcon, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "z-[9999]", children: [
      !isDeleting && /* @__PURE__ */ jsx(
        DropdownMenuItem,
        {
          className: "cursor-pointer text-red-500 focus:bg-red-50 focus:text-red-500",
          onSelect: (e) => {
            e.preventDefault();
            setIsDeleting(true);
          },
          disabled: isDeletingLoading,
          children: isDeletingLoading ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
            /* @__PURE__ */ jsx(Loader2Icon, { className: "h-4 w-4 animate-spin" }),
            "Deleting..."
          ] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
            /* @__PURE__ */ jsx(Trash2Icon, { className: "h-4 w-4" }),
            "Delete"
          ] })
        }
      ),
      isDeleting && /* @__PURE__ */ jsx(
        DropdownMenuItem,
        {
          asChild: true,
          className: "focus:bg-transparent",
          onSelect: (e) => {
            e.preventDefault();
          },
          disabled: isDeletingLoading,
          children: /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-between gap-1.5", children: [
            "Are you sure?",
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    deleteChatHistory(chatHistoryId);
                    setIsDeleting(false);
                  },
                  className: "cursor-pointer text-red-500 underline hover:text-red-800",
                  disabled: isDeletingLoading,
                  children: "Yes"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsDeleting(false),
                  className: "cursor-pointer text-red-500 underline hover:text-red-800",
                  disabled: isDeletingLoading,
                  children: "No"
                }
              )
            ] })
          ] })
        }
      )
    ] })
  ] });
}

function ChatHistoryItem(props) {
  const { chatHistory, isActive, onChatHistoryClick, onDelete } = props;
  return /* @__PURE__ */ jsxs("li", { className: "group/item relative text-sm", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "block w-full truncate rounded-lg p-2 pr-10 text-left hover:bg-gray-100 data-[active=true]:bg-gray-100",
        "data-active": isActive,
        onClick: () => onChatHistoryClick(chatHistory._id),
        children: chatHistory.title
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-2 flex items-center", children: /* @__PURE__ */ jsx(
      ChatHistoryAction,
      {
        chatHistoryId: chatHistory._id,
        onDelete
      }
    ) })
  ] }, chatHistory._id);
}

function ChatHistoryGroup(props) {
  const {
    title,
    histories,
    activeChatHistoryId,
    onChatHistoryClick,
    onDelete
  } = props;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "ml-2 text-xs text-gray-500", children: title }),
    /* @__PURE__ */ jsx("ul", { className: "mt-1 space-y-0.5", children: histories.map((chatHistory) => {
      return /* @__PURE__ */ jsx(
        ChatHistoryItem,
        {
          chatHistory,
          isActive: activeChatHistoryId === chatHistory._id,
          onChatHistoryClick,
          onDelete: () => {
            onDelete?.(chatHistory._id);
          }
        },
        chatHistory._id
      );
    }) })
  ] });
}

function useDebounceValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

function SearchAIChatHistory(props) {
  const { onSearch, isLoading, className, inputClassName } = props;
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceValue(search, 300);
  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: cn("relative mt-2 flex grow items-center", className),
      onSubmit: (e) => {
        e.preventDefault();
        onSearch(search);
      },
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search folder by name",
            className: cn(
              "block h-9 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 pr-7 pl-8 text-sm outline-none placeholder:text-zinc-500 focus:border-zinc-500",
              inputClassName
            ),
            required: true,
            minLength: 3,
            maxLength: 255,
            value: search,
            "data-clarity-unmask": "true",
            onChange: (e) => setSearch(e.target.value)
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-2.5 -translate-y-1/2", children: isLoading ? /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin text-gray-500" }) : /* @__PURE__ */ jsx(SearchIcon, { className: "size-4 text-gray-500" }) }),
        search && /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-1 flex items-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setSearch("");
            },
            className: "rounded-lg p-1 hover:bg-gray-100",
            children: /* @__PURE__ */ jsx(XIcon, { className: "size-4 text-gray-500" })
          }
        ) })
      ]
    }
  );
}

function UpgradeToProMessage(props) {
  const { className, onUpgrade, closeButton } = props;
  return /* @__PURE__ */ jsxs("div", { className: cn("relative flex flex-col", className), children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4 flex items-center justify-between", children: closeButton }),
    /* @__PURE__ */ jsxs("div", { className: "flex grow flex-col items-center justify-center px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-3 rounded-full bg-yellow-100 p-3", children: /* @__PURE__ */ jsx(LockIcon, { className: "size-6 text-yellow-600" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Unlock History" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-sm text-balance text-gray-600", children: "Save conversations and pick up right where you left off." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-5 w-full space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2", children: [
          /* @__PURE__ */ jsx(CheckIcon$1, { additionalClasses: "size-4 text-green-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Unlimited history" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2", children: [
          /* @__PURE__ */ jsx(CheckIcon$1, { additionalClasses: "size-4 text-green-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Search old chats" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "w-full cursor-pointer rounded-lg bg-yellow-400 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-500",
          onClick: () => {
            onUpgrade?.();
          },
          children: "Upgrade to Pro"
        }
      )
    ] })
  ] });
}

function RoadmapAIChatHistory(props) {
  const {
    roadmapId,
    activeChatHistoryId,
    activeChatHistoryTitle,
    onChatHistoryClick,
    onDelete,
    onUpgrade
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } = useQuery(billingDetailsOptions(), queryClient);
  const isPaidUser = userBillingDetails?.status === "active";
  const {
    data: chatHistory,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isLoadingInfiniteQuery
  } = useInfiniteQuery(
    {
      ...listChatHistoryOptions({
        roadmapId,
        query
      }),
      enabled: !!roadmapId && isLoggedIn() && isOpen && isPaidUser
    },
    queryClient
  );
  useEffect(() => {
    if (!isPaidUser) {
      setIsLoading(false);
    }
  }, [isPaidUser]);
  useEffect(() => {
    if (!chatHistory || isBillingDetailsLoading) {
      return;
    }
    setIsLoading(false);
  }, [chatHistory, isBillingDetailsLoading]);
  const groupedChatHistory = useMemo(() => {
    const allHistories = chatHistory?.pages?.flatMap((page) => page.data);
    return groupChatHistory(allHistories ?? []);
  }, [chatHistory?.pages]);
  const isEmptyHistory = Object.values(groupedChatHistory ?? {}).every(
    (group) => group.histories.length === 0
  );
  return /* @__PURE__ */ jsxs(
    Popover,
    {
      open: isOpen,
      onOpenChange: (open) => {
        if (!isLoggedIn()) {
          showLoginPopup();
          return;
        }
        setIsOpen(open);
      },
      children: [
        /* @__PURE__ */ jsxs(PopoverTrigger, { className: "flex items-center justify-center gap-2 rounded-md bg-gray-200 px-3 py-1.5 text-xs text-gray-900 hover:bg-gray-300 hover:text-black", children: [
          /* @__PURE__ */ jsx(HistoryIcon, { className: "size-3.5" }),
          activeChatHistoryTitle || "Chat History"
        ] }),
        /* @__PURE__ */ jsxs(
          PopoverContent,
          {
            className: "z-[999] flex max-h-[400px] w-80 flex-col overflow-hidden p-0 shadow-lg",
            align: "end",
            sideOffset: 4,
            children: [
              isLoading && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-10", children: /* @__PURE__ */ jsx(Loader2Icon, { className: "size-6 animate-spin stroke-[2.5] text-gray-400" }) }),
              !isLoading && !isPaidUser && /* @__PURE__ */ jsx(
                UpgradeToProMessage,
                {
                  className: "mt-0 px-10 py-10",
                  onUpgrade: () => {
                    setIsOpen(false);
                    onUpgrade?.();
                  }
                }
              ),
              !isLoading && isPaidUser && /* @__PURE__ */ jsxs(Fragment$1, { children: [
                /* @__PURE__ */ jsx(
                  SearchAIChatHistory,
                  {
                    onSearch: setQuery,
                    isLoading: isLoadingInfiniteQuery,
                    className: "mt-0",
                    inputClassName: "border-x-0 border-t-0 border-b border-b-gray-200 rounded-none focus:border-b-gray-200"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "scrollbar-track-transparent scrollbar-thin scrollbar-thumb-gray-300 grow space-y-4 overflow-y-auto p-2 pt-4", children: [
                  isEmptyHistory && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-10", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "No chat history" }) }),
                  Object.entries(groupedChatHistory ?? {}).map(([key, value]) => {
                    if (value.histories.length === 0) {
                      return null;
                    }
                    return /* @__PURE__ */ jsx(
                      ChatHistoryGroup,
                      {
                        title: value.title,
                        histories: value.histories,
                        activeChatHistoryId,
                        onChatHistoryClick: (id) => {
                          setIsOpen(false);
                          onChatHistoryClick(id);
                        },
                        onDelete: (id) => {
                          setIsOpen(false);
                          onDelete?.(id);
                        }
                      },
                      key
                    );
                  }),
                  hasNextPage && /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      className: "flex w-full items-center justify-center gap-2 text-sm text-gray-500 hover:text-black",
                      onClick: () => {
                        fetchNextPage();
                      },
                      disabled: isFetchingNextPage,
                      children: [
                        isFetchingNextPage && /* @__PURE__ */ jsxs(Fragment$1, { children: [
                          /* @__PURE__ */ jsx(Loader2Icon, { className: "h-4 w-4 animate-spin" }),
                          "Loading more..."
                        ] }),
                        !isFetchingNextPage && "Load More"
                      ]
                    }
                  ) })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}

function UserPersonaForm(props) {
  const {
    roadmapTitle,
    defaultValues,
    className = "",
    onSubmit,
    isLoading
  } = props;
  const [expertise, setExpertise] = useState(defaultValues?.expertise ?? "");
  const goalOptions = [
    "Finding a job",
    "Learning for fun",
    "Building a side project",
    "Switching careers",
    "Getting a promotion",
    "Filling knowledge gaps",
    "Other"
  ];
  const getInitialGoalSelection = () => {
    if (!defaultValues?.goal) {
      return "";
    }
    for (const option of goalOptions.slice(0, -1)) {
      if (defaultValues.goal.startsWith(option)) {
        return option;
      }
    }
    return "Other";
  };
  const [selectedGoal, setSelectedGoal] = useState(getInitialGoalSelection());
  const [goal, setGoal] = useState(defaultValues?.goal ?? "");
  const [commit, setCommit] = useState(defaultValues?.commit ?? "");
  const [about, setAbout] = useState(defaultValues?.about ?? "");
  const expertiseFieldId = useId();
  const goalFieldId = useId();
  const goalSelectId = useId();
  const commitFieldId = useId();
  const aboutFieldId = useId();
  const goalRef = useRef(null);
  const handleGoalSelectionChange = (value) => {
    setSelectedGoal(value);
    if (value === "Other") {
      setGoal("");
      setTimeout(() => {
        goalRef.current?.focus();
      }, 0);
    } else {
      setGoal(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ expertise, goal, commit, about });
  };
  const hasFormCompleted = !!expertise && !!goal && !!commit;
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: cn("space-y-5", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxs(
        "label",
        {
          className: "text-sm font-medium text-gray-700",
          htmlFor: expertiseFieldId,
          children: [
            "Rate your expertise in ",
            roadmapTitle,
            ":"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        SelectNative,
        {
          id: expertiseFieldId,
          value: expertise,
          defaultValue: expertise,
          onChange: (e) => setExpertise(e.target.value),
          className: "h-[40px] border-gray-300 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Select your expertise" }),
            [
              "No experience (just starting out)",
              "Beginner (less than 1 year of experience)",
              "Intermediate (1-3 years of experience)",
              "Expert (3-5 years of experience)",
              "Master (5+ years of experience)"
            ].map((expertise2) => /* @__PURE__ */ jsx("option", { value: expertise2, children: expertise2 }, expertise2))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          className: "text-sm font-medium text-gray-700",
          htmlFor: goalSelectId,
          children: "What is your goal?"
        }
      ),
      /* @__PURE__ */ jsxs(
        SelectNative,
        {
          id: goalSelectId,
          value: selectedGoal,
          onChange: (e) => handleGoalSelectionChange(e.target.value),
          className: "h-[40px] border-gray-300 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Select your goal" }),
            goalOptions.map((goalOption) => /* @__PURE__ */ jsx("option", { value: goalOption, children: goalOption }, goalOption))
          ]
        }
      ),
      selectedGoal === "Other" && /* @__PURE__ */ jsx(
        "textarea",
        {
          ref: goalRef,
          id: goalFieldId,
          className: "block min-h-24 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
          placeholder: "e.g. need to find a job as soon as possible",
          value: goal,
          onChange: (e) => setGoal(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          className: "text-sm font-medium text-gray-700",
          htmlFor: commitFieldId,
          children: "How many hours per week can you commit to learning?"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: commitFieldId,
          className: "block h-[40px] w-full resize-none rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
          placeholder: "e.g. 10 hours per week",
          value: commit,
          onChange: (e) => setCommit(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          className: "text-sm font-medium text-gray-700",
          htmlFor: aboutFieldId,
          children: "Tell us about yourself (optional but recommended)"
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: aboutFieldId,
          className: "block min-h-24 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
          placeholder: "e.g. I'm a frontend developer with experience in React, looking to expand my backend skills...",
          value: about,
          onChange: (e) => setAbout(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        disabled: isLoading || !hasFormCompleted,
        type: "submit",
        className: "mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-black px-6 py-2 text-sm text-white transition-all hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-50",
        children: isLoading ? /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin stroke-[2.5]" }) : /* @__PURE__ */ jsx(Fragment$1, { children: defaultValues ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "size-4" }),
          "Update Information"
        ] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "size-4" }),
          "Start Chatting"
        ] }) })
      }
    )
  ] });
}

function UpdatePersonaModal(props) {
  const { roadmapId, onClose } = props;
  const toast = useToast();
  const { data: roadmap } = useQuery(
    roadmapJSONOptions(roadmapId),
    queryClient
  );
  const { data: userPersona, isLoading: isLoadingUserPersona } = useQuery(
    userRoadmapPersonaOptions(roadmapId),
    queryClient
  );
  const { mutate: setUserPersona, isPending: isSettingUserPersona } = useMutation(
    {
      mutationFn: async (data) => {
        return httpPost("/v1-set-user-persona", {
          ...data,
          roadmapId
        });
      },
      onError: (error) => {
        toast.error(error?.message || "Something went wrong");
      },
      onSuccess: () => {
        onClose();
      },
      onSettled: () => {
        return queryClient.invalidateQueries(
          userRoadmapPersonaOptions(roadmapId)
        );
      }
    },
    queryClient
  );
  const roadmapTitle = roadmap?.json?.title?.page ?? "";
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      onClose,
      wrapperClassName: "max-w-[450px]",
      bodyClassName: "p-4",
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900",
            children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
          }
        ),
        isLoadingUserPersona && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-50 flex h-full flex-row items-center justify-center gap-3 bg-white", children: [
          /* @__PURE__ */ jsx(Spinner, { isDualRing: false, className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("p", { className: "text-base text-gray-500", children: "Loading..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4 text-left", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Tell us more about yourself" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-balance text-gray-500", children: "We'll use this information to help you get the best out of the AI Tutor." })
        ] }),
        /* @__PURE__ */ jsx(
          UserPersonaForm,
          {
            className: "space-y-4",
            roadmapTitle,
            defaultValues: {
              expertise: userPersona?.expertise ?? "",
              goal: userPersona?.goal ?? "",
              commit: userPersona?.commit ?? "",
              about: userPersona?.about ?? ""
            },
            onSubmit: (data) => {
              const trimmedGoal = data?.goal?.trim();
              if (!trimmedGoal) {
                toast.error("Please describe your goal");
                return;
              }
              const trimmedCommit = data?.commit?.trim();
              if (!trimmedCommit) {
                toast.error(
                  "Please enter how many hours per week you can commit to learning"
                );
                return;
              }
              setUserPersona(data);
            },
            isLoading: isSettingUserPersona
          },
          userPersona ? "loaded" : "loading"
        )
      ]
    }
  );
}

function shuffle(array) {
  let currentIndex = array.length;
  const result = [...array];
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex],
      result[currentIndex]
    ];
  }
  return result;
}

function parseMessageParts(content, renderer) {
  const parts = [];
  const tagNames = Object.keys(renderer);
  if (tagNames.length > 0) {
    const tagPattern2 = tagNames.join("|");
    content = content.replace(
      new RegExp(`\`\`\`\\w*?\\n+?<(${tagPattern2})>`, "g"),
      "<$1>"
    );
    content = content.replace(
      new RegExp(`<\\/(${tagPattern2})>\\n+?\`\`\``, "g"),
      "</$1>"
    );
  }
  if (tagNames.length === 0) {
    parts.push({
      id: nanoid(),
      type: "text",
      text: content
    });
    return parts;
  }
  const tagPattern = tagNames.join("|");
  const regex = new RegExp(`<(${tagPattern})>(.*?)</\\1>`, "gs");
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const [_, tag, innerContent] = match;
    if (match.index > lastIndex) {
      const rawBefore = content.slice(lastIndex, match.index);
      parts.push({
        id: nanoid(),
        type: "text",
        text: rawBefore
      });
    }
    const data = renderer[tag]({
      content: innerContent
    });
    parts.push({
      id: nanoid(),
      type: tag,
      data
    });
    lastIndex = regex.lastIndex;
  }
  for (const tag of tagNames) {
    const openingTag = `<${tag}>`;
    const openingIndex = content.indexOf(openingTag, lastIndex);
    const closingTag = `</${tag}>`;
    const closingIndex = content.indexOf(closingTag, lastIndex);
    if (openingIndex !== -1 && closingIndex === -1) {
      if (openingIndex > lastIndex) {
        const rawBefore = content.slice(lastIndex, openingIndex);
        parts.push({
          id: nanoid(),
          type: "text",
          text: rawBefore
        });
      }
      const innerContent = content.slice(openingIndex + openingTag.length);
      const data = renderer[tag]({
        content: innerContent
      });
      parts.push({
        id: nanoid(),
        type: tag,
        data
      });
      return parts;
    }
  }
  if (lastIndex < content.length) {
    const rawRemaining = content.slice(lastIndex);
    parts.push({
      id: nanoid(),
      type: "text",
      text: rawRemaining
    });
  }
  return parts;
}

function RoadmapChatUserProgressList(props) {
  const { roadmapId } = props;
  const { data: userResourceProgressData } = useQuery(
    userResourceProgressOptions("roadmap", roadmapId),
    queryClient
  );
  const doneCount = userResourceProgressData?.done?.length ?? 0;
  const skippedCount = userResourceProgressData?.skipped?.length ?? 0;
  const totalTopicCount = userResourceProgressData?.totalTopicCount ?? 0;
  const totalFinished = doneCount + skippedCount;
  const progressPercentage = getPercentage(totalFinished, totalTopicCount);
  return /* @__PURE__ */ jsxs("div", { className: "relative my-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 first:mt-0 last:mb-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-600", children: "Progress" }),
        /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700", children: [
          progressPercentage,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "hidden text-sm font-medium text-gray-600 md:block", children: [
        totalFinished,
        " / ",
        totalTopicCount,
        " topics"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative h-2 w-full overflow-hidden rounded-full bg-gray-100", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300",
        style: { width: `${progressPercentage}%` }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs text-gray-500", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-green-500" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "Completed: ",
          doneCount
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-gray-400" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "Skipped: ",
          skippedCount
        ] })
      ] })
    ] })
  ] });
}

function parseUserProgress(content) {
  const items = [];
  const progressRegex = /<update-progress-item>.*?<\/update-progress-item>/gs;
  const progressItems = content.match(progressRegex);
  if (!progressItems) {
    return items;
  }
  for (const progressItem of progressItems) {
    const progressItemRegex = /<topic-id>(.*?)<\/topic-id>/;
    const topicId = progressItem.match(progressItemRegex)?.[1]?.trim();
    const topicActionRegex = /<topic-action>(.*?)<\/topic-action>/;
    const topicAction = progressItem.match(topicActionRegex)?.[1].trim()?.toLowerCase();
    if (!topicId || !topicAction) {
      continue;
    }
    items.push({
      id: topicId,
      action: topicAction
    });
  }
  return items;
}
function UserProgressActionList(props) {
  const { roadmapId, updateUserProgress, isLoading = false } = props;
  const toast = useToast();
  const { data: roadmapTreeData } = useQuery(
    roadmapTreeMappingOptions(roadmapId),
    queryClient
  );
  const {
    mutate: bulkUpdateResourceProgress,
    isPending: isBulkUpdating,
    isSuccess: isBulkUpdateSuccess
  } = useMutation(
    {
      mutationFn: (body) => {
        return httpPost(
          `/v1-bulk-update-resource-progress/${roadmapId}`,
          body
        );
      },
      onSuccess: () => {
        updateUserProgress.forEach((item) => {
          renderTopicProgress(item.id, item.action);
        });
        return queryClient.invalidateQueries(
          userResourceProgressOptions("roadmap", roadmapId)
        );
      },
      onError: (error) => {
        toast.error(
          error?.message ?? "Something went wrong, please try again."
        );
      }
    },
    queryClient
  );
  const progressItemWithText = useMemo(() => {
    return updateUserProgress.map((item) => {
      const roadmapTreeItem = roadmapTreeData?.find(
        (mapping) => mapping.nodeId === item.id
      );
      return {
        ...item,
        text: (roadmapTreeItem?.text || item.id)?.split(" > ").slice(1).join(" > ")
      };
    });
  }, [updateUserProgress, roadmapTreeData]);
  const [showAll, setShowAll] = useState(false);
  const itemCountToShow = 4;
  const itemsToShow = showAll ? progressItemWithText : progressItemWithText.slice(0, itemCountToShow);
  const hasMoreItemsToShow = progressItemWithText.length > itemCountToShow;
  return /* @__PURE__ */ jsx("div", { className: "relative my-6 w-full first:mt-0 last:mb-0", children: /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col gap-0.5", children: [
    itemsToShow.map((item) => /* @__PURE__ */ jsx(
      ProgressItem,
      {
        roadmapId,
        topicId: item.id,
        text: item.text,
        action: item.action,
        isStreaming: isLoading,
        isBulkUpdating,
        isBulkUpdateSuccess
      },
      item.id
    )),
    hasMoreItemsToShow && /* @__PURE__ */ jsxs("div", { className: "relative mt-1 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "z-50 flex items-center gap-1 rounded-md bg-gray-400 px-2 py-1 text-xs font-medium text-white hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70",
          onClick: () => setShowAll(!showAll),
          disabled: isLoading,
          children: [
            isLoading && /* @__PURE__ */ jsxs(Fragment$1, { children: [
              /* @__PURE__ */ jsx(Loader2Icon, { className: "size-3 animate-spin" }),
              progressItemWithText.length,
              " loaded .."
            ] }),
            !isLoading && /* @__PURE__ */ jsx(Fragment$1, { children: showAll ? "- Show Less" : `+ Show ${progressItemWithText.length - itemCountToShow} More` })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "z-50 flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70",
          disabled: isBulkUpdating || isLoading || isBulkUpdateSuccess,
          onClick: () => {
            const done = updateUserProgress.filter((item) => item.action === "done").map((item) => item.id);
            const learning = updateUserProgress.filter((item) => item.action === "learning").map((item) => item.id);
            const skipped = updateUserProgress.filter((item) => item.action === "skipped").map((item) => item.id);
            const pending = updateUserProgress.filter((item) => item.action === "pending").map((item) => item.id);
            bulkUpdateResourceProgress({
              done,
              learning,
              skipped,
              pending
            });
          },
          children: [
            isBulkUpdating && /* @__PURE__ */ jsx(Loader2Icon, { className: "size-3 animate-spin" }),
            !isBulkUpdating && /* @__PURE__ */ jsx(CheckIcon$1, { additionalClasses: "size-3" }),
            "Apply All"
          ]
        }
      )
    ] })
  ] }) });
}
function ProgressItem(props) {
  const {
    roadmapId,
    topicId,
    text,
    action,
    isStreaming,
    isBulkUpdating,
    isBulkUpdateSuccess
  } = props;
  const toast = useToast();
  const {
    mutate: updateTopicStatus,
    isSuccess,
    isPending: isUpdating
  } = useMutation(
    {
      mutationFn: (action2) => {
        return updateResourceProgress(
          {
            resourceId: roadmapId,
            resourceType: "roadmap",
            topicId
          },
          action2
        );
      },
      onMutate: () => {
      },
      onSuccess: () => {
        renderTopicProgress(topicId, action);
      },
      onError: () => {
        toast.error("Something went wrong, please try again.");
      },
      onSettled: () => {
        return queryClient.invalidateQueries(
          userResourceProgressOptions("roadmap", roadmapId)
        );
      }
    },
    queryClient
  );
  const textParts = text.split(" > ");
  const lastIndex = textParts.length - 1;
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-[40px] items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white py-1 pr-1 pl-3", children: [
    /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1 truncate text-sm text-gray-500", children: textParts.map((part, index) => {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        part,
        index !== lastIndex && /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
          /* @__PURE__ */ jsx(ChevronRightIcon, { className: "size-3 shrink-0" }),
          " "
        ] })
      ] }, index);
    }) }),
    !isSuccess && !isBulkUpdateSuccess && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      !isStreaming && /* @__PURE__ */ jsxs(
        "button",
        {
          className: cn(
            `flex shrink-0 items-center gap-1.5 rounded-md border border-gray-200 px-2 py-1 text-xs disabled:pointer-events-none disabled:opacity-40`,
            {
              "bg-green-100 hover:border-green-300 hover:bg-green-200": action === "done",
              "bg-yellow-100 hover:border-yellow-300 hover:bg-yellow-200": action === "learning",
              "bg-gray-800 text-white hover:border-black hover:bg-black": action === "skipped",
              "bg-gray-100 hover:border-gray-300 hover:bg-gray-200": action === "pending"
            }
          ),
          onClick: () => updateTopicStatus(action),
          disabled: isStreaming || isUpdating || isBulkUpdating,
          children: [
            (isUpdating || isBulkUpdating) && /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin" }),
            !isUpdating && !isBulkUpdating && /* @__PURE__ */ jsxs(Fragment$1, { children: [
              /* @__PURE__ */ jsx(CheckIcon$1, { additionalClasses: "size-3" }),
              "Mark it as ",
              action
            ] })
          ]
        }
      ),
      isStreaming && /* @__PURE__ */ jsx("span", { className: "flex size-[30px] items-center justify-center text-gray-300", children: /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin" }) })
    ] }),
    (isSuccess || isBulkUpdateSuccess) && /* @__PURE__ */ jsx("span", { className: "flex size-[30px] items-center justify-center text-green-500", children: /* @__PURE__ */ jsx(CheckIcon$1, { additionalClasses: "size-4" }) })
  ] });
}

function parseTopicList(content) {
  const items = [];
  const topicListRegex = /<topic-id>.*?<\/topic-id>/gs;
  const topicListItems = content.match(topicListRegex);
  if (!topicListItems) {
    return items;
  }
  for (const topicListItem of topicListItems) {
    const topicIdRegex = /<topic-id>(.*?)<\/topic-id>/;
    const topicId = topicListItem.match(topicIdRegex)?.[1]?.trim();
    if (!topicId) {
      continue;
    }
    items.push({
      topicId
    });
  }
  return items;
}
function RoadmapTopicList(props) {
  const { roadmapId, topics: topicListItems, onTopicClick } = props;
  const { data: roadmapTreeData } = useQuery(
    roadmapTreeMappingOptions(roadmapId),
    queryClient
  );
  const progressItemWithText = useMemo(() => {
    return topicListItems.map((item) => {
      const roadmapTreeItem = roadmapTreeData?.find(
        (mapping) => mapping.nodeId === item.topicId
      );
      return {
        ...item,
        text: (roadmapTreeItem?.text || item.topicId)?.split(" > ").slice(1).join(" > ")
      };
    });
  }, [topicListItems, roadmapTreeData]);
  return /* @__PURE__ */ jsx("div", { className: "relative my-6 flex flex-wrap gap-1 first:mt-0 last:mb-0", children: progressItemWithText.map((item) => {
    const labelParts = item.text.split(" > ").slice(-2);
    const labelPartCount = labelParts.length;
    const title = item.text.split(" > ").pop();
    if (!title) {
      return;
    }
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: "collapse-if-empty flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 px-2 text-left text-sm hover:bg-gray-50",
        onClick: () => {
          if (!title) {
            return;
          }
          onTopicClick?.(item.topicId, title);
        },
        children: labelParts.map((part, index) => {
          return /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { children: part }),
            index < labelPartCount - 1 && /* @__PURE__ */ jsx(
              ChevronRightIcon,
              {
                className: "size-3 text-gray-400",
                strokeWidth: 2.5
              }
            )
          ] }, index);
        })
      },
      item.topicId
    );
  }) });
}

function ShareResourceLink(props) {
  const { roadmapId } = props;
  const currentUser = useAuth();
  const { copyText, isCopied } = useCopyText();
  const handleShareResourceLink = () => {
    const url = `${undefined                                  }/${roadmapId}?s=${currentUser?.id}`;
    copyText(url);
  };
  return /* @__PURE__ */ jsx("div", { className: "relative my-6 flex flex-wrap gap-1 first:mt-0 last:mb-0", children: /* @__PURE__ */ jsxs(
    "button",
    {
      className: cn(
        "flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white p-1 px-1.5 text-left text-sm",
        isCopied && "text-green-500"
      ),
      onClick: handleShareResourceLink,
      children: [
        !isCopied && /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsx(ShareIcon, { className: "h-4 w-4" }),
          "Share Progress"
        ] }),
        isCopied && /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsx(CheckIcon$1, { additionalClasses: "size-4" }),
          "Copied"
        ] })
      ]
    }
  ) });
}

function parseRoadmapSlugList(content) {
  const items = [];
  const roadmapSlugListRegex = /<roadmap-slug>.*?<\/roadmap-slug>/gs;
  const roadmapSlugListItems = content.match(roadmapSlugListRegex);
  if (!roadmapSlugListItems) {
    return items;
  }
  for (const roadmapSlugListItem of roadmapSlugListItems) {
    const roadmapSlugRegex = /<roadmap-slug>(.*?)<\/roadmap-slug>/;
    const roadmapSlug = roadmapSlugListItem.match(roadmapSlugRegex)?.[1]?.trim();
    if (!roadmapSlug) {
      continue;
    }
    items.push({
      roadmapSlug
    });
  }
  return items;
}
function RoadmapRecommendations(props) {
  const { roadmapSlugs } = props;
  const { data: roadmaps, isLoading } = useQuery(
    listBuiltInRoadmaps(),
    queryClient
  );
  const progressItemWithText = useMemo(() => {
    return roadmapSlugs.map((item) => {
      const roadmap = roadmaps?.find(
        (mapping) => mapping.id === item.roadmapSlug
      );
      return {
        ...item,
        title: roadmap?.title
      };
    });
  }, [roadmapSlugs, roadmaps]);
  return /* @__PURE__ */ jsx("div", { className: "relative my-6 flex flex-wrap gap-1 first:mt-0 last:mb-0", children: progressItemWithText.map((item) => /* @__PURE__ */ jsxs(
    "a",
    {
      href: `/${item.roadmapSlug}/ai`,
      target: "_blank",
      className: "group flex h-[34px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-left text-sm text-gray-700 transition-all hover:border-gray-400 hover:text-black active:bg-gray-100",
      children: [
        item.title,
        isLoading && /* @__PURE__ */ jsx(Loader2Icon, { className: "size-3.5 animate-spin text-gray-400 group-hover:text-gray-600" }),
        !isLoading && /* @__PURE__ */ jsx(SquareArrowOutUpRightIcon, { className: "ml-1 size-3.5 text-gray-400 transition-transform group-hover:text-gray-600" })
      ]
    },
    item.roadmapSlug
  )) });
}

function RoadmapChatMessage(props) {
  const { roadmapId, message, isStreaming, children, onTopicClick } = props;
  const { role } = message;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex flex-col rounded-lg",
        role === "user" ? "bg-gray-300/30" : "bg-yellow-500/30"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 p-3", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full",
              role === "user" ? "bg-gray-200 text-black" : "bg-yellow-400 text-black"
            ),
            children: role === "user" ? /* @__PURE__ */ jsx(User2Icon, { className: "size-4 stroke-[2.5]" }) : /* @__PURE__ */ jsx(BotIcon, { className: "size-4 stroke-[2.5]" })
          }
        ),
        children || /* @__PURE__ */ jsx("div", { children: message.parts.map((part) => {
          const { type } = part;
          if (role === "user" && type === "text") {
            return /* @__PURE__ */ jsx(
              "div",
              {
                className: "prose prose-sm message-markdown max-w-full text-sm",
                dangerouslySetInnerHTML: { __html: part.text ?? "" }
              },
              `message-${message.id}-part-${type}`
            );
          }
          if (type === "text") {
            const text = part.text;
            const parts = parseMessageParts(text, {
              "user-progress": () => {
                return {};
              },
              "update-progress": (opts) => {
                return parseUserProgress(opts.content);
              },
              "roadmap-topics": (opts) => {
                return parseTopicList(opts.content);
              },
              "resource-progress-link": () => {
                return {};
              },
              "roadmap-recommendations": (opts) => {
                return parseRoadmapSlugList(opts.content);
              }
            });
            return parts.map((part2, index) => {
              const { type: type2 } = part2;
              const key = `message-${message.id}-part-${type2}-${index}`;
              if (type2 === "text") {
                return /* @__PURE__ */ jsx(
                  Markdown,
                  {
                    className: "prose prose-sm message-markdown max-w-full text-sm",
                    children: part2.text ?? ""
                  },
                  key
                );
              } else if (type2 === "user-progress") {
                return /* @__PURE__ */ jsx(
                  RoadmapChatUserProgressList,
                  {
                    roadmapId
                  },
                  key
                );
              } else if (type2 === "update-progress") {
                return /* @__PURE__ */ jsx(
                  UserProgressActionList,
                  {
                    roadmapId,
                    updateUserProgress: part2.data,
                    isLoading: isStreaming
                  },
                  key
                );
              } else if (type2 === "roadmap-topics") {
                return /* @__PURE__ */ jsx(
                  RoadmapTopicList,
                  {
                    roadmapId,
                    topics: part2.data,
                    onTopicClick
                  },
                  key
                );
              } else if (type2 === "resource-progress-link") {
                return /* @__PURE__ */ jsx(ShareResourceLink, { roadmapId }, key);
              } else if (type2 === "roadmap-recommendations") {
                return /* @__PURE__ */ jsx(
                  RoadmapRecommendations,
                  {
                    roadmapSlugs: part2.data
                  },
                  key
                );
              }
              return null;
            });
          }
        }) })
      ] })
    }
  );
}

function _RoadmapChatMessages(props) {
  const {
    messages,
    status,
    roadmapId,
    defaultQuestions,
    onTopicClick,
    onDefaultQuestionClick
  } = props;
  const isStreaming = status === "streaming";
  const isThinking = useIsThinking(messages, status);
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex flex-col", children: /* @__PURE__ */ jsx("div", { className: "relative flex grow flex-col justify-end", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-end gap-2 px-3 py-2", children: [
    /* @__PURE__ */ jsx(
      RoadmapChatMessage,
      {
        roadmapId,
        message: {
          id: "__welcome_message__",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Hello, how can I help you today?"
            }
          ]
        },
        isStreaming
      }
    ),
    messages.length === 0 && defaultQuestions && defaultQuestions.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-0.5 mb-1", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2 text-xs font-normal text-gray-500", children: "Some questions you might have about this roadmap:" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-end gap-1", children: defaultQuestions.map((question, index) => /* @__PURE__ */ jsx(
        "button",
        {
          className: "flex h-full self-start rounded-md bg-yellow-500/10 px-3 py-2 text-left text-sm text-black hover:bg-yellow-500/20",
          onClick: () => onDefaultQuestionClick?.(question),
          children: question
        },
        `default-question-${index}`
      )) })
    ] }),
    messages.map((message, index) => {
      const isLastMessage = index === messages.length - 1;
      if (isThinking && isLastMessage && message.role === "assistant") {
        return null;
      }
      return /* @__PURE__ */ jsx(
        RoadmapChatMessage,
        {
          roadmapId,
          message,
          isStreaming,
          onTopicClick
        },
        message.id
      );
    }),
    isThinking && /* @__PURE__ */ jsx(
      RoadmapChatMessage,
      {
        roadmapId,
        message: {
          id: "__thinking_message__",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Thinking..."
            }
          ]
        },
        isStreaming
      }
    )
  ] }) }) });
}
const RoadmapChatMessages = memo(_RoadmapChatMessages);

function ChatHeaderButton(props) {
  const { onClick, href, icon, children, className, target } = props;
  const classNames = cn(
    "flex shrink-0 items-center gap-1.5 text-xs text-gray-600 transition-colors hover:text-gray-900 min-w-8",
    className
  );
  if (!onClick && !href) {
    return /* @__PURE__ */ jsxs("span", { className: classNames, children: [
      icon,
      children && /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children })
    ] });
  }
  if (href) {
    return /* @__PURE__ */ jsxs(
      "a",
      {
        href,
        target,
        rel: "noopener noreferrer",
        className: classNames,
        children: [
          icon,
          children && /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs("button", { onClick, className: classNames, children: [
    icon,
    children && /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children })
  ] });
}
function UpgradeMessage(props) {
  const { onUpgradeClick } = props;
  return /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 bg-black px-3 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
    /* @__PURE__ */ jsx(Wand2, { className: "h-4 w-4 flex-shrink-0 text-white" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 text-sm", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-1 font-medium text-white", children: "You've reached your AI usage limit" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-300", children: "Upgrade to Pro for relaxed limits and advanced features" })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "flex-shrink-0 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-gray-100",
        onClick: onUpgradeClick,
        children: "Upgrade to Pro"
      }
    )
  ] }) });
}
function UsageButton(props) {
  const { percentageUsed, onUpgradeClick } = props;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: onUpgradeClick,
      className: "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all hover:bg-yellow-200",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-1.5 sm:flex", children: [
          /* @__PURE__ */ jsx("div", { className: "h-1.5 w-6 overflow-hidden rounded-full bg-gray-200", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "h-full transition-all duration-300",
                percentageUsed >= 90 ? "bg-red-500" : percentageUsed >= 70 ? "bg-yellow-500" : "bg-green-500"
              ),
              style: { width: `${Math.min(percentageUsed, 100)}%` }
            }
          ) }),
          /* @__PURE__ */ jsxs("span", { className: "text-yellow-700", children: [
            percentageUsed,
            "% used"
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-yellow-800 underline underline-offset-2", children: "Upgrade" })
      ]
    }
  );
}
function RoadmapFloatingChat(props) {
  const { roadmapId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { data: questionsData } = useQuery(
    roadmapQuestionsOptions(roadmapId),
    queryClient
  );
  const defaultQuestions = useMemo(() => {
    if (!questionsData?.questions || questionsData.questions.length === 0) {
      return [];
    }
    const shuffled = shuffle([...questionsData.questions]);
    return shuffled.slice(0, 4);
  }, [questionsData]);
  const { data: roadmapDetail, isLoading: isRoadmapDetailLoading } = useQuery(
    roadmapJSONOptions(roadmapId),
    queryClient
  );
  const isAuthenticatedUser = isLoggedIn();
  const { data: tokenUsage, isLoading: isTokenUsageLoading } = useQuery(
    aiLimitOptions(),
    queryClient
  );
  const isLimitExceeded = isAuthenticatedUser && (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const percentageUsed = Math.round(
    (tokenUsage?.used || 0) / (tokenUsage?.limit || 0) * 100
  );
  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } = useQuery(billingDetailsOptions(), queryClient);
  const isPaidUser = userBillingDetails?.status === "active";
  useMemo(() => {
    const allowedTypes = ["topic", "subtopic", "todo"];
    return roadmapDetail?.json?.nodes.filter(
      (node) => allowedTypes.includes(node.type || "")
    ).length ?? 0;
  }, [roadmapDetail]);
  const onSelectTopic = (topicId, topicTitle) => {
    const topicSlug = slugify(topicTitle) + "@" + topicId;
    window.dispatchEvent(
      new CustomEvent("roadmap.node.click", {
        detail: {
          resourceType: "roadmap",
          resourceId: roadmapId,
          topicId: topicSlug,
          isCustomResource: false
        }
      })
    );
    flushSync(() => {
      setIsOpen(true);
    });
  };
  const [isChatHistoryLoading, setIsChatHistoryLoading] = useState(true);
  const [activeChatHistoryId, setActiveChatHistoryId] = useState();
  const { data: chatHistory } = useQuery(
    chatHistoryOptions(activeChatHistoryId),
    queryClient
  );
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    transport: chatRoadmapTransport,
    onData: (data) => {
      if (data.type === "data-redirect") {
        const { title, chatId } = data.data;
        document.title = title;
        setActiveChatHistoryId(chatId);
      }
    }
  });
  const { scrollToBottom, scrollableContainerRef, showScrollToBottomButton } = useAIChatScroll({
    messages
  });
  useEffect(() => {
    if (!chatHistory) {
      return;
    }
    setMessages(chatHistory?.messages ?? []);
    setIsChatHistoryLoading(false);
    setTimeout(() => {
      scrollToBottom("instant");
    }, 0);
  }, [chatHistory]);
  useEffect(() => {
    if (activeChatHistoryId) {
      return;
    }
    setMessages([]);
    setIsChatHistoryLoading(false);
  }, [activeChatHistoryId]);
  useEffect(() => {
    lockBodyScroll(isOpen);
  }, [isOpen]);
  useKeydown("Escape", () => {
    setIsOpen(false);
  });
  useEffect(() => {
    const handleCloseTopicDetail = () => {
      lockBodyScroll(isOpen);
    };
    window.addEventListener(CLOSE_TOPIC_DETAIL_EVENT, handleCloseTopicDetail);
    return () => {
      window.removeEventListener(
        CLOSE_TOPIC_DETAIL_EVENT,
        handleCloseTopicDetail
      );
    };
  }, [isOpen, isPersonalizeOpen]);
  useEffect(() => {
    const handleChecklistClick = (e) => {
      const { roadmapId: eventRoadmapId, labelText, clickedText } = e.detail;
      if (eventRoadmapId !== roadmapId) {
        return;
      }
      if (!isLoggedIn()) {
        setIsOpen(false);
        showLoginPopup();
        return;
      }
      const roadmapTitle = roadmapDetail?.json?.title?.page || roadmapDetail?.json?.title?.card || "this roadmap";
      const message = `Explain the '${roadmapTitle}' best practice '${labelText} > ${clickedText}'`;
      flushSync(() => {
        setIsOpen(true);
      });
      setTimeout(() => {
        sendMessage(
          { text: message, metadata: { json: textToJSON(message) } },
          {
            body: {
              roadmapId,
              ...activeChatHistoryId ? { chatHistoryId: activeChatHistoryId } : {}
            }
          }
        );
        setTimeout(() => {
          scrollToBottom("smooth");
          inputRef.current?.focus();
        }, 0);
      }, 100);
    };
    window.addEventListener("roadmap.checklist.click", handleChecklistClick);
    return () => {
      window.removeEventListener("roadmap.checklist.click", handleChecklistClick);
    };
  }, [roadmapId, roadmapDetail, sendMessage, activeChatHistoryId, scrollToBottom]);
  function textToJSON(text) {
    return {
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text }] }]
    };
  }
  const clearChat = () => {
    setMessages([]);
    setInputValue("");
  };
  const submitInput = (message) => {
    if (!isLoggedIn()) {
      setIsOpen(false);
      showLoginPopup();
      return;
    }
    const trimmed = (message ?? inputValue).trim();
    if (!trimmed) {
      return;
    }
    sendMessage(
      { text: trimmed, metadata: { json: textToJSON(trimmed) } },
      {
        body: {
          roadmapId,
          ...activeChatHistoryId ? { chatHistoryId: activeChatHistoryId } : {}
        }
      }
    );
    setTimeout(() => {
      scrollToBottom("smooth");
      setInputValue("");
      inputRef.current?.focus();
    }, 0);
  };
  const isStreamingMessage = status !== "ready";
  const hasMessages = messages.length > 0;
  const newTabUrl = `/ai/roadmap-chat/${roadmapId}${activeChatHistoryId ? `?chatId=${activeChatHistoryId}` : ""}`;
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    isOpen && /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => {
          setIsOpen(false);
        },
        className: "fixed inset-0 z-50 bg-black opacity-50"
      }
    ),
    showUpgradeModal && /* @__PURE__ */ jsx(
      UpgradeAccountModal,
      {
        onClose: () => {
          setShowUpgradeModal(false);
        }
      }
    ),
    isPersonalizeOpen && /* @__PURE__ */ jsx(
      UpdatePersonaModal,
      {
        roadmapId,
        onClose: () => {
          setIsPersonalizeOpen(false);
        }
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "animate-fade-slide-up ai-chat fixed bottom-5 left-1/2 max-h-[95vh] max-w-[968px] -translate-x-1/4 transform flex-col gap-1.5 overflow-hidden px-4 duration-300 sm:max-h-[50vh] lg:flex",
          isOpen ? "z-91 h-full w-full" : "z-40 w-auto"
        ),
        children: [
          isOpen && /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs("div", { className: "relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg", children: [
            isChatHistoryLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-50 flex items-center justify-center bg-white", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center rounded-md border border-gray-200 py-2 pr-3 pl-2", children: [
              /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin stroke-[2.5] text-gray-400" }),
              /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-500", children: "Loading history.." })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-3 py-2", children: [
              /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(
                ChatHeaderButton,
                {
                  icon: /* @__PURE__ */ jsx(BookOpen, { className: "h-3.5 w-3.5" }),
                  className: "pointer-events-none text-sm",
                  children: chatHistory?.title || "AI Tutor"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
                isPaidUser && activeChatHistoryId && /* @__PURE__ */ jsx(
                  ChatHeaderButton,
                  {
                    onClick: () => {
                      setActiveChatHistoryId(void 0);
                      inputRef.current?.focus();
                    },
                    icon: /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }),
                    className: "justify-center rounded-md bg-gray-200 px-2 py-1 text-xs text-black hover:bg-gray-300"
                  }
                ),
                /* @__PURE__ */ jsx(
                  RoadmapAIChatHistory,
                  {
                    roadmapId,
                    activeChatHistoryId,
                    onChatHistoryClick: (chatHistoryId) => {
                      if (activeChatHistoryId === chatHistoryId) {
                        return;
                      }
                      setIsChatHistoryLoading(true);
                      setActiveChatHistoryId(chatHistoryId);
                    },
                    onDelete: (chatHistoryId) => {
                      if (activeChatHistoryId === chatHistoryId) {
                        setActiveChatHistoryId(void 0);
                      }
                    },
                    onUpgrade: () => {
                      setShowUpgradeModal(true);
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  ChatHeaderButton,
                  {
                    href: newTabUrl,
                    target: "_blank",
                    icon: /* @__PURE__ */ jsx(SquareArrowOutUpRight, { className: "h-3.5 w-3.5" }),
                    className: "hidden justify-center rounded-md bg-gray-200 px-1 py-1 text-gray-500 hover:bg-gray-300 sm:flex"
                  }
                ),
                /* @__PURE__ */ jsx(
                  ChatHeaderButton,
                  {
                    onClick: () => setIsOpen(false),
                    icon: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" }),
                    className: "flex items-center justify-center rounded-md bg-red-100 px-1 py-1 text-red-500 hover:bg-red-200"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex grow flex-col", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "relative grow overflow-y-auto",
                  ref: scrollableContainerRef,
                  children: /* @__PURE__ */ jsx(
                    RoadmapChatMessages,
                    {
                      messages,
                      status,
                      roadmapId,
                      defaultQuestions,
                      onTopicClick: onSelectTopic,
                      onDefaultQuestionClick: submitInput
                    }
                  )
                }
              ),
              showScrollToBottomButton && /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    scrollToBottom("instant");
                  },
                  className: "absolute inset-x-0 bottom-2 mx-auto mt-2 flex w-fit items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg transition-all hover:bg-gray-800",
                  children: [
                    /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3" }),
                    "Scroll to bottom"
                  ]
                }
              )
            ] }),
            isLimitExceeded && /* @__PURE__ */ jsx(
              UpgradeMessage,
              {
                onUpgradeClick: () => {
                  setShowUpgradeModal(true);
                  setIsOpen(false);
                }
              }
            ),
            !isLimitExceeded && /* @__PURE__ */ jsxs(Fragment$1, { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between border-t border-gray-200 px-3 pt-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(
                    ChatHeaderButton,
                    {
                      onClick: () => {
                        if (!isLoggedIn()) {
                          setIsOpen(false);
                          showLoginPopup();
                          return;
                        }
                        setIsPersonalizeOpen(true);
                      },
                      icon: /* @__PURE__ */ jsx(PersonStanding, { className: "h-3.5 w-3.5" }),
                      className: "rounded-md bg-gray-200 py-1 pr-2 pl-1.5 text-gray-500 hover:bg-gray-300",
                      children: "Personalize"
                    }
                  ),
                  !isPaidUser && isAuthenticatedUser && /* @__PURE__ */ jsx(
                    UsageButton,
                    {
                      percentageUsed,
                      onUpgradeClick: () => {
                        setShowUpgradeModal(true);
                        setIsOpen(false);
                      }
                    }
                  )
                ] }),
                hasMessages && !isPaidUser && /* @__PURE__ */ jsx(
                  ChatHeaderButton,
                  {
                    onClick: () => {
                      setInputValue("");
                      clearChat();
                    },
                    icon: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }),
                    className: "rounded-md bg-gray-200 py-1 pr-2 pl-1.5 text-gray-500 hover:bg-gray-300",
                    children: "Clear"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative flex items-center text-sm", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    ref: inputRef,
                    type: "text",
                    value: inputValue,
                    onChange: (e) => setInputValue(e.target.value),
                    autoFocus: true,
                    disabled: isLimitExceeded,
                    onKeyDown: (e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (status !== "ready") {
                          return;
                        }
                        submitInput();
                      }
                    },
                    placeholder: isLimitExceeded ? "You have reached the usage limit for today.." : "Ask me anything about this roadmap...",
                    className: cn(
                      "w-full resize-none px-3 py-4 outline-none",
                      isLimitExceeded && "bg-gray-100 text-gray-400"
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "absolute top-1/2 right-2 -translate-y-1/2 p-1 text-zinc-500 hover:text-black disabled:opacity-50",
                    disabled: isRoadmapDetailLoading || isLimitExceeded,
                    onClick: () => {
                      if (isStreamingMessage) {
                        stop();
                        return;
                      }
                      submitInput();
                    },
                    children: isStreamingMessage ? /* @__PURE__ */ jsx(PauseCircleIcon, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(SendIcon, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] })
          ] }) }),
          !isOpen && /* @__PURE__ */ jsx(
            "button",
            {
              className: cn(
                "relative mx-auto flex w-max flex-shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-stone-900 py-2.5 pr-8 pl-6 text-center text-white shadow-2xl transition-all duration-300 hover:scale-101 hover:bg-stone-800"
              ),
              onClick: () => {
                setIsOpen(true);
                setTimeout(() => {
                  scrollToBottom("instant");
                }, 0);
              },
              children: !hasMessages ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
                /* @__PURE__ */ jsx(Wand2, { className: "h-4 w-4 text-yellow-400" }),
                /* @__PURE__ */ jsx("span", { className: "mr-1 text-sm font-semibold text-yellow-400", children: "AI Tutor" }),
                /* @__PURE__ */ jsx("span", { className: "hidden text-white sm:block", children: "Have a question? Type here" }),
                /* @__PURE__ */ jsx("span", { className: "block text-white sm:hidden", children: "Ask anything" })
              ] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
                /* @__PURE__ */ jsx(MessageCirclePlus, { className: "size-5 text-yellow-400" }),
                /* @__PURE__ */ jsx("span", { className: "mr-1 text-sm font-medium text-white", children: "Continue chatting.." })
              ] })
            }
          )
        ]
      }
    )
  ] });
}

function EditorRoadmap(props) {
  const {
    resourceId,
    resourceType = "roadmap",
    dimensions,
    hasChat = true
  } = props;
  const [hasSwitchedRoadmap, setHasSwitchedRoadmap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState(void 0);
  const loadRoadmapData = async () => {
    setIsLoading(true);
    const { r: switchRoadmapId } = getUrlParams();
    const { response, error } = await httpGet$1(
      `${undefined                              }/v1-official-roadmap/${switchRoadmapId || resourceId}`
    );
    if (error) {
      console.error(error);
      return;
    }
    setRoadmapData(response);
    setIsLoading(false);
    setHasSwitchedRoadmap(!!switchRoadmapId);
  };
  useEffect(() => {
    clearMigratedRoadmapProgress(resourceType, resourceId);
    loadRoadmapData().finally();
  }, [resourceId]);
  const aspectRatio = dimensions.width / dimensions.height;
  if (!roadmapData || isLoading) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        style: !hasSwitchedRoadmap ? {
          "--aspect-ratio": aspectRatio
        } : void 0,
        className: "mt-5 flex aspect-[var(--aspect-ratio)] w-full flex-col justify-center",
        children: /* @__PURE__ */ jsx("div", { className: "flex w-full justify-center", children: /* @__PURE__ */ jsx(
          Spinner,
          {
            className: "h-6 w-6 animate-spin sm:h-12 sm:w-12",
            isDualRing: false
          }
        ) })
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: !hasSwitchedRoadmap ? {
        "--aspect-ratio": aspectRatio
      } : void 0,
      className: "mt-5 flex aspect-[var(--aspect-ratio)] w-full flex-col justify-center",
      children: [
        /* @__PURE__ */ jsx(
          EditorRoadmapRenderer,
          {
            ...roadmapData,
            dimensions,
            resourceId
          }
        ),
        hasChat && /* @__PURE__ */ jsx(RoadmapFloatingChat, { roadmapId: resourceId })
      ]
    }
  );
}

const $$Astro = createAstro("https://simonkolaaa.github.io/");
const prerender = false;
const $$Svg = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Svg;
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
  return renderTemplate`${renderComponent($$result, "SkeletonLayout", $$SkeletonLayout, { "permalink": `/${roadmapId}`, "title": roadmapData?.seo?.title || roadmapData.title.page, "briefTitle": roadmapData.title.card, "ogImageUrl": ogImageUrl, "description": roadmapData.seo.description, "keywords": roadmapData.seo.keywords, "resourceId": roadmapId, "resourceType": "roadmap", "noIndex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative container max-w-[1000px]!"> ${renderComponent($$result2, "EditorRoadmap", EditorRoadmap, { "resourceId": roadmapId, "resourceType": "roadmap", "dimensions": roadmapData.dimensions, "client:load": true, "hasChat": false, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/EditorRoadmap/EditorRoadmap", "client:component-export": "EditorRoadmap" })} </div> ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/[roadmapId]/svg.astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/[roadmapId]/svg.astro";
const $$url = "/[roadmapId]/svg";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Svg,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
