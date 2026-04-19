import{c as n}from"./createLucideIcon.USF7R7no.js";import{g as a}from"./index.C2i4XTQP.js";import{r as s}from"./index.eZ6LznJt.js";import{q as t,h as o}from"./query-client.CHtXBy3a.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["path",{d:"m9 20 3-6 3 6",key:"se2kox"}],["path",{d:"m6 8 6 2 6-2",key:"4o3us4"}],["path",{d:"M12 10v4",key:"1kjpxc"}]],f=n("person-standing",i);var u=s();const y=a(u);function O(e){return t({queryKey:["roadmap-json",e],queryFn:async()=>({json:await o(`/${e}.json`),svg:null}),refetchOnMount:!1})}function h(){return t({queryKey:["built-in-roadmaps"],queryFn:()=>o("undefined/pages.json"),select:e=>e.filter(r=>r?.group?.toLowerCase()==="roadmaps").map(r=>({id:r.id,title:r.title,url:r.url,renderer:r.renderer})),refetchOnMount:!1})}export{f as P,y as R,O as a,h as l,u as r};
