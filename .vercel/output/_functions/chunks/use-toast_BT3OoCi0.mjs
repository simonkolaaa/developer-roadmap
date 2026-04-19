import { atom } from 'nanostores';

function urlToId(url) {
  return url.replace(/^https?:\/\//, "").replace("roadmap.sh", "").replace(/localhost:[\d]*?/, "").replace(/\?.*$/, "").replace(/\/$/, "").replace(/^\//, "").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase() || "home";
}
const LAST_PATH_KEY = "lastPage";
function getLastPath() {
  if (typeof window === "undefined") {
    return;
  }
  return localStorage.getItem(LAST_PATH_KEY) || "home";
}
function triggerUtmRegistration() {
  const utmParams = getStoredUtmParams();
  if (!utmParams.utmSource) {
    return;
  }
  localStorage.removeItem("utm_params");
  window.fireEvent({
    category: "UserRegistration",
    action: `Registration: ${utmParams.utmSource || "unknown"}-${utmParams.utmCampaign || "unknown"}`,
    label: `Registration: ${utmParams.utmSource || "unknown"}-${utmParams.utmCampaign || "unknown"}`
  });
}
function getStoredUtmParams() {
  if (typeof window === "undefined") {
    return {};
  }
  const utmParams = localStorage.getItem("utm_params");
  if (!utmParams) {
    return {};
  }
  return JSON.parse(utmParams);
}
function getUrlParams() {
  if (typeof window === "undefined") {
    return {};
  }
  const params = new URLSearchParams(window.location.search);
  const paramsObj = {};
  for (const [key, value] of params.entries()) {
    paramsObj[key] = value;
  }
  return paramsObj;
}
function parseUrl(url) {
  const parser = document.createElement("a");
  parser.href = url;
  return {
    protocol: parser.protocol,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    hash: parser.hash,
    host: parser.host
  };
}
function deleteUrlParam(key) {
  if (typeof window === "undefined") {
    return;
  }
  const url = new URL(window.location.href);
  if (!url.searchParams.has(key)) {
    return;
  }
  url.searchParams.delete(key);
  window.history.pushState(null, "", url.toString());
}
function setUrlParams(params) {
  if (typeof window === "undefined") {
    return;
  }
  const url = new URL(window.location.href);
  let hasUpdatedUrl = false;
  for (const [key, value] of Object.entries(params)) {
    if (url.searchParams.get(key) === String(value)) {
      continue;
    }
    url.searchParams.delete(key);
    url.searchParams.set(key, value);
    hasUpdatedUrl = true;
  }
  if (hasUpdatedUrl) {
    window.history.pushState(null, "", url.toString());
  }
}

const $toastMessage = atom(void 0);

function useToast() {
  function success(message) {
    $toastMessage.set({ type: "success", message });
  }
  function error(message) {
    $toastMessage.set({ type: "error", message });
  }
  function info(message) {
    $toastMessage.set({ type: "info", message });
  }
  function warning(message) {
    $toastMessage.set({ type: "warning", message });
  }
  function loading(message) {
    $toastMessage.set({ type: "loading", message });
  }
  return { success, error, info, warning, loading, $toastMessage };
}

export { urlToId as a, getLastPath as b, deleteUrlParam as d, getUrlParams as g, parseUrl as p, setUrlParams as s, triggerUtmRegistration as t, useToast as u };
