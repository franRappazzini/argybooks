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

import { GetCategoriesHook } from "../../../utils/customHooks";
import { ICreateBook } from "../../../utils/interfaces";

interface Props {
  data: ICreateBook;
  setData: any;
}

function CheckmarkBook({ data, setData }: Props) {
  const arrCat = GetCategoriesHook();

  const handleChange = (e: SelectChangeEvent<typeof data.categories>) => {
    setData({ ...data, categories: e.target.value });
  };

  return (
    <FormControl>
      <InputLabel id="demo-multiple-checkbox-label">Categorias*</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        multiple
        value={data.categories}
        onChange={handleChange}
        input={<OutlinedInput label="Categorias*" />}
        renderValue={(selected) => selected.join(", ")}
        size="small"
      >
        {arrCat.map((cat) => (
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
