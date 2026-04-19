function replaceChildren(parentNode, newChild) {
  if (parentNode.replaceChildren) {
    return parentNode.replaceChildren(newChild);
  }
  parentNode.innerHTML = "";
  parentNode.append(newChild);
}
function lockBodyScroll(shouldLock) {
  const isClient = document && "body" in document;
  if (!isClient) {
    return;
  }
  if (shouldLock) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
}

export { lockBodyScroll as l, replaceChildren as r };
