import { h as httpGet } from './query-http_Ba7FoUiV.mjs';

async function listOfficialGuides(query = {}) {
  try {
    const guides = await httpGet(
      `/v1-list-official-guides`,
      query
    );
    return guides.sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return bDate.getTime() - aDate.getTime();
    });
  } catch (error) {
    return [];
  }
}
async function getOfficialGuide(slug, roadmapId) {
  try {
    const guide = await httpGet(
      `/v1-official-guide/${slug}`,
      {
        ...roadmapId ? { roadmapId } : {}
      }
    );
    return guide;
  } catch (error) {
    return null;
  }
}
async function listOfficialAuthors() {
  try {
    const authors = await httpGet(
      `/v1-list-official-authors`
    );
    return authors;
  } catch (error) {
    return [];
  }
}
function getOfficialGuideHref(slug, roadmapId) {
  const isExternal = roadmapId && roadmapId !== "questions";
  return isExternal ? `${undefined                              }/${roadmapId}/${slug}` : roadmapId ? `/${roadmapId}/${slug}` : `/guides/${slug}`;
}

export { listOfficialAuthors as a, getOfficialGuideHref as b, getOfficialGuide as g, listOfficialGuides as l };
