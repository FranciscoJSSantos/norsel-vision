export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}
