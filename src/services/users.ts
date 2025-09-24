import auth from './auth';
import http from './base';
import backendRoutes from './routes';
import { 
  SignUpCredentials, 
  ForgotPasswordData, 
  ResetPasswordData, 
  ChangeEmailData, 
  ChangePasswordData,
  AuthResponse,
  User
} from '../types';


export interface loginProps {
  email: string;
  password: string;
}

const login = ({email, password}: loginProps): Promise<AuthResponse> => 
  auth.post(backendRoutes.loginUrl, loginPayload({email, password}))
 
const loginPayload = ({email, password}: loginProps) => {
  return {
    "grant_type": "password",
    "email": email,
    "password": password,
    "client_id": backendRoutes.clientId,
    "client_secret": backendRoutes.secretId
  }
}

const signUp = (user: SignUpCredentials): Promise<AuthResponse> => 
  auth.post(backendRoutes.signUpUrl, signUpPayload(user))
 
const signUpPayload = (user: SignUpCredentials) => {
  console.log(user)
  console.log(backendRoutes.clientId)
  return {
    "email": user.email,
    "password": user.password,
    "password_confirmation": user.password,
    "client_id": backendRoutes.clientId
  }
}

const forgotPassword = (user: ForgotPasswordData): Promise<any> => 
  auth.post(backendRoutes.forgotPasswordUrl, forgotPasswordPayload(user))
 
const forgotPasswordPayload = (user: ForgotPasswordData) => {
  return {
    "email": user.email,
    "client_id": backendRoutes.clientId
  }
}

const validPasswordToken = (data: { token: string; email: string }): Promise<any> => 
  auth.post(backendRoutes.validPasswordTokenUrl, validPasswordTokenPayload(data))
 
const validPasswordTokenPayload = (data: { token: string; email: string }) => {
  return {
    "email": data.email,
    "token": data.token,
    "client_id": backendRoutes.clientId
  }
}

const resetPassword = (data: ResetPasswordData): Promise<AuthResponse> => 
  auth.post(backendRoutes.resetPasswordUrl, resetPasswordPayload(data))
 
const resetPasswordPayload = (data: ResetPasswordData) => {
  return {
    "token": data.token,
    "client_id": backendRoutes.clientId, 
    "password": data.password,
    "password_confirmation": data.password
  }
}

const updateEmail = (data: ChangeEmailData): Promise<User> => 
  http.patch(backendRoutes.userUrl(data.id), updateEmailPayload(data))
 
const updateEmailPayload = (data: ChangeEmailData) => {
  return {
    "email": data.email
  }
}

const updatePassword = (data: ChangePasswordData): Promise<any> => 
  http.patch(backendRoutes.userPasswordUrl(data.id), updatePasswordPayload(data))
 
const updatePasswordPayload = (data: ChangePasswordData) => {
  return {
    "old_password" : data.current_password,
    "password" : data.new_password,
    "password_confirmation" : data.new_password,
  }
}

const cancelAccount = (): Promise<any> => http.delete(backendRoutes.deleteCurrentUser)

const me = (): Promise<User> => http.get(backendRoutes.currentUserUrl)

export default {
  login,
  signUp,
  forgotPassword,
  validPasswordToken,
  resetPassword,
  me,
  updateEmail,
  updatePassword,
  cancelAccount
};