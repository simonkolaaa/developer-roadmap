import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useEffect, useState, useRef, useCallback, memo, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { WandSparkles, X, Gift, NotebookPenIcon, ListIcon, PencilLine, BabyIcon, Star, BookOpenTextIcon, BrainIcon, ChevronDownIcon, User2Icon, BotIcon, Loader2Icon, BookOpenIcon, FileTextIcon, ChevronRightIcon, Trash2, LockIcon, SendIcon, Earth, Loader2, ChevronDown, FileText, HeartHandshake, Zap, Ban } from 'lucide-react';
import { c as cn, u as useOutsideClick, d as useKeydown, S as Spinner, h as httpGet$1, p as pageProgressMessage } from './BaseLayout_DetAB5fP.mjs';
import { u as useToast, g as getUrlParams, p as parseUrl } from './use-toast_BT3OoCi0.mjs';
import Cookies from 'js-cookie';
import { T as TOKEN_COOKIE_NAME, i as isLoggedIn } from './jwt_ZAvcheRY.mjs';
import { F as FetchError, h as httpGet } from './query-http_Ba7FoUiV.mjs';
import { DefaultChatTransport } from 'ai';
import { l as lockBodyScroll } from './dom_C6E8wq7N.mjs';
import { s as sanitizeMarkdown, m as markdownToHtml } from './markdown_C4ic-9CU.mjs';
import { s as showLoginPopup } from './popup_DWUkHIfQ.mjs';
import { e as aiLimitOptions, g as getTopicStatus, u as updateResourceProgress, b as renderTopicProgress, c as refreshProgressCounters, d as userResourceProgressOptions, G as GitHubIcon, i as isTopicDone } from './ai-course_qF62O6Zz.mjs';
import { b as billingDetailsOptions } from './VerifyUpgrade_DAgm5ZaN.mjs';
import { M as Modal, q as queryClient } from './query-client_Cw7dV90V.mjs';
import { U as UpgradeAccountModal } from './UpgradeAccountModal_Cogelfxg.mjs';
/* empty css                       */
import TextareaAutosize from 'react-textarea-autosize';
import { f as formatCommaNumber, g as getPercentage } from './number_D99vRsz6.mjs';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { C as CodeBlockHeader, a as CodeBlockItem, b as CodeBlockContent } from './CodeBlock_BDvKc0cy.mjs';

function useLoadTopic(callback) {
  useEffect(() => {
    function handleTopicClick(e) {
      const {
        resourceType,
        resourceId,
        topicId,
        isCustomResource = false
      } = e.detail;
      callback({
        resourceType,
        resourceId,
        topicId,
        isCustomResource
      });
    }
    window.addEventListener(`roadmap.topic.click`, handleTopicClick);
    window.addEventListener(`best-practice.topic.click`, handleTopicClick);
    window.addEventListener(`roadmap.node.click`, handleTopicClick);
    return () => {
      window.removeEventListener(`roadmap.topic.click`, handleTopicClick);
      window.removeEventListener(`best-practice.topic.click`, handleTopicClick);
      window.removeEventListener(`roadmap.node.click`, handleTopicClick);
    };
  }, []);
}

function useToggleTopic(callback) {
  useEffect(() => {
    function handleToggleTopic(e) {
      const { resourceType, resourceId, topicId } = e.detail;
      callback({
        resourceType,
        resourceId,
        topicId
      });
    }
    window.addEventListener(`roadmap.topic.toggle`, handleToggleTopic);
    window.addEventListener(`best-practice.topic.toggle`, handleToggleTopic);
    return () => {
      window.removeEventListener(
        `best-practice.topic.toggle`,
        handleToggleTopic
      );
    };
  }, []);
}

const chatRoadmapTransport = new DefaultChatTransport({
  api: undefined                               + "/v1-chat-roadmap",
  credentials: "include",
  fetch: fetchWithAuthHandling
});
const topicDetailAiChatTransport = new DefaultChatTransport({
  api: undefined                               + "/v1-topic-detail-chat",
  credentials: "include",
  fetch: fetchWithAuthHandling
});
async function fetchWithAuthHandling(input, init) {
  try {
    const response = await fetch(input, init);
    if (response.status === 401) {
      Cookies.remove(TOKEN_COOKIE_NAME);
      window?.location?.reload();
      return null;
    }
    if (!response.ok) {
      const data = await response.json();
      if (data?.errors) {
        if (data?.type && data?.type === "ai_tutor_limit_exceeded") {
          window?.fireEvent?.({
            action: "tutor_credit_limit",
            category: "ai_tutor",
            label: "Tutor Credit Limit Exceeded"
          });
        }
        throw new FetchError(response.status, data.message);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
    return response;
  } catch (error) {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      throw new FetchError(503, "Service Unavailable");
    }
    throw error;
  }
}

function roadmapTreeMappingOptions(roadmapId) {
  return queryOptions({
    queryKey: ["roadmap-tree-mapping", { roadmapId }],
    queryFn: () => {
      return httpGet(
        `${undefined                              }/v1-roadmap-tree-mapping/${roadmapId}`
      );
    },
    refetchOnMount: false
  });
}

function CreateCourseModal(props) {
  const { onClose } = props;
  const [subject, setSubject] = useState("");
  return /* @__PURE__ */ jsx(
    Modal,
    {
      onClose,
      wrapperClassName: "h-auto mt-20",
      overlayClassName: "items-start",
      bodyClassName: "p-1.5",
      children: /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const subject2 = formData.get("subject");
            window.location.href = `/ai/course/search?term=${subject2}&src=topic`;
            onClose();
          },
          children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                className: "mb-2.5 ml-1 inline-block text-sm leading-none",
                htmlFor: "subject",
                children: "Ask AI to Teach You"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative flex items-center gap-2 overflow-hidden", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "subject",
                  type: "text",
                  className: "w-full bg-white p-2.5 pr-8 text-sm focus:outline-hidden",
                  placeholder: "Enter a topic to learn",
                  name: "subject",
                  autoFocus: true,
                  value: subject,
                  onChange: (e) => setSubject(e.target.value)
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  disabled: !subject.trim(),
                  className: "flex h-full disabled:opacity-40 items-center justify-center gap-2 rounded-md bg-black px-3 py-1 text-sm text-white hover:opacity-80",
                  children: [
                    "Generate",
                    /* @__PURE__ */ jsx(WandSparkles, { className: "size-4" })
                  ]
                }
              )
            ] })
          ]
        }
      )
    }
  );
}

function PaidResourceDisclaimer(props) {
  const { onClose } = props;
  return /* @__PURE__ */ jsxs("div", { className: "relative ml-3 mt-4 rounded-md bg-gray-100 p-3 px-3 text-xs text-gray-500", children: [
    /* @__PURE__ */ jsx("button", { className: "absolute right-1 top-1", onClick: onClose, children: /* @__PURE__ */ jsx(X, { size: 16, className: "absolute right-2 top-2 cursor-pointer" }) }),
    /* @__PURE__ */ jsx("p", { className: "mb-1 font-medium text-gray-800", children: "Note on Premium Resources" }),
    /* @__PURE__ */ jsx("p", { className: "mb-1", children: "These are optional paid resources vetted by the roadmap team." }),
    /* @__PURE__ */ jsx("p", { children: "If you purchase a resource, we may receive a small commission at no extra cost to you. This helps us offset the costs of running this site and keep it free for everyone." })
  ] });
}

function ResourceListSeparator(props) {
  const { text, icon: Icon, className = "", labelClassName = "" } = props;
  return /* @__PURE__ */ jsxs(
    "p",
    {
      className: cn(
        "relative mt-6 flex items-center justify-start text-purple-600",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: cn(
              "relative left-3 z-50 inline-flex items-center gap-1 rounded-md border border-current bg-white px-2 py-0.5 text-xs font-medium",
              labelClassName
            ),
            children: [
              Icon && /* @__PURE__ */ jsx(Icon, { className: "inline-block h-3 w-3 fill-current" }),
              text
            ]
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "absolute inset-x-0 h-px w-full grow bg-current" })
      ]
    }
  );
}

function AILimitsPopup(props) {
  const { onClose, onUpgrade } = props;
  const { data: limits, isLoading } = useQuery(aiLimitOptions(), queryClient);
  const { used, limit } = limits ?? { used: 0, limit: 0 };
  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } = useQuery(billingDetailsOptions(), queryClient);
  const isPaidUser = userBillingDetails?.status === "active";
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      onClose,
      wrapperClassName: "rounded-xl max-w-xl w-full h-auto",
      bodyClassName: "p-6",
      overlayClassName: "items-start md:items-center",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-8 text-center text-xl font-semibold", children: "Daily AI Limits" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-2 flex justify-between", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
              "Usage: ",
              formatCommaNumber(used),
              " / ",
              formatCommaNumber(limit),
              " tokens"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
              Math.round(used / limit * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-full rounded-full bg-gray-200", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-2.5 rounded-full bg-yellow-500",
              style: { width: `${Math.min(100, used / limit * 100)}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-gray-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Used Today" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: formatCommaNumber(used) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Daily Limit" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: formatCommaNumber(limit) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx("div", { className: "space-y-3 text-gray-600", children: /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
          "Limit resets every 24 hours.",
          " ",
          !isPaidUser && "Consider upgrading for more tokens."
        ] }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto flex flex-col gap-2 pt-4", children: [
          !isPaidUser && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: onUpgrade,
              className: "flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-yellow-500",
              children: [
                /* @__PURE__ */ jsx(Gift, { className: "size-4" }),
                "Upgrade to Unlimited"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              className: "w-full rounded-lg bg-gray-200 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-300",
              children: "Close"
            }
          )
        ] })
      ]
    }
  );
}

function PredefinedActionGroup(props) {
  const { label, icon: Icon, actions, onSelect } = props;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  useOutsideClick(containerRef, () => {
    setIsOpen(false);
  });
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: containerRef, children: [
    /* @__PURE__ */ jsx(
      PredefinedActionButton,
      {
        label,
        icon: Icon,
        onClick: () => setIsOpen(!isOpen),
        isGroup: true
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 z-20 mt-1 divide-y overflow-hidden rounded-md border border-gray-200 bg-white p-0", children: actions.map((action) => {
      return /* @__PURE__ */ jsx(
        PredefinedActionButton,
        {
          ...action,
          className: "py-2 pl-2.5 pr-5 w-full rounded-none bg-transparent hover:bg-gray-200",
          onClick: () => {
            onSelect(action);
            setIsOpen(false);
          }
        },
        action.label
      );
    }) })
  ] });
}

const actions = [
  {
    icon: BookOpenTextIcon,
    label: "Explain",
    children: [
      {
        icon: NotebookPenIcon,
        label: "Explain the topic",
        prompt: "Explain this topic in detail"
      },
      {
        icon: ListIcon,
        label: "List the key points",
        prompt: "List the key points to remember from this topic"
      },
      {
        icon: PencilLine,
        label: "Summarize the topic",
        prompt: "Briefly explain the topic in a few sentences. Treat it as a brief answer to an interview question. Your response should just be the answer to the question, nothing else."
      },
      {
        icon: BabyIcon,
        label: "Explain like I am five",
        prompt: "Explain this topic like I am a 5 years old"
      },
      {
        icon: Star,
        label: "Why is it important?",
        prompt: "Why is this topic important? What are the real world applications (only add if appropriate)?"
      }
    ]
  },
  {
    icon: BrainIcon,
    label: "Test my Knowledge",
    prompt: "Act as an interviewer and test my understanding of this topic. Ask me a single question at a time and evaluate my answer. Question number should be bold. After evaluating my answer, immediately proceed to the next question without asking if I'm ready or want another question. Continue asking questions until I explicitly tell you to stop."
  }
];
const promptLabelMapping = actions.reduce(
  (acc, action) => {
    if (action.prompt) {
      acc[action.prompt] = action.label;
    }
    if (action.children) {
      action.children.forEach((child) => {
        if (child.prompt) {
          acc[child.prompt] = child.label;
        }
      });
    }
    return acc;
  },
  {}
);
function PredefinedActions(props) {
  const { onSelect } = props;
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 border-gray-200 px-3 py-1 text-sm", children: actions.map((action) => {
    if (!action.children) {
      return /* @__PURE__ */ jsx(
        PredefinedActionButton,
        {
          icon: action.icon,
          label: action.label,
          onClick: () => {
            onSelect(action);
          }
        },
        action.label
      );
    }
    return /* @__PURE__ */ jsx(
      PredefinedActionGroup,
      {
        label: action.label,
        icon: action.icon,
        actions: action.children,
        onSelect
      },
      action.label
    );
  }) });
}
function PredefinedActionButton(props) {
  const { label, icon: Icon, onClick, isGroup = false, className } = props;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: cn(
        "flex shrink-0 items-center gap-1.5 rounded-md bg-gray-200 px-2 py-1 text-sm whitespace-nowrap hover:bg-gray-300",
        className
      ),
      onClick,
      children: [
        Icon && /* @__PURE__ */ jsx(Icon, { className: "mr-1 size-3.5" }),
        label,
        isGroup && /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-3.5" })
      ]
    }
  );
}

function useAIChatScroll(props) {
  const { messages, threshold = 80 } = props;
  const scrollableContainerRef = useRef(null);
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);
  const canScrollToBottom = useCallback(() => {
    const scrollableContainer = scrollableContainerRef?.current;
    if (!scrollableContainer) {
      return false;
    }
    const paddingBottom = parseInt(
      getComputedStyle(scrollableContainer).paddingBottom
    );
    const distanceFromBottom = scrollableContainer.scrollHeight - (scrollableContainer.scrollTop + scrollableContainer.clientHeight) - paddingBottom;
    return distanceFromBottom > -(paddingBottom - threshold);
  }, [threshold]);
  const scrollToBottom = useCallback(
    (behavior = "smooth") => {
      const scrollableContainer = scrollableContainerRef?.current;
      if (!scrollableContainer) {
        return;
      }
      scrollableContainer.scrollTo({
        top: scrollableContainer.scrollHeight,
        behavior: behavior === "instant" ? "instant" : "smooth"
      });
    },
    [scrollableContainerRef]
  );
  useEffect(() => {
    const scrollableContainer = scrollableContainerRef.current;
    if (!scrollableContainer) {
      return;
    }
    const abortController = new AbortController();
    let timeoutId;
    const debouncedHandleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setShowScrollToBottomButton(canScrollToBottom());
      }, 100);
    };
    debouncedHandleScroll();
    scrollableContainer.addEventListener("scroll", debouncedHandleScroll, {
      signal: abortController.signal
    });
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      abortController.abort();
    };
  }, [messages]);
  return {
    scrollableContainerRef,
    showScrollToBottomButton,
    scrollToBottom
  };
}

function getLanguage(children) {
  if (typeof children === "object" && children !== null && "type" in children && children.type === "code" && "props" in children && typeof children.props === "object" && children.props !== null && "className" in children.props && typeof children.props.className === "string") {
    return children.props.className.replace("language-", "").trim();
  }
  return "javascript";
}
const components = {
  pre: (props) => {
    const { children } = props;
    const language = getLanguage(children);
    const childrenIsCode = typeof children === "object" && children !== null && "type" in children && children.type === "code";
    if (!childrenIsCode) {
      return /* @__PURE__ */ jsx("pre", { children });
    }
    const code = children.props?.children?.slice(
      0,
      -1
    );
    return /* @__PURE__ */ jsxs("div", { className: "not-prose my-6 max-w-full overflow-hidden rounded-lg border border-gray-200", children: [
      /* @__PURE__ */ jsx(CodeBlockHeader, { language, code }),
      /* @__PURE__ */ jsx(CodeBlockItem, { value: language, lineNumbers: false, children: /* @__PURE__ */ jsx(CodeBlockContent, { language, children: code }) }, language)
    ] });
  }
};
function _Markdown(props) {
  const { children, className } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "overflow-hidden [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      ),
      children: /* @__PURE__ */ jsx(
        ReactMarkdown,
        {
          components,
          rehypePlugins: [rehypeKatex],
          remarkPlugins: [remarkGfm, remarkMath],
          children
        }
      )
    }
  );
}
const Markdown = memo(_Markdown, (prevProps, nextProps) => {
  return prevProps.children === nextProps.children;
});

function TopicChatMessage(props) {
  const { message } = props;
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
        /* @__PURE__ */ jsx("div", { children: message.parts.map((part) => {
          const { type } = part;
          const key = `message-${message.id}-part-${type}`;
          if (type === "text") {
            let content = part.text;
            if (role === "user" && promptLabelMapping[content]) {
              content = promptLabelMapping[content];
            }
            return /* @__PURE__ */ jsx(
              Markdown,
              {
                className: "prose prose-sm message-markdown max-w-full text-sm",
                children: content
              },
              key
            );
          }
        }) })
      ] })
    }
  );
}

function useIsThinking(messages, status) {
  return useMemo(() => {
    const lastMessage = messages.at(-1);
    if (!lastMessage) {
      return false;
    }
    if (status === "submitted" && lastMessage.role === "user") {
      return true;
    }
    const hasText = lastMessage.role === "assistant" && lastMessage.parts.some(
      (part) => part.type === "text" && part.text?.trim()
    );
    return (status === "submitted" || status === "streaming") && !hasText;
  }, [messages, status]);
}

function TopicChatMessages(props) {
  const { messages, status } = props;
  const isThinking = useIsThinking(messages, status);
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex flex-col", children: /* @__PURE__ */ jsx("div", { className: "relative flex grow flex-col justify-end", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-end gap-2 px-3 py-2", children: [
    /* @__PURE__ */ jsx(
      TopicChatMessage,
      {
        message: {
          id: "__welcome_message__",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Hey, I am your AI instructor. How can I help you today? 🤖"
            }
          ]
        }
      }
    ),
    messages.map((message, index) => {
      const isLastMessage = index === messages.length - 1;
      if (isThinking && isLastMessage && message.role === "assistant") {
        return null;
      }
      return /* @__PURE__ */ jsx(TopicChatMessage, { message }, message.id);
    }),
    isThinking && /* @__PURE__ */ jsx(
      TopicChatMessage,
      {
        message: {
          id: "__thinking_message__",
          role: "assistant",
          parts: [{ type: "text", text: "Thinking..." }]
        }
      }
    )
  ] }) }) });
}

function TopicDetailAI(props) {
  const {
    messages,
    sendMessage,
    setMessages,
    status,
    resourceId,
    resourceType,
    topicId,
    hasUpgradeButtons = true,
    onUpgrade,
    onLogin,
    onShowSubjectSearchModal
  } = props;
  const textareaRef = useRef(null);
  const formRef = useRef(null);
  const sanitizedTopicId = topicId?.includes("@") ? topicId?.split("@")?.[1] : topicId;
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [showAILimitsPopup, setShowAILimitsPopup] = useState(false);
  const { data: tokenUsage, isLoading } = useQuery(
    aiLimitOptions(),
    queryClient
  );
  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } = useQuery(billingDetailsOptions(), queryClient);
  const { data: roadmapTreeMapping, isLoading: isRoadmapTreeMappingLoading } = useQuery(
    {
      ...roadmapTreeMappingOptions(resourceId),
      select: (data) => {
        const node = data.find(
          (mapping) => mapping.nodeId === sanitizedTopicId
        );
        return node;
      }
    },
    queryClient
  );
  const isLimitExceeded = (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const isPaidUser = userBillingDetails?.status === "active";
  const handleChatSubmit = (overrideMessage) => {
    const trimmedMessage = (overrideMessage ?? message).trim();
    if (!trimmedMessage || status !== "ready" || !isLoggedIn() || isLimitExceeded || isLoading) {
      return;
    }
    sendMessage(
      {
        text: trimmedMessage
      },
      {
        body: {
          resourceId,
          resourceType,
          topicId: sanitizedTopicId
        }
      }
    );
    setMessage("");
    setTimeout(() => {
      scrollToBottom();
      textareaRef.current?.focus();
    }, 0);
  };
  const { scrollToBottom, scrollableContainerRef} = useAIChatScroll({
    messages
  });
  useEffect(() => {
    scrollToBottom();
  }, []);
  const isDataLoading = isLoading || isBillingDetailsLoading || isRoadmapTreeMappingLoading;
  const usagePercentage = getPercentage(
    tokenUsage?.used || 0,
    tokenUsage?.limit || 0
  );
  const hasChatHistory = messages.length > 0;
  const nodeTextParts = roadmapTreeMapping?.text?.split(">") || [];
  const subjects = roadmapTreeMapping?.subjects || [];
  const guides = roadmapTreeMapping?.guides || [];
  const hasGuides = guides.length > 0;
  const hasSubjects = subjects.length > 0 || nodeTextParts.length > 1;
  return /* @__PURE__ */ jsxs("div", { className: "ai-chat relative mt-4 flex grow flex-col overflow-hidden rounded-lg border border-gray-200", children: [
    isDataLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-20 flex items-center justify-center gap-2 bg-white text-black", children: /* @__PURE__ */ jsx(Loader2Icon, { className: "size-8 animate-spin stroke-3 text-gray-500" }) }),
    showAILimitsPopup && /* @__PURE__ */ jsx(
      AILimitsPopup,
      {
        onClose: () => setShowAILimitsPopup(false),
        onUpgrade: () => {
          setShowAILimitsPopup(false);
          onUpgrade();
        }
      }
    ),
    (hasSubjects || hasGuides) && /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-200 p-3", children: [
      /* @__PURE__ */ jsx("h4", { className: "flex items-center gap-2 text-sm", children: "Complete the following AI Tutor courses or guides" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2.5 flex flex-wrap gap-1 text-sm", children: [
        subjects.map((subject) => {
          return /* @__PURE__ */ jsxs(
            "a",
            {
              target: "_blank",
              onClick: (e) => {
                if (!isLoggedIn()) {
                  e.preventDefault();
                  onLogin();
                  return;
                }
                if (isLimitExceeded) {
                  e.preventDefault();
                  onUpgrade();
                  return;
                }
              },
              href: `/ai/course/search?term=${subject}&src=topic`,
              className: "flex items-center gap-1.5 rounded-md border border-gray-300 bg-gray-100 px-2 py-1 hover:bg-gray-200 hover:text-black",
              children: [
                /* @__PURE__ */ jsx(BookOpenIcon, { className: "size-3.5" }),
                subject
              ]
            },
            subject
          );
        }),
        guides.map((guide) => {
          return /* @__PURE__ */ jsxs(
            "a",
            {
              target: "_blank",
              onClick: (e) => {
                if (!isLoggedIn()) {
                  e.preventDefault();
                  onLogin();
                  return;
                }
                if (isLimitExceeded) {
                  e.preventDefault();
                  onUpgrade();
                  return;
                }
              },
              href: `/ai/guide/search?term=${guide}&src=topic`,
              className: "flex items-center gap-1.5 rounded-md border border-gray-300 bg-gray-100 px-2 py-1 hover:bg-gray-200 hover:text-black",
              children: [
                /* @__PURE__ */ jsx(FileTextIcon, { className: "size-3.5" }),
                guide
              ]
            },
            guide
          );
        }),
        subjects.length === 0 && /* @__PURE__ */ jsx(
          "a",
          {
            target: "_blank",
            onClick: (e) => {
              if (!isLoggedIn()) {
                e.preventDefault();
                onLogin();
                return;
              }
              if (isLimitExceeded) {
                e.preventDefault();
                onUpgrade();
                return;
              }
            },
            href: `/ai/course/search?term=${roadmapTreeMapping?.text}&difficulty=beginner&src=topic`,
            className: "flex items-center gap-1 rounded-md border border-gray-300 bg-gray-100 px-2 py-1 hover:bg-gray-200 hover:text-black [&>svg:last-child]:hidden",
            children: nodeTextParts.slice(-2).map((text, index) => {
              return /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: "flex items-center", children: text }, text),
                /* @__PURE__ */ jsx(ChevronRightIcon, { className: "h-3 w-3 text-gray-400" })
              ] });
            })
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: onShowSubjectSearchModal,
            className: "flex items-center gap-1.5 rounded-md border border-dashed border-gray-300 bg-transparent px-2 py-1 text-gray-400 hover:border-solid hover:bg-gray-200 hover:text-black",
            children: [
              /* @__PURE__ */ jsx(WandSparkles, { className: "h-3 w-3" }),
              "Learn another topic"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "flex min-h-[46px] items-center justify-between gap-2 border-gray-200 px-3 py-2 text-sm"
        ),
        children: [
          hasSubjects && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(
              BotIcon,
              {
                className: "relative -top-[1px] size-4 shrink-0 text-black",
                strokeWidth: 2.5
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: "Chat with AI" }),
            /* @__PURE__ */ jsx("span", { className: "block sm:hidden", children: "AI Tutor" })
          ] }),
          !hasSubjects && /* @__PURE__ */ jsxs("h4", { className: "flex items-center gap-2 text-base font-medium", children: [
            /* @__PURE__ */ jsx(
              BotIcon,
              {
                className: "relative -top-[1px] size-5 shrink-0 text-black",
                strokeWidth: 2.5
              }
            ),
            "AI Tutor"
          ] }),
          !isDataLoading && /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
            hasChatHistory && /* @__PURE__ */ jsx(
              "button",
              {
                className: "rounded-md bg-white px-2 py-2 text-xs font-medium text-black hover:bg-gray-200",
                onClick: () => {
                  setMessages([]);
                },
                children: /* @__PURE__ */ jsx(Trash2, { className: "size-3.5" })
              }
            ),
            !isPaidUser && hasUpgradeButtons && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "hidden rounded-md bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300 sm:block",
                  onClick: () => {
                    if (!isLoggedIn()) {
                      onLogin();
                      return;
                    }
                    setShowAILimitsPopup(true);
                  },
                  children: [
                    /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                      usagePercentage,
                      "%"
                    ] }),
                    " ",
                    "credits used"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "flex items-center gap-1 rounded-md bg-yellow-400 px-2 py-1 text-sm text-black hover:bg-yellow-500",
                  onClick: () => {
                    if (!isLoggedIn()) {
                      onLogin();
                      return;
                    }
                    onUpgrade();
                  },
                  children: [
                    /* @__PURE__ */ jsx(Gift, { className: "size-4" }),
                    "Upgrade"
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      PredefinedActions,
      {
        onSelect: (action) => {
          if (!isLoggedIn()) {
            onLogin();
            return;
          }
          if (isLimitExceeded) {
            onUpgrade();
            return;
          }
          if (!action?.prompt) {
            toast.error("Something went wrong");
            return;
          }
          setMessage(action.prompt);
          handleChatSubmit(action.prompt);
        }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin relative grow overflow-y-auto",
        ref: scrollableContainerRef,
        children: /* @__PURE__ */ jsx(TopicChatMessages, { messages, status })
      }
    ),
    /* @__PURE__ */ jsxs(
      "form",
      {
        ref: formRef,
        className: "relative flex items-start border-t border-gray-200 text-sm",
        onSubmit: (e) => {
          e.preventDefault();
          handleChatSubmit();
        },
        children: [
          isLimitExceeded && isLoggedIn() && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black text-white", children: [
            /* @__PURE__ */ jsx(LockIcon, { className: "size-4 cursor-not-allowed", strokeWidth: 2.5 }),
            /* @__PURE__ */ jsxs("p", { className: "cursor-not-allowed", children: [
              "Limit reached for today",
              isPaidUser ? ". Please wait until tomorrow." : ""
            ] }),
            !isPaidUser && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onUpgrade,
                className: "rounded-md bg-white px-2 py-1 text-xs font-medium text-black hover:bg-gray-300",
                children: "Upgrade for more"
              }
            )
          ] }),
          !isLoggedIn() && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black text-white", children: [
            /* @__PURE__ */ jsx(LockIcon, { className: "size-4 cursor-not-allowed", strokeWidth: 2.5 }),
            /* @__PURE__ */ jsx("p", { className: "cursor-not-allowed", children: "Please login to continue" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  showLoginPopup();
                },
                className: "rounded-md bg-white px-2 py-1 text-xs font-medium text-black hover:bg-gray-300",
                children: "Login / Register"
              }
            )
          ] }),
          isDataLoading && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black text-white", children: [
            /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin" }),
            /* @__PURE__ */ jsx("p", { children: "Loading..." })
          ] }),
          /* @__PURE__ */ jsx(
            TextareaAutosize,
            {
              className: cn(
                "h-full min-h-[41px] grow resize-none bg-transparent px-4 py-2 focus:outline-hidden"
              ),
              placeholder: "Ask AI anything about the lesson...",
              value: message,
              onChange: (e) => setMessage(e.target.value),
              autoFocus: true,
              onKeyDown: (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleChatSubmit();
                }
              },
              ref: textareaRef
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: status !== "ready" || isLimitExceeded,
              className: "flex aspect-square size-[41px] items-center justify-center text-zinc-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50",
              children: /* @__PURE__ */ jsx(SendIcon, { className: "size-4 stroke-[2.5]" })
            }
          )
        ]
      }
    )
  ] });
}

const linkTypes = {
  article: "bg-yellow-300",
  course: "bg-green-400",
  opensource: "bg-black text-white",
  "roadmap.sh": "bg-black text-white",
  roadmap: "bg-black text-white",
  podcast: "bg-purple-300",
  video: "bg-purple-300",
  website: "bg-blue-300",
  official: "bg-blue-600 text-white",
  feed: "bg-[#ce3df3] text-white"
};
const paidLinkTypes = {
  course: "bg-yellow-300"
};
function TopicLinkBadge(props) {
  const { isPaid, type, className } = props;
  const linkType = type === "opensource" ? "OpenSource" : type;
  const isDiscount = type.includes("% off");
  return /* @__PURE__ */ jsx("span", { className: cn("mr-2", className), children: /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "inline-block rounded-sm px-1.5 py-0.5 text-xs capitalize no-underline",
        (isPaid ? paidLinkTypes[type] : linkTypes[type]) || "bg-gray-200",
        isDiscount && "bg-green-300"
      ),
      children: linkType
    }
  ) });
}
function TopicDetailLink(props) {
  const { url, onClick, type, title, isPaid = false } = props;
  const isScrimbaLink = url.toLowerCase().includes("scrimba.com");
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: url,
      target: "_blank",
      className: "group font-medium text-gray-800 underline underline-offset-1 hover:text-black",
      onClick,
      children: [
        /* @__PURE__ */ jsx(
          TopicLinkBadge,
          {
            isPaid,
            type,
            discountText: isScrimbaLink ? "20% off" : void 0,
            className: isScrimbaLink ? "mr-1" : "mr-2"
          }
        ),
        isScrimbaLink && /* @__PURE__ */ jsx(TopicLinkBadge, { isPaid, type: "20% off" }),
        title
      ]
    }
  );
}

function TopicDetailsTabs(props) {
  const { activeTab, setActiveTab, hasAITutor = true } = props;
  return /* @__PURE__ */ jsxs("div", { className: "flex w-max gap-1.5", children: [
    /* @__PURE__ */ jsx(
      TopicDetailsTab,
      {
        isActive: activeTab === "content",
        icon: Earth,
        label: "Resources",
        onClick: () => setActiveTab("content")
      }
    ),
    /* @__PURE__ */ jsx(
      TopicDetailsTab,
      {
        isActive: activeTab === "ai",
        icon: WandSparkles,
        label: "AI Tutor",
        isNew: true,
        isDisabled: !hasAITutor,
        onClick: () => setActiveTab("ai")
      }
    )
  ] });
}
function TopicDetailsTab(props) {
  const { isActive, icon: Icon, label, isNew, isDisabled, onClick } = props;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: "flex select-none disabled:pointer-events-none items-center gap-2 rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-500 hover:border-gray-400 data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white",
      "data-state": isActive ? "active" : "inactive",
      onClick,
      disabled: isDisabled,
      type: "button",
      children: [
        /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: label }),
        isNew && !isDisabled && /* @__PURE__ */ jsx("span", { className: "hidden rounded-sm bg-yellow-400 px-1 text-xs text-black 2xl:block", children: "New" }),
        isDisabled && /* @__PURE__ */ jsx("span", { className: "hidden rounded-sm bg-gray-400 px-1 text-xs text-white sm:block", children: "Soon" })
      ]
    }
  );
}

const statusColors = {
  done: "bg-green-500",
  learning: "bg-yellow-500",
  pending: "bg-gray-300",
  skipped: "bg-black",
  removed: ""
};
function ProgressDropdownItem(props) {
  const { status, shortcutKey, label, onClick } = props;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: "inline-flex justify-between px-3 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-100",
      onClick,
      children: [
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `mr-2 inline-block h-2 w-2 rounded-full ${statusColors[status]}`
            }
          ),
          label
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: shortcutKey })
      ]
    }
  );
}
function TopicProgressButton(props) {
  const { topicId, resourceId, resourceType, onClose, dropdownClassName } = props;
  const toast = useToast();
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(true);
  const [progress, setProgress] = useState("pending");
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const changeStatusRef = useRef(null);
  useOutsideClick(changeStatusRef, () => {
    setShowChangeStatus(false);
  });
  const isGuest = useMemo(() => !isLoggedIn(), []);
  useEffect(() => {
    if (!topicId || !resourceId || !resourceType) {
      return;
    }
    setIsUpdatingProgress(true);
    getTopicStatus({ topicId, resourceId, resourceType }).then((status) => {
      setIsUpdatingProgress(false);
      setProgress(status);
    }).catch(console.error);
  }, [topicId, resourceId, resourceType]);
  useKeydown(
    "d",
    (e) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (progress === "done") {
        onClose();
        return;
      }
      handleUpdateResourceProgress("done");
    },
    [progress]
  );
  useKeydown(
    "l",
    (e) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (progress === "learning") {
        return;
      }
      handleUpdateResourceProgress("learning");
    },
    [progress]
  );
  useKeydown(
    "s",
    (e) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (progress === "skipped") {
        onClose();
        return;
      }
      handleUpdateResourceProgress("skipped");
    },
    [progress]
  );
  useKeydown(
    "r",
    (e) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (progress === "pending") {
        return;
      }
      handleUpdateResourceProgress("pending");
    },
    [progress]
  );
  const handleUpdateResourceProgress = (progress2) => {
    setShowChangeStatus(false);
    if (isGuest) {
      onClose();
      showLoginPopup();
      return;
    }
    setIsUpdatingProgress(true);
    updateResourceProgress(
      {
        topicId,
        resourceId,
        resourceType
      },
      progress2
    ).then(() => {
      setProgress(progress2);
      if (progress2 !== "learning") {
        onClose();
      }
      renderTopicProgress(topicId, progress2);
      refreshProgressCounters();
    }).catch((err) => {
      toast.error(err.message || "Error updating progress");
      console.error(err);
    }).finally(() => {
      setShowChangeStatus(false);
      setIsUpdatingProgress(false);
      queryClient.invalidateQueries(
        userResourceProgressOptions(resourceType, resourceId)
      );
    });
  };
  const allowMarkingSkipped = ["pending", "learning", "done"].includes(
    progress
  );
  const allowMarkingDone = ["skipped", "pending", "learning"].includes(
    progress
  );
  const allowMarkingLearning = ["done", "skipped", "pending"].includes(
    progress
  );
  const allowMarkingPending = ["skipped", "done", "learning"].includes(
    progress
  );
  return /* @__PURE__ */ jsxs("div", { className: "relative inline-flex", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        disabled: isUpdatingProgress,
        className: cn(
          "flex 2xl:min-w-[135px] cursor-default cursor-pointer items-center rounded-md border border-gray-300 p-1 px-2 text-sm text-black hover:border-gray-400 disabled:pointer-events-none disabled:opacity-50"
        ),
        onClick: () => setShowChangeStatus(true),
        children: [
          !isUpdatingProgress && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-2 w-2", children: /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "relative inline-flex h-2 w-2 rounded-full",
                  statusColors[progress],
                  isUpdatingProgress && "animate-pulse"
                )
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: "ml-2 mr-2 capitalize", children: progress === "learning" ? "In Progress" : progress })
          ] }),
          isUpdatingProgress && /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Loader2, { strokeWidth: 3, className: "size-3 flex-shrink-0 animate-spin" }),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm", children: "Updating.." })
          ] }),
          /* @__PURE__ */ jsx(ChevronDown, { className: "ml-auto h-4 w-4" })
        ]
      }
    ),
    showChangeStatus && /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "absolute top-full right-0 z-50 mt-1 flex min-w-[160px] flex-col divide-y rounded-md border border-gray-200 bg-white shadow-md [&>button:first-child]:rounded-t-md [&>button:last-child]:rounded-b-md",
          dropdownClassName
        ),
        ref: changeStatusRef,
        children: [
          allowMarkingDone && /* @__PURE__ */ jsx(
            ProgressDropdownItem,
            {
              status: "done",
              shortcutKey: "D",
              label: "Done",
              onClick: () => handleUpdateResourceProgress("done")
            }
          ),
          allowMarkingLearning && /* @__PURE__ */ jsx(
            ProgressDropdownItem,
            {
              status: "learning",
              shortcutKey: "L",
              label: "In Progress",
              onClick: () => handleUpdateResourceProgress("learning")
            }
          ),
          allowMarkingPending && /* @__PURE__ */ jsx(
            ProgressDropdownItem,
            {
              status: "pending",
              shortcutKey: "R",
              label: "Reset",
              onClick: () => handleUpdateResourceProgress("pending")
            }
          ),
          allowMarkingSkipped && /* @__PURE__ */ jsx(
            ProgressDropdownItem,
            {
              status: "skipped",
              shortcutKey: "S",
              label: "Skip",
              onClick: () => handleUpdateResourceProgress("skipped")
            }
          )
        ]
      }
    )
  ] });
}

const paidResourcesCache = {};
const CLOSE_TOPIC_DETAIL_EVENT = "close-topic-detail";
async function fetchRoadmapPaidResources(roadmapId) {
  if (paidResourcesCache[roadmapId]) {
    return paidResourcesCache[roadmapId];
  }
  const { response, error } = await httpGet$1(
    `${undefined                              }/v1-list-roadmap-paid-resources/${roadmapId}`
  );
  if (!response || error) {
    console.error(error);
    return [];
  }
  paidResourcesCache[roadmapId] = response;
  return response;
}
const PAID_RESOURCE_DISCLAIMER_HIDDEN = "paid-resource-disclaimer-hidden";
function TopicDetail(props) {
  const {
    hasUpgradeButtons = true,
    canSubmitContribution,
    resourceId: defaultResourceId,
    isEmbed = false,
    renderer = "balsamiq",
    wrapperClassName,
    bodyClassName,
    overlayClassName,
    closeButtonClassName,
    onClose,
    shouldCloseOnBackdropClick = true,
    shouldCloseOnEscape = true,
    defaultActiveTab = "content"
  } = props;
  const [contributionUrl, setContributionUrl] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isTopicLoading, setIsTopicLoading] = useState(false);
  const [isContributing, setIsContributing] = useState(false);
  const [error, setError] = useState("");
  const [topicHtml, setTopicHtml] = useState("");
  const [hasContent, setHasContent] = useState(false);
  const [topicTitle, setTopicTitle] = useState("");
  const [links, setLinks] = useState([]);
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isCustomResource, setIsCustomResource] = useState(false);
  const [showSubjectSearchModal, setShowSubjectSearchModal] = useState(false);
  const toast = useToast();
  const [showPaidResourceDisclaimer, setShowPaidResourceDisclaimer] = useState(false);
  const { secret } = getUrlParams();
  const isGuest = useMemo(() => !isLoggedIn(), []);
  const topicRef = useRef(null);
  const [topicId, setTopicId] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [resourceType, setResourceType] = useState("roadmap");
  const [paidResources, setPaidResources] = useState([]);
  const chatId = `${resourceType}-${resourceId}-${topicId}`;
  const { messages, sendMessage, setMessages, status } = useChat({
    id: chatId,
    transport: topicDetailAiChatTransport
  });
  const sanitizedTopicId = topicId?.includes("@") ? topicId?.split("@")?.[1] : topicId;
  const { data: roadmapTreeMapping, isLoading: isRoadmapTreeMappingLoading } = useQuery(
    {
      ...roadmapTreeMappingOptions(resourceId),
      select: (data) => {
        const node = data.find(
          (mapping) => mapping.nodeId === sanitizedTopicId
        );
        return node;
      },
      enabled: !!sanitizedTopicId && !isCustomResource
    },
    queryClient
  );
  const { data: tokenUsage, isLoading: isTokenUsageLoading } = useQuery(
    aiLimitOptions(),
    queryClient
  );
  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } = useQuery(billingDetailsOptions(), queryClient);
  const isLimitExceeded = (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const isPaidUser = userBillingDetails?.status === "active";
  const isLoading = isTopicLoading || isRoadmapTreeMappingLoading || isTokenUsageLoading || isBillingDetailsLoading;
  const handleClose = () => {
    onClose?.();
    setIsActive(false);
    setIsContributing(false);
    setShowUpgradeModal(false);
    setActiveTab("content");
    setShowSubjectSearchModal(false);
    setMessages([]);
    lockBodyScroll(false);
    window.dispatchEvent(new Event(CLOSE_TOPIC_DETAIL_EVENT));
  };
  useOutsideClick(
    topicRef,
    shouldCloseOnBackdropClick ? handleClose : void 0
  );
  useKeydown("Escape", shouldCloseOnEscape ? handleClose : void 0);
  useEffect(() => {
    if (resourceType !== "roadmap" || !defaultResourceId) {
      return;
    }
    setShowPaidResourceDisclaimer(
      localStorage.getItem(PAID_RESOURCE_DISCLAIMER_HIDDEN) !== "true"
    );
    fetchRoadmapPaidResources(defaultResourceId).then((resources) => {
      setPaidResources(resources);
    });
  }, [defaultResourceId]);
  useToggleTopic(({ topicId: topicId2, resourceType: resourceType2, resourceId: resourceId2 }) => {
    if (isGuest) {
      showLoginPopup();
      return;
    }
    pageProgressMessage.set("Updating");
    isTopicDone({ topicId: topicId2, resourceId: resourceId2, resourceType: resourceType2 }).then(
      (oldIsDone) => updateResourceProgress(
        {
          topicId: topicId2,
          resourceId: resourceId2,
          resourceType: resourceType2
        },
        oldIsDone ? "pending" : "done"
      )
    ).then(({ done = [] }) => {
      renderTopicProgress(
        topicId2,
        done.includes(topicId2) ? "done" : "pending"
      );
      refreshProgressCounters();
    }).catch((err) => {
      toast.error(err.message);
      console.error(err);
    }).finally(() => {
      pageProgressMessage.set("");
    });
  });
  useLoadTopic(({ topicId: topicId2, resourceType: resourceType2, resourceId: resourceId2, isCustomResource: isCustomResource2 }) => {
    setError("");
    setIsTopicLoading(true);
    setIsActive(true);
    setTopicId(topicId2);
    setResourceType(resourceType2);
    setResourceId(resourceId2);
    setIsCustomResource(isCustomResource2);
    const topicPartial = topicId2.replaceAll(":", "/");
    let topicUrl = resourceType2 === "roadmap" ? `/${resourceId2}/${topicPartial}` : `/best-practices/${resourceId2}/${topicPartial}`;
    if (isCustomResource2) {
      topicUrl = `${undefined                              }/v1-get-node-content/${resourceId2}/${topicId2}${secret ? `?secret=${secret}` : ""}`;
    }
    httpGet$1(
      topicUrl,
      {},
      {
        ...!isCustomResource2 && {
          headers: {
            Accept: "text/html"
          }
        }
      }
    ).then(({ response }) => {
      if (!response) {
        setError("Topic not found.");
        setIsTopicLoading(false);
        return;
      }
      let topicHtml2 = "";
      if (!isCustomResource2) {
        const topicDom = new DOMParser().parseFromString(
          response,
          "text/html"
        );
        topicDom.querySelectorAll("a");
        const urlElem = topicDom.querySelector("[data-github-url]");
        const contributionUrl2 = urlElem?.dataset?.githubUrl || "";
        topicDom.querySelector("h1");
        const otherElems = topicDom.querySelectorAll("body > *:not(h1, div)");
        let ulWithLinks = document.createElement("ul");
        topicDom.querySelectorAll("ul").forEach((ul) => {
          const lisWithJustLinks = Array.from(
            ul.querySelectorAll("li")
          ).filter((li) => {
            return li.children.length === 1 && li.children[0].tagName === "A" && li.children[0].textContent === li.textContent;
          });
          if (lisWithJustLinks.length > 0) {
            ulWithLinks = ul;
          }
        });
        const listLinks = Array.from(ulWithLinks.querySelectorAll("li > a")).map((link, counter) => {
          const typePattern = /@([a-z.]+)@/;
          let linkText = link.textContent || "";
          const linkHref = link.getAttribute("href") || "";
          const linkType = linkText.match(typePattern)?.[1] || "article";
          linkText = linkText.replace(typePattern, "");
          return {
            id: `link-${linkHref}-${counter}`,
            title: linkText,
            url: linkHref,
            type: linkType
          };
        }).sort((a, b) => {
          const order = [
            "official",
            "opensource",
            "article",
            "video",
            "feed"
          ];
          return order.indexOf(a.type) - order.indexOf(b.type);
        });
        if (ulWithLinks) {
          ulWithLinks.remove();
        }
        topicHtml2 = topicDom.body.innerHTML;
        const topicHasContent = otherElems.length > 0;
        setLinks(listLinks);
        setHasContent(topicHasContent);
        setContributionUrl(contributionUrl2);
        if (!topicHasContent && renderer === "editor") {
          setActiveTab("ai");
        }
      } else {
        setLinks(response?.links || []);
        setTopicTitle(response?.title || "");
        const sanitizedMarkdown = sanitizeMarkdown(
          response.description || ""
        );
        setHasContent(sanitizedMarkdown?.length > 0);
        topicHtml2 = markdownToHtml(sanitizedMarkdown, false);
      }
      setIsTopicLoading(false);
      setTopicHtml(topicHtml2);
    }).catch((err) => {
      setError("Something went wrong. Please try again later.");
      setIsTopicLoading(false);
    });
  });
  useEffect(() => {
    if (isActive) {
      lockBodyScroll(true);
      topicRef?.current?.focus();
    }
  }, [isActive]);
  if (!isActive) {
    return null;
  }
  const paidResourcesForTopic = paidResources.filter((resource) => {
    const normalizedTopicId = topicId.indexOf("@") !== -1 ? topicId.split("@")[1] : topicId;
    return resource.topicIds.includes(normalizedTopicId);
  });
  const shouldShowAiTab = !isCustomResource && resourceType === "roadmap";
  const subjects = roadmapTreeMapping?.subjects || [];
  const guides = roadmapTreeMapping?.guides || [];
  const hasSubjects = subjects.length > 0;
  const hasGuides = guides.length > 0;
  const hasDataCampResources = paidResources.some(
    (resource) => resource.title.toLowerCase().includes("datacamp")
  );
  return /* @__PURE__ */ jsxs("div", { className: cn("relative z-92", wrapperClassName), children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: topicRef,
        tabIndex: 0,
        className: cn(
          "fixed top-0 right-0 z-40 flex h-screen w-full flex-col overflow-y-auto bg-white p-4 focus:outline-0 sm:max-w-[600px] sm:p-6",
          bodyClassName
        ),
        children: [
          showUpgradeModal && /* @__PURE__ */ jsx(UpgradeAccountModal, { onClose: () => setShowUpgradeModal(false) }),
          showSubjectSearchModal && /* @__PURE__ */ jsx(CreateCourseModal, { onClose: () => setShowSubjectSearchModal(false) }),
          isLoading && /* @__PURE__ */ jsx("div", { className: "flex h-full w-full justify-center", children: /* @__PURE__ */ jsx(
            Spinner,
            {
              outerFill: "#d1d5db",
              className: "h-6 w-6 sm:h-8 sm:w-8",
              innerFill: "#2563eb",
              isDualRing: false
            }
          ) }),
          !isContributing && !isLoading && !error && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn("flex-1", {
                  "flex flex-col": activeTab === "ai"
                }),
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                    shouldShowAiTab && /* @__PURE__ */ jsx(
                      TopicDetailsTabs,
                      {
                        activeTab,
                        setActiveTab,
                        hasAITutor: renderer === "editor"
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: cn("flex flex-grow justify-end gap-1", {
                          "justify-between": !shouldShowAiTab
                        }),
                        children: [
                          !isEmbed && /* @__PURE__ */ jsx(
                            TopicProgressButton,
                            {
                              topicId: topicId.indexOf("@") !== -1 ? topicId.split("@")[1] : topicId,
                              dropdownClassName: !shouldShowAiTab ? "left-0" : "right-0",
                              resourceId,
                              resourceType,
                              onClose: () => null
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              id: "close-topic",
                              className: cn(
                                "flex items-center gap-1.5 rounded-lg bg-gray-200 px-1.5 py-1 text-xs text-black hover:bg-gray-300 hover:text-gray-900",
                                closeButtonClassName
                              ),
                              onClick: handleClose,
                              children: /* @__PURE__ */ jsx(X, { className: "size-4" })
                            }
                          )
                        ]
                      }
                    )
                  ] }),
                  activeTab === "ai" && shouldShowAiTab && /* @__PURE__ */ jsx(
                    TopicDetailAI,
                    {
                      resourceId,
                      resourceType,
                      topicId,
                      messages,
                      setMessages,
                      status,
                      sendMessage,
                      hasUpgradeButtons,
                      onUpgrade: () => setShowUpgradeModal(true),
                      onLogin: () => {
                        handleClose();
                        showLoginPopup();
                      },
                      onShowSubjectSearchModal: () => {
                        if (!isLoggedIn()) {
                          showLoginPopup();
                          return;
                        }
                        setShowSubjectSearchModal(true);
                      }
                    }
                  ),
                  activeTab === "content" && /* @__PURE__ */ jsxs(Fragment, { children: [
                    hasContent ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "prose prose-quoteless prose-h1:mb-2.5 prose-h1:mt-7 prose-h1:text-balance prose-h2:mb-3 prose-h2:mt-0 prose-h3:mb-[5px] prose-h3:mt-[10px] prose-p:mb-2 prose-p:mt-0 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-li:m-0 prose-li:mb-0.5", children: [
                      topicTitle && /* @__PURE__ */ jsx("h1", { children: topicTitle }),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          id: "topic-content",
                          dangerouslySetInnerHTML: { __html: topicHtml }
                        }
                      )
                    ] }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      !canSubmitContribution && /* @__PURE__ */ jsxs("div", { className: "flex h-[calc(100%-38px)] flex-col items-center justify-center", children: [
                        /* @__PURE__ */ jsx(FileText, { className: "h-16 w-16 text-gray-300" }),
                        /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg font-medium text-gray-500", children: "Empty Content" })
                      ] }),
                      canSubmitContribution && /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-[calc(100%-38px)] max-w-[400px] flex-col items-center justify-center text-center", children: [
                        /* @__PURE__ */ jsx(HeartHandshake, { className: "mb-2 h-16 w-16 text-gray-300" }),
                        /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-gray-900", children: "Help us write this content" }),
                        /* @__PURE__ */ jsx("p", { className: "mt-2 mb-3 text-sm text-gray-500", children: "Write a brief introduction to this topic and submit a link to a good article, podcast, video, or any other self-vetted resource that helped you understand this topic better." }),
                        /* @__PURE__ */ jsxs(
                          "a",
                          {
                            href: contributionUrl,
                            target: "_blank",
                            className: "flex w-full items-center justify-center rounded-md bg-gray-800 p-2 text-sm text-white transition-colors hover:bg-black hover:text-white disabled:bg-green-200 disabled:text-black",
                            children: [
                              /* @__PURE__ */ jsx(GitHubIcon, { className: "mr-2 inline-block h-4 w-4 text-white" }),
                              "Help us Write this Content"
                            ]
                          }
                        )
                      ] })
                    ] }),
                    resourceId === "ai-data-scientist" && hasDataCampResources && /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-md bg-yellow-100 px-4 py-3 text-sm text-gray-600", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-balance", children: "Follow the resources listed on the roadmap or check out the premium courses by DataCamp listed below." }),
                      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-balance", children: [
                        "They also have an",
                        " ",
                        /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: "https://datacamp.pxf.io/POk5PY",
                            className: "font-medium text-blue-600 underline hover:text-blue-800",
                            target: "_blank",
                            children: "Associate Data Scientist in Python"
                          }
                        ),
                        " ",
                        "track that covers all the key data scientist skills in one place."
                      ] })
                    ] }),
                    links.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(
                        ResourceListSeparator,
                        {
                          text: "Free Resources",
                          className: "text-green-600",
                          icon: HeartHandshake
                        }
                      ),
                      /* @__PURE__ */ jsx("ul", { className: "mt-4 ml-3 space-y-1", children: links.map((link) => {
                        return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                          TopicDetailLink,
                          {
                            url: link.url,
                            type: link.type,
                            title: link.title,
                            onClick: () => {
                              if (canSubmitContribution) {
                                const parsedUrl = parseUrl(link.url);
                                window.fireEvent({
                                  category: "TopicResourceClick",
                                  action: `Click: ${parsedUrl.hostname}`,
                                  label: `${resourceType} / ${resourceId} / ${topicId} / ${link.url}`
                                });
                              }
                            }
                          }
                        ) }, link.id);
                      }) })
                    ] }),
                    (hasSubjects || hasGuides) && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(
                        ResourceListSeparator,
                        {
                          text: "Your personalized AI tutor",
                          className: "text-blue-600",
                          icon: Zap
                        }
                      ),
                      /* @__PURE__ */ jsxs("ul", { className: "mt-4 ml-3 flex flex-col flex-wrap gap-1 text-sm", children: [
                        subjects.map((subject) => {
                          return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                            TopicDetailLink,
                            {
                              url: `/ai/course/search?term=${subject}&src=topic`,
                              type: "course",
                              title: subject,
                              onClick: (e) => {
                                if (!isLoggedIn()) {
                                  e.preventDefault();
                                  showLoginPopup();
                                  return;
                                }
                                if (isLimitExceeded && !isPaidUser) {
                                  e.preventDefault();
                                  setShowUpgradeModal(true);
                                  return;
                                }
                              }
                            }
                          ) }, subject);
                        }),
                        guides.map((guide) => {
                          return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                            TopicDetailLink,
                            {
                              url: `/ai/guide/search?term=${guide}&src=topic`,
                              type: "article",
                              title: guide,
                              onClick: (e) => {
                                if (!isLoggedIn()) {
                                  e.preventDefault();
                                  showLoginPopup();
                                  return;
                                }
                                if (isLimitExceeded && !isPaidUser) {
                                  e.preventDefault();
                                  setShowUpgradeModal(true);
                                  return;
                                }
                              }
                            }
                          ) }, guide);
                        })
                      ] })
                    ] }),
                    paidResourcesForTopic.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(
                        ResourceListSeparator,
                        {
                          text: "Premium Resources",
                          icon: Star
                        }
                      ),
                      /* @__PURE__ */ jsx("ul", { className: "mt-3 ml-3 space-y-1", children: paidResourcesForTopic.map((resource) => {
                        return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                          TopicDetailLink,
                          {
                            url: resource.url,
                            type: resource.type,
                            title: resource.title,
                            isPaid: true
                          }
                        ) }, resource._id);
                      }) }),
                      showPaidResourceDisclaimer && /* @__PURE__ */ jsx(
                        PaidResourceDisclaimer,
                        {
                          onClose: () => {
                            localStorage.setItem(
                              PAID_RESOURCE_DISCLAIMER_HIDDEN,
                              "true"
                            );
                            setShowPaidResourceDisclaimer(false);
                          }
                        }
                      )
                    ] })
                  ] })
                ]
              }
            ),
            canSubmitContribution && contributionUrl && activeTab === "content" && hasContent && /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: contributionUrl,
                target: "_blank",
                className: "hidden items-center justify-center rounded-md px-2 py-2 text-sm transition-all hover:bg-gray-200 sm:flex",
                children: [
                  /* @__PURE__ */ jsx(GitHubIcon, { className: "mr-2 inline-block h-4 w-4 text-current" }),
                  "Help us add resources to this topic"
                ]
              }
            ) })
          ] }),
          !isContributing && !isLoading && error && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                id: "close-topic",
                className: "absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900",
                onClick: () => {
                  handleClose();
                },
                children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col items-center justify-center", children: [
              /* @__PURE__ */ jsx(Ban, { className: "h-16 w-16 text-red-500" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg font-medium text-red-500", children: error })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn("fixed inset-0 z-30 bg-gray-900/50", overlayClassName)
      }
    )
  ] });
}

export { CLOSE_TOPIC_DETAIL_EVENT as C, Markdown as M, TopicDetail as T, useAIChatScroll as a, chatRoadmapTransport as c, roadmapTreeMappingOptions as r, useIsThinking as u };
