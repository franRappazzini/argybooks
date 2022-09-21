import "./Books.scss";

import { BookHook } from "../../../utils/customHooks";
import CardBook from "../../molecules/CardBook/CardBook";
import { CircularProgress } from "@mui/material";
import { CompleteBook } from "../../../utils/interfaces";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import { useEffect } from "react";

function Books() {
  const { books, loading, setLoader, getBooks } = BookHook();

  // TODO revisar re render aca (con 3g slow)
  // TODO revisar que queda el loading cuando voy al home y vuelvo a esta pagina => creo que porque el home también pide este hooks

  useEffect(() => {
    setLoader(true);
    getBooks();
  }, []);

  return (
    <main className="books_component component">
      <SearchBar />

      <section className="books_container">
        {loading ? (
          <CircularProgress />
        ) : books.length > 0 ? (
          books.map((book: CompleteBook) => <CardBook key={book.id} {...book} />)
        ) : (
          // TODO crear componente y dar opción de crearlo
          <p>Lo sentimos no se encontró nada, quieres subir el libro a nuestra db?</p>
        )}
      </section>
    </main>
  );
}

export default Books;
