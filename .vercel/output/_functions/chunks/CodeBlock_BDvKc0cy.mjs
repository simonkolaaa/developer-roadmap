import { jsxs, jsx } from 'react/jsx-runtime';
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationWordHighlight, transformerNotationFocus, transformerNotationErrorLevel } from '@shikijs/transformers';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState, useLayoutEffect } from 'react';
import { codeToHtml } from 'shiki';
import { c as cn } from './BaseLayout_DetAB5fP.mjs';
import { u as useCopyText } from './use-copy-text_Bqwbcq8G.mjs';

const codeBlockClassName = cn(
  "mt-0 text-sm",
  "[&_pre]:py-0",
  "[&_pre]:grid",
  "[&_code]:py-4",
  "[&_code]:w-full",
  "[&_code]:grid",
  "[&_code]:overflow-x-auto",
  "[&_code]:no-scrollbar",
  "[&_code]:bg-transparent",
  "[&_.line]:px-3",
  "[&_.line]:w-full",
  "[&_.line]:relative",
  "[&_.line]:min-h-5"
);
function highlight(html, language) {
  return codeToHtml(html, {
    lang: language ?? "typescript",
    theme: "github-light",
    transformers: [
      transformerNotationDiff({
        matchAlgorithm: "v3"
      }),
      transformerNotationHighlight({
        matchAlgorithm: "v3"
      }),
      transformerNotationWordHighlight({
        matchAlgorithm: "v3"
      }),
      transformerNotationFocus({
        matchAlgorithm: "v3"
      }),
      transformerNotationErrorLevel({
        matchAlgorithm: "v3"
      })
    ]
  });
}
const CodeBlockFallback = ({ children, ...props }) => /* @__PURE__ */ jsx("div", { ...props, children: /* @__PURE__ */ jsx("pre", { className: "w-full bg-white", children: /* @__PURE__ */ jsx("code", { children: children?.toString().split("\n").map((line, i) => /* @__PURE__ */ jsx("span", { className: "line", children: line }, i)) }) }) });
const CodeBlockItem = ({
  children,
  lineNumbers = true,
  className,
  value,
  ...props
}) => {
  return /* @__PURE__ */ jsx("div", { className: cn(codeBlockClassName, className), ...props, children });
};
const CodeBlockContent = ({
  children,
  language,
  syntaxHighlighting = true,
  ...props
}) => {
  const [html, setHtml] = useState(null);
  useLayoutEffect(() => {
    if (!syntaxHighlighting) {
      return;
    }
    if (typeof children !== "string") {
      return;
    }
    highlight(children, language).then(setHtml).catch(console.error);
  }, [children, syntaxHighlighting, language]);
  if (!(syntaxHighlighting && html)) {
    return /* @__PURE__ */ jsx(CodeBlockFallback, { children });
  }
  return /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: html }, ...props });
};
function CodeBlockHeader(props) {
  const { language, code, className, ...rest } = props;
  const { copyText, isCopied } = useCopyText();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex items-center justify-between gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2",
        className
      ),
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: language }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => copyText(code),
            className: "flex size-6 items-center justify-center gap-2 rounded-md text-gray-400 hover:bg-zinc-200 hover:text-black focus:outline-none",
            children: isCopied ? /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" }) : /* @__PURE__ */ jsx(CopyIcon, { className: "size-3.5" })
          }
        ) })
      ]
    }
  );
}

export { CodeBlockHeader as C, CodeBlockItem as a, CodeBlockContent as b };
