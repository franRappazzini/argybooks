import "./CreateBook.scss";

import { createBook, uploadBook, uploadBookCover } from "../../../redux/actions/bookActions";

import AlertBasic from "../../atoms/AlertBasic/AlertBasic";
import AlertOptions from "../../atoms/AlertOptions/AlertOptions";
import BackdropCustom from "../../atoms/BackdropCustom/BackdropCustom";
import { ICreateBook } from "../../../utils/interfaces";
import InputsBookContainer from "../../molecules/InputsBookContainer/InputsBookContainer";
import LoadingButton from "@mui/lab/LoadingButton";
import { UserHook } from "../../../utils/customHooks";
import axios from "axios";
import { bookValidations } from "../../../utils/functions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const initial = {
  name: "",
  author: "",
  year: Number(), // TODO ver esto
  language: "",
  image: "",
  description: "",
  categories: [],
};

const initialError = {
  author: "",
  year: "",
  language: "",
  description: "",
  categories: "",
  fileV: "",
  imageV: "",
};

function CreateBook() {
  const { loggedUser } = UserHook();
  const [data, setData] = useState<ICreateBook>(initial);
  const [file, setFile] = useState<any>();
  const [image, setImage] = useState<any>();
  const [imgPreview, setImgPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(initialError);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { author, year, language, description, categories, fileV, imageV } = bookValidations(
      data,
      image,
      file
    );

    if (
      author.length > 0 ||
      year.length > 0 ||
      language.length > 0 ||
      description.length > 0 ||
      categories.length > 0 ||
      fileV.length > 0 ||
      imageV.length > 0
    ) {
      return setError({ author, year, language, description, categories, fileV, imageV });
    } else setError(initialError);

    setLoading(true);

    try {
      const bookCoverImg = new FormData();
      bookCoverImg.append("file", image);
      bookCoverImg.append("upload_preset", process.env.REACT_APP_PRESET || "");
      const coverRes = await uploadBookCover(bookCoverImg);

      const newBook = {
        ...data,
        image: coverRes.data.url,
        userId: loggedUser.id,
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
        onConfirm: () => navigate(`/book/${res.data.response.id}`),
      });
      setData(initial);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        const { response }: any = err.response?.data;
        response?.name === "SequelizeUniqueConstraintError"
          ? AlertBasic("Error!", "Ya existe un archivo con ese nombre.", "error")
          : AlertBasic("Error!", "Lo sentimos, vuelva a intentarlo mas tarde", "error");
      } else return AlertBasic("Error!", "Lo sentimos, vuelva a intentarlo mas tarde", "error");
    }

    setLoading(false);
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
        {/* TODO aca poner tips para cargar libro */}

        <InputsBookContainer
          data={data}
          setData={setData}
          handleChange={handleChange}
          handleImage={handleImage}
          handleFile={handleFile}
          error={error}
        />

        <BackdropCustom btnText="Añadir" onClick={handleSubmit} open={loading} />
      </section>
    </form>
  );
}

export default CreateBook;
