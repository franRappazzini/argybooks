import "./DetailContainer.scss";

import BookDetailContainer from "../../molecules/BookDetailContainer/BookDetailContainer";
import { CompleteBook } from "../../../utils/interfaces";
import RecommendedBooks from "../../molecules/RecommendedBooks/RecommendedBooks";

function DetailContainer(book: CompleteBook, search: string) {
  return (
    <section className="detail_container">
      <BookDetailContainer {...book} />

      <RecommendedBooks />
    </section>
  );
}

export default DetailContainer;
