import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { default as FacebookLoginBtn } from "@greatsumini/react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useMutation } from "@tanstack/react-query";
import { FacebookLoginRequest } from "@/services/Auth/login";

const FacebookLogin = () => {
  const facebookLogin = useMutation(FacebookLoginRequest, {
    onError: () => {
      alert("Başarısız Giriş");
    },
    onSuccess: (data) => {
      console.log(data);
      alert("Başaılı Giriş");
    },
  });

  const facebookLoginHandler = (authToken: string) => {
    facebookLogin.mutate({ authToken });
  };

  return (
    <FacebookLoginBtn
      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}
      onSuccess={(response) => {
        console.log("Login Success!", response);
        facebookLoginHandler(response.accessToken);
      }}
      onFail={(error) => {
        console.log("Login Failed!", error);
      }}
      onProfileSuccess={(response) => {
        console.log("Get Profile Success!", response);
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
