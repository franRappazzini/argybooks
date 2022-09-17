import "./CardHomeContainer.scss";

import { BookHome } from "../../../utils/interfaces";
import CardHome from "../../molecules/CardHome/CardHome";
import { CircularProgress } from "@mui/material";
import { GetBooksHook } from "../../../utils/customHooks";

function CardHomeContainer() {
  const { books, loading } = GetBooksHook();

  return (
    <section className="card-home_container">
      {loading ? (
        <CircularProgress />
      ) : books.length > 0 ? (
        books.map((book: BookHome) => <CardHome key={book.id} {...book} />)
      ) : (
        <p>Lo sentimos, aun no hay libros disponibles. Puedes cargar</p>
      )}
    </section>
  );
}

export default CardHomeContainer;
