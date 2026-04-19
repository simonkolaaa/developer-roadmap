import { jsxs, jsx } from 'react/jsx-runtime';

function VideoListItem(props) {
  const { video } = props;
  const { frontmatter, id } = video;
  return /* @__PURE__ */ jsxs(
    "a",
    {
      className: "block no-underline py-2 group text-md items-center text-gray-600 hover:text-blue-600 flex justify-between border-b",
      href: `/videos/${id}`,
      children: [
        /* @__PURE__ */ jsx("span", { className: "group-hover:translate-x-2 transition-transform text-slate-300 group-hover:text-blue-400 font-medium", children: frontmatter.title }),
        /* @__PURE__ */ jsx("span", { className: "text-blue-400 opacity-0 group-hover:opacity-100 transition-all text-sm", children: "Watch →" })
      ]
    }
  );
}

export { VideoListItem as V };
