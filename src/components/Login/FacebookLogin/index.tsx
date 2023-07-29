import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { default as FacebookLoginBtn } from "@greatsumini/react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const FacebookLogin = () => {
  const facebookLoginHandler = async (authToken: string) => {
    var result = await signIn("custom-facebook-login", {
      authToken: authToken,
      redirect: true,
      callbackUrl: "/",
    });
    if (!!result && !result.ok) {
      toast("Beklenmeyen bir hata meydana geldi, lütfen tekrar deneyiniz.");
    }
  };

  return (
    <FacebookLoginBtn
      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}
      onSuccess={(response) => {
        //console.log("Login Success!", response);
        facebookLoginHandler(response.accessToken);
      }}
      onFail={(error) => {
        //console.log("Login Failed!", error);
      }}
      onProfileSuccess={(response) => {
        //console.log("Get Profile Success!", response);
      }}
      render={({ onClick, logout }) => (
        <LoadingButton
          fullWidth
          startIcon={<FacebookIcon />}
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={onClick}
        >
          Facebook ile Giriş Yap
        </LoadingButton>
      )}
    />
  );
};

export default FacebookLogin;
