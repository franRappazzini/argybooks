import "./Header.scss";

import { Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header_component component">
      <Typography variant="h4">Books</Typography>

      <div className="btns_container">
        <Button size="small" onClick={() => navigate("/sign_up")}>
          Registrarse
        </Button>
        <Button size="small" variant="outlined" onClick={() => navigate("/log_in")}>
          Iniciar sesión
        </Button>
      </div>
    </header>
  );
}

export default Header;
