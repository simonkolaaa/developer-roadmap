import { o as officialRoadmapDetails } from '../chunks/official-roadmap_piILD0GP.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const GET = async function({ params }) {
  const { roadmapId } = params;
  if (!roadmapId) {
    return new Response("Roadmap ID is required", {
      status: 400
    });
  }
  const roadmapJson = await officialRoadmapDetails(roadmapId);
  if (!roadmapJson) {
    return new Response("Roadmap not found", {
      status: 404
    });
  }
  return new Response(JSON.stringify(roadmapJson), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
