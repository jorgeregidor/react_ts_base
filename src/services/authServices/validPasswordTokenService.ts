import auth from "../axiosCalls/auth";
import { validPasswordTokenUrl, clientId } from "../apiRoutes";

interface ValidPasswordTokenData {
  token: string;
  email: string;
}

export const validPasswordTokenService = (
  data: ValidPasswordTokenData,
): Promise<any> =>
  auth.post(
    validPasswordTokenUrl,
    validPasswordTokenPayload(data),
  );

const validPasswordTokenPayload = (data: ValidPasswordTokenData) => {
  return {
    email: data.email,
    token: data.token,
    client_id: clientId,
  };
};
