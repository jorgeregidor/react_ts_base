import { AuthResponse } from "@/types";
import auth from "../axiosCalls/auth";
import { signUpUrl, clientId } from "../apiRoutes";

export interface SignUpServiceProps {
  email: string;
  password: string;
  name?: string;
}

export const signUpService = (
  user: SignUpServiceProps,
): Promise<AuthResponse> =>
  auth.post(signUpUrl, signUpPayload(user));

const signUpPayload = (user: SignUpServiceProps) => {
  return {
    email: user.email,
    password: user.password,
    password_confirmation: user.password,
    client_id: clientId,
  };
};
