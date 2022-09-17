import "./Detail.scss";

import { CircularProgress } from "@mui/material";
import DetailContainer from "../../organisms/DetailContainer/DetailContainer";
import { GetDetailBookHook } from "../../../utils/customHooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { bookId } = useParams();
  const { book, getBookDetail, loading } = GetDetailBookHook();

  useEffect(() => {
    getBookDetail(bookId);
  }, [bookId]);

  return (
    <main className="detail_component component">
      {loading ? <CircularProgress sx={{ mt: "2rem" }} /> : <DetailContainer {...book} />}
    </main>
  );
}

export default Detail;
