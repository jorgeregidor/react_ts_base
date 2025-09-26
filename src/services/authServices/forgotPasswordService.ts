import auth from "../axiosCalls/auth";
import backendRoutes from "../routes";

export interface ForgotPasswordServiceProps {
  email: string;
}

export const forgotPasswordService = (user: ForgotPasswordServiceProps): Promise<any> =>
  auth.post(backendRoutes.forgotPasswordUrl, forgotPasswordPayload(user));

const forgotPasswordPayload = (user: ForgotPasswordServiceProps) => {
  return {
    email: user.email,
    client_id: backendRoutes.clientId,
  };
};
