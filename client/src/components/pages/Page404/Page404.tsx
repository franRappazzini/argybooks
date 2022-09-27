import "./Page404.scss";

import CustomLink from "../../atoms/CustomLink/CustomLink";
import { Typography } from "@mui/material";
import img404 from "../../../assets/404.svg";

function Page404() {
  return (
    <main className="component">
      <section className="page404_container max_width">
        <img src={img404} alt="page not found" />
        <Typography align="center">Lo sentimos, la página solicitada no se encuentra.</Typography>
        <CustomLink to="/" color="primary" text="Volver al inicio" />
      </section>
    </main>
  );
}

export default Page404;
