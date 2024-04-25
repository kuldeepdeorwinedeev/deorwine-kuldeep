"use client";

import { createTheme } from "@mui/material/styles";
import { purple, grey } from "@mui/material/colors";

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: purple[400],
      other: grey[400],
    },
    secondary: {
      main: "#f44336",
    },
    buttontext: { main: "e1e4e8" },
  },
});
