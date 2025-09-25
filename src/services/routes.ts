const baseUrl = import.meta.env.VITE_BASE_API_URL || "http://localhost:3000";
const loginUrl = "/auth/token";
const logoutUrl = "/auth/logout";
const signUpUrl = "/auth/signup";
const currentUserUrl = "/users/current";
const forgotPasswordUrl = "/auth/forgot_password";
const validPasswordTokenUrl = "/auth/valid_password_token";
const deleteCurrentUser = "/auth/destroy_current";
const resetPasswordUrl = "/auth/reset";
const userUrl = (id: string) => `/users/${id}`;
const userPasswordUrl = (id: string) => `/users/${id}/password`;

const clientId = import.meta.env.VITE_BASE_CLIENT_ID;
const secretId = import.meta.env.VITE_BASE_SECRET_ID;

export default {
  baseUrl,
  loginUrl,
  logoutUrl,
  signUpUrl,
  forgotPasswordUrl,
  validPasswordTokenUrl,
  deleteCurrentUser,
  resetPasswordUrl,
  currentUserUrl,
  userUrl,
  userPasswordUrl,
  clientId,
  secretId,
};
