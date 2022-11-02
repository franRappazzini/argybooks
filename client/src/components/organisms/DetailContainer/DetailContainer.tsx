import "./DetailContainer.scss";

import { Breadcrumbs, Button, Typography } from "@mui/material";
import { getDownloadURL, ref, storage } from "../../../utils/firebase";
import { useEffect, useState } from "react";

import BookDetailRating from "../../molecules/BookDetailRating/BookDetailRating";
import { CompleteBook } from "../../../utils/interfaces";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import RecommendedBooks from "../../molecules/RecommendedBooks/RecommendedBooks";

interface Props {
  book: CompleteBook;
  getBookDetail: (id: string) => void;
}

function DetailContainer({ book, getBookDetail }: Props) {
  const { name, author, description, categories, year, language } = book;
  const [downloadLink, setDownloadLink] = useState<any>();

  useEffect(() => {
    // genero el link para poder descargar el book
    const getDownloadLink = async () => {
      try {
        const url = await getDownloadURL(ref(storage(), name + ".pdf"));
        setDownloadLink(url);
      } catch (err) {
        console.log(err);
      }
    };

    getDownloadLink();
  }, [name]);

  return (
    <section className="detail_container max_width">
      <Breadcrumbs aria-label="breadcrumb" sx={{ m: "1rem 0" }}>
        <CustomLink to="/" color="primary" text="Home" />
        <CustomLink to="/books" color="primary" text="Libros" />
        <Typography color="text.secondary">{book.name}</Typography>
      </Breadcrumbs>

      <article className="article_book">
        <img src={book.image} alt={book.name} className="img_detail" />
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

          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="downloaded_link"
          >
            <Button variant="contained" size="small" disabled={!downloadLink}>
              {downloadLink ? "Descargar PDF" : "Aguarde para descargar"}
            </Button>
          </a>
        </section>
      </article>

      {/* <RecommendedBooks /> */}
    </section>
  );
}

export default DetailContainer;
