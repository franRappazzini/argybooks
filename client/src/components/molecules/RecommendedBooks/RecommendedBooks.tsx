import "./RecommendedBooks.scss";

import { Typography } from "@mui/material";

function RecommendedBooks() {
  return (
    <section className="recommended_books">
      <Typography variant="h5" component="h6" color="primary">
        Le puede interesar
      </Typography>

      <div>libros recomendados</div>
    </section>
  );
}

export default RecommendedBooks;
