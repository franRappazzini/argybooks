import "./CreateBook.scss";

import { createBook, uploadBook, uploadBookCover } from "../../../redux/actions/bookActions";
import { useEffect, useState } from "react";

import AlertBasic from "../../atoms/AlertBasic/AlertBasic";
import AlertOptions from "../../atoms/AlertOptions/AlertOptions";
import { ICreateBook } from "../../../utils/interfaces";
import InputsBookContainer from "../../molecules/InputsBookContainer/InputsBookContainer";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { bookValidations } from "../../../utils/functions";
import { useNavigate } from "react-router-dom";

const initial = {
  name: "",
  author: "",
  year: Number(),
  language: "",
  image: "",
  description: "",
  categories: [],
};

function CreateBook() {
  const [data, setData] = useState<ICreateBook>(initial);
  const [file, setFile] = useState<any>();
  const [image, setImage] = useState<any>();
  const [imgPreview, setImgPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (bookValidations(data, image, file)) {
      return AlertBasic("Error..", bookValidations(data, image, file), "warning");
    }

    setLoading(true);

    try {
      const bookCoverImg = new FormData();
      bookCoverImg.append("file", image);
      bookCoverImg.append("upload_preset", process.env.REACT_APP_PRESET || "");
      const coverRes = await uploadBookCover(bookCoverImg);

      const newBook = {
        ...data,
        image: coverRes.data.url,
      };

      const bookFile = new FormData();
      bookFile.append("file", file);
      bookFile.append("fileName", file.name);

      await uploadBook(bookFile);
      const res = await createBook(newBook);

      console.log(res);

      AlertOptions({
        title: "Creado!",
        text: "Libro creado exitosamente",
        icon: "success",
        onConfirm() {
          navigate(`/book/${res.data.response.id}`);
        },
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (axios.isAxiosError(err)) return AlertBasic("Error!", err.message, "error");
      else return AlertBasic("Error!", "Lo sentimos, vuelva a intentarlo mas tarde", "error");
    }

    setLoading(false);
    setData(initial);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setFile(file);
      setData({ ...data, name: file.name });
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setImage(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form_component component">
      <section className="max_width">
        <InputsBookContainer
          data={data}
          setData={setData}
          handleChange={handleChange}
          handleImage={handleImage}
          handleFile={handleFile}
        />

        {imgPreview && <img src={imgPreview} alt={data.name} />}

        <LoadingButton loading={loading} variant="contained" type="submit">
          Enviar
        </LoadingButton>
      </section>
    </form>
  );
}

export default CreateBook;
