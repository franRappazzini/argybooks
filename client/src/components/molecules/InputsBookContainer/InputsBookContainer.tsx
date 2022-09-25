import "./InputsBookContainer.scss";

import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";

import CheckmarkBook from "../../atoms/CheckmarkBook/CheckmarkBook";
import { ICreateBook } from "../../../utils/interfaces";
import Select from "@mui/material/Select";
import { arrLanguages } from "../../../utils/vars";

interface InputValues {
  data: ICreateBook;
  setData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: {
    author: string;
    year: string;
    language: string;
    description: string;
    categories: string;
    fileV: string;
    imageV: string;
  };
}

function InputsBookContainer({
  data,
  setData,
  handleChange,
  handleFile,
  handleImage,
  error,
}: InputValues) {
  return (
    <>
      <section className="inputs-book_container">
        <TextField
          error={error.author.length > 0 && true}
          helperText={error.author.length > 0 && error.author}
          size="small"
          label="Autor*"
          variant="outlined"
          name="author"
          value={data.author}
          onChange={handleChange}
        />
        <TextField
          error={error.year.length > 0 && true}
          helperText={error.year.length > 0 && error.year}
          size="small"
          label="Año*"
          variant="outlined"
          type="number"
          name="year"
          value={data.year}
          onChange={handleChange}
          sx={{ minWidth: "3rem" }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" size="small">
            Idioma*
          </InputLabel>
          <Select
            error={error.language.length > 0 && true}
            labelId="demo-simple-select-label"
            value={data.language}
            label="Idioma*"
            name="language"
            onChange={handleChange}
            size="small"
            sx={{ minWidth: "3rem" }}
          >
            {arrLanguages.map((lan: string) => (
              <MenuItem key={lan} value={lan}>
                {lan}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* para seleccionar varias categorías */}
        <CheckmarkBook data={data} setData={setData} error={error.categories} />

        <div className="file-input_container">
          <label htmlFor="image">Portada del libro*</label>
          <input type="file" accept=".jpg,.jpeg,.png" id="image" onChange={handleImage} required />
        </div>
        <div className="file-input_container">
          <label htmlFor="file">Archivo*</label>
          <input type="file" accept=".pdf" id="file" onChange={handleFile} required />
        </div>
      </section>

      <TextField
        error={error.description.length > 0 && true}
        helperText={error.description.length > 0 && error.description}
        size="small"
        label="Descripción"
        variant="outlined"
        name="description"
        multiline
        rows={4}
        value={data.description}
        onChange={handleChange}
        sx={{ width: "100%", m: "1rem 0" }}
      />
    </>
  );
}

export default InputsBookContainer;
