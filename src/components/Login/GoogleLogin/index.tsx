import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin } from "@react-oauth/google";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const GoogleLogin = () => {
  const [isLoadingGoogleBtn, setisLoadingGoogleBtn] = useState<boolean>(false);
  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      var result = await signIn("custom-google-login", {
        code: tokenResponse.code,
        redirect: true,
        callbackUrl: "/",
      });
      console.log("result", result);
      if (!!result && !result.ok) {
        toast("Beklenmeyen bir hata meydana geldi, lütfen tekrar deneyiniz.");
      }
      setisLoadingGoogleBtn(false);
    },
    onError: (e: any) => {
      setisLoadingGoogleBtn(false);
    },
    flow: "auth-code",
  });

  return (
    <LoadingButton
      fullWidth
      startIcon={<GoogleIcon />}
      variant="outlined"
      sx={{ mt: 3, mb: 2 }}
      onClick={() => {
        googleLoginHandler();
        setisLoadingGoogleBtn(true);
      }}
      loading={isLoadingGoogleBtn}
      disabled={isLoadingGoogleBtn}
    >
      Google ile Giriş Yap
    </LoadingButton>
  );
};

export default GoogleLogin;
