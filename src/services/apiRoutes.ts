export const baseUrl =
  import.meta.env.VITE_BASE_API_URL || "http://localhost:3000";
export const loginUrl = "/auth/token";
export const logoutUrl = "/auth/logout";
export const signUpUrl = "/auth/signup";
export const currentUserUrl = "/users/current";
export const forgotPasswordUrl = "/auth/forgot_password";
export const validPasswordTokenUrl = "/auth/valid_password_token";
export const deleteCurrentUser = "/auth/destroy_current";
export const resetPasswordUrl = "/auth/reset";
export const userUrl = (id: string) => `/users/${id}`;
export const userPasswordUrl = (id: string) => `/users/${id}/password`;

export const clientId = import.meta.env.VITE_BASE_CLIENT_ID;
export const secretId = import.meta.env.VITE_BASE_SECRET_ID;
