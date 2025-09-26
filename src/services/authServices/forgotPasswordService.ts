import auth from "../axiosCalls/auth";
import { clientId, forgotPasswordUrl } from "../apiRoutes";

export interface ForgotPasswordServiceProps {
  email: string;
}

export const forgotPasswordService = (
  user: ForgotPasswordServiceProps,
): Promise<any> =>
  auth.post(forgotPasswordUrl, forgotPasswordPayload(user));

const forgotPasswordPayload = (user: ForgotPasswordServiceProps) => {
  return {
    email: user.email,
    client_id: clientId,
  };
};
