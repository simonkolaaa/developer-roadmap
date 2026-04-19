import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from './astro/server_qzXorVo3.mjs';
import 'piccolore';
import { a as $$Popup } from './ProgressHelpPopup_C5qY1mWg.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useId } from 'react';
import { G as GitHubIcon } from './ai-course_qF62O6Zz.mjs';
import { F as FIRST_LOGIN_PARAM, C as COURSE_PURCHASE_PARAM, s as setAuthToken, i as isLoggedIn, a as setAIReferralCode } from './jwt_ZAvcheRY.mjs';
import { h as httpGet, S as Spinner, c as cn, e as httpPost } from './BaseLayout_DetAB5fP.mjs';
import 'clsx';
import 'js-cookie';
import { a as urlToId, b as getLastPath, t as triggerUtmRegistration, g as getUrlParams, d as deleteUrlParam } from './use-toast_BT3OoCi0.mjs';

function AccountTerms() {
  return /* @__PURE__ */ jsxs("div", { className: "mt-3 text-left text-xs leading-normal text-gray-500", children: [
    "By continuing to use our services, you acknowledge that you have both read and agree to our",
    " ",
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/terms",
        className: "font-medium underline underline-offset-2 hover:text-black",
        children: "Terms of Service"
      }
    ),
    " ",
    "and",
    " ",
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/privacy",
        className: "font-medium underline underline-offset-2 hover:text-black",
        children: "Privacy Policy"
      }
    ),
    "."
  ] });
}

function GoogleIcon(props) {
  const { className } = props;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 90 92",
      fill: "none",
      className,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M90 47.1c0-3.1-.3-6.3-.8-9.3H45.9v17.7h24.8c-1 5.7-4.3 10.7-9.2 13.9l14.8 11.5C85 72.8 90 61 90 47.1z",
            fill: "#4280ef"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M45.9 91.9c12.4 0 22.8-4.1 30.4-11.1L61.5 69.4c-4.1 2.8-9.4 4.4-15.6 4.4-12 0-22.1-8.1-25.8-18.9L4.9 66.6c7.8 15.5 23.6 25.3 41 25.3z",
            fill: "#34a353"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M20.1 54.8c-1.9-5.7-1.9-11.9 0-17.6L4.9 25.4c-6.5 13-6.5 28.3 0 41.2l15.2-11.8z",
            fill: "#f6b704"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M45.9 18.3c6.5-.1 12.9 2.4 17.6 6.9L76.6 12C68.3 4.2 57.3 0 45.9.1c-17.4 0-33.2 9.8-41 25.3l15.2 11.8c3.7-10.9 13.8-18.9 25.8-18.9z",
            fill: "#e54335"
          }
        )
      ]
    }
  );
}

const GOOGLE_REDIRECT_AT = "googleRedirectAt";
const GOOGLE_LAST_PAGE = "googleLastPage";
function GoogleButton(props) {
  const { isDisabled, setIsDisabled, className } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const provider = urlParams.get("provider");
    if (!code || !state || provider !== "google") {
      return;
    }
    setIsLoading(true);
    setIsDisabled?.(true);
    const lastPageBeforeGoogle = localStorage.getItem(GOOGLE_LAST_PAGE);
    httpGet(
      `${undefined                              }/v1-google-callback${window.location.search}&src=${urlToId(lastPageBeforeGoogle || getLastPath() || window.location.pathname)}`
    ).then(({ response, error: error2 }) => {
      if (!response?.token) {
        setError(error2?.message || "Something went wrong.");
        setIsLoading(false);
        setIsDisabled?.(false);
        return;
      }
      triggerUtmRegistration();
      let redirectUrl = new URL("/", window.location.origin);
      const googleRedirectAt = localStorage.getItem(GOOGLE_REDIRECT_AT);
      if (googleRedirectAt && lastPageBeforeGoogle) {
        const socialRedirectAtTime = parseInt(googleRedirectAt, 10);
        const now = Date.now();
        const timeSinceRedirect = now - socialRedirectAtTime;
        if (timeSinceRedirect < 30 * 1e3) {
          redirectUrl = new URL(lastPageBeforeGoogle, window.location.origin);
        }
      }
      const authRedirectUrl = localStorage.getItem("authRedirect");
      if (authRedirectUrl) {
        localStorage.removeItem("authRedirect");
        redirectUrl = new URL(authRedirectUrl, window.location.origin);
      }
      redirectUrl.searchParams.set(
        FIRST_LOGIN_PARAM,
        response?.isNewUser ? "1" : "0"
      );
      const shouldTriggerPurchase = localStorage.getItem(CHECKOUT_AFTER_LOGIN_KEY) !== "0";
      if (redirectUrl.pathname.includes("/courses/sql") && shouldTriggerPurchase) {
        redirectUrl.searchParams.set(COURSE_PURCHASE_PARAM, "1");
        localStorage.removeItem(CHECKOUT_AFTER_LOGIN_KEY);
      }
      localStorage.removeItem(GOOGLE_REDIRECT_AT);
      localStorage.removeItem(GOOGLE_LAST_PAGE);
      setAuthToken(response.token);
      window.location.href = redirectUrl.toString();
    }).catch((err) => {
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
      setIsDisabled?.(false);
    });
  }, []);
  const handleClick = () => {
    setIsLoading(true);
    setIsDisabled?.(true);
    httpGet(
      `${undefined                              }/v1-google-login`
    ).then(({ response, error: error2 }) => {
      if (!response?.loginUrl) {
        setError(error2?.message || "Something went wrong.");
        setIsLoading(false);
        setIsDisabled?.(false);
        return;
      }
      if (!["/login", "/signup"].includes(window.location.pathname)) {
        const pagePath = [
          "/respond-invite",
          "/befriend",
          "/r",
          "/ai-roadmaps"
        ].includes(window.location.pathname) ? window.location.pathname + window.location.search : window.location.pathname;
        localStorage.setItem(GOOGLE_REDIRECT_AT, Date.now().toString());
        localStorage.setItem(GOOGLE_LAST_PAGE, pagePath);
      }
      window.location.href = response.loginUrl;
    }).catch((err) => {
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
      setIsDisabled?.(false);
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: cn(
          "inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-hidden hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60",
          className
        ),
        disabled: isLoading || isDisabled,
        onClick: handleClick,
        children: [
          isLoading ? /* @__PURE__ */ jsx(Spinner, { className: "h-[18px] w-[18px]", isDualRing: false }) : /* @__PURE__ */ jsx(GoogleIcon, { className: "h-[18px] w-[18px]" }),
          "Continue with Google"
        ]
      }
    ),
    error && /* @__PURE__ */ jsx("p", { className: "mb-2 mt-1 text-sm font-medium text-red-600", children: error })
  ] });
}

function LinkedInIcon(props) {
  const { className } = props;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      children: [
        /* @__PURE__ */ jsx("g", { clipPath: "url(#clip0_2344_20)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M0 0V24H24V0H0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.397 7.179 20 6.988 20 12.241V19Z",
            fill: "currentColor"
          }
        ) }),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_2344_20", children: /* @__PURE__ */ jsx("rect", { width: "24", height: "24", rx: "2", fill: "white" }) }) })
      ]
    }
  );
}

const LINKEDIN_REDIRECT_AT = "linkedInRedirectAt";
const LINKEDIN_LAST_PAGE = "linkedInLastPage";
function LinkedInButton(props) {
  const { isDisabled, setIsDisabled, className } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const provider = urlParams.get("provider");
    if (!code || !state || provider !== "linkedin") {
      return;
    }
    setIsLoading(true);
    setIsDisabled?.(true);
    const lastPageBeforeLinkedIn = localStorage.getItem(LINKEDIN_LAST_PAGE);
    httpGet(
      `${undefined                              }/v1-linkedin-callback${window.location.search}&src=${urlToId(lastPageBeforeLinkedIn || getLastPath() || window.location.pathname)}`
    ).then(({ response, error: error2 }) => {
      if (!response?.token) {
        setError(error2?.message || "Something went wrong.");
        setIsLoading(false);
        setIsDisabled?.(false);
        return;
      }
      triggerUtmRegistration();
      let redirectUrl = new URL("/", window.location.origin);
      const linkedInRedirectAt = localStorage.getItem(LINKEDIN_REDIRECT_AT);
      if (linkedInRedirectAt && lastPageBeforeLinkedIn) {
        const socialRedirectAtTime = parseInt(linkedInRedirectAt, 10);
        const now = Date.now();
        const timeSinceRedirect = now - socialRedirectAtTime;
        if (timeSinceRedirect < 30 * 1e3) {
          redirectUrl = new URL(
            lastPageBeforeLinkedIn,
            window.location.origin
          );
        }
      }
      const authRedirectUrl = localStorage.getItem("authRedirect");
      if (authRedirectUrl) {
        localStorage.removeItem("authRedirect");
        redirectUrl = new URL(authRedirectUrl, window.location.origin);
      }
      redirectUrl.searchParams.set(
        FIRST_LOGIN_PARAM,
        response?.isNewUser ? "1" : "0"
      );
      const shouldTriggerPurchase = localStorage.getItem(CHECKOUT_AFTER_LOGIN_KEY) !== "0";
      if (redirectUrl.pathname.includes("/courses/sql") && shouldTriggerPurchase) {
        redirectUrl.searchParams.set(COURSE_PURCHASE_PARAM, "1");
        localStorage.removeItem(CHECKOUT_AFTER_LOGIN_KEY);
      }
      localStorage.removeItem(LINKEDIN_REDIRECT_AT);
      localStorage.removeItem(LINKEDIN_LAST_PAGE);
      setAuthToken(response.token);
      window.location.href = redirectUrl.toString();
    }).catch((err) => {
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
      setIsDisabled?.(false);
    });
  }, []);
  const handleClick = () => {
    setIsLoading(true);
    setIsDisabled?.(true);
    httpGet(
      `${undefined                              }/v1-linkedin-login`
    ).then(({ response, error: error2 }) => {
      if (!response?.loginUrl) {
        setError(error2?.message || "Something went wrong.");
        setIsLoading(false);
        setIsDisabled?.(false);
        return;
      }
      if (!["/login", "/signup"].includes(window.location.pathname)) {
        const pagePath = [
          "/respond-invite",
          "/befriend",
          "/r",
          "/ai-roadmaps"
        ].includes(window.location.pathname) ? window.location.pathname + window.location.search : window.location.pathname;
        localStorage.setItem(LINKEDIN_REDIRECT_AT, Date.now().toString());
        localStorage.setItem(LINKEDIN_LAST_PAGE, pagePath);
      }
      window.location.href = response.loginUrl;
    }).catch((err) => {
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
      setIsDisabled?.(false);
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: cn(
          "inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-hidden hover:border-gray-400 focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60",
          className
        ),
        disabled: isLoading || isDisabled,
        onClick: handleClick,
        children: [
          isLoading ? /* @__PURE__ */ jsx(Spinner, { className: "h-[18px] w-[18px]", isDualRing: false }) : /* @__PURE__ */ jsx(LinkedInIcon, { className: "h-[18px] w-[18px] text-blue-700" }),
          "Continue with LinkedIn"
        ]
      }
    ),
    error && /* @__PURE__ */ jsx("p", { className: "mb-2 mt-1 text-sm font-medium text-red-600", children: error })
  ] });
}

function EmailLoginForm(props) {
  const { isDisabled, setIsDisabled } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDisabled?.(true);
    setError("");
    const { response, error: error2 } = await httpPost(`${undefined                              }/v1-login`, {
      email,
      password
    });
    if (response?.token) {
      setAuthToken(response.token);
      const currentLocation = window.location.href;
      const url = new URL(currentLocation, window.location.origin);
      url.searchParams.set(FIRST_LOGIN_PARAM, response?.isNewUser ? "1" : "0");
      url.searchParams.set(COURSE_PURCHASE_PARAM, "1");
      window.location.href = url.toString();
      return;
    }
    if (error2.type === "user_not_verified") {
      window.location.href = `/verification-pending?email=${encodeURIComponent(
        email
      )}`;
      return;
    }
    setIsLoading(false);
    setIsDisabled?.(false);
    setError(error2?.message || "Something went wrong. Please try again later.");
  };
  const emailFieldId = `form:${useId()}`;
  const passwordFieldId = `form:${useId()}`;
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: "w-full",
      onSubmit: handleFormSubmit,
      suppressHydrationWarning: true,
      children: [
        /* @__PURE__ */ jsx("label", { htmlFor: emailFieldId, className: "sr-only", children: "Email address" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: emailFieldId,
            name: "email",
            type: "email",
            autoComplete: "email",
            required: true,
            className: "block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1",
            placeholder: "Email Address",
            value: email,
            onInput: (e) => setEmail(String(e.target.value))
          }
        ),
        /* @__PURE__ */ jsx("label", { htmlFor: passwordFieldId, className: "sr-only", children: "Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: passwordFieldId,
            name: "password",
            type: "password",
            autoComplete: "current-password",
            required: true,
            className: "mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1",
            placeholder: "Password",
            value: password,
            onInput: (e) => setPassword(String(e.target.value))
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-2 mb-3 text-sm text-gray-500", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "/forgot-password",
            className: "text-blue-800 hover:text-blue-600",
            children: "Reset your password?"
          }
        ) }),
        error && /* @__PURE__ */ jsx("p", { className: "mb-2 rounded-md bg-red-100 p-2 text-red-800", children: error }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: isLoading || isDisabled,
            className: "inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-hidden focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400",
            children: isLoading ? "Please wait..." : "Continue"
          }
        )
      ]
    }
  );
}

function EmailSignupForm(props) {
  const { isDisabled, setIsDisabled } = props;
  const { rc: referralCode } = getUrlParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDisabled?.(true);
    setError("");
    const { response, error: error2 } = await httpPost(
      `${undefined                              }/v1-register`,
      {
        email,
        password,
        name,
        src: urlToId(getLastPath() || window.location.pathname)
      }
    );
    if (error2 || response?.status !== "ok") {
      setIsLoading(false);
      setIsDisabled?.(false);
      setError(
        error2?.message || "Something went wrong. Please try again later."
      );
      return;
    }
    window.location.href = `/verification-pending?email=${encodeURIComponent(
      email
    )}`;
  };
  useEffect(() => {
    if (!referralCode || isLoggedIn()) {
      deleteUrlParam("rc");
      return;
    }
    setAIReferralCode(referralCode);
    deleteUrlParam("rc");
  }, []);
  return /* @__PURE__ */ jsxs("form", { className: "flex w-full flex-col gap-2", onSubmit, children: [
    /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "sr-only", children: "Name" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        name: "name",
        type: "text",
        autoComplete: "name",
        min: 3,
        max: 50,
        required: true,
        className: "block w-full rounded-lg border border-gray-300 px-3 py-2 outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1",
        placeholder: "Full Name",
        value: name,
        onInput: (e) => setName(String(e.target.value))
      }
    ),
    /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "sr-only", children: "Email address" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        name: "email",
        type: "email",
        autoComplete: "email",
        required: true,
        className: "block w-full rounded-lg border border-gray-300 px-3 py-2 outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1",
        placeholder: "Email Address",
        value: email,
        onInput: (e) => setEmail(String(e.target.value))
      }
    ),
    /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "sr-only", children: "Password" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        name: "password",
        type: "password",
        autoComplete: "current-password",
        min: 6,
        max: 50,
        required: true,
        className: "block w-full rounded-lg border border-gray-300 px-3 py-2 outline-hidden placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1",
        placeholder: "Password",
        value: password,
        onInput: (e) => setPassword(String(e.target.value))
      }
    ),
    error && /* @__PURE__ */ jsxs("p", { className: "rounded-lg bg-red-100 p-2 text-red-700", children: [
      error,
      "."
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        disabled: isLoading || isDisabled,
        className: "inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-hidden focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400",
        children: isLoading ? "Please wait..." : "Continue to Verify Email"
      }
    )
  ] });
}

const CHECKOUT_AFTER_LOGIN_KEY = "checkoutAfterLogin";

const GITHUB_REDIRECT_AT = "githubRedirectAt";
const GITHUB_LAST_PAGE = "githubLastPage";
function GitHubButton(props) {
  const { isDisabled, setIsDisabled, className } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const provider = urlParams.get("provider");
    if (!code || !state || provider !== "github") {
      return;
    }
    setIsLoading(true);
    setIsDisabled?.(true);
    const lastPageBeforeGithub = localStorage.getItem(GITHUB_LAST_PAGE);
    httpGet(
      `${undefined                              }/v1-github-callback${window.location.search}&src=${urlToId(lastPageBeforeGithub || getLastPath() || window.location.pathname)}`
    ).then(({ response, error: error2 }) => {
      if (!response?.token) {
        const errMessage = error2?.message || "Something went wrong.";
        setError(errMessage);
        setIsLoading(false);
        setIsDisabled?.(false);
        return;
      }
      triggerUtmRegistration();
      let redirectUrl = new URL("/", window.location.origin);
      const gitHubRedirectAt = localStorage.getItem(GITHUB_REDIRECT_AT);
      if (gitHubRedirectAt && lastPageBeforeGithub) {
        const socialRedirectAtTime = parseInt(gitHubRedirectAt, 10);
        const now = Date.now();
        const timeSinceRedirect = now - socialRedirectAtTime;
        if (timeSinceRedirect < 30 * 1e3) {
          redirectUrl = new URL(lastPageBeforeGithub, window.location.origin);
        }
      }
      const authRedirectUrl = localStorage.getItem("authRedirect");
      if (authRedirectUrl) {
        localStorage.removeItem("authRedirect");
        redirectUrl = new URL(authRedirectUrl, window.location.origin);
      }
      localStorage.removeItem(GITHUB_REDIRECT_AT);
      localStorage.removeItem(GITHUB_LAST_PAGE);
      setAuthToken(response.token);
      redirectUrl.searchParams.set(
        FIRST_LOGIN_PARAM,
        response?.isNewUser ? "1" : "0"
      );
      const shouldTriggerPurchase = localStorage.getItem(CHECKOUT_AFTER_LOGIN_KEY) !== "0";
      if (redirectUrl.pathname.includes("/courses/sql") && shouldTriggerPurchase) {
        redirectUrl.searchParams.set(COURSE_PURCHASE_PARAM, "1");
        localStorage.removeItem(CHECKOUT_AFTER_LOGIN_KEY);
      }
      window.location.href = redirectUrl.toString();
    }).catch((err) => {
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
      setIsDisabled?.(false);
    });
  }, []);
  const handleClick = async () => {
    setIsLoading(true);
    setIsDisabled?.(true);
    const { response, error: error2 } = await httpGet(
      `${undefined                              }/v1-github-login`
    );
    if (error2 || !response?.loginUrl) {
      setError(
        error2?.message || "Something went wrong. Please try again later."
      );
      setIsLoading(false);
      setIsDisabled?.(false);
      return;
    }
    if (!["/login", "/signup"].includes(window.location.pathname)) {
      const pagePath = [
        "/respond-invite",
        "/befriend",
        "/r",
        "/ai-roadmaps"
      ].includes(window.location.pathname) ? window.location.pathname + window.location.search : window.location.pathname;
      localStorage.setItem(GITHUB_REDIRECT_AT, Date.now().toString());
      localStorage.setItem(GITHUB_LAST_PAGE, pagePath);
    }
    window.location.href = response.loginUrl;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: cn(
          "inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-hidden hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60",
          className
        ),
        disabled: isLoading || isDisabled,
        onClick: handleClick,
        children: [
          isLoading ? /* @__PURE__ */ jsx(Spinner, { className: "h-[18px] w-[18px]", isDualRing: false }) : /* @__PURE__ */ jsx(GitHubIcon, { className: "h-[18px] w-[18px]" }),
          "Continue with GitHub"
        ]
      }
    ),
    error && /* @__PURE__ */ jsx("p", { className: "mb-2 mt-1 text-sm font-medium text-red-600", children: error })
  ] });
}

function AuthenticationForm(props) {
  const { type = "login" } = props;
  const [isDisabled, setIsDisabled] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-2", children: [
      /* @__PURE__ */ jsx(GitHubButton, { isDisabled, setIsDisabled }),
      /* @__PURE__ */ jsx(GoogleButton, { isDisabled, setIsDisabled }),
      /* @__PURE__ */ jsx(LinkedInButton, { isDisabled, setIsDisabled })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center gap-2 py-6 text-sm text-slate-600", children: [
      /* @__PURE__ */ jsx("div", { className: "h-px w-full bg-slate-200" }),
      "OR",
      /* @__PURE__ */ jsx("div", { className: "h-px w-full bg-slate-200" })
    ] }),
    type === "login" ? /* @__PURE__ */ jsx(EmailLoginForm, { isDisabled, setIsDisabled }) : /* @__PURE__ */ jsx(
      EmailSignupForm,
      {
        isDisabled,
        setIsDisabled
      }
    )
  ] });
}

const $$LoginPopup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Popup", $$Popup, { "id": "login-popup", "title": "", "subtitle": "" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-7 text-center"> <p class="mb-3 text-2xl leading-5 font-semibold text-slate-900">
Login or Signup
</p> <p class="mt-2 text-sm leading-4 text-slate-600">
You must be logged in to perform this action.
</p> </div> ${renderComponent($$result2, "AuthenticationForm", AuthenticationForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/AuthenticationFlow/AuthenticationForm", "client:component-export": "AuthenticationForm" })} <div class="mt-3 w-full rounded-md border py-2 text-center text-sm text-slate-600">
Don't have an account?${" "} <a href="/signup" class="font-medium text-blue-700 hover:text-blue-600 hover:underline">
Sign up
</a> </div> ${renderComponent($$result2, "AccountTerms", AccountTerms, {})} ` })}`;
}, "C:/Users/Utente/Desktop/dev-roadmaps/developer-roadmap/src/components/AuthenticationFlow/LoginPopup.astro", void 0);

export { $$LoginPopup as $ };
