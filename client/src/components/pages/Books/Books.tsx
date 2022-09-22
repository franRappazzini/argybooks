import "./Books.scss";

import { BookHook, OtherHook } from "../../../utils/customHooks";

import CardBook from "../../molecules/CardBook/CardBook";
import { CircularProgress } from "@mui/material";
import { CompleteBook } from "../../../utils/interfaces";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import { useEffect } from "react";

function Books() {
  const { books, loading, getBooks, setLoader } = BookHook();
  const { getAllAuthors, getAllCategories } = OtherHook();

  useEffect(() => {
    setLoader(true);
    getBooks();
    getAllAuthors();
    getAllCategories();
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
