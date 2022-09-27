import "./Detail.scss";

import { BookHook } from "../../../utils/customHooks";
import { CircularProgress } from "@mui/material";
import DetailContainer from "../../organisms/DetailContainer/DetailContainer";
import NotFoundMessage from "../../atoms/NotFoundMessage/NotFoundMessage";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { bookId } = useParams();
  const { book, getBookDetail, loading, setLoader } = BookHook();

  useEffect(() => {
    setLoader(true);
    getBookDetail(bookId);
  }, [bookId]);

  return (
    <main className="detail_component component">
      {loading ? (
        <CircularProgress sx={{ mt: "2rem" }} />
      ) : book && Object.values(book).length > 0 ? (
        <DetailContainer book={book} getBookDetail={getBookDetail} />
      ) : (
        <div className="not-found_container">
          <NotFoundMessage />
        </div>
      )}
    </main>
  );
}

export default Detail;
