import { h as httpGet, F as FetchError } from './query-http_Ba7FoUiV.mjs';

async function listChangelog(query = {}) {
  try {
    const changelogs = await httpGet(
      `/v1-list-changelog`,
      query
    );
    return changelogs;
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export { listChangelog as l };
