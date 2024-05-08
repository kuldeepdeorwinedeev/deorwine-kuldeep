"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../api/user";
import { Alert } from "@mui/material";

const SignIn = () => {
  const router = useRouter();
  const [alert, setAlert] = React.useState({ success: false, error: false });
  const [message, setMessage] = React.useState("");
  const schema = yup
    .object({
      email: yup.string().required().email(),
      password: yup.string().required("No password provided."),
    })
    .required();

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      console.log(data);
      if (data.status === true) {
        setAlert({ success: true, error: false });
        setMessage(data.message);
        setTimeout(() => {
          data.data.role == "admin" ? router.push("/admin") : router.push("/");
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
      password: data.password,
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
            Sign in
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
              fullWidth
              autoFocus
              label="Email"
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
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
            <Grid container>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Grid item ml="90px">
                <Link href="/forgotpassword" variant="body1">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
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
                  mt: 1,
                  mb: 2,
                  bgcolor: "primary.main",
                  textColor: "buttontext.main",
                }}
                color="buttontext"
                disabled={(isDirty, !isValid)}
              >
                Sign In
              </Button>
            </span>

            <Grid container>
              <Grid item>
                <Link href="/registration" variant="body1">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
