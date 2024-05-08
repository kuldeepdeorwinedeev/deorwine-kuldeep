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
import { useForm } from "react-hook-form";
import { defaultTheme } from "../components/themes";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { userForgotPassword } from "../api/user";
import { Alert } from "@mui/material";

export default function SignIn() {
  const router = useRouter();
  const [alert, setAlert] = React.useState({ success: false, error: false });
  const [message, setMessage] = React.useState("");
  const schema = yup
    .object({
      email: yup.string().required().email(),
    })
    .required();
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(schema),

    mode: "all",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: userForgotPassword,
    onSuccess: (data) => {
      console.log(data);
      if (data.status === true) {
        setAlert({ success: true, error: false });
        setMessage(data.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setAlert({ success: false, error: true });
        setMessage(data.message);
      }
    },
    onError: (error) => {
      // Error actions
    },
  });
  const onSubmit = async (data) => {
    const user = {
      email: data.email,
    };
    mutate(user);
  };
  const renderAlerts = () => {
    if (alert.success) {
      return <Alert severity="success">{message}</Alert>;
    } else if (alert.error) {
      return <Alert severity="error">{message}</Alert>;
    }
    return null;
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
            Reset Password
          </Typography>
          {renderAlerts()}
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
              autoFocus
              label="Email"
              type="email"
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
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
                  bgcolor: "primary.main",
                  textColor: "buttontext.main",
                }}
                color="primary"
                disabled={(isDirty, !isValid)}
              >
                Send reset link
              </Button>
            </span>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
