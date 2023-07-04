import AxiosInstance from "@/services/AxiosSettings";

const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;

type LoginRequset = { usernameOrEmail: string; password: string };

export const LoginRequest = async (
  loginRequerst: Partial<LoginRequset>
): Promise<any> => {
  const response = await AxiosInstance().post("/auth/login",JSON.stringify(loginRequerst));

  return response.data;
};
