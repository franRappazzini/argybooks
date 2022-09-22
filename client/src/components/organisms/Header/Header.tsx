import "./Header.scss";

import { Badge, Button, Card, IconButton } from "@mui/material";
import { FavoriteHook, UserHook } from "../../../utils/customHooks";

import CustomLink from "../../atoms/CustomLink/CustomLink";
import { FavoriteBorderRounded } from "@mui/icons-material";
import MenuHeader from "../../molecules/MenuHeader/MenuHeader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser } = UserHook();
  const { favorites, getFavoritesUser } = FavoriteHook();
  const lsLoggedUser = localStorage.getItem("lsLoggedUser");

  // TODO ojo no se si anda
  useEffect(() => {
    if (lsLoggedUser) {
      const user = JSON.parse(lsLoggedUser);
      setLoggedUser(user);
      getFavoritesUser(user.id);
    }
  }, [lsLoggedUser]);

  return (
    <Card elevation={1} className="header_component">
      <section className="header_container max_width">
        <nav className="nav_header">
          <CustomLink to="/" text="Book" color="inherit" underline="none" variant="h6" />
          <CustomLink to="/books" text="Buscar libros" color="inherit" />
          {loggedUser && Object.keys(loggedUser).length > 0 && (
            <CustomLink to="/create_book" text="Crear Libro" color="inherit" />
          )}
        </nav>

        {loggedUser && Object.keys(loggedUser).length > 0 ? (
          <div>
            <IconButton onClick={() => navigate("/favorites")}>
              <Badge badgeContent={favorites.length} color="error">
                <FavoriteBorderRounded />
              </Badge>
            </IconButton>
            <MenuHeader {...loggedUser} />
          </div>
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
