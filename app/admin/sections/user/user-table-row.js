import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useMutation } from "@tanstack/react-query";
import Label from "../../components/label/label";
import Iconify from "../../components/iconify/iconify";
import Link from "next/link";
import { deleteUsers } from "../../api-data/user.manage";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";
// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  company,
  role,
  isVerified,
  status,
  handleClick,
  user_id,
}) {
  const [open, setOpen] = useState(null);
  const [alert, setAlert] = useState({ success: false, error: false });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteUsers,

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

  const handleUserDelete = async () => {
    await mutate(user_id);
    router.push("/admin/add-user");
    setOpen(null);
  };
  const handleCloseMenu = async () => {
    setOpen(null);
  };

  const renderAlerts = () => {
    if (alert.success) {
      return (
        <Alert severity="success" sx={{ height: 10 }}>
          {message}
        </Alert>
      );
    } else if (alert.error) {
      return <Alert severity="error">{message}</Alert>;
    }
    return null;
  };
  {
    renderAlerts();
  }
  return (
    <>
      {renderAlerts()}
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt="logo" src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{company}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align="center">{isVerified ? "Yes" : "No"}</TableCell>

        <TableCell>
          <Label color={(status === "banned" && "error") || "success"}>
            {status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <Link href={`/admin/user/${user_id}`} passHref>
          <MenuItem onClick={handleCloseMenu}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </MenuItem>
        </Link>

        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          <Iconify
            icon="eva:trash-2-outline"
            sx={{ mr: 2 }}
            onClick={handleUserDelete}
          />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  user_id: PropTypes.string,
};
