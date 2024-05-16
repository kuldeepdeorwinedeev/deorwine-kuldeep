"use client";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
import ImageUpload from "../add-user/user-image";
import { UserDetail } from "./user.update";
import { Button } from "@mui/material";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useQuery, QueryClient } from "react-query";
import { upDateUsers } from "@/app/admin/api-data/user.manage";
import { fetchUserDetails } from "../../api-data/user.data";
export default function EditUser() {
  const queryClient = new QueryClient();

  const router = useRouter();
  const params = useParams();
  const user_id = params.user_id;

  const {
    data: userDetail,
    isError,
    isLoading,
  } = useQuery(["users", user_id], () => fetchUserDetails(user_id), {
    initialData: () => {
      if (typeof window === "undefined") {
        return fetchUserDetails(user_id);
      }
    },
  });

  useEffect(() => {
    if (userDetail) {
      queryClient.setQueryData(["users", user_id], userDetail);
    }
  }, [userDetail, user_id, queryClient]);

  const [verified, setverified] = useState(false);
  const [alert, setAlert] = useState({ success: false, error: false });
  const [message, setMessage] = useState("");
  const handleFormVerify = (verify) => {
    return setverified(!verify);
  };

  const { mutate } = useMutation({
    mutationFn: upDateUsers,

    onSuccess: (data) => {
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
  const handleFormSubmit = async (data) => {
    data.verified = !!verified;

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

    if (user_id) {
      await mutate([user, user_id]);
    }
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
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ml: 50,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <ImageUpload onClick={handleFormVerify} />

            <UserDetail onClick={handleFormSubmit} usersData={userDetail} />
          </>
        )}
      </Container>
    </>
  );
}
