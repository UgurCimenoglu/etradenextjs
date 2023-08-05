import AxiosInstance from "@/lib/axios";

type RegisterRequest = {
  fullname: "string";
  username: "string";
  email: "string";
  password: "string";
  passwordConfirm: "string";
};
type RegisterResponse = {
  succeeded: boolean;
  message?: string;
};
export const RegisterRequest = async (
  registerRequest: Partial<RegisterRequest>
) => {
  return await (
    await AxiosInstance()
  )
    .post<RegisterResponse>("/Users", JSON.stringify(registerRequest))
    .then((res) => res.data)
    .catch((e) => e);
};
