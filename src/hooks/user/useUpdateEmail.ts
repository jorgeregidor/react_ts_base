import { useState, useContext } from "react";
import ErrorsHandling from "../../services/errors";
import { AxiosError } from "axios";
import { updateEmailService } from "../../services/userServices/updateEmailService";
import UserContext from "../../contexts/UserContext";
import { User } from "../../types";

export interface useUpdateEmailProps {
  id: string;
  email: string;
  password: string;
}

export default function useUpdateEmail() {
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUpdateEmail must be used within a UserContextProvider");
  }

  const { setUserData } = context;

  const updateEmail = async ({ id, email, password }: useUpdateEmailProps) => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateEmailService({ id, email, password });
      setData(response);
      setUserData(response);
    } catch (err: unknown) {
      setError(ErrorsHandling("user_update_email", err as AxiosError));
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    updateEmail,
  };
}
