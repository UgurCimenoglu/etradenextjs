"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { RegisterRequest } from "@/services/Auth/register";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const registerReq = useMutation(RegisterRequest, {
    onSuccess: (data) => {
      if (data.succeeded) {
        toast(data.message);
        router.push("/login");
      } else {
        toast.error(data.message);
      }
    },
    onError: (e) => {},
  });
  const schema = yup
    .object({
      fullname: yup
        .string()
        .required("Lütfen zorunlu alanı doldurunuz!")
        .min(3, "Lütfen en az 3 karakter giriniz!"),
      username: yup
        .string()
        .required("Lütfen zorunlu alanı doldurunuz!")
        .min(3, "Lütfen en az 3 karakterden oluşan şifrenizi giriniz!"),
      email: yup
        .string()
        .required("Lütfen zorunlu alanı doldurunuz!")
        .email("Lütfen geçerli formatta bir email adres giriniz!")
        .min(3, "Lütfen en az 3 karakterden oluşan şifrenizi giriniz!"),
      password: yup
        .string()
        .required("Lütfen zorunlu alanı doldurunuz!")
        .min(3, "Lütfen en az 3 karakterden oluşan şifrenizi giriniz!"),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], "Şifreler uyuşmuyor!"),
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
    registerReq.mutate(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          margin: "10rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Kayıt Ol
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("fullname")}
                required
                fullWidth
                id="fullname"
                label="Ad Soyad"
                autoFocus
              />
              <p>{errors.fullname?.message}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Kullanıcı Adı"
                {...register("username")}
              />
              <p>{errors.username?.message}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                {...register("email")}
              />
              <p>{errors.email?.message}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                {...register("password")}
                label="Şifre"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              <p>{errors.password?.message}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                {...register("passwordConfirm")}
                label="Şifre Tekrar"
                type="password"
                id="password-confirm"
                autoComplete="new-password-confirm"
              />
              <p>{errors.passwordConfirm?.message}</p>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
