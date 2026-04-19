import MarkdownIt from 'markdown-it';
import MarkdownItAsync from 'markdown-it-async';

function replaceVariables(markdown, variables = {}) {
  const allVariables = {
    ...variables,
    currentYear: (/* @__PURE__ */ new Date()).getFullYear().toString()
  };
  return markdown?.replace(/@([^@]+)@/g, (match, p1) => {
    return allVariables[p1] || match;
  });
}
const md = new MarkdownIt({
  html: true,
  linkify: true
});
function markdownToHtml(markdown, isInline = true) {
  try {
    const replacedMarkdown = replaceVariables(markdown);
    if (isInline) {
      return md.renderInline(replacedMarkdown);
    } else {
      return md.render(replacedMarkdown);
    }
  } catch (e) {
    return markdown;
  }
}
function sanitizeMarkdown(markdown) {
  return markdown.replace(/\\\[([^\\]+)\\\]\(([^\\]+)\)/g, "[$1]($2)");
}
MarkdownItAsync({
  html: true,
  linkify: true,
  async highlight(code, lang, attrs) {
    const { codeToHtml } = await import('shiki');
    const html = await codeToHtml(code, {
      lang: lang?.toLowerCase(),
      theme: "dracula"
    }).catch((e) => {
      console.warn(e);
      return code;
    });
    return html;
  }
});

export { markdownToHtml as m, replaceVariables as r, sanitizeMarkdown as s };
