import { f as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_qzXorVo3.mjs';
import 'piccolore';
import 'clsx';

const html = () => "";

				const frontmatter = {"jsonUrl":"/jsons/best-practices/backend-performance.json","pdfUrl":"/pdfs/best-practices/backend-performance.pdf","order":1,"briefTitle":"Backend Performance","briefDescription":"Backend Performance Best Practices","isNew":false,"isUpcoming":false,"title":"Backend Performance Best Practices","description":"Detailed list of best practices to improve your backend performance","dimensions":{"width":968,"height":1789.23},"schema":{"headline":"Backend Performance Best Practices","description":"Detailed list of best practices to improve the backend performance of your website. Each best practice carries further details and how to implement that best practice.","imageUrl":"https://roadmap.sh/best-practices/backend-performance.png","datePublished":"2023-01-23","dateModified":"2023-01-23"},"seo":{"title":"Backend Performance Best Practices","description":"Detailed list of best practices to improve the backend performance of your website. Each best practice carries further details and how to implement that best practice.","keywords":["backend performance","api performance","backend performance best practices","backend performance checklist","backend checklist","make performant backends"]}};
				const file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/data/best-practices/backend-performance/backend-performance.md";
				const url = undefined;
				function rawContent() {
					return "   \r\n                                                         \r\n                                                      \r\n        \r\n                                 \r\n                                                      \r\n            \r\n                 \r\n                                           \r\n                                                                                  \r\n           \r\n            \r\n                 \r\n       \r\n                                                \r\n                                                                                                                                                                                        \r\n                                                                       \r\n                             \r\n                            \r\n    \r\n                                             \r\n                                                                                                                                                                                        \r\n           \r\n                           \r\n                       \r\n                                          \r\n                                     \r\n                         \r\n                                \r\n   \r\n";
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

const __vite_glob_2_2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_2_2 as _ };
