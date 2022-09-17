import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Search from "@mui/icons-material/Search";
import { SearchBooksHook } from "../../../utils/customHooks";

// import { Search } from "@mui/icons-material";

function SearchBar() {
  const { searchBook, setLoader, books, loading } = SearchBooksHook();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoader(true);
    localStorage.setItem("bookSearch", JSON.stringify(search));
    searchBook(search);
    pathname !== "/books" && navigate("/books");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      {/* <TextField
        label="Buscar por título o autor.."
        variant="outlined"
        onChange={handleChange}
        value={search}
        autoComplete="off"
        size="small"
      /> */}

      <FormControl sx={{ m: 1, minWidth: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-input">Buscar por título o autor..</InputLabel>
        <OutlinedInput
          id="outlined-adornment-input"
          label="Buscar por título o autor.."
          type="text"
          value={search}
          onChange={handleChange}
          // size="small"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle" edge="end" type="submit">
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
}

export default SearchBar;
