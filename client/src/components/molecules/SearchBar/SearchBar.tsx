import "./SearchBar.scss";

import { BookHook, OtherHook } from "../../../utils/customHooks";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import Search from "@mui/icons-material/Search";
import { SearchBook } from "../../../utils/interfaces";
import SelectCustom from "../../atoms/SelectCustom/SelectCustom";
import { useLocation } from "react-router-dom";

interface Prop {
  state: string;
}

function SearchBar({ state }: Prop) {
  const initial = { search: "", category: "", author: state || "", language: "" };
  const { getBooks, setLoader } = BookHook();
  const { categories, authors } = OtherHook();
  const [data, setData] = useState<SearchBook>(initial);

  useEffect(() => {
    state && getBooks({ ...data, author: state });
  }, [state]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoader(true);
    getBooks(data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "category" || name === "author" || name === "language") {
      setLoader(true);
      getBooks({ ...data, [name]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form_search-bar max_width">
      <FormControl sx={{ minWidth: "25ch" }} variant="outlined" className="search_input">
        <InputLabel htmlFor="outlined-adornment-input" size="small">
          Buscar por título o autor
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-input"
          label="Buscar por título o autor.."
          type="text"
          name="search"
          value={data.search}
          onChange={handleChange}
          size="small"
          autoComplete="off"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle" edge="end" type="submit">
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <section className="selects_container">
        <SelectCustom
          label="Categoría"
          name="category"
          value={data.category}
          handleChange={handleChange}
          generic="Todas"
          children={
            categories &&
            categories.length > 0 &&
            categories.map((cat: string) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))
          }
        />

        <SelectCustom
          label="Autor"
          name="author"
          value={data.author}
          handleChange={handleChange}
          generic="Todos"
          children={
            authors &&
            authors.length > 0 &&
            authors.map((author: string) => (
              <MenuItem key={author} value={author}>
                {author}
              </MenuItem>
            ))
          }
        />

        <SelectCustom
          label="Idioma"
          name="language"
          value={data.language}
          handleChange={handleChange}
          generic="Todos"
          children={["Spanish", "English"].map((l) => (
            <MenuItem key={l} value={l}>
              {l}
            </MenuItem>
          ))}
        />
      </section>
    </form>
  );
}

export default SearchBar;
