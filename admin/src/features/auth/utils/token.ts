import Cookies from "js-cookie";

const ACCESS_TOKEN = "vbk_access_token";

export function setAccessToken(token: string) {
  Cookies.set(ACCESS_TOKEN, token, {
    expires: 1,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function getAccessToken() {
  return Cookies.get(ACCESS_TOKEN);
}

export function removeAccessToken() {
  Cookies.remove(ACCESS_TOKEN);
}