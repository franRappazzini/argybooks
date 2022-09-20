import "./DetailContainer.scss";

import BookDetailContainer from "../../molecules/BookDetailContainer/BookDetailContainer";
import { CompleteBook } from "../../../utils/interfaces";
import RecommendedBooks from "../../molecules/RecommendedBooks/RecommendedBooks";

interface Props {
  book: CompleteBook;
  getBookDetail: (id: string) => void;
  search?: string;
}

function DetailContainer({ book, getBookDetail, search }: Props) {
  return (
    <section className="detail_container max_width">
      <BookDetailContainer book={book} getBookDetail={getBookDetail} />

      <RecommendedBooks />
    </section>
  );
}

export default DetailContainer;
