function getOpenGraphImageUrl(params, query) {
  const baseUrl = "https://roadmap.sh";
  const url = new URL(`${baseUrl}/og/${params.group}/${params.resourceId}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return String(url);
}
async function getDefaultOpenGraphImageBuffer() {
  const defaultImageUrl = `${"https://roadmap.sh"}/img/og-img.png`;
  return fetch(defaultImageUrl).then((response) => response.arrayBuffer());
}
async function getResourceOpenGraph(type, resourceId, query) {
  const url = new URL(`${undefined                              }/v1-open-graph`);
  url.searchParams.set("type", type);
  url.searchParams.set("resourceId", resourceId);
  url.searchParams.set("variant", "image");
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  const response = await fetch(url.toString());
  return response.text();
}

export { getDefaultOpenGraphImageBuffer as a, getResourceOpenGraph as b, getOpenGraphImageUrl as g };
