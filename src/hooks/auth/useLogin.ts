import { useState } from "react";
import useStorage from "../useStorage";
import { AuthResponse } from "../../types";
import ErrorsHandling from "../../services/errors";
import { AxiosError } from "axios";
import { loginService } from "../../services/authServices/loginService";

export interface useLoginProps {
  email: string;
  password: string;
}

export default function useLogin() {
  const [data, setData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { setTokens, cleanTokens } = useStorage();

  const login = async ({ email, password }: useLoginProps) => {
    setLoading(true);
    setError(null);

    try {
      const authResponse: AuthResponse = await loginService({
        email,
        password,
      });
      setTokens(authResponse.access_token, authResponse.refresh_token);
      setData(authResponse);
    } catch (err: unknown) {
      cleanTokens();
      setError(ErrorsHandling("login", err as AxiosError));
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    login,
  };
}
