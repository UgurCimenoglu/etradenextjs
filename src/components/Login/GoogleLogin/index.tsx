import React from "react";
import { LoadingButton } from "@mui/lab";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleLoginRequest } from "@/services/Auth/login";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthStore from "@/store/AuthStore";

const GoogleLogin = () => {
  const { login } = useAuthStore();

  const googleLogin = useMutation(GoogleLoginRequest, {
    onError: () => {
      alert("Başarısız Giriş");
    },
    onSuccess: (data) => {
      login(data);
      alert("Başaılı Giriş");
      localStorage.setItem("token",JSON.stringify(data))
    },
  });

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      googleLogin.mutate({ code: tokenResponse.code });
    },
    flow: "auth-code",
  });

  return (
    <LoadingButton
      fullWidth
      startIcon={<GoogleIcon />}
      variant="outlined"
      sx={{ mt: 3, mb: 2 }}
      onClick={() => googleLoginHandler()}
      loading={googleLogin.isLoading}
      disabled={googleLogin.isLoading}
    >
      Google ile Giriş Yap
    </LoadingButton>
  );
};

export default GoogleLogin;
