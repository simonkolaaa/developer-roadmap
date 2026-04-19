import Cookies from 'js-cookie';
import { T as TOKEN_COOKIE_NAME, d as decodeToken } from './jwt_ZAvcheRY.mjs';
import { queryOptions } from '@tanstack/react-query';
import { h as httpGet } from './query-http_Ba7FoUiV.mjs';

function useAuth() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (!token) {
    return null;
  }
  return decodeToken(token);
}

function roadmapJSONOptions(roadmapId) {
  return queryOptions({
    queryKey: ["roadmap-json", roadmapId],
    queryFn: async () => {
      const baseUrl = "";
      const roadmapJSON = await httpGet(
        `${baseUrl}/${roadmapId}.json`
      );
      {
        return {
          json: roadmapJSON,
          svg: null
        };
      }
    },
    refetchOnMount: false
  });
}
function listBuiltInRoadmaps() {
  return queryOptions({
    queryKey: ["built-in-roadmaps"],
    queryFn: () => {
      return httpGet(`${undefined                              }/pages.json`);
    },
    select: (data) => {
      return data.filter((page) => page?.group?.toLowerCase() === "roadmaps").map((page) => ({
        id: page.id,
        title: page.title,
        url: page.url,
        renderer: page.renderer
      }));
    },
    refetchOnMount: false
  });
}

export { listBuiltInRoadmaps as l, roadmapJSONOptions as r, useAuth as u };
