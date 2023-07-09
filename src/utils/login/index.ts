import useAuthStore from "@/store/AuthStore";
type LoginResponse = {
  token: {
    accessToken: string;
    expiration: string;
    refreshToken: string;
  };
};
export const SetAuth = (data: LoginResponse) => {
  const { login } = useAuthStore();
  localStorage.setItem("token", JSON.stringify(data));
  login(data);
};
