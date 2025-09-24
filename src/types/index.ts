// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

// Auth types
export interface SignUpCredentials {
  email: string;
  password: string;
  name?: string;
}

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
  current_password: string;
  new_password: string;
}

// Context types
export interface UserContextType {
  userData: User | null;
  setUserData: (user: User | null) => void;
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
