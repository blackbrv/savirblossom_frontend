export interface AuthResponse {
  message: string;
  token?: string;
  user?: import("./customer").Customer;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
  phone_number?: string;
}

export interface PasswordSetupData {
  email: string;
}

export interface PasswordResetData {
  email: string;
}

export interface PasswordConfirmData {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}
