import http from "../axiosCalls/base";
import backendRoutes from "../routes";

export interface UpdatePasswordServiceProps {
  id: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

export const updatePasswordService = (
  data: UpdatePasswordServiceProps,
): Promise<any> =>
  http.patch(
    backendRoutes.userPasswordUrl(data.id),
    updatePasswordPayload(data),
  );

const updatePasswordPayload = (data: UpdatePasswordServiceProps) => {
  return {
    old_password: data.old_password,
    password: data.password,
    password_confirmation: data.password_confirmation,
  };
};
