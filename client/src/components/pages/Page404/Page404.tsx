import "./Page404.scss";

import CustomLink from "../../atoms/CustomLink/CustomLink";
import { Typography } from "@mui/material";

function Page404() {
  return (
    <main className="component">
      <section className="page404_container max_width">
        <Typography variant="h3">Error 404</Typography>
        <Typography align="center">Lo sentimos,la página solicitada no se encuentra.</Typography>
        <CustomLink to="/" color="primary" text="Volver al inicio" />
      </section>
    </main>
  );
}

export default Page404;
