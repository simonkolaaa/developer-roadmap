import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect, Fragment as Fragment$1 } from 'react';
import { s as slugify } from './slugger_ChlNJxtz.mjs';
import { C as CodeBlockHeader, a as CodeBlockItem, b as CodeBlockContent } from './CodeBlock_BDvKc0cy.mjs';
import { ChevronLeft, ChevronRight, CheckCircle, Sparkles, SkipForward, RotateCcw, PartyPopper, ThumbsUp, RefreshCcw, CheckCircleIcon, SparklesIcon, SkipForwardIcon } from 'lucide-react';
import { c as cn } from './BaseLayout_DetAB5fP.mjs';
import ReactConfetti from 'react-confetti';

function QuestionsProgress(props) {
  const {
    isLoading = false,
    knowCount = 0,
    didNotKnowCount = 0,
    totalCount = 0,
    skippedCount = 0,
    onResetClick = () => null,
    onPrevClick = () => null,
    onNextClick = () => null
  } = props;
  const totalSolved = knowCount + didNotKnowCount + skippedCount;
  const donePercentage = totalSolved / totalCount * 100;
  return /* @__PURE__ */ jsxs("div", { className: "mb-3 overflow-hidden rounded-lg border border-gray-300 bg-white p-4 sm:mb-5 sm:p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center text-gray-600", children: [
      /* @__PURE__ */ jsx("div", { className: "relative w-full flex-1 rounded-xl bg-gray-200 p-1", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-0 bottom-0 left-0 rounded-xl bg-slate-800 transition-[width] duration-400",
          style: {
            width: `${donePercentage}%`
          }
        }
      ) }),
      /* @__PURE__ */ jsxs("span", { className: "ml-3 flex items-center text-sm", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onPrevClick,
            className: "text-zinc-400 hover:text-black",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4", strokeWidth: 3 })
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "block min-w-[41px] text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: totalSolved }),
          " / ",
          totalCount
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onNextClick,
            className: "text-zinc-400 hover:text-black",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4", strokeWidth: 3 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative -left-1 flex flex-col gap-2 text-sm text-black sm:flex-row sm:gap-3", children: [
      /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "mr-1 h-4" }),
        /* @__PURE__ */ jsx("span", { children: "Knew" }),
        /* @__PURE__ */ jsxs("span", { className: "ml-2 rounded-md bg-gray-200/80 px-1.5 font-medium text-black", children: [
          /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: knowCount }),
          " Items"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "mr-1 h-4" }),
        /* @__PURE__ */ jsx("span", { children: "Learnt" }),
        /* @__PURE__ */ jsxs("span", { className: "ml-2 rounded-md bg-gray-200/80 px-1.5 font-medium text-black", children: [
          /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: didNotKnowCount }),
          " Items"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(SkipForward, { className: "mr-1 h-4" }),
        /* @__PURE__ */ jsx("span", { children: "Skipped" }),
        /* @__PURE__ */ jsxs("span", { className: "ml-2 rounded-md bg-gray-200/80 px-1.5 font-medium text-black", children: [
          /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: skippedCount }),
          " Items"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          disabled: isLoading,
          onClick: onResetClick,
          className: "flex items-center text-red-600 transition-opacity duration-300 hover:text-red-900 disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsx(RotateCcw, { className: "mr-1 h-4" }),
            "Reset",
            /* @__PURE__ */ jsx("span", { className: "inline lg:hidden", children: "Progress" })
          ]
        }
      )
    ] })
  ] });
}

function ProgressStatLabel(props) {
  const { icon, label, count } = props;
  return /* @__PURE__ */ jsxs("span", { className: "group relative flex flex-1 items-center overflow-hidden rounded-md border border-gray-300 bg-white px-2 py-2 text-sm text-black transition-colors disabled:opacity-50 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base", children: [
    icon,
    /* @__PURE__ */ jsxs("span", { className: "flex grow justify-between", children: [
      /* @__PURE__ */ jsx("span", { children: label }),
      /* @__PURE__ */ jsx("span", { children: count })
    ] })
  ] });
}
function QuestionFinished(props) {
  const { knowCount, didNotKnowCount, skippedCount, onReset } = props;
  return /* @__PURE__ */ jsxs("div", { className: "relative flex grow flex-col items-center justify-center px-4 sm:px-0", children: [
    /* @__PURE__ */ jsx(PartyPopper, { className: "mb-4 mt-10 h-14 w-14 text-gray-300 sm:mt-0 sm:h-24 sm:w-24" }),
    /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold text-gray-700 sm:text-2xl", children: "Questions Finished" }),
    /* @__PURE__ */ jsxs("p", { className: "mt-0 text-sm text-gray-500 sm:mt-2 sm:text-base", children: [
      "Click below revisit",
      " ",
      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "specific or all questions" }),
      " ",
      /* @__PURE__ */ jsx("span", { className: "inline sm:hidden", children: "questions" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-5 mt-5 flex w-full flex-col gap-1.5 px-2 sm:flex-row sm:gap-3 sm:px-16", children: [
      /* @__PURE__ */ jsx(
        ProgressStatLabel,
        {
          icon: /* @__PURE__ */ jsx(ThumbsUp, { className: "mr-1 h-4" }),
          label: "Knew",
          count: knowCount
        }
      ),
      /* @__PURE__ */ jsx(
        ProgressStatLabel,
        {
          icon: /* @__PURE__ */ jsx(Sparkles, { className: "mr-1 h-4" }),
          label: "Learned",
          count: didNotKnowCount
        }
      ),
      /* @__PURE__ */ jsx(
        ProgressStatLabel,
        {
          icon: /* @__PURE__ */ jsx(SkipForward, { className: "mr-1 h-4" }),
          label: "Skipped",
          count: skippedCount
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 mt-2 text-sm sm:mb-0", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => onReset(),
        className: "flex items-center gap-0.5 text-sm text-red-700 hover:text-black sm:text-base",
        children: [
          /* @__PURE__ */ jsx(RefreshCcw, { className: "mr-1 h-4" }),
          "Restart Asking"
        ]
      }
    ) })
  ] });
}

function QuestionCard(props) {
  const { question } = props;
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const answerRef = useRef(null);
  const questionRef = useRef(null);
  useEffect(() => {
    if (isAnswerVisible) {
      const answerHeight = answerRef.current?.clientHeight || 0;
      const questionHeight = questionRef.current?.clientHeight || 0;
      if (answerHeight > questionHeight) {
        questionRef.current.style.height = `${answerHeight}px`;
      }
    } else {
      questionRef.current.style.height = `auto`;
    }
    const questionTop = (questionRef.current?.getBoundingClientRect().top || 0) - 147;
    if (questionTop < 0) {
      window.scrollTo({
        top: window.scrollY + questionTop - 10
      });
    }
  }, [isAnswerVisible]);
  useEffect(() => {
    setIsAnswerVisible(false);
  }, [question]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: questionRef,
        className: `flex grow flex-col items-center justify-center py-5 sm:py-8`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "hidden text-gray-400 sm:block", children: question.topics?.map((topic, counter) => {
            const totalTopics = question.topics?.length || 0;
            return /* @__PURE__ */ jsxs(Fragment$1, { children: [
              /* @__PURE__ */ jsx("span", { className: "capitalize", children: topic }),
              counter !== totalTopics - 1 && /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" })
            ] }, topic);
          }) }),
          /* @__PURE__ */ jsx("div", { className: "mx-auto flex max-w-[550px] flex-1 items-center justify-center py-3 sm:py-8", children: /* @__PURE__ */ jsx("p", { className: "px-4 text-xl leading-snug! font-semibold text-black sm:text-3xl", children: question.question }) }),
          /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setIsAnswerVisible(true);
              },
              className: "cursor-pointer text-sm text-gray-500 underline underline-offset-4 transition-colors hover:text-black sm:text-base",
              children: "Click to Reveal the Answer"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: answerRef,
        className: cn(
          "absolute right-0 left-0 flex flex-col items-center justify-center rounded-[7px] bg-neutral-100 py-4 text-sm leading-normal text-black transition-all duration-300 sm:py-8 sm:text-xl",
          isAnswerVisible ? "top-0 min-h-[248px] sm:min-h-[398px]" : "top-full"
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "qa-answer prose prose-h5:font-semibold prose-h5:mb-2 prose-h5:text-black prose-sm prose-quoteless prose-h1:mb-2.5 prose-h1:mt-7 prose-h2:mb-3 prose-h2:mt-0 prose-h3:mb-[5px] prose-h3:mt-[10px] prose-p:mb-2 prose-p:mt-0 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-pre:mb-6! prose-pre:w-full prose-ul:my-2 prose-li:m-0 prose-li:mb-0.5 prose-li:[&>p]:mb-0 sm:prose-p:mb-4 mx-auto flex w-full max-w-[600px] grow flex-col items-start justify-center px-4 py-0 text-left text-sm sm:px-5 sm:text-lg", children: guideRenderer.render(question.answer) }),
          /* @__PURE__ */ jsx("div", { className: "mt-7 text-center", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setIsAnswerVisible(false);
              },
              className: "cursor-pointer text-sm text-gray-500 underline underline-offset-4 transition-colors hover:text-black sm:text-base",
              children: "Hide the Answer"
            }
          ) })
        ]
      }
    )
  ] });
}

function Confetti(props) {
  const { element = document.body, onDone = () => null, pieces = 40 } = props;
  const [confettiPos, setConfettiPos] = useState();
  function populateConfettiPosition(element2) {
    const elRect = element2.getBoundingClientRect();
    setConfettiPos({
      x: elRect?.x || 0,
      y: (elRect?.y || 0) + window.scrollY,
      w: elRect?.width || 0,
      h: elRect?.height || 0
    });
  }
  useEffect(() => {
    if (!element) {
      setConfettiPos(void 0);
      return;
    }
    populateConfettiPosition(element);
  }, [element]);
  if (!confettiPos) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    ReactConfetti,
    {
      height: document.body.scrollHeight,
      numberOfPieces: pieces,
      recycle: false,
      onConfettiComplete: (confettiInstance) => {
        setConfettiPos(void 0);
        onDone();
      },
      initialVelocityX: 4,
      initialVelocityY: 8,
      tweenDuration: 10,
      confettiSource: {
        x: confettiPos.x,
        y: confettiPos.y,
        w: confettiPos.w,
        h: confettiPos.h
      }
    }
  );
}

function QuestionsList(props) {
  const { questions, className } = props;
  const [showConfetti, setShowConfetti] = useState(false);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [userProgress, setUserProgress] = useState({
    know: [],
    dontKnow: [],
    skip: []
  });
  const containerRef = useRef(null);
  async function resetProgress() {
    setCurrQuestionIndex(0);
    setUserProgress({
      know: [],
      dontKnow: [],
      skip: []
    });
  }
  function updateQuestionStatus(status, questionId) {
    let newProgress = userProgress || { know: [], dontKnow: [], skip: [] };
    if (status === "know") {
      newProgress.know.push(questionId);
    } else if (status == "dontKnow") {
      newProgress.dontKnow.push(questionId);
    } else if (status == "skip") {
      newProgress.skip.push(questionId);
    }
    const nextQuestionIndex = currQuestionIndex + 1;
    setUserProgress(newProgress);
    if (!nextQuestionIndex || !questions[nextQuestionIndex]) {
      setShowConfetti(true);
    }
    setCurrQuestionIndex(nextQuestionIndex);
  }
  const knowCount = userProgress?.know.length || 0;
  const dontKnowCount = userProgress?.dontKnow.length || 0;
  const skipCount = userProgress?.skip.length || 0;
  const hasProgress = knowCount > 0 || dontKnowCount > 0 || skipCount > 0;
  const currQuestion = questions[currQuestionIndex];
  const hasFinished = hasProgress && currQuestionIndex === -1;
  return /* @__PURE__ */ jsxs("div", { className: cn("mb-0 gap-3 text-center sm:mb-40", className), children: [
    /* @__PURE__ */ jsx(
      QuestionsProgress,
      {
        knowCount,
        didNotKnowCount: dontKnowCount,
        skippedCount: skipCount,
        totalCount: questions?.length,
        onResetClick: () => {
          resetProgress().finally(() => null);
        },
        onNextClick: () => {
          if (currQuestionIndex !== -1 && currQuestionIndex < questions.length - 1) {
            updateQuestionStatus("skip", currQuestion.id);
          }
        },
        onPrevClick: () => {
          if (currQuestionIndex > 0) {
            const prevQuestion = questions[currQuestionIndex - 1];
            const tempUserProgress = {
              know: userProgress?.know.filter((id) => id !== prevQuestion.id) || [],
              dontKnow: userProgress?.dontKnow.filter((id) => id !== prevQuestion.id) || [],
              skip: userProgress?.skip.filter((id) => id !== prevQuestion.id) || []
            };
            setUserProgress(tempUserProgress);
            setCurrQuestionIndex(currQuestionIndex - 1);
          }
        }
      }
    ),
    showConfetti && containerRef.current && /* @__PURE__ */ jsx(
      Confetti,
      {
        pieces: 100,
        element: containerRef.current,
        onDone: () => {
          setShowConfetti(false);
        }
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: containerRef,
        className: "relative mb-4 flex min-h-[250px] w-full overflow-hidden rounded-lg border border-gray-300 bg-white sm:min-h-[400px]",
        children: [
          hasFinished && /* @__PURE__ */ jsx(
            QuestionFinished,
            {
              totalCount: questions?.length || 0,
              knowCount,
              didNotKnowCount: dontKnowCount,
              skippedCount: skipCount,
              onReset: () => {
                resetProgress().finally(() => null);
              }
            }
          ),
          currQuestion && /* @__PURE__ */ jsx(QuestionCard, { question: currQuestion })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "flex flex-col gap-1 transition-opacity duration-300 sm:flex-row sm:gap-3",
          hasFinished ? "opacity-0" : "opacity-100"
        ),
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              disabled: !currQuestion,
              onClick: (e) => {
                e.stopPropagation();
                e.preventDefault();
                updateQuestionStatus("know", currQuestion.id);
              },
              className: "flex flex-1 items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm text-black transition-colors hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50 sm:rounded-lg sm:px-4 sm:py-3 sm:text-base",
              children: [
                /* @__PURE__ */ jsx(CheckCircleIcon, { className: "mr-1 h-4 text-current" }),
                "Already Know that"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                updateQuestionStatus("dontKnow", currQuestion.id);
              },
              disabled: !currQuestion,
              className: "flex flex-1 items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm text-black transition-colors hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50 sm:rounded-lg sm:px-4 sm:py-3 sm:text-base",
              children: [
                /* @__PURE__ */ jsx(SparklesIcon, { className: "mr-1 h-4 text-current" }),
                "Didn't Know that"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                updateQuestionStatus("skip", currQuestion.id);
              },
              disabled: !currQuestion,
              "data-next-question": "skip",
              className: "flex flex-1 items-center rounded-md border border-red-600 px-2 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white disabled:pointer-events-none disabled:opacity-50 sm:rounded-lg sm:px-4 sm:py-3 sm:text-base",
              children: [
                /* @__PURE__ */ jsx(SkipForwardIcon, { className: "mr-1 h-4" }),
                "Skip Question"
              ]
            }
          )
        ]
      }
    )
  ] });
}

class GuideRenderer {
  marksOrder = ["underline", "bold", "italic", "textStyle", "link"];
  render(content) {
    const nodes = content.content || [];
    const jsxNodes = nodes.map((node, index) => {
      const component = this.renderNode(node);
      if (!component) {
        return null;
      }
      return /* @__PURE__ */ jsx(Fragment$1, { children: component }, `${node.type}-${index}`);
    }).filter(Boolean);
    return jsxNodes;
  }
  tableOfContents(node) {
    const headlines = this.headlines(node);
    let toc = [];
    let currentGroup = null;
    const hasQASection = node.content?.some(
      (node2) => node2.type === "qaSection"
    );
    headlines.filter((heading) => heading.level !== 1).forEach((heading) => {
      if (heading.level === 2) {
        currentGroup = { ...heading, children: [] };
        toc.push(currentGroup);
      } else if (currentGroup && heading.level === 3) {
        currentGroup.children.push({ ...heading, text: heading.text });
      }
    });
    const qaSection = node.content?.find((node2) => node2.type === "qaSection");
    if (hasQASection && qaSection) {
      toc.push({
        level: 2,
        text: "Test yourself with Flashcards",
        slug: "test-with-flashcards",
        children: []
      });
      const questions = this.questions(qaSection);
      const topicsInOrder = [
        ...new Set(
          questions.map((question) => question.topics).flat().filter(Boolean)
        )
      ];
      toc.push({
        level: 2,
        text: "Questions List",
        slug: "questions-list",
        children: topicsInOrder.map((topic) => {
          let topicText = topic;
          let topicSlug = slugify(topic);
          if (topic.toLowerCase() === "beginners") {
            topicText = "Beginner Level";
            topicSlug = "beginner-level";
          } else if (topic.toLowerCase() === "intermediate") {
            topicText = "Intermediate Level";
            topicSlug = "intermediate";
          } else if (topic.toLowerCase() === "advanced") {
            topicText = "Advanced Level";
            topicSlug = "advanced";
          }
          return {
            level: 2,
            children: [],
            slug: topicSlug,
            text: topicText
          };
        })
      });
    }
    if (toc.length > 5) {
      toc.forEach((group) => {
        group.children = [];
      });
    }
    return toc;
  }
  headlines(node) {
    const nodes = node.content || [];
    const headlines = [];
    let hasFoundQASection = false;
    const extractHeadlines = (node2) => {
      if (node2.type === "qaSection" || hasFoundQASection) {
        hasFoundQASection = true;
        return;
      }
      if (node2.type === "heading") {
        const text = this.getText(node2);
        headlines.push({
          level: node2.attrs?.level || 1,
          text,
          slug: slugify(text)
        });
      }
      if (node2.content) {
        node2.content.forEach((childNode) => {
          extractHeadlines(childNode);
        });
      }
    };
    nodes.forEach((childNode) => {
      extractHeadlines(childNode);
    });
    return headlines;
  }
  getText(node) {
    if (node.type === "text") {
      return node.text || "";
    }
    if (node.content) {
      return node.content.map((childNode) => this.getText(childNode)).join("");
    }
    return "";
  }
  // `content` will call corresponding node type
  // and return text content
  content(node) {
    const allNodes = node.content || [];
    return allNodes.map((childNode, index) => {
      const component = this.renderNode(childNode);
      if (!component) {
        return null;
      }
      return /* @__PURE__ */ jsx(Fragment$1, { children: component }, `${childNode.type}-${index}`);
    }).filter(Boolean);
  }
  // `renderNode` will call the method of the corresponding node type
  renderNode(node) {
    const type = node.type || "";
    if (type in this) {
      return this[type]?.(node);
    }
    console.log(`Node type "${type}" is not supported.`);
    return null;
  }
  // `renderMark` will call the method of the corresponding mark type
  renderMark(node) {
    const text = node?.text || /* @__PURE__ */ jsx(Fragment, { children: " " });
    let marks = node?.marks || [];
    marks.sort((a, b) => {
      return this.marksOrder.indexOf(a.type) - this.marksOrder.indexOf(b.type);
    });
    return marks.reduce(
      (acc, mark) => {
        const type = mark.type;
        if (type in this) {
          return this[type]?.(mark, acc);
        }
        throw new Error(`Mark type "${type}" is not supported.`);
      },
      /* @__PURE__ */ jsx(Fragment, { children: text })
    );
  }
  paragraph(node) {
    const isEmpty = !node.content || node.content?.every(
      (child) => child.type === "text" && child.text === ""
    );
    if (isEmpty) {
      return /* @__PURE__ */ jsx(Fragment, {});
    }
    return /* @__PURE__ */ jsx("p", { children: this.content(node) });
  }
  text(node) {
    if (node.marks) {
      return this.renderMark(node);
    }
    const text = node.text;
    return text ? /* @__PURE__ */ jsx(Fragment, { children: text }) : /* @__PURE__ */ jsx(Fragment, { children: " " });
  }
  bold(_, text) {
    return /* @__PURE__ */ jsx("strong", { children: text });
  }
  italic(_, text) {
    return /* @__PURE__ */ jsx("em", { children: text });
  }
  underline(_, text) {
    return /* @__PURE__ */ jsx("u", { children: text });
  }
  strike(_, text) {
    return /* @__PURE__ */ jsx("s", { style: { textDecoration: "line-through" }, children: text });
  }
  textStyle(mark, text) {
    const { attrs } = mark;
    const { color = "inherit" } = attrs || {};
    return /* @__PURE__ */ jsx(
      "span",
      {
        style: {
          color
        },
        children: text
      }
    );
  }
  link(mark, text) {
    const { attrs } = mark;
    const { href } = attrs || {};
    const isExternal = href?.startsWith("http");
    const isRoadmapUrl = href?.startsWith("https://roadmap.sh/");
    const rel = isExternal && !isRoadmapUrl ? "noopener noreferrer" : void 0;
    return /* @__PURE__ */ jsx("a", { href, target: "_blank", rel, children: text });
  }
  heading(node) {
    const { attrs } = node;
    const { level } = attrs || {};
    const text = this.getText(node);
    const slug = slugify(text);
    let Comp = "h1";
    if (level === 2) {
      Comp = "h2";
    } else if (level === 3) {
      Comp = "h3";
    } else if (level === 4) {
      Comp = "h4";
    } else if (level === 5) {
      Comp = "h5";
    } else if (level === 6) {
      Comp = "h6";
    }
    return /* @__PURE__ */ jsx(Comp, { id: slug, children: this.content(node) });
  }
  horizontalRule(_) {
    return /* @__PURE__ */ jsx("hr", {});
  }
  orderedList(node) {
    return /* @__PURE__ */ jsx("ol", { children: this.content(node) });
  }
  bulletList(node) {
    return /* @__PURE__ */ jsx("ul", { children: this.content(node) });
  }
  listItem(node) {
    return /* @__PURE__ */ jsx("li", { children: this.content(node) });
  }
  hardBreak(_) {
    return /* @__PURE__ */ jsx("br", {});
  }
  image(node) {
    const { attrs } = node;
    const { src, alt } = attrs || {};
    return /* @__PURE__ */ jsx("img", { alt: alt || "Image", src });
  }
  code(_, text) {
    return /* @__PURE__ */ jsx("code", { children: text });
  }
  codeBlock(node) {
    const code = this.getText(node);
    const language = node.attrs?.language || "javascript";
    return /* @__PURE__ */ jsxs("div", { className: "not-prose my-6 w-full max-w-full overflow-hidden rounded-lg border border-gray-200", children: [
      /* @__PURE__ */ jsx(CodeBlockHeader, { language, code }),
      /* @__PURE__ */ jsx(CodeBlockItem, { value: language, lineNumbers: false, children: /* @__PURE__ */ jsx(CodeBlockContent, { language, children: code }) }, language)
    ] });
  }
  blockquote(node) {
    return /* @__PURE__ */ jsx("blockquote", { children: this.content(node) });
  }
  questions(node) {
    const content = node.content || [];
    const questions = [];
    let currentTopic = null;
    let currentQuestion = null;
    for (const childNode of content) {
      switch (childNode.type) {
        case "heading":
          if (childNode.attrs?.level === 2) {
            currentTopic = this.getText(childNode);
          } else if (childNode.attrs?.level === 3) {
            if (currentTopic) {
              const questionText = this.getText(childNode);
              currentQuestion = {
                id: slugify(questionText),
                question: questionText,
                answer: {
                  type: "doc",
                  content: []
                },
                topics: [currentTopic]
              };
              questions.push(currentQuestion);
            }
          }
          break;
        // anything else is an answer
        default:
          if (!currentQuestion || !currentQuestion.answer.content) {
            console.warn("No current question found");
            continue;
          }
          currentQuestion.answer.content.push(childNode);
          break;
      }
    }
    return questions;
  }
  qaSection(node) {
    const questions = this.questions(node);
    const questionsGroupedByTopics = questions.reduce(
      (acc, question) => {
        question.topics?.forEach((topic) => {
          acc[topic] = [...acc[topic] || [], question];
        });
        return acc;
      },
      {}
    );
    const topicsInOrder = [
      ...new Set(
        questions.map((question) => question.topics).flat().filter(Boolean)
      )
    ];
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h2", { id: "test-with-flashcards", children: "Test yourself with Flashcards" }),
      /* @__PURE__ */ jsx("p", { children: "You can either use these flashcards or jump to the questions list section below to see them in a list format." }),
      /* @__PURE__ */ jsx("div", { className: "mx-0 sm:-mb-32", children: /* @__PURE__ */ jsx(QuestionsList, { questions }) }),
      /* @__PURE__ */ jsx("h2", { id: "questions-list", children: "Questions List" }),
      /* @__PURE__ */ jsx("p", { children: "If you prefer to see the questions in a list format, you can find them below." }),
      topicsInOrder.map((questionLevel) => /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsx("h3", { id: slugify(questionLevel), className: "mb-0 capitalize", children: questionLevel.toLowerCase() === "beginners" ? "Beginner Level" : questionLevel.toLowerCase() === "intermediate" ? "Intermediate Level" : questionLevel.toLowerCase() === "advanced" ? "Advanced Level" : questionLevel }),
        questionsGroupedByTopics[questionLevel].map((q) => /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsx("h4", { children: q.question }),
          /* @__PURE__ */ jsx("div", { children: this.render(q.answer) })
        ] }, q.id))
      ] }, questionLevel))
    ] });
  }
  table(node) {
    const content = node.content || [];
    const rows = content.filter((node2) => node2.type === "tableRow");
    const firstRow = rows?.[0];
    const hasTableHead = firstRow?.content?.some(
      (node2) => node2.type === "tableHeader"
    );
    const remainingRows = rows.slice(hasTableHead ? 1 : 0);
    return /* @__PURE__ */ jsxs("table", { className: "[&_p]:m-0", children: [
      hasTableHead && /* @__PURE__ */ jsx("thead", { children: this.renderNode(firstRow) }),
      /* @__PURE__ */ jsx("tbody", { children: this.render({
        type: "doc",
        content: remainingRows
      }) })
    ] });
  }
  tableRow(node) {
    return /* @__PURE__ */ jsx("tr", { children: this.content(node) });
  }
  tableHeader(node) {
    return /* @__PURE__ */ jsx("th", { children: this.content(node) });
  }
  tableCell(node) {
    return /* @__PURE__ */ jsx("td", { children: this.content(node) });
  }
}
const guideRenderer = new GuideRenderer();

export { guideRenderer as g };
