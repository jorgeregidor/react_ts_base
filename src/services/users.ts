import auth from "./axiosCalls/auth";
import http from "./axiosCalls/base";
import backendRoutes from "./routes";
import {
  ForgotPasswordData,
  ResetPasswordData,
  ChangeEmailData,
  ChangePasswordData,
  AuthResponse,
  User,
} from "../types";

const forgotPassword = (user: ForgotPasswordData): Promise<any> =>
  auth.post(backendRoutes.forgotPasswordUrl, forgotPasswordPayload(user));

const forgotPasswordPayload = (user: ForgotPasswordData) => {
  return {
    email: user.email,
    client_id: backendRoutes.clientId,
  };
};

const validPasswordToken = (data: {
  token: string;
  email: string;
}): Promise<any> =>
  auth.post(
    backendRoutes.validPasswordTokenUrl,
    validPasswordTokenPayload(data),
  );

const validPasswordTokenPayload = (data: { token: string; email: string }) => {
  return {
    email: data.email,
    token: data.token,
    client_id: backendRoutes.clientId,
  };
};

const resetPassword = (data: ResetPasswordData): Promise<AuthResponse> =>
  auth.post(backendRoutes.resetPasswordUrl, resetPasswordPayload(data));

const resetPasswordPayload = (data: ResetPasswordData) => {
  return {
    token: data.token,
    client_id: backendRoutes.clientId,
    password: data.password,
    password_confirmation: data.password,
  };
};

const updateEmail = (data: ChangeEmailData): Promise<User> =>
  http.patch(backendRoutes.userUrl(data.id), updateEmailPayload(data));

const updateEmailPayload = (data: ChangeEmailData) => {
  return {
    email: data.email,
  };
};

const updatePassword = (data: ChangePasswordData): Promise<any> =>
  http.patch(
    backendRoutes.userPasswordUrl(data.id),
    updatePasswordPayload(data),
  );

const updatePasswordPayload = (data: ChangePasswordData) => {
  return {
    old_password: data.old_password,
    password: data.password,
    password_confirmation: data.password_confirmation,
  };
};

export default {
  forgotPassword,
  validPasswordToken,
  resetPassword,
  updateEmail,
  updatePassword,
};
