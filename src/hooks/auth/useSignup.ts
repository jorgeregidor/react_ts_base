import { useState } from "react";
import useStorage from "../useStorage";
import { AuthResponse } from "../../types";
import ErrorsHandling from "../../services/errors";
import { AxiosError } from "axios";
import { signUpService } from "../../services/authServices/singupService";

export interface useSignupProps {
  email: string;
  password: string;
  name?: string;
}

export default function useSignup() {
  const [data, setData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { setTokens, cleanTokens } = useStorage();

  const signup = async ({ email, password, name }: useSignupProps) => {
    setLoading(true);
    setError(null);

    try {
      const authResponse: AuthResponse = await signUpService({
        email,
        password,
        name,
      });
      setTokens(authResponse.access_token, authResponse.refresh_token);
      setData(authResponse);
      
    } catch (err: unknown) {
      cleanTokens();
      setError(ErrorsHandling("sign_up", err as AxiosError));
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    signup,
  };
}
