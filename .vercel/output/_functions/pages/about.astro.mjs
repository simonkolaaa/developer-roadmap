import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_qzXorVo3.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DetAB5fP.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "About - My Dev Roadmap", "description": "About my personal development roadmap" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container px-5 py-14 sm:py-24"> <div class="mx-auto max-w-[700px]"> <h1 class="mb-6 text-3xl font-bold sm:mb-10 sm:text-5xl">About</h1> <div class="prose prose-slate prose-a:text-blue-600 hover:prose-a:text-blue-500 sm:prose-lg leading-loose sm:leading-loose"> <p>
Benvenuto sulla mia Dev Roadmap personale. Questo spazio è nato per tracciare il mio percorso formativo, raccogliere i miei appunti e condividere le mie conoscenze in ambito di sviluppo software, frontend, backend e computer science in generale.
</p> <p>
I materiali che trovi in questa mappa derivano dal mio repository GitHub dedicato allo studio dell'IT. Il progetto grafico strutturale di base su cui ho montato i miei appunti è un fork pesantemente adattato e decostruito del progetto open source originale.
</p> <p>
Puoi scoprire di più sui miei progetti, articoli o altro visitando il mio <a href="https://simonkolaaa.github.io" target="_blank">Sito Web Personale</a> o il mio profilo <strong>simonkolaaa</strong> su GitHub.
</p> <p>
Spero che queste mappe possano essere d'aiuto anche ad altri sviluppatori!
</p> <h2 class="mt-16 mb-6 text-2xl font-bold sm:mt-20 sm:mb-8 sm:text-3xl">
Contatti
</h2> <p>
Per qualsiasi tipo di comunicazione, proposta o se vuoi dare un'occhiata a quello che faccio, raggiungimi tramite il mio sito web personale indicato qui sopra.
</p> </div> </div> </div> ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/about.astro", void 0);

const $$file = "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
