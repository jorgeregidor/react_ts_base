import { User } from "../../types";
import http from "../axiosCalls/base";
import { userUrl } from "../apiRoutes";

export interface UpdateEmailServiceProps {
  id: string;
  email: string;
  password: string;
}

export const updateEmailService = (
  data: UpdateEmailServiceProps,
): Promise<User> =>
  http.patch(userUrl(data.id), updateEmailPayload(data));

const updateEmailPayload = (data: UpdateEmailServiceProps) => {
  return {
    email: data.email,
  };
};
