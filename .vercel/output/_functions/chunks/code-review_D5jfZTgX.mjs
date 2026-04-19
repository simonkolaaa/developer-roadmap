import { f as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_qzXorVo3.mjs';
import 'piccolore';
import 'clsx';

const html = () => "";

				const frontmatter = {"jsonUrl":"/jsons/best-practices/code-review.json","pdfUrl":"/pdfs/best-practices/code-review.pdf","order":2,"briefTitle":"Code Reviews","briefDescription":"Code Review Best Practices","isNew":false,"isUpcoming":false,"title":"Code Review Best Practices","description":"Detailed list of best practices for effective code reviews and quality","dimensions":{"width":968,"height":3254.98},"schema":{"headline":"Code Review Best Practices","description":"Discover the essential best practices for effective code review and improve the quality of your software development. From establishing clear objectives to providing constructive feedback, this interactive guide covers everything you need to know to optimize your code review process and ensure the delivery of high-quality code.","imageUrl":"https://roadmap.sh/best-practices/code-review.png","datePublished":"2023-01-23","dateModified":"2023-01-23"},"seo":{"title":"Code Review Best Practices","description":"Discover the essential best practices for effective code review and improve the quality of your software development. From establishing clear objectives to providing constructive feedback, this interactive guide covers everything you need to know to optimize your code review process and ensure the delivery of high-quality code.","keywords":["code reviews","code reviews best practices","code reviews checklist","codereview checklist","quality code review","code review process"]}};
				const file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/data/best-practices/code-review/code-review.md";
				const url = undefined;
				function rawContent() {
					return "   \r\n                                                 \r\n                                              \r\n        \r\n                          \r\n                                              \r\n            \r\n                 \r\n                                   \r\n                                                                                     \r\n           \r\n            \r\n                 \r\n       \r\n                                        \r\n                                                                                                                                                                                                                                                                                                                                                          \r\n                                                               \r\n                             \r\n                            \r\n    \r\n                                     \r\n                                                                                                                                                                                                                                                                                                                                                          \r\n           \r\n                    \r\n                                   \r\n                              \r\n                            \r\n                           \r\n                           \r\n   \r\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});

const __vite_glob_2_3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_2_3 as _ };
