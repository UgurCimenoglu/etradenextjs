"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "@/services/Auth/login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Login() {
  const { mutate, isLoading, data, error } = useMutation(LoginRequest);

  const schema = yup
    .object({
      usernameOrEmail: yup
        .string()
        .required("Lütfen zorunlu alanı doldurunuz!")
        .email("Lütfen geçerli bir mail adresi giriniz!"),
      password: yup
        .string()
        .required("Lütfen zorunlu alanı doldurunuz!")
        .min(3, "Lütfen en z 3 karakterden oluşan şifrenizi giriniz!"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(error);
    console.log(data);
    mutate({ usernameOrEmail: "sda", password: "sasd" });
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Button
            fullWidth
            startIcon={<GoogleIcon />}
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Google ile Giriş Yap
          </Button>
          <Button
            fullWidth
            startIcon={<FacebookIcon />}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            Facebook ile Giriş Yap
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
