import { useCallback, useContext, useRef} from "react";
import UserContext from "../contexts/UserContext";
import userService from "./../services/users";
import ErrorsHandling from "../services/errors";
import { ChangeEmailData, ChangePasswordData, HookResult } from "../types";
import { AxiosError } from "axios";

export default function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  
  const {setUserData} = context;
  const result = useRef<HookResult | undefined>(undefined);

  const updateEmail = useCallback(async (data: ChangeEmailData): Promise<HookResult> => {
    try {
        const response = await userService.updateEmail(data);
        result.current = {response: response, error: false}
        setUserData(response)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        result.current = {response: null, error: ErrorsHandling('user_update_email',error)}
      } else {
        result.current = {response: null, error: "errors_handling.common.unknown"}
      } 
    }
    
    return result.current
  }, [setUserData])

  const updatePassword = useCallback(async (data: ChangePasswordData): Promise<HookResult> => {
    try {
        const response = await userService.updatePassword(data);
        result.current = {response: response, error: false}
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        result.current = {response: null, error: ErrorsHandling('user_update_password',error)}
      } else {
        result.current = {response: null, error: "errors_handling.common.unknown"}
      } 
    }
    
    return result.current
  }, [])

  return {
    updateEmail,
    updatePassword,
    result
  }
}