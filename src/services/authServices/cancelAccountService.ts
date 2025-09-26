import http from "../axiosCalls/base";
import { deleteCurrentUser } from "../apiRoutes";

export const cancelAccountService = (): Promise<any> =>
  http.delete(deleteCurrentUser);
