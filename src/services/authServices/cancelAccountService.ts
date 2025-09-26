import http from "../axiosCalls/base";
import backendRoutes from "../routes";

export const cancelAccountService = (): Promise<any> =>
  http.delete(backendRoutes.deleteCurrentUser);
