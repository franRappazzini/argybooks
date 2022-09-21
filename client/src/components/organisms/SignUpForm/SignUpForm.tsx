import "./SignUpForm.scss";

import {
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import AlertBasic from "../../atoms/AlertBasic/AlertBasic";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import { ICreateUser } from "../../../utils/interfaces";
import { LoadingButton } from "@mui/lab";
import { UserHook } from "../../../utils/customHooks";
import axios from "axios";
import { createUser } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userValidations } from "../../../utils/functions";

const initial = { username: "", email: "", password: "", showPass: false };

function SignUpForm() {
  const [data, setData] = useState<ICreateUser>(initial);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setLoggedUser } = UserHook();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const validation = userValidations(data);
    if (validation) return AlertBasic("Error..", validation, "error");

    setLoading(true);

    try {
      const res = await createUser(data);

      localStorage.setItem("lsLoggedUser", JSON.stringify(res.response));
      setLoggedUser(res.response);
      AlertBasic("Felicidades!", "Usuario creado con éxito", "success");
      setData(initial);
      setLoading(false);
      navigate(-1);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) return AlertBasic("Error!", err.message, "error");
      else return AlertBasic("Error!", "Lo sentimos, vuelva a intentarlo mas tarde", "error");
    }
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
          label="Nombre de usuario*"
          variant="outlined"
          size="small"
          name="username"
          type="text"
          onChange={handleChange}
          value={data.username}
        />
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
          <InputLabel htmlFor="outlined-adornment-password" size="small">
            Contraseña*
          </InputLabel>
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
          <LoadingButton loading={loading} variant="contained" type="submit" size="small">
            Registrarse
          </LoadingButton>
        </div>

        <Typography variant="body1" sx={{ mt: "1rem" }}>
          Ya tiene una cuenta? <CustomLink text="Inicie sesión" to="/log_in" color="primary" />
        </Typography>
      </form>
    </Card>
  );
}

export default SignUpForm;
