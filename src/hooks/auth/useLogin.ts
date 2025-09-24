import { useState } from 'react';
import userService from '../../services/users';
import useStorage from '../useStorage';
import { User, AuthResponse } from '../../types';
import ErrorsHandling from '../../services/errors';
import { AxiosError } from 'axios';
import { loginService } from '../../services/authServices/loginService';

export interface useLoginProps {
  email: string;
  password: string;
}

export default function useLogin() {
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const { setTokens, cleanTokens } = useStorage();



  const login = async ({email, password}: useLoginProps) => {
    setLoading(true);
    setError(null);
    
    try {
      const authResponse: AuthResponse = await loginService({email, password});
      setTokens(authResponse.access_token, authResponse.refresh_token);
      
      const userResponse: User = await userService.me();
      setData(userResponse);
      
    } catch (err: unknown) {
      cleanTokens();
      console.log(err)
      setError(ErrorsHandling('login', err as AxiosError));
      
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    login
  };
}
