import AxiosInstance from "@/services/AxiosSettings";

type LoginRequset = { usernameOrEmail: string; password: string };
type LoginResponse = {
  token: {
    accessToken: string;
    expiration: string;
    refreshToken: string;
  };
};
export const LoginRequest = async (
  loginRequerst: Partial<LoginRequset>
): Promise<LoginResponse> => {
  const response = await AxiosInstance().post<LoginResponse>(
    "/auth/login",
    JSON.stringify(loginRequerst)
  );
  return response.data;
};

type GoogleLoginRequest = {
  code: string;
};
export const GoogleLoginRequest = async (
  googleLoginRequest: Partial<GoogleLoginRequest>
) => {
  const response = await AxiosInstance().post<LoginResponse>(
    "/auth/google-login-v2",
    JSON.stringify(googleLoginRequest)
  );
  return response.data;
};

type FacebookLoginRequest = {
  authToken: string;
};
export const FacebookLoginRequest = async (
  facebookLoginRequest: FacebookLoginRequest
) => {
  const response = await AxiosInstance().post<LoginResponse>(
    "/auth/facebook-login",
    JSON.stringify(facebookLoginRequest)
  );
  return response.data;
};
