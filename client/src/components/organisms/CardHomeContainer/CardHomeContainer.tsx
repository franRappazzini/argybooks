import "./CardHomeContainer.scss";

import { BookHome } from "../../../utils/interfaces";
import { BookHook } from "../../../utils/customHooks";
import CardHome from "../../molecules/CardHome/CardHome";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

function CardHomeContainer() {
  const { books, loading, getBooks, setLoader } = BookHook();

  useEffect(() => {
    setLoader(true);
    getBooks();
  }, []);

  return (
    <section className="card-home_container max_width">
      {loading ? (
        <CircularProgress />
      ) : books.length > 0 ? (
        <section className="cards_container">
          {books.map((book: BookHome) => (
            <CardHome key={book.id} {...book} />
          ))}
        </section>
      ) : (
        <p>Lo sentimos, aun no hay libros disponibles. Puedes cargar</p>
      )}
    </section>
  );
}

export default CardHomeContainer;
