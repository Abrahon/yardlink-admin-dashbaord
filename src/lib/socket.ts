import { io, Socket } from "socket.io-client";
import { getAccessToken } from "@/lib/cookie/cookie";

export const createSocket = (): Socket | null => {
  if (typeof window === "undefined") return null;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const socketUrl = apiUrl.replace(/\/api\/?$/, "");
  const token = getAccessToken();

  return io(socketUrl, {
    auth: token ? { token } : undefined,
    transports: ["websocket", "polling"],
  });
};
