import "./Detail.scss";

import { CircularProgress } from "@mui/material";
import { CompleteBook } from "../../../utils/interfaces";
import DetailContainer from "../../organisms/DetailContainer/DetailContainer";
import { GetDetailBookHook } from "../../../utils/customHooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// TODO revisar porque no anda la linea 30

function Detail() {
  const { bookId } = useParams();
  const { book, getBookDetail, loading } = GetDetailBookHook();

  useEffect(() => {
    getBookDetail(bookId);
  }, [bookId]);

  return (
    <main className="detail_component component max_width">
      {loading ? (
        <CircularProgress sx={{ mt: "2rem" }} />
      ) : book && Object.values(book).length > 0 ? (
        <DetailContainer {...book} />
      ) : (
        <p>Lo sentimos, no se encontró coincidencia</p>
      )}
    </main>
  );
}

export default Detail;
