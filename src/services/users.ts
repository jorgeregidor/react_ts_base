import auth from "./axiosCalls/auth";
import http from "./axiosCalls/base";
import backendRoutes from "./routes";
import {
  ChangeEmailData,
  ChangePasswordData,
  AuthResponse,
  User,
} from "../types";

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
  updateEmail,
  updatePassword,
};
