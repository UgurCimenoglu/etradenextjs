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
  return await (
    await AxiosInstance()
  )
    .post<LoginResponse>("/auth/login", JSON.stringify(loginRequerst))
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type GoogleLoginRequest = {
  code: string;
};
export const GoogleLoginRequest = async (
  googleLoginRequest: Partial<GoogleLoginRequest>
) => {
  return await (
    await AxiosInstance()
  )
    .post<LoginResponse>(
      "/auth/google-login-v2",
      JSON.stringify(googleLoginRequest)
    )
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type FacebookLoginRequest = {
  authToken: string;
};
export const FacebookLoginRequest = async (
  facebookLoginRequest: Partial<FacebookLoginRequest>
) => {
  return await (
    await AxiosInstance()
  )
    .post<LoginResponse>(
      "/auth/facebook-login",
      JSON.stringify(facebookLoginRequest)
    )
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type RefreshTokenRequest = {
  refreshToken: string;
};
export const RefreshTokenLogin = async (
  refreshTokenRequest: Partial<RefreshTokenRequest>
) => {
  return await (
    await AxiosInstance()
  )
    .post<LoginResponse>(
      "/auth/RefreshToken",
      JSON.stringify(refreshTokenRequest)
    )
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};
