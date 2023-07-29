"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "@/services/Auth/login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GoogleLogin from "@/components/Login/GoogleLogin";
import FacebookLogin from "@/components/Login/FacebookLogin";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export default function Login() {
  const login = useMutation(LoginRequest, {
    onError: () => {},
    onSuccess: (data) => {},
  });

  const schema = yup
    .object({
      usernameOrEmail: yup
        .string()
        .required("Lütfen zorunlu alanı doldurunuz!")
        .min(3, "Lütfen en az 3 karakter giriniz!"),
      password: yup
        .string()
        .required("Lütfen zorunlu alanı doldurunuz!")
        .min(3, "Lütfen en az 3 karakterden oluşan şifrenizi giriniz!"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    //login.mutate(data);
    const result = await signIn("backend-login", {
      usernameOrEmail: data.usernameOrEmail,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
    if (!!result && !result.ok) {
      toast("Kullanıcı adı veya şifre hatalı!");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          margin: "10rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("usernameOrEmail")}
            label="Username or Email Address"
            autoComplete="Username Or Email"
            autoFocus
          />
          <p>{errors.usernameOrEmail?.message}</p>
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("password")}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <p>{errors.password?.message}</p>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={login.isLoading}
            disabled={login.isLoading}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link href="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
          <GoogleLogin />
          <FacebookLogin />
        </Box>
      </Box>
    </Container>
  );
}
