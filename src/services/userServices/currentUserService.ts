import { User } from "../../types";
import http from "../axiosCalls/base";
import { currentUserUrl } from "../apiRoutes";

export const currentUserService = (): Promise<User> => http.get(currentUserUrl);
