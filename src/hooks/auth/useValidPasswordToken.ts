import { useState } from "react";
import useStorage from "../useStorage";
import ErrorsHandling from "../../services/errors";
import { AxiosError } from "axios";
import { validPasswordTokenService } from "../../services/authServices/validPasswordTokenService";

export interface useValidPasswordTokenProps {
  token: string;
  email: string;
}

export default function useValidPasswordToken() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { cleanTokens } = useStorage();

  const validPasswordToken = async ({
    token,
    email,
  }: useValidPasswordTokenProps) => {
    setLoading(true);
    setError(null);
    cleanTokens();

    try {
      const response = await validPasswordTokenService({ token, email });
      setData(response);
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
    validPasswordToken,
  };
}
