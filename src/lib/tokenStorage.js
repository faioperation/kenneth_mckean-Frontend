import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";
const RESET_TOKEN_KEY = "resetToken";

export const tokenStorage = {
  // Access Token
  getAccessToken() {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },
  setAccessToken(token) {
    Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 7, secure: true, sameSite: 'strict' });
  },
  removeAccessToken() {
    Cookies.remove(ACCESS_TOKEN_KEY);
  },

  // Refresh Token
  getRefreshToken() {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },
  setRefreshToken(token) {
    Cookies.set(REFRESH_TOKEN_KEY, token, { expires: 30, secure: true, sameSite: 'strict' });
  },
  removeRefreshToken() {
    Cookies.remove(REFRESH_TOKEN_KEY);
  },

  // User Data
  getUser() {
    const user = Cookies.get(USER_KEY);
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error("Error parsing user from cookies", e);
      return null;
    }
  },
  setUser(user) {
    Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7, secure: true, sameSite: 'strict' });
  },
  removeUser() {
    Cookies.remove(USER_KEY);
  },

  // Reset Token (short-lived)
  getResetToken() {
    return Cookies.get(RESET_TOKEN_KEY);
  },
  setResetToken(token) {
    Cookies.set(RESET_TOKEN_KEY, token, { expires: 1/24, secure: true, sameSite: 'strict' }); // 1 hour
  },
  removeResetToken() {
    Cookies.remove(RESET_TOKEN_KEY);
  },

  clear() {
    this.removeAccessToken();
    this.removeRefreshToken();
    this.removeUser();
    this.removeResetToken();
  },
};