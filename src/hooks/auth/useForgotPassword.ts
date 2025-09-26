import { useState } from "react";
import useStorage from "../useStorage";
import ErrorsHandling from "../../services/errors";
import { AxiosError } from "axios";
import { forgotPasswordService } from "../../services/authServices/forgotPasswordService";

export interface useForgotPasswordProps {
  email: string;
}

export default function useForgotPassword() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { cleanTokens } = useStorage();

  const forgotPassword = async ({ email }: useForgotPasswordProps) => {
    setLoading(true);
    setError(null);
    cleanTokens();

    try {
      const response = await forgotPasswordService({ email });
      setData(response);
    } catch (err: unknown) {
      setError(ErrorsHandling("forgot_password", err as AxiosError));
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    forgotPassword,
  };
}
