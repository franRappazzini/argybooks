import "./Books.scss";

import { BookHook, OtherHook } from "../../../utils/customHooks";

import CardBook from "../../molecules/CardBook/CardBook";
import { CircularProgress } from "@mui/material";
import { CompleteBook } from "../../../utils/interfaces";
import NotFoundMessage from "../../atoms/NotFoundMessage/NotFoundMessage";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Books() {
  const { books, loading, getBooks, setLoader } = BookHook();
  const { getAllAuthors, getAllCategories } = OtherHook();
  const { state }: any = useLocation();

  useEffect(() => {
    setLoader(true);
    !state?.value && getBooks(); // si existe el state.value busca la coincidencia esa en SearchBar
    getAllAuthors();
    getAllCategories();
  }, [state?.value]);

  return (
    <main className="books_component component">
      <SearchBar state={state?.value} />

      <section className="books_container">
        {loading ? (
          <CircularProgress />
        ) : books.length > 0 ? (
          books.map((book: CompleteBook) => <CardBook key={book.id} {...book} />)
        ) : (
          <NotFoundMessage />
        )}
      </section>
    </main>
  );
}

export default Books;
