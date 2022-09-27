import "./Footer.scss";

import { Card, Link, Typography } from "@mui/material";
import { Email, GitHub, LinkedIn } from "@mui/icons-material";

function Footer() {
  return (
    <Card className="footer_component">
      <footer className="max_width">
        <section className="social_container">
          <Typography mr={2}>Creado por Francisco Rappazzini</Typography>
          <Link
            href="https://github.com/franRappazzini"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </Link>
          <Link
            href="https://www.linkedin.com/in/francisco-rappazzini/"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ m: "0 1rem" }}
          >
            <LinkedIn />
          </Link>
          <Link
            href="mailto:fran_rappa@outlook.com"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Email />
          </Link>
        </section>

        {/* <Typography>¿Has encontrado un error?</Typography> */}
      </footer>
    </Card>
  );
}

export default Footer;
