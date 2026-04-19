import * as jose from 'jose';
import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = "__roadmapsh_jt__";
const FIRST_LOGIN_PARAM = "fl";
const COURSE_PURCHASE_PARAM = "t";
function decodeToken(token) {
  const claims = jose.decodeJwt(token);
  return claims;
}
function isLoggedIn() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  return !!token;
}
function getUser() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (!token) {
    return null;
  }
  return decodeToken(token);
}
function setAuthToken(token) {
  Cookies.set(TOKEN_COOKIE_NAME, token, {
    path: "/",
    expires: 30,
    sameSite: "lax",
    secure: true,
    domain: ".roadmap.sh"
  });
  removeAIReferralCode();
}
function removeAuthToken() {
  Cookies.remove(TOKEN_COOKIE_NAME, {
    path: "/",
    domain: ".roadmap.sh"
  });
}
const AI_REFERRAL_COOKIE_NAME = "referral_code";
function setAIReferralCode(code) {
  const alreadyExist = Cookies.get(AI_REFERRAL_COOKIE_NAME);
  if (alreadyExist) {
    return;
  }
  Cookies.set(AI_REFERRAL_COOKIE_NAME, code, {
    path: "/",
    expires: 365,
    sameSite: "lax",
    secure: true,
    domain: ".roadmap.sh"
  });
}
function removeAIReferralCode() {
  Cookies.remove(AI_REFERRAL_COOKIE_NAME, {
    path: "/",
    domain: ".roadmap.sh"
  });
}

export { COURSE_PURCHASE_PARAM as C, FIRST_LOGIN_PARAM as F, TOKEN_COOKIE_NAME as T, setAIReferralCode as a, decodeToken as d, getUser as g, isLoggedIn as i, removeAuthToken as r, setAuthToken as s };
