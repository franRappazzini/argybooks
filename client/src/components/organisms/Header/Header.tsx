import "./Header.scss";

import { Badge, Button, Card, IconButton } from "@mui/material";
import { FavoriteHook, ThemeHook, UserHook } from "../../../utils/customHooks";

import CustomLink from "../../atoms/CustomLink/CustomLink";
import DrawerHeader from "../../molecules/DrawerHeader/DrawerHeader";
import { FavoriteBorderRounded } from "@mui/icons-material";
import MenuHeader from "../../molecules/MenuHeader/MenuHeader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { setTheme } = ThemeHook();
  const { loggedUser, setLoggedUser } = UserHook();
  const { favorites, getFavoritesUser } = FavoriteHook();
  const lsLoggedUser = localStorage.getItem("lsLoggedUser");
  const lsTheme = localStorage.getItem("lsTheme");

  // TODO ojo no se si anda
  useEffect(() => {
    // para actualizar el logged user
    if (lsLoggedUser) {
      const user = JSON.parse(lsLoggedUser);
      setLoggedUser(user);
      getFavoritesUser(user.id);
    }
    // para actualizar el theme
    if (lsTheme) setTheme(JSON.parse(lsTheme));
  }, [lsLoggedUser, lsTheme]);

  return (
    <Card elevation={1} className="header_component">
      <header className="header_container max_width">
        <nav className="nav_header">
          <CustomLink to="/" text="Book" color="inherit" underline="none" variant="h6" />

          <div>
            <CustomLink to="/books" text="Buscar libros" color="inherit" />
            {loggedUser && Object.keys(loggedUser).length > 0 && (
              <CustomLink to="/create_book" text="Añadir libros" color="inherit" />
            )}
          </div>
        </nav>

        <div className="user_options">
          {loggedUser?.id ? (
            <div className="logged_options">
              <IconButton onClick={() => navigate("/favorites")}>
                <Badge badgeContent={favorites.length} color="error">
                  <FavoriteBorderRounded />
                </Badge>
              </IconButton>

              <MenuHeader loggedUser={loggedUser} />
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
        </div>

        <DrawerHeader loggedUser={loggedUser} favorites={favorites} />
      </header>
    </Card>
  );
}

export default Header;
