import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;

const AxiosInstance = () => {
  return axios.create({
    baseURL: backendUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default AxiosInstance;
