import { f as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_qzXorVo3.mjs';
import 'piccolore';
import 'clsx';

const html = () => "";

				const frontmatter = {"jsonUrl":"/jsons/best-practices/aws.json","pdfUrl":"/pdfs/best-practices/aws.pdf","order":3,"briefTitle":"AWS","briefDescription":"AWS Best Practices","isNew":false,"isUpcoming":false,"title":"AWS Best Practices","description":"Detailed list of best practices for Amazon Web Services (AWS)","dimensions":{"width":968,"height":1770.7},"schema":{"headline":"AWS Best Practices","description":"Detailed list of best practices for Amazon Web Services (AWS). Each best practice carries further details and how to implement that best practice.","imageUrl":"https://roadmap.sh/best-practices/aws.png","datePublished":"2023-02-21","dateModified":"2023-02-21"},"seo":{"title":"AWS Best Practices","description":"Detailed list of best practices for Amazon Web Services (AWS). Each best practice carries further details and how to implement that best practice.","keywords":["Amazon Web Services Tips","AWS Tips","AWS Best Practices","Amazon Web Services Best Practices"]}};
				const file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/data/best-practices/aws/aws.md";
				const url = undefined;
				function rawContent() {
					return "   \r\n                                         \r\n                                      \r\n        \r\n                 \r\n                                      \r\n            \r\n                 \r\n                           \r\n                                                                            \r\n           \r\n            \r\n                \r\n       \r\n                                \r\n                                                                                                                                                                   \r\n                                                       \r\n                             \r\n                            \r\n    \r\n                             \r\n                                                                                                                                                                   \r\n           \r\n                                \r\n                \r\n                          \r\n                                          \r\n   \r\n";
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

const __vite_glob_2_1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_2_1 as _ };
