import { T as TOKEN_COOKIE_NAME } from './jwt_ZAvcheRY.mjs';

function api(context) {
  const token = context.cookies.get(TOKEN_COOKIE_NAME)?.value;
  async function apiCall(url, options) {
    try {
      const response = await fetch(url, {
        credentials: "include",
        ...options,
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          ...token ? { Authorization: `Bearer ${token}` } : {},
          ...options?.headers ?? {}
        })
      });
      const doesAcceptHtml = options?.headers?.["Accept"] === "text/html";
      const data = doesAcceptHtml ? await response.text() : await response.json();
      if (response.ok) {
        return {
          response: data,
          error: void 0
        };
      }
      if (data.status === 401) {
        context.cookies.delete(TOKEN_COOKIE_NAME);
        context.redirect(context.request.url);
        return { response: void 0, error: data };
      }
      if (data.status === 403) {
        return { response: void 0, error: data };
      }
      return {
        response: void 0,
        error: data
      };
    } catch (error) {
      return {
        response: void 0,
        error: {
          status: 0,
          message: error.message
        }
      };
    }
  }
  return {
    get: function apiGet(url, queryParams, options) {
      const searchParams = new URLSearchParams(queryParams).toString();
      const queryUrl = searchParams ? `${url}?${searchParams}` : url;
      return apiCall(queryUrl, {
        ...options,
        method: "GET"
      });
    },
    post: async function apiPost(url, body, options) {
      return apiCall(url, {
        ...options,
        method: "POST",
        body: JSON.stringify(body)
      });
    },
    patch: async function apiPatch(url, body, options) {
      return apiCall(url, {
        ...options,
        method: "PATCH",
        body: JSON.stringify(body)
      });
    },
    put: async function apiPut(url, body, options) {
      return apiCall(url, {
        ...options,
        method: "PUT",
        body: JSON.stringify(body)
      });
    },
    delete: async function apiDelete(url, options) {
      return apiCall(url, {
        ...options,
        method: "DELETE"
      });
    }
  };
}

export { api as a };
