import axios from "axios";
import { getSession, signIn, signOut } from "next-auth/react";
const https = require("https");

const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;

const AxiosInstance = async () => {
  const axiosIns = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    baseURL: backendUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await getSession())?.user.accessToken}`,
    },
  });

  axiosIns.interceptors.response.use(
    (res) => res,
    async (error: any) => {
      if (error.response?.status === 401) {
        const originalRequest = error.config;
        var res = await signIn("refresh-token", {
          refreshToken: (await getSession())?.user.refreshToken,
          redirect: false,
        });
        if (res?.status === 200 && !originalRequest._retry) {
          originalRequest._retry = true;
          originalRequest.headers.Authorization = `Bearer ${
            (await getSession())?.user.accessToken
          }`;
          axiosIns(originalRequest);
        } else {
          signOut({ callbackUrl: "/login", redirect: true });
        }
      }
    }
  );

  return axiosIns;
};
export default AxiosInstance;
