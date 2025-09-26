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
