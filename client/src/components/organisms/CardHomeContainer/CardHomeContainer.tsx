import "./CardHomeContainer.scss";

import { CircularProgress, ImageList, ImageListItem, Typography } from "@mui/material";

import { BookHook } from "../../../utils/customHooks";
import { CompleteBook } from "../../../utils/interfaces";
import NotFoundMessage from "../../atoms/NotFoundMessage/NotFoundMessage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CardHomeContainer() {
  const { topBooks, loading, getTop50Books, setLoader } = BookHook();
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    getTop50Books();
  }, []);

  return (
    <section className="card-home_container max_width">
      <Typography variant="h5" component="h6" color="primary" sx={{ m: "1rem 0 2rem 0" }}>
        Mejor valorados
      </Typography>

      {loading ? (
        <div className="spinner_container">
          <CircularProgress />
        </div>
      ) : topBooks.length > 0 ? (
        <ImageList variant="masonry" cols={window.innerWidth > 660 ? 5 : 3} gap={8}>
          {topBooks.map((book: CompleteBook) => (
            <ImageListItem
              key={book.id}
              onClick={() => navigate(`/book/${book.id}`)}
              sx={{ cursor: "pointer" }}
            >
              <img
                src={`${book.image}?w=248&fit=crop&auto=format`}
                srcSet={`${book.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={book.name}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <NotFoundMessage />
      )}
    </section>
  );
}

export default CardHomeContainer;
