// Import necessary modules
import Link from "next/link";
import { useEffect } from "react";
import {
  Box,
  Stack,
  Drawer,
  Button,
  Avatar,
  Typography,
  ListItemButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";

// Import custom hooks and components
import { useResponsive } from "../../hooks/use-responsive";
import Logo from "../../components/logo/logo";
import Scrollbar from "../../components/scrollbar";
import { NAV } from "./config-layout";
import navConfig from "./config-navigation";
import { useRouter } from "next/navigation"; // Import useRouter from next/router
import { RouterLink } from "../../routes/components";

// Nav component
export default function Nav({ openNav, onCloseNav }) {
  const router = useRouter(); // Use useRouter instead of useRouter()

  const upLg = useResponsive("up", "lg");
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem("admin") || {};
    const account = JSON.parse(data).data;
    console.log(account);
  }
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [router.pathname]); // Listen to router.pathname instead of pathname

  // Render account information
  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src="" alt="photoURL" />
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.username}</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  // Render menu items
  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  // Render content
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />
      {renderAccount}
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

// PropTypes for Nav component
Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// NavItem component remains the same
function NavItem({ item }) {
  const router = useRouter();
  const active = item.path === router.pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
}

// PropTypes for NavItem component
NavItem.propTypes = {
  item: PropTypes.object,
};
