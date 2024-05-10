"use client";
import { useState } from "react";
import {
  Container,
  FormControlLabel,
  Switch,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export default function ImageUpload({ onClick }) {
  const [image, setImage] = useState(null);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onClick(!checked);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container
      sx={{
        height: 500,
        width: 230,
        border: "0px solid",
        borderColor: "grey.100",
        borderRadius: 5,
        boxShadow: 1,
        p: 5,
      }}
      xs={{
        width: "90%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <label htmlFor="icon-button-file">
          <Box
            sx={{
              position: "relative",
              width: 150,
              height: 150,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid",
              borderColor: "grey.100",
              boxShadow: 1,
              cursor: "pointer",
            }}
          >
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  bgcolor: "grey.100",
                }}
              >
                <PhotoCamera />
              </Box>
            )}
          </Box>
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: 13,
          fontFamily: "-moz-initial",
          color: "gray.200",
        }}
      >
        Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb
      </Typography>

      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item>
          <Typography component="span" variant="body1">
            <Box fontWeight="fontWeightBold">Email Verified</Box>
          </Typography>
          <Typography color="text.secondary">
            Disabling this will automatically send the user a verification email
          </Typography>
        </Grid>
        <Grid item>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
