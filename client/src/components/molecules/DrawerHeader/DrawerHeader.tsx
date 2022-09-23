import "./DrawerHeader.scss";

import {
  Badge,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import { FavoriteBorderOutlined, Menu, MenuBook, Search } from "@mui/icons-material";

import { CompleteUser } from "../../../utils/interfaces";
import MenuHeader from "../MenuHeader/MenuHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  loggedUser: CompleteUser;
  favorites: [];
}

function DrawerHeader({ loggedUser, favorites }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNavigate = (to: string) => {
    handleClose();
    navigate(to);
  };

  return (
    <section className="drawer_component">
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={favorites.length} color="error">
          <Menu />
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <section className="drawer_container">
          {loggedUser?.id ? (
            <div className="user-menu_container">
              <MenuHeader loggedUser={loggedUser} handleNavigate={handleNavigate} />
            </div>
          ) : (
            <div className="btns_drawer">
              <Button variant="outlined" onClick={() => handleNavigate("/sign_up")}>
                Registrarse
              </Button>
              <Button onClick={() => handleNavigate("/log_in")}>Iniciar sesión</Button>
            </div>
          )}

          <MenuList>
            <Divider />
            <MenuItem onClick={() => handleNavigate("/books")}>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText>Buscar</ListItemText>
            </MenuItem>
            {loggedUser?.id && (
              <MenuItem onClick={() => handleNavigate("/create_book")}>
                <ListItemIcon>
                  <MenuBook />
                </ListItemIcon>
                <ListItemText>Añadir</ListItemText>
              </MenuItem>
            )}
            {loggedUser?.id && (
              <MenuItem onClick={() => handleNavigate("/favorites")}>
                <ListItemIcon>
                  <Badge badgeContent={favorites.length} color="error">
                    <FavoriteBorderOutlined />
                  </Badge>
                </ListItemIcon>
                <ListItemText>Favoritos</ListItemText>
              </MenuItem>
            )}
          </MenuList>
        </section>
      </Drawer>
    </section>
  );
}

export default DrawerHeader;
