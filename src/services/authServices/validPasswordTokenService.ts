import auth from "../axiosCalls/auth";
import backendRoutes from "../routes";

interface ValidPasswordTokenData {
  token: string;
  email: string;
}

export const validPasswordTokenService = (data: ValidPasswordTokenData): Promise<any> =>
  auth.post(backendRoutes.validPasswordTokenUrl, validPasswordTokenPayload(data));

const validPasswordTokenPayload = (data: ValidPasswordTokenData) => {
  return {
    email: data.email,
    token: data.token,
    client_id: backendRoutes.clientId,
  };
};
