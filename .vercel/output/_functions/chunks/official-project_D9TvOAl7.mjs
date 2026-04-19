import { h as httpGet, F as FetchError } from './query-http_Ba7FoUiV.mjs';

const allowedOfficialProjectDifficulty = [
  "beginner",
  "intermediate",
  "advanced"
];
async function listOfficialProjects(query = {}) {
  try {
    const projects = await httpGet(
      `/v1-list-official-projects`,
      query
    );
    return projects;
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export { allowedOfficialProjectDifficulty as a, listOfficialProjects as l };
