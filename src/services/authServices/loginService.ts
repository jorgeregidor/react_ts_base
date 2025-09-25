import auth from "../axiosCalls/auth";
import backendRoutes from "../routes";
import { AuthResponse } from "../../types";

interface loginServiceProps {
  email: string;
  password: string;
}

export const loginService = ({
  email,
  password,
}: loginServiceProps): Promise<AuthResponse> =>
  auth.post(backendRoutes.loginUrl, loginServicePayload({ email, password }));

const loginServicePayload = ({ email, password }: loginServiceProps) => {
  return {
    grant_type: "password",
    email: email,
    password: password,
    client_id: backendRoutes.clientId,
    client_secret: backendRoutes.secretId,
  };
};
