import AxiosInstance from "@/lib/axios";

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
  const response = await (
    await AxiosInstance()
  ).post<LoginResponse>("/auth/login", JSON.stringify(loginRequerst));
  return response.data;
};

type GoogleLoginRequest = {
  code: string;
};
export const GoogleLoginRequest = async (
  googleLoginRequest: Partial<GoogleLoginRequest>
) => {
  const response = await (await AxiosInstance()).post<LoginResponse>(
    "/auth/google-login-v2",
    JSON.stringify(googleLoginRequest)
  );
  return response.data;
};

type FacebookLoginRequest = {
  authToken: string;
};
export const FacebookLoginRequest = async (
  facebookLoginRequest: Partial<FacebookLoginRequest>
) => {
  const response =await (await AxiosInstance()).post<LoginResponse>(
    "/auth/facebook-login",
    JSON.stringify(facebookLoginRequest)
  );
  return response.data;
};

type RefreshTokenRequest = {
  refreshToken: string;
};
export const RefreshTokenLogin = async (
  refreshTokenRequest: Partial<RefreshTokenRequest>
) => {
  const response = await(await AxiosInstance()).post<LoginResponse>(
    "/auth/RefreshToken",
    JSON.stringify(refreshTokenRequest)
  );
  return response.data;
};
