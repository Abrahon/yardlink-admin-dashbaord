import { axios } from "@/lib/axios";
import { AcceptInviteResponse, AcceptInviteRequest } from "@/types/auth";

const contentType = "multipart/form-data";

// Login POST request
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await axios.post("/login/", credentials, {
    headers: {
      "Content-Type": contentType,
    },
  });
  return data;
};

// Verify OTP POST request
export const verifyOtp = async (otpData: { email: string; otp: string }) => {
  const { data } = await axios.post("/admin/verify-otp/", otpData, {
    headers: {
      "Content-Type": contentType,
    },
  });
  return data;
};

export const acceptInvite = async (
  token: string,
  payload: AcceptInviteRequest
) => {
  const { data } = await axios.post<AcceptInviteResponse>(
    `/api/accept-invite/${token}/`,
    payload,
    {
      headers: {
        "Content-Type": contentType,
      },
    }
  );
  return data;
};
