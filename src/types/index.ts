// User types
export interface User {
  id: string;
  email: string;
  name?: string;
}

// Auth types

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export interface ChangeEmailData {
  id: string;
  email: string;
  password: string;
}

export interface ChangePasswordData {
  id: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}


// Hook result types
export interface HookResult<T = any> {
  response: T | null;
  error: string | false;
}

// Service response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
