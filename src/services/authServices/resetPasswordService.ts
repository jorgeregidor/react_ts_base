import auth from "../axiosCalls/auth";
import { resetPasswordUrl, clientId } from "../apiRoutes";
import { AuthResponse } from "../../types";

export interface ResetPasswordServiceProps {
  token: string;
  password: string;
  email: string;
}

export const resetPasswordService = (
  data: ResetPasswordServiceProps,
): Promise<AuthResponse> =>
  auth.post(resetPasswordUrl, resetPasswordPayload(data));

const resetPasswordPayload = (data: ResetPasswordServiceProps) => {
  return {
    token: data.token,
    email: data.email,
    client_id: clientId,
    password: data.password,
    password_confirmation: data.password,
  };
};
