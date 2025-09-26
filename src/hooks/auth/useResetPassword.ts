import { useState } from "react";
import useStorage from "../useStorage";
import ErrorsHandling from "../../services/errors";
import { AxiosError } from "axios";
import { resetPasswordService } from "../../services/authServices/resetPasswordService";

export interface useResetPasswordProps {
  token: string;
  password: string;
  email: string;
}

export default function useResetPassword() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { setTokens } = useStorage();

  const resetPassword = async ({
    token,
    password,
    email,
  }: useResetPasswordProps) => {
    setLoading(true);
    setError(null);

    try {
      const authResponse = await resetPasswordService({
        token,
        password,
        email,
      });
      setTokens(authResponse.access_token, authResponse.refresh_token);
      setData(authResponse);
    } catch (err: unknown) {
      setError(ErrorsHandling("reset_password", err as AxiosError));
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    resetPassword,
  };
}
