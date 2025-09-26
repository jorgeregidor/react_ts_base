import auth from "../axiosCalls/auth";
import { logoutUrl, clientId, secretId } from "../apiRoutes";

export const logoutService = (): Promise<any> =>
  auth.post(logoutUrl, logoutServicePayload());

const logoutServicePayload = () => {
  return {
    token: localStorage.getItem("accessToken"),
    client_id: clientId,
    client_secret: secretId,
  };
};
