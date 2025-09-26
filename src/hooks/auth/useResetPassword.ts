import { useState, useContext } from "react";
import useStorage from "../useStorage";
import ErrorsHandling from "../../services/errors";
import { AxiosError } from "axios";
import { resetPasswordService } from "../../services/authServices/resetPasswordService";
import { currentUserService } from "../../services/userServices/currentUserService";
import UserContext from "../../contexts/UserContext";

export interface useResetPasswordProps {
  token: string;
  password: string;
}

export default function useResetPassword() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { setTokens, cleanTokens } = useStorage();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useResetPassword must be used within a UserContextProvider");
  }

  const { setUserData } = context;

  const resetPassword = async ({ token, password }: useResetPasswordProps) => {
    setLoading(true);
    setError(null);

    try {
      const authResponse = await resetPasswordService({ token, password });
      setTokens(authResponse.access_token, authResponse.refresh_token);
      setData(authResponse);
      
      // Get user data after successful reset
      const userResponse = await currentUserService();
      setUserData(userResponse);
    } catch (err: unknown) {
      cleanTokens();
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
