import { useCallback, useContext, useRef} from "react";
import UserContext from "../contexts/UserContext";
import userService from "./../services/users";
import { useNavigate } from "react-router-dom";
import useStorage from "./useStorage";
import ErrorsHandling from "../services/errors";
import { 
  LoginCredentials, 
  SignUpCredentials, 
  ForgotPasswordData, 
  ResetPasswordData, 
  HookResult 
} from "../types";

export default function useAuth() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserContextProvider');
  }
  
  const {userData, setUserData} = context;
  const result = useRef<HookResult | undefined>(undefined);
  const navigate = useNavigate();
  const {setTokens, cleanTokens, isLogged} = useStorage();

  const login = useCallback(async (user: LoginCredentials): Promise<HookResult> => {
    try {
        const authResponse = await userService.login(user);
        result.current = {response: authResponse, error: false}
        setTokens(authResponse.access_token, authResponse.refresh_token)
        const userResponse = await userService.me();
        console.log(userResponse)
        setUserData(userResponse)
    } catch (error) {
        console.log(error)
        cleanTokens()
        result.current = {response: null, error: ErrorsHandling('login',error)}
    }
    
    return result.current
  }, [cleanTokens, setTokens, setUserData])

  const signUp = useCallback(async (user: SignUpCredentials): Promise<HookResult> => {
    try {
        const authResponse = await userService.signUp(user);
        result.current = {response: authResponse, error: false}
        setTokens(authResponse.access_token, authResponse.refresh_token)
        const userResponse = await userService.me();
        setUserData(userResponse)
    } catch (error) {
        console.log(error)
        cleanTokens()
        result.current = {response: null, error: ErrorsHandling('sign_up',error)}
    }
    
    return result.current
  }, [cleanTokens, setTokens, setUserData])

  const forgotPassword = useCallback(async (user: ForgotPasswordData): Promise<HookResult> => {
    cleanTokens()
    try {
        const authResponse = await userService.forgotPassword(user);
        result.current = {response: authResponse, error: false}
    } catch (error) {
        console.log(error)
        result.current = {response: null, error: ErrorsHandling('forgot_password',error)}
    }
    
    return result.current
  }, [cleanTokens])

  const validPasswordToken = useCallback(async (data: { token: string; email: string }): Promise<HookResult> => {
    cleanTokens()
    try {
        const authResponse = await userService.validPasswordToken(data);
        result.current = {response: authResponse, error: false}
    } catch (error) {
        result.current = {response: null, error: ErrorsHandling('reset_password',error)}
    }
    
    return result.current
  }, [cleanTokens])

  const resetPassword = useCallback(async (data: ResetPasswordData): Promise<HookResult> => {
    try {
        const authResponse = await userService.resetPassword(data);
        result.current = {response: authResponse, error: false}
        setTokens(authResponse.access_token, authResponse.refresh_token)
        const userResponse = await userService.me();
        console.log(userResponse)
        setUserData(userResponse)
    } catch (error) {
        cleanTokens()
        result.current = {response: null, error: ErrorsHandling('reset_password',error)}
    }
    
    return result.current
  }, [cleanTokens, setTokens, setUserData])

  const cancelAccount = useCallback(async (): Promise<HookResult | undefined> => {
    try {
        await userService.cancelAccount();
        cleanTokens()
        setUserData(null)
        navigate('/login')
    } catch (error) {
        result.current = {response: null, error: ErrorsHandling('cancel_account',error)}
    }
    return result.current
  }, [cleanTokens, navigate, setUserData])


  const logout = (): void => {
    cleanTokens()
    setUserData(null)
    navigate('/login')
  }

  const getUserData = async (): Promise<void> => {
   if (!userData) {
      try {
        const userResponse = await userService.me();
        setUserData(userResponse)
      } catch (error) {
        logout()
      }
       
   }
  }

  return {
    isLogged,
    login,
    logout,
    getUserData,
    userData, 
    result,
    signUp,
    forgotPassword,
    validPasswordToken,
    resetPassword,
    cancelAccount
  }
}