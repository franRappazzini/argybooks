import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { ICreateBook } from "../../../utils/interfaces";
import { OtherHook } from "../../../utils/customHooks";
import { useEffect } from "react";

interface Props {
  data: ICreateBook;
  setData: any;
  error: string;
}

function CheckmarkBook({ data, setData, error }: Props) {
  const { categories, getAllAuthors, getAllCategories } = OtherHook();

  useEffect(() => {
    getAllAuthors();
    getAllCategories();
  }, []);

  const handleChange = (e: SelectChangeEvent<typeof data.categories>) => {
    setData({ ...data, categories: e.target.value });
  };

  return (
    <FormControl>
      <InputLabel id="demo-multiple-checkbox-label" size="small">
        Categorías*
      </InputLabel>
      <Select
        error={error.length > 0 && true}
        aria-errormessage="error"
        labelId="demo-multiple-checkbox-label"
        multiple
        value={data.categories}
        onChange={handleChange}
        input={<OutlinedInput label="Categorías*" />}
        renderValue={(selected) => selected.join(", ")}
        size="small"
        sx={{ minWidth: "3rem" }}
      >
        {categories.map((cat: string) => (
          <MenuItem key={cat} value={cat}>
            <Checkbox checked={data.categories.indexOf(cat) > -1} />
            <ListItemText primary={cat} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CheckmarkBook;
