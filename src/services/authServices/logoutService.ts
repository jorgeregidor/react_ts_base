import auth from "../axiosCalls/auth";
import backendRoutes from "../routes";

export const logoutService = (): Promise<any> =>
  auth.post(backendRoutes.logoutUrl, logoutServicePayload());

const logoutServicePayload = () => {
  return {
    token: localStorage.getItem("accessToken"),
    client_id: backendRoutes.clientId,
    client_secret: backendRoutes.secretId,
  };
};
