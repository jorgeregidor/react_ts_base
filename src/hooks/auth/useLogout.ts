import { useState } from 'react';
import useStorage from '../useStorage';
import ErrorsHandling from '../../services/errors';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { logoutService } from '../../services/authServices/logoutService';
import { AxiosError } from 'axios';

export default function useLogout() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<any>(null);
  
  const { cleanTokens } = useStorage();
  const context = useContext(UserContext);

  
  if (!context) {
    throw new Error('useLogout must be used within a UserContextProvider');
  }
  
  const { setUserData } = context;

  const logout = async () => {
    setLoading(true);
    setError(undefined);
    
    try {
      const response: any = await logoutService();
      setData(response);
      cleanTokens();
      setUserData(null);
    } catch (err: unknown) {
      setError(ErrorsHandling('logout', err as AxiosError));
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    logout,
    loading,
    error
  };
}
