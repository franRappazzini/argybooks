import BookDetailContainer from "../../molecules/BookDetailContainer/BookDetailContainer";
import { CompleteBook } from "../../../utils/interfaces";
import RecommendedBooks from "../../molecules/RecommendedBooks/RecommendedBooks";

function DetailContainer(book: CompleteBook, search: string) {
  return (
    <section className="max_width">
      <BookDetailContainer {...book} />

      <RecommendedBooks />
    </section>
  );
}

export default DetailContainer;
