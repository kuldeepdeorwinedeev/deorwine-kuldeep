"use client";
import { Alert, Container } from "@mui/material";
import ImageUpload from "../user-image";
import { UserDetail } from "../user-detail-form";
import { Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { addUsers } from "@/app/admin/api-data/add.user";
export default function addUser() {
  const [verified, setverified] = useState(false);
  const router = useRouter();
  const [alert, setAlert] = useState({ success: false, error: false });
  const [message, setMessage] = useState("");
  const handleFormVerify = (verify) => {
    return setverified(!verify);
  };
  console.log(verified);
  const handleFormSubmit = async (data) => {
    data.verified = verified;

    const user = {
      email: data.email,
      password: data.password,
      username: data.username,
      role: data.role,
      phoneNumber: data.phoneNumber,
      state: data.state,
      country: data.country,
      zipCode: data.zipCode,
      city: data.city,
      address: data.address,
      company: data.company,
      status: data.status,
      verified: data.verified,
    };
    console.log(user, "hello");
    await mutate(user);
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: addUsers,
    onSuccess: (data) => {
      console.log(data);
      if (data.status === true) {
        setAlert({ success: true, error: false });
        setMessage(data.message);
        setTimeout(() => {
          router.push("/admin/user");
        }, 1000);
      } else {
        setAlert({ success: false, error: true });
        setMessage(data.message);
      }
    },
    onError: (error) => {
      // Error actions
    },
  });
  // const onSubmit = async (data) => {
  //   const user = {
  //     email: data.email,
  //     password: data.password,
  //     username: data.username,
  //     role: data.role,
  //     phoneNumber: data.phoneNumber,
  //     state: data.state,
  //     country: data.country,
  //     zipCode: data.zipCode,
  //     city: data.city,
  //     address: data.address,
  //     company: data.company,
  //     status: data.status,
  //     verified: data.verified,
  //   };
  //   mutate(user);
  // };
  const renderAlerts = () => {
    if (alert.success) {
      return <Alert severity="success">{message}</Alert>;
    } else if (alert.error) {
      return <Alert severity="error">{message}</Alert>;
    }
    return null;
  };
  return (
    <>
      {renderAlerts()}
      <Container
        sx={{
          height: 700,
          width: "100%",
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
        xs={{
          flexDirection: "column",
        }}
      >
        <ImageUpload onClick={handleFormVerify} />
        <UserDetail onClick={handleFormSubmit} />
      </Container>
    </>
  );
}
