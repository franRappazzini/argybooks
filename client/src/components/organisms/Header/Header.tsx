import "./Header.scss";

import { Button, Card } from "@mui/material";

import CustomLink from "../../atoms/CustomLink/CustomLink";
import { GetLoggedUserHook } from "../../../utils/customHooks";
import MenuHeader from "../../molecules/MenuHeader/MenuHeader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { loggedUser } = GetLoggedUserHook();

  useEffect(() => {
    console.log(loggedUser);
  }, [loggedUser]);

  return (
    <Card elevation={1} className="header_component">
      <section className="header_container max_width">
        <nav className="nav_header">
          <CustomLink to="/" text="Book" color="inherit" underline="none" variant="h6" />
          {loggedUser && Object.keys(loggedUser).length > 0 && (
            <CustomLink to="/create_book" text="Crear Libro" color="inherit" />
          )}
        </nav>

        {loggedUser && Object.keys(loggedUser).length > 0 ? (
          <MenuHeader {...loggedUser} />
        ) : (
          <div className="btns_container">
            <Button size="small" variant="outlined" onClick={() => navigate("/sign_up")}>
              Registrarse
            </Button>
            <Button size="small" onClick={() => navigate("/log_in")}>
              Iniciar sesión
            </Button>
          </div>
        )}
      </section>
    </Card>
  );
}

export default Header;
