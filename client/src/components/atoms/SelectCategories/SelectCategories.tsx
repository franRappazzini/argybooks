import { Autocomplete, Chip, TextField } from "@mui/material";

import { ICreateBook } from "../../../utils/interfaces";
import { OtherHook } from "../../../utils/customHooks";

interface Props {
  data: ICreateBook;
  setData: any;
  error: string;
}

function SelectCategories({ data, setData, error }: Props) {
  const { categories } = OtherHook();

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={categories.map((option: string) => option)}
      freeSolo
      renderTags={(val: string[], getTagProps) =>
        val.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      onChange={(e, val) => setData({ ...data, categories: val })}
      renderInput={(params) => (
        <TextField
          error={error.length > 0 && true}
          helperText={error.length > 0 && error}
          {...params}
          variant="outlined"
          label="Categorías*"
          placeholder="Añadir"
          size="small"
          name="categories"
        />
      )}
    />
  );
}

export default SelectCategories;
