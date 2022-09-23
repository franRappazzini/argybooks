import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { DarkMode, Logout } from "@mui/icons-material";

import { CompleteUser } from "../../../utils/interfaces";
import { ThemeHook } from "../../../utils/customHooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MenuHeader({ username }: CompleteUser) {
  const { theme, setTheme } = ThemeHook();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const darkMode = () => setTheme(theme === "light" ? "dark" : "light");
  const handleLogOut = () => {
    localStorage.removeItem("lsLoggedUser");
    window.location.reload();
  };

  return (
    <>
      <Tooltip title={`Cuenta de ${username}`}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>{username[0].toUpperCase()}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/profile")}>
          <Avatar /> Perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={darkMode}>
          <ListItemIcon>
            <DarkMode fontSize="small" />
          </ListItemIcon>
          {theme === "light" ? "Activar" : "Desactivar"}
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
}

export default MenuHeader;
