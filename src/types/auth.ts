export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

export interface SignInData {
  email: string;
  password: string;
}
