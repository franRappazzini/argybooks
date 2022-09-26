import "./InputsBookContainer.scss";

import { Autocomplete, FormControl, InputLabel, MenuItem, TextField } from "@mui/material";

import { ICreateBook } from "../../../utils/interfaces";
import { OtherHook } from "../../../utils/customHooks";
import Select from "@mui/material/Select";
import SelectCategories from "../../atoms/SelectCategories/SelectCategories";
import { arrLanguages } from "../../../utils/vars";
import { useEffect } from "react";

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
  const { getAllAuthors, getAllCategories, authors } = OtherHook();

  useEffect(() => {
    getAllAuthors();
    getAllCategories();
  }, []);

  return (
    <>
      <section className="inputs-book_container">
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={authors.map((author: string) => author)}
          onChange={(e, val) => setData({ ...data, author: val })}
          disableClearable
          renderInput={(params) => (
            <TextField
              error={error.author.length > 0 && true}
              helperText={error.author.length > 0 && error.author}
              {...params}
              size="small"
              label="Autor*"
              name="author"
              value={data.author}
              onChange={handleChange}
            />
          )}
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
        <SelectCategories data={data} setData={setData} error={error.categories} />

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
