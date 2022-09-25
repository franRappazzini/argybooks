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
import { hash, userLogInValidations } from "../../../utils/functions";

import AlertBasic from "../../atoms/AlertBasic/AlertBasic";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import { ILogInUser } from "../../../utils/interfaces";
import { LoadingButton } from "@mui/lab";
import Toast from "../../atoms/Toast/Toast";
import { UserHook } from "../../../utils/customHooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const initial = { email: "", password: "", showPass: false };

function LogInForm() {
  const [data, setData] = useState<ILogInUser>(initial);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setLoggedUser, findLoggedUser } = UserHook();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const validation = userLogInValidations(data);
    if (validation) return AlertBasic("Error..", validation, "error");

    setLoading(true);

    try {
      const hashedPass = await hash(data.password);
      const res = await findLoggedUser({ ...data, password: hashedPass });
      localStorage.setItem("lsLoggedUser", JSON.stringify(res));
      setLoggedUser(res);
      Toast("success", `Bienvenido nuevamente ${res.username}!`);
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
