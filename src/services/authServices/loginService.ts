import auth from "../axiosCalls/auth";
import { loginUrl, clientId, secretId } from "../apiRoutes";
import { AuthResponse } from "../../types";

interface loginServiceProps {
  email: string;
  password: string;
}

export const loginService = ({
  email,
  password,
}: loginServiceProps): Promise<AuthResponse> =>
  auth.post(loginUrl, loginServicePayload({ email, password }));

const loginServicePayload = ({ email, password }: loginServiceProps) => {
  return {
    grant_type: "password",
    email: email,
    password: password,
    client_id: clientId,
    client_secret: secretId,
  };
};
