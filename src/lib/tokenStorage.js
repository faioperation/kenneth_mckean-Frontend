const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const isBrowser = typeof window !== "undefined";

export const tokenStorage = {
  getAccessToken() {
    return isBrowser ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
  },

  setAccessToken(token) {
    if (isBrowser) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
  },

  removeAccessToken() {
    if (isBrowser) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  },

  getRefreshToken() {
    return isBrowser ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
  },

  setRefreshToken(token) {
    if (isBrowser) {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    }
  },

  removeRefreshToken() {
    if (isBrowser) {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  },

  clear() {
    this.removeAccessToken();
    this.removeRefreshToken();
  },
};