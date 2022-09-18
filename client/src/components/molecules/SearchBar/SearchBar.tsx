import "./SearchBar.scss";

import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { GetOthersHook, SearchBooksHook } from "../../../utils/customHooks";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Search from "@mui/icons-material/Search";
import { SearchBook } from "../../../utils/interfaces";

// const lsSearch = JSON.parse(localStorage.getItem("bookSearch") || "");
const initial = { search: "", category: "", author: "" };

function SearchBar() {
  const { searchBook, setLoader } = SearchBooksHook();
  const { categories, authors } = GetOthersHook();
  const [data, setData] = useState<SearchBook>(initial);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(data);
    console.log("RENDER");
  }, [data]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoader(true);
    searchBook(data);
    pathname !== "/books" && navigate("/books");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    // name === "search" && localStorage.setItem("bookSearch", JSON.stringify(value));
    if (name === "category" || name === "author") {
      setLoader(true);
      searchBook({ ...data, [name]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form_search-bar max_width">
      <FormControl sx={{ minWidth: "25ch" }} variant="outlined">
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
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle" edge="end" type="submit">
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {/* TODO crear componente para esto */}
      {pathname === "/books" && (
        <Box sx={{ display: "flex", gridGap: "1rem" }}>
          <FormControl sx={{ minWidth: "15ch" }}>
            <InputLabel id="demo-simple-select-label" size="small">
              Categoría
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Categoría"
              size="small"
              name="category"
              value={data.category}
              onChange={handleChange}
            >
              {categories &&
                categories.length > 0 &&
                categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: "15ch" }}>
            <InputLabel id="demo-simple-select-label2" size="small">
              Autor
            </InputLabel>
            <Select
              labelId="demo-simple-select-label2"
              id="demo-simple-select2"
              label="Autor"
              size="small"
              name="author"
              value={data.author}
              onChange={handleChange}
            >
              {authors &&
                authors.length > 0 &&
                authors.map((author) => (
                  <MenuItem key={author} value={author}>
                    {author}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </form>
  );
}

export default SearchBar;
