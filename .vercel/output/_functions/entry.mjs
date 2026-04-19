import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_B-JyzeGY.mjs';
import { manifest } from './manifest_8LDg5uok.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/best-practices/_bestpracticeid_.json.astro.mjs');
const _page4 = () => import('./pages/best-practices/_bestpracticeid_.astro.mjs');
const _page5 = () => import('./pages/best-practices/_bestpracticeid_/_---topicid_.astro.mjs');
const _page6 = () => import('./pages/changelog.astro.mjs');
const _page7 = () => import('./pages/get-started.astro.mjs');
const _page8 = () => import('./pages/og/best-practice/_slug_.astro.mjs');
const _page9 = () => import('./pages/og/guide/_slug_.astro.mjs');
const _page10 = () => import('./pages/og/roadmap/_slug_.astro.mjs');
const _page11 = () => import('./pages/og/user/_username_.astro.mjs');
const _page12 = () => import('./pages/pages.json.astro.mjs');
const _page13 = () => import('./pages/r/embed.astro.mjs');
const _page14 = () => import('./pages/r/_customroadmapslug_.astro.mjs');
const _page15 = () => import('./pages/r.astro.mjs');
const _page16 = () => import('./pages/roadmaps.astro.mjs');
const _page17 = () => import('./pages/u/_username_.astro.mjs');
const _page18 = () => import('./pages/v1-health.astro.mjs');
const _page19 = () => import('./pages/v1-stats.json.astro.mjs');
const _page20 = () => import('./pages/videos/_videoid_.astro.mjs');
const _page21 = () => import('./pages/videos.astro.mjs');
const _page22 = () => import('./pages/_roadmapid_.json.astro.mjs');
const _page23 = () => import('./pages/_roadmapid_/courses.astro.mjs');
const _page24 = () => import('./pages/_roadmapid_/projects.astro.mjs');
const _page25 = () => import('./pages/_roadmapid_/svg.astro.mjs');
const _page26 = () => import('./pages/_roadmapid_.astro.mjs');
const _page27 = () => import('./pages/_roadmapid_/_---topicid_.astro.mjs');
const _page28 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/best-practices/[bestPracticeId].json.ts", _page3],
    ["src/pages/best-practices/[bestPracticeId]/index.astro", _page4],
    ["src/pages/best-practices/[bestPracticeId]/[...topicId].astro", _page5],
    ["src/pages/changelog.astro", _page6],
    ["src/pages/get-started.astro", _page7],
    ["src/pages/og/best-practice/[slug].ts", _page8],
    ["src/pages/og/guide/[slug].ts", _page9],
    ["src/pages/og/roadmap/[slug].ts", _page10],
    ["src/pages/og/user/[username].ts", _page11],
    ["src/pages/pages.json.ts", _page12],
    ["src/pages/r/embed.astro", _page13],
    ["src/pages/r/[customRoadmapSlug].astro", _page14],
    ["src/pages/r/index.astro", _page15],
    ["src/pages/roadmaps.astro", _page16],
    ["src/pages/u/[username].astro", _page17],
    ["src/pages/v1-health.ts", _page18],
    ["src/pages/v1-stats.json.ts", _page19],
    ["src/pages/videos/[videoId].astro", _page20],
    ["src/pages/videos/index.astro", _page21],
    ["src/pages/[roadmapId].json.ts", _page22],
    ["src/pages/[roadmapId]/courses.astro", _page23],
    ["src/pages/[roadmapId]/projects.astro", _page24],
    ["src/pages/[roadmapId]/svg.astro", _page25],
    ["src/pages/[roadmapId]/index.astro", _page26],
    ["src/pages/[roadmapId]/[...topicId].astro", _page27],
    ["src/pages/index.astro", _page28]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "bae7f676-564a-48b2-a53a-f13682854d42",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
