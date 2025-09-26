import { useCallback, useContext, useRef } from "react";
import UserContext from "../contexts/UserContext";
import userService from "./../services/users";
import useStorage from "./useStorage";
import ErrorsHandling from "../services/errors";
import { currentUserService } from "../services/userServices/currentUserService";
import {
  ForgotPasswordData,
  ResetPasswordData,
  HookResult,
} from "../types";
import { AxiosError } from "axios";

export default function useAuth() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserContextProvider");
  }

  const { userData, setUserData } = context;
  const result = useRef<HookResult | undefined>(undefined);
  const { setTokens, cleanTokens, isLogged } = useStorage();


  const forgotPassword = useCallback(
    async (user: ForgotPasswordData): Promise<HookResult> => {
      cleanTokens();
      try {
        const authResponse = await userService.forgotPassword(user);
        result.current = { response: authResponse, error: false };
      } catch (error) {
        if (error instanceof AxiosError) {
          result.current = {
            response: null,
            error: ErrorsHandling("forgot_password", error),
          };
        } else {
          result.current = {
            response: null,
            error: "errors_handling.common.unknown",
          };
        }
      }

      return result.current;
    },
    [cleanTokens],
  );

  const validPasswordToken = useCallback(
    async (data: { token: string; email: string }): Promise<HookResult> => {
      cleanTokens();
      try {
        const authResponse = await userService.validPasswordToken(data);
        result.current = { response: authResponse, error: false };
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          result.current = {
            response: null,
            error: ErrorsHandling("reset_password", error),
          };
        } else {
          result.current = { response: null, error: "Unexpected error" };
        }
      }

      return result.current;
    },
    [cleanTokens],
  );

  const resetPassword = useCallback(
    async (data: ResetPasswordData): Promise<HookResult> => {
      try {
        const authResponse = await userService.resetPassword(data);
        result.current = { response: authResponse, error: false };
        setTokens(authResponse.access_token, authResponse.refresh_token);
        const userResponse = await currentUserService();
        console.log(userResponse);
        setUserData(userResponse);
      } catch (error) {
        cleanTokens();
        if (error instanceof AxiosError) {
          result.current = {
            response: null,
            error: ErrorsHandling("reset_password", error),
          };
        } else {
          result.current = {
            response: null,
            error: "errors_handling.common.unknown",
          };
        }
      }

      return result.current;
    },
    [cleanTokens, setTokens, setUserData],
  );

  return {
    isLogged,
    userData,
    result,
    forgotPassword,
    validPasswordToken,
    resetPassword,
  };
}
