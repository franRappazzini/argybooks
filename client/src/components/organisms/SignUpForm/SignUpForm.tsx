import "./SignUpForm.scss";

import {
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import AlertBasic from "../../atoms/AlertBasic/AlertBasic";
import { ICreateUser } from "../../../utils/interfaces";
import axios from "axios";
import { createUser } from "../../../redux/actions/userActions";
import { useState } from "react";
import { userValidations } from "../../../utils/functions";

const initial = { email: "", password: "", showPass: false };

function SignUpForm() {
  const [data, setData] = useState<ICreateUser>(initial);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const validation = userValidations(data);
    if (validation) return AlertBasic("Error..", validation, "error");

    try {
      const res = await createUser(data);
      console.log(res);

      AlertBasic("Felicidades!", "Usuario creado con éxito", "success");
    } catch (err) {
      if (axios.isAxiosError(err)) return AlertBasic("Error!", err.message, "error");
      else return AlertBasic("Error!", "Lo sentimos, vuelva a intentarlo mas tarde", "error");
    }

    setData(initial);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setData({ ...data, showPass: !data.showPass });
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

  return (
    <Card elevation={1} className="sign-up_container">
      <form className="sign-up_form" onSubmit={handleSubmit}>
        <TextField
          label="Email*"
          variant="outlined"
          size="small"
          name="email"
          type="email"
          onChange={handleChange}
          value={data.email}
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Contraseña*</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            size="small"
            type={data.showPass ? "text" : "password"}
            name="password"
            onChange={handleChange}
            value={data.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {data.showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña*"
            autoComplete="off"
          />
        </FormControl>

        <div>
          <Button variant="contained" type="submit">
            Registrarse
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default SignUpForm;
