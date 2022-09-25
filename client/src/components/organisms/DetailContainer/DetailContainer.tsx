import "./DetailContainer.scss";

import { Breadcrumbs, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import BookDetailRating from "../../molecules/BookDetailRating/BookDetailRating";
import { CompleteBook } from "../../../utils/interfaces";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import RecommendedBooks from "../../molecules/RecommendedBooks/RecommendedBooks";
import { downloadBook } from "../../../redux/actions/bookActions";

interface Props {
  book: CompleteBook;
  getBookDetail: (id: string) => void;
  search?: string;
}

// TODO ver porque puse el search en las Props
function DetailContainer({ book, getBookDetail, search }: Props) {
  const { name, author, description, categories, year, language } = book;
  const handleDownload = () => downloadBook(name);

  return (
    <section className="detail_container max_width">
      <Breadcrumbs aria-label="breadcrumb" sx={{ m: "1rem 0" }}>
        <CustomLink to="/" color="primary" text="Home" />
        <CustomLink to="/books" color="primary" text="Libros" />
        <Typography color="text.secondary">{book.name}</Typography>
      </Breadcrumbs>

      <article className="article_book">
        <div style={{ backgroundImage: `url(${book.image})` }} className="img_detail"></div>
        <section className="details">
          <Typography variant="h4" component="h1">
            {name}
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic", m: "1rem 0" }}>
            <CustomLink to="/books" color="primary" text={author.name} state={author.name} />
          </Typography>

          <BookDetailRating book={book} getBookDetail={getBookDetail} />

          <Typography variant="body1" sx={{ m: "0.7rem 0 2rem 0" }}>
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

      <RecommendedBooks />
    </section>
  );
}

export default DetailContainer;
