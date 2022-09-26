import "./Footer.scss";

import { Card, Typography } from "@mui/material";
import { Email, GitHub, LinkedIn } from "@mui/icons-material";

function Footer() {
  return (
    <Card className="footer_component">
      <footer className="max_width">
        <GitHub />
        <LinkedIn />
        <Email />

        <Typography>¿Has encontrado un error?</Typography>
      </footer>
    </Card>
  );
}

export default Footer;
