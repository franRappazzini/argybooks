import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface Props {
  label: string;
  name: string;
  value: string | undefined;
  handleChange: (e: SelectChangeEvent<string>) => void;
  children: React.ReactNode;
  generic: string;
}

function SelectCustom({ label, name, value, handleChange, children, generic }: Props) {
  return (
    <FormControl className="form_control_atom">
      <InputLabel id={label} size="small">
        {label}
      </InputLabel>
      <Select
        labelId={label}
        id={label}
        label={label}
        size="small"
        name={name}
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="">{generic}</MenuItem>
        {children}
      </Select>
    </FormControl>
  );
}

export default SelectCustom;
