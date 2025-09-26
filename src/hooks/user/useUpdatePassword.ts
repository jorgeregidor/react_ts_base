import { useState } from "react";
import ErrorsHandling from "../../services/errors";
import { AxiosError } from "axios";
import { updatePasswordService } from "../../services/userServices/updatePasswordService";

export interface useUpdatePasswordProps {
  id: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

export default function useUpdatePassword() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updatePassword = async ({
    id,
    old_password,
    password,
    password_confirmation,
  }: useUpdatePasswordProps) => {
    setLoading(true);
    setError(null);

    try {
      const response = await updatePasswordService({
        id,
        old_password,
        password,
        password_confirmation,
      });
      setData(response);
    } catch (err: unknown) {
      setError(ErrorsHandling("user_update_password", err as AxiosError));
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    updatePassword,
  };
}
