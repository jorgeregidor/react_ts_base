import { useState, useContext } from "react";
import useStorage from "../useStorage";
import ErrorsHandling from "../../services/errors";
import { AxiosError } from "axios";
import UserContext from "../../contexts/UserContext";
import { cancelAccountService } from "../../services/authServices/cancelAccountService";

export default function useCancelAccount() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { cleanTokens } = useStorage();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useCancelAccount must be used within a UserContextProvider",
    );
  }

  const { setUserData } = context;

  const cancelAccount = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await cancelAccountService();
      setData(response);
      cleanTokens();
      setUserData(null);
    } catch (err: unknown) {
      setError(ErrorsHandling("cancel_account", err as AxiosError));
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    cancelAccount,
  };
}
