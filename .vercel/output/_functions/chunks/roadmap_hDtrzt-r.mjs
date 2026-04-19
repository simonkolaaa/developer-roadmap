import { a as api } from './api_BzJCsl49.mjs';

function roadmapApi(context) {
  return {
    listShowcaseRoadmap: async function() {
      const searchParams = new URLSearchParams(context.url.searchParams);
      return api(context).get(
        `${undefined                              }/v1-list-showcase-roadmap`,
        searchParams
      );
    },
    isShowcaseRoadmap: async function(slug) {
      return api(context).get(`${undefined                              }/v1-is-showcase-roadmap/${slug}`);
    }
  };
}
async function getProjectList() {
  const baseUrl = "https://roadmap.sh";
  const pages = await fetch(`${baseUrl}/pages.json`).catch((err) => {
    console.error(err);
    return [];
  });
  const pagesJson = await pages.json();
  const projects = pagesJson.filter((page) => page?.group?.toLowerCase() === "projects").map((page) => ({
    id: page.id,
    title: page.title,
    url: page.url
  }));
  return projects;
}

export { getProjectList as g, roadmapApi as r };
