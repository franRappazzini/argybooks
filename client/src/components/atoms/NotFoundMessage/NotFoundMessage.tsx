import { Link, Typography } from "@mui/material";

function NotFoundMessage() {
  return (
    <>
      <Typography align="center">Lo sentimos, no hubo coincidencias con su búsqueda.</Typography>
      <Typography align="center">
        Puede agregar el libro si lo desea, o toca{" "}
        <Link
          href="mailto:fran_rappa@outlook.com?Subject=ArgyBooks pedido/sugerencia"
          underline="hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          aquí
        </Link>{" "}
        para solicitarlo.
      </Typography>
    </>
  );
}

export default NotFoundMessage;
