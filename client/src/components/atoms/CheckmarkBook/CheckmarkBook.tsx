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

import { GetOthersHook } from "../../../utils/customHooks";
import { ICreateBook } from "../../../utils/interfaces";

interface Props {
  data: ICreateBook;
  setData: any;
}

function CheckmarkBook({ data, setData }: Props) {
  const { categories } = GetOthersHook();

  const handleChange = (e: SelectChangeEvent<typeof data.categories>) => {
    setData({ ...data, categories: e.target.value });
  };

  return (
    <FormControl>
      <InputLabel id="demo-multiple-checkbox-label" size="small">
        Categorías*
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        multiple
        value={data.categories}
        onChange={handleChange}
        input={<OutlinedInput label="Categorías*" />}
        renderValue={(selected) => selected.join(", ")}
        size="small"
      >
        {categories.map((cat) => (
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
