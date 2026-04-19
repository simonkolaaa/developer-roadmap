import { jsx, jsxs } from 'react/jsx-runtime';
import { useRef } from 'react';
import { d as useKeydown, u as useOutsideClick, c as cn } from './BaseLayout_DetAB5fP.mjs';
import { X } from 'lucide-react';
import { QueryClient, QueryCache } from '@tanstack/react-query';

function Modal(props) {
  const {
    onClose,
    children,
    bodyClassName,
    wrapperClassName,
    overlayClassName,
    hasCloseButton = true
  } = props;
  const popupBodyEl = useRef(null);
  useKeydown("Escape", () => {
    onClose();
  });
  useOutsideClick(popupBodyEl, () => {
    onClose();
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "fixed top-0 right-0 left-0 z-99 flex h-full items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50",
        overlayClassName
      ),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "relative h-full w-full max-w-md p-4 md:h-auto",
            wrapperClassName
          ),
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              ref: popupBodyEl,
              className: cn(
                "relative h-full rounded-lg bg-white shadow-sm",
                bodyClassName
              ),
              children: [
                hasCloseButton && /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: onClose,
                    className: "absolute top-4 right-4 text-gray-300 hover:text-gray-700",
                    children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
                  }
                ),
                children
              ]
            }
          )
        }
      )
    }
  );
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({}),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      enabled: false
    }
  }
});

export { Modal as M, queryClient as q };
