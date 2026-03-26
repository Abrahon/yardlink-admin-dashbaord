import { axios } from "@/lib/axios";

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
