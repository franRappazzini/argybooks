import "./BookDetailContainer.scss";

import { Breadcrumbs, Button, Typography } from "@mui/material";

import { CompleteBook } from "../../../utils/interfaces";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import { downloadBook } from "../../../redux/actions/bookActions";

function BookDetailContainer({
  name,
  image,
  author,
  rating,
  categories,
  description,
  year,
  language,
}: CompleteBook) {
  const handleDownload = () => downloadBook(name);

  return (
    <section className="book_detail">
      <Breadcrumbs aria-label="breadcrumb" sx={{ m: "1rem 0" }}>
        <CustomLink to="/" color="primary" text="Home" />
        <Typography color="text.secondary">{name}</Typography>
      </Breadcrumbs>

      <article className="article_container">
        <div style={{ backgroundImage: `url(${image})` }} className="img_detail"></div>
        {/* <img src={image} alt={name} /> */}

        <section className="details">
          <Typography variant="h4" component="h1">
            {name}
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic", m: "1rem 0" }}>
            <CustomLink to="/" color="primary" text={author.name} />
          </Typography>
          <Typography variant="body1">rating: {rating} / comentarios</Typography>
          <Typography variant="body1" sx={{ m: "0.7rem 0" }}>
            {description}
          </Typography>

          <div className="more_details">
            <span>
              <Typography variant="body1" color="text.secondary" sx={{ mr: "0.5rem" }}>
                Categorías:
              </Typography>
              {categories.map((cat, i) =>
                i > 0 && i < categories.length ? " / " + cat.name : cat.name
              )}
            </span>
            <span>
              <Typography variant="body1" color="text.secondary" sx={{ mr: "0.5rem" }}>
                Año:
              </Typography>
              {year}
            </span>
            <span>
              <Typography variant="body1" color="text.secondary" sx={{ mr: "0.5rem" }}>
                Idioma:
              </Typography>
              {language}
            </span>
          </div>

          <Button variant="contained" size="small" onClick={handleDownload}>
            Descargar PDF
          </Button>
        </section>
      </article>
    </section>
  );
}

export default BookDetailContainer;
