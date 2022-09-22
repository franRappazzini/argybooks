import "./DrawerHeader.scss";

import { Button, Drawer, IconButton } from "@mui/material";

import { CompleteUser } from "../../../utils/interfaces";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import { Menu } from "@mui/icons-material";
import MenuHeader from "../MenuHeader/MenuHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DrawerHeader(loggedUser: CompleteUser) {
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
        <Menu />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <section className="drawer_container">
          {loggedUser?.id ? (
            <div className="user-menu_container">
              <MenuHeader {...loggedUser} />
            </div>
          ) : (
            <div className="btns_drawer">
              <Button size="small" variant="outlined" onClick={() => handleNavigate("/sign_up")}>
                Registrarse
              </Button>
              <Button size="small" onClick={() => handleNavigate("/log_in")}>
                Iniciar sesión
              </Button>
            </div>
          )}

          <div className="links_drawer">
            <CustomLink to="/books" text="Buscar libros" color="inherit" onClick={handleClose} />

            {loggedUser?.id && (
              <CustomLink
                to="/create_book"
                text="Crear libro"
                color="inherit"
                onClick={handleClose}
              />
            )}
          </div>
        </section>
      </Drawer>
    </section>
  );
}

export default DrawerHeader;
