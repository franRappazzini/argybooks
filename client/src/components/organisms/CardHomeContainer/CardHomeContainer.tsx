import "./CardHomeContainer.scss";

import { BookHome } from "../../../utils/interfaces";
import CardHome from "../../molecules/CardHome/CardHome";
import { CircularProgress } from "@mui/material";
import { GetBooksHook } from "../../../utils/customHooks";

function CardHomeContainer() {
  const { books, loading } = GetBooksHook();

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
