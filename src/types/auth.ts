// types/auth.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  admin_2fa_required: boolean;
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  token: {
    refresh: string;
    access: string;
  };
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    phone: string;
    address: string;
  };
}

export interface AcceptInviteRequest {
  name: string;
  password: string;
}

export interface AcceptInviteResponse {
  message: string;
}

export interface AuthError {
  message: string;
  status?: number;
}