import "./Detail.scss";

import { BookHook } from "../../../utils/customHooks";
import { CircularProgress } from "@mui/material";
import DetailContainer from "../../organisms/DetailContainer/DetailContainer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// TODO revisar porque no anda la linea 30

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
        <p>Lo sentimos, no se encontró coincidencia</p>
      )}
    </main>
  );
}

export default Detail;
