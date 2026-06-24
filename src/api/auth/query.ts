/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { loginUser, verifyOtp, acceptInvite } from './api';
import { AcceptInviteRequest, AcceptInviteResponse } from '@/types/auth';

// Login mutation hook with OTP flow handling
export const useLogin = () => {
  return useMutation<any, Error, { email: string; password: string }>({
    mutationFn: loginUser,
  });
};

// Verify OTP mutation hook
export const useVerifyOtp = () => {
  return useMutation< any, Error, { email: string; otp: string }>({
    mutationFn: verifyOtp,
  });
};

export const useAcceptInvite = () => {
  return useMutation<AcceptInviteResponse, Error, { token: string; payload: AcceptInviteRequest }>({
    mutationFn: ({ token, payload }) => acceptInvite(token, payload),
  });
};

// Combined hook for complete auth flow
export const useAuthFlow = () => {
  const loginMutation = useLogin();
  const verifyOtpMutation = useVerifyOtp();

  const handleLogin = async (email: string, password: string) => {
    try {
      const loginResult = await loginMutation.mutateAsync({ email, password });
      return { success: true, data: loginResult };
    } catch (error) {
      return { success: false, error };
    }
  };

  const handleVerifyOtp = async (email: string, otp: string) => {
    try {
      const verifyResult = await verifyOtpMutation.mutateAsync({ email, otp });
      return { success: true, data: verifyResult };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    login: handleLogin,
    verifyOtp: handleVerifyOtp,
    isLoginPending: loginMutation.isPending,
    isVerifyPending: verifyOtpMutation.isPending,
    loginError: loginMutation.error,
    verifyError: verifyOtpMutation.error,
  };
};