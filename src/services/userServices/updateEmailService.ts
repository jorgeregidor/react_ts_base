import { User } from "../../types";
import http from "../axiosCalls/base";
import backendRoutes from "../routes";

export interface UpdateEmailServiceProps {
  id: string;
  email: string;
  password: string;
}

export const updateEmailService = (
  data: UpdateEmailServiceProps,
): Promise<User> =>
  http.patch(backendRoutes.userUrl(data.id), updateEmailPayload(data));

const updateEmailPayload = (data: UpdateEmailServiceProps) => {
  return {
    email: data.email,
  };
};
