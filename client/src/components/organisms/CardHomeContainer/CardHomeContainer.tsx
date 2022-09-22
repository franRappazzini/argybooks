import "./CardHomeContainer.scss";

import { Box, CircularProgress, ImageList, ImageListItem } from "@mui/material";

import { BookHook } from "../../../utils/customHooks";
import { CompleteBook } from "../../../utils/interfaces";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CardHomeContainer() {
  const { books, loading, getBooks, setLoader } = BookHook();
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    getBooks();
  }, []);

  return (
    <section className="card-home_container max_width">
      {loading ? (
        <CircularProgress />
      ) : books.length > 0 ? (
        // <Box sx={{ width: 500, height: 450, overflowY: "scroll" }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {books.map((book: CompleteBook) => (
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
        // {/* </Box> */}
        <p>Lo sentimos, aun no hay libros disponibles. Puedes cargar</p>
      )}
    </section>
  );
}

export default CardHomeContainer;
