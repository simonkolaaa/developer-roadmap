function showLoginPopup() {
  const popupEl = document.querySelector(`#login-popup`);
  if (!popupEl) {
    return;
  }
  popupEl.classList.remove("hidden");
  popupEl.classList.add("flex");
  const focusEl = popupEl.querySelector("[autofocus]");
  if (focusEl) {
    focusEl.focus();
  }
}

export { showLoginPopup as s };
