import "./LonInForm.scss";

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
import { GetLoggedUserHook } from "../../../utils/customHooks";
import { ILogInUser } from "../../../utils/interfaces";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userLogInValidations } from "../../../utils/functions";

const initial = { email: "", password: "", showPass: false };

function LogInForm() {
  const [data, setData] = useState<ILogInUser>(initial);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setLoggedUser, findLoggedUser } = GetLoggedUserHook();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const validation = userLogInValidations(data);
    if (validation) return AlertBasic("Error..", validation, "error");

    setLoading(true);

    try {
      const res = await findLoggedUser(data);
      localStorage.setItem("lsLoggedUser", JSON.stringify(res));
      setLoggedUser(res);
      // TODO crear toast para esto
      AlertBasic("Felicidades!", "Ingreso correcto", "success");
      setData(initial);
      setLoading(false);
      navigate(-1);
    } catch (err) {
      setLoading(false);
      return AlertBasic("", "Email o contraseña incorrectos, vuelva a intentarlo", "error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setData({ ...data, showPass: !data.showPass });
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

  return (
    <Card elevation={1} className="log-in_container">
      <form className="log-in_form" onSubmit={handleSubmit}>
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
            Iniciar sesión
          </LoadingButton>
        </div>

        <Typography variant="body1" sx={{ mt: "1rem" }}>
          Aun no esta registrado? <CustomLink text="Registrese" to="/sign_up" color="primary" />
        </Typography>
      </form>
    </Card>
  );
}

export default LogInForm;
