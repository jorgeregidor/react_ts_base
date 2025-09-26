import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { currentUserService } from "../../services/userServices/currentUserService";
import useStorage from "../useStorage";
import ErrorsHandling from "../../services/errors";
import { AxiosError } from "axios";

export default function useCurrentUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a UserContextProvider");
  }

  const { userData, setUserData } = context;
  const { cleanTokens } = useStorage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchCurrentUser = async (): Promise<void> => {
    if (!userData) {
      setLoading(true);
      setError(undefined);

      try {
        const userResponse = await currentUserService();
        setUserData(userResponse);
      } catch (err: unknown) {
        cleanTokens();
        setUserData(null);
        setError(ErrorsHandling("login", err as AxiosError));
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    data: userData,
    error,
    loading,
    fetchCurrentUser,
  };
}
