import axios, { AxiosError } from "axios";
import { error } from "console";
import { getSession, signIn } from "next-auth/react";
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
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        var res = await signIn("refresh-token", {
          refreshToken: (await getSession())?.user.refreshToken,
          redirect: false,
        });
        if (res?.status !== 200) {
          window.location.href = "/login";
        }
      } else {
      }
    }
  );

  return axiosIns;
};
export default AxiosInstance;
