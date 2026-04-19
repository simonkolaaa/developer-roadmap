import Cookies from 'js-cookie';
import fp from '@fingerprintjs/fingerprintjs';
import { T as TOKEN_COOKIE_NAME, r as removeAuthToken } from './jwt_ZAvcheRY.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://simonkolaaa.github.io/", "SSR": true};
class FetchError extends Error {
  status;
  message;
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
  static isFetchError(error) {
    return error instanceof FetchError;
  }
}
async function httpCall(url, options) {
  const apiBaseUrl = "";
  const fullUrl = url.startsWith("http") ? url : `${apiBaseUrl}${url}`;
  try {
    let visitorId = "";
    const isServer = typeof window === "undefined";
    if (!isServer) {
      const fingerprintPromise = await fp.load();
      const fingerprint = await fingerprintPromise.get();
      visitorId = fingerprint.visitorId;
    }
    const isMultiPartFormData = options?.body instanceof FormData;
    const headers = new Headers({
      Accept: "application/json",
      ...!isServer ? { Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE_NAME)}` } : {},
      ...visitorId ? { fp: visitorId } : {},
      ...options?.headers ?? {}
    });
    if (isServer) {
      headers.set("roadmap-api-key", __vite_import_meta_env__?.ROADMAP_API_KEY);
    }
    if (!isMultiPartFormData) {
      headers.set("Content-Type", "application/json");
    }
    const response = await fetch(fullUrl, {
      credentials: "include",
      ...options,
      headers
    });
    const doesAcceptHtml = options?.headers?.["Accept"] === "text/html";
    const data = doesAcceptHtml ? await response.text() : await response.json();
    if (data?.status === 401) {
      removeAuthToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return null;
    }
    if (!response.ok) {
      if (data.errors) {
        if (data?.type && data?.type === "ai_tutor_limit_exceeded") {
          window?.fireEvent?.({
            action: "tutor_credit_limit",
            category: "ai_tutor",
            label: "Tutor Credit Limit Exceeded"
          });
        }
        throw new FetchError(response?.status, data.message);
      } else if (data.message) {
        throw new FetchError(response?.status, data.message);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
    return data;
  } catch (error) {
    console.error(`HTTP Call failed for ${url}:`, error);
    if (url.includes("list") || url.includes("all")) {
      return [];
    }
    return null;
  }
}
async function httpPost(url, body, options) {
  return httpCall(url, {
    ...options,
    method: "POST",
    body: body instanceof FormData ? body : JSON.stringify(body)
  });
}
async function httpGet(url, queryParams, options) {
  const searchParams = new URLSearchParams(queryParams).toString();
  const queryUrl = searchParams ? `${url}?${searchParams}` : url;
  return httpCall(queryUrl, {
    credentials: "include",
    method: "GET",
    ...options
  });
}
async function httpDelete(url, options) {
  return httpCall(url, {
    ...options,
    method: "DELETE"
  });
}

export { FetchError as F, httpPost as a, httpDelete as b, httpGet as h };
