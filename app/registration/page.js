"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { defaultTheme } from "../components/themes";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function SignIn() {
  const schema = yup
    .object({
      email: yup.string().required().email(),
      username: yup.string().required(),
      password: yup
        .string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    })
    .required();
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(schema),

    mode: "onChange",
  });

  console.log(errors);
  const password = React.useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              autoFocus
              label="Email"
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              {...register("username")}
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              {...register("confirmpassword")}
              error={Boolean(errors.confirmpassword)}
              helperText={errors.confirmpassword?.message}
            />
            <span
              style={
                !isValid && isDirty
                  ? { cursor: "not-allowed" }
                  : { cursor: "pointer" }
              }
            >
              <Button
                type="submit"
                fullWidth
                variant="body3"
                sx={{
                  mt: 2,
                  mb: 2,
                  bgcolor: "primary.other",
                  textColor: "buttontext.main",
                }}
                tyle={{ cursor: "not-allowed" }}
                color="primary"
                disabled={(isValid, isDirty)}
              >
                Sign Up
              </Button>
            </span>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body1">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
