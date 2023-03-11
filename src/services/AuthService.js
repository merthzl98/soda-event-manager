import http from "./http-common";

const AUTH_BASE = "/auth/login";

const postUserCredentials = (userData) => {
  return http.post(AUTH_BASE, userData);
};

const AuthService = { postUserCredentials };

export default AuthService;
