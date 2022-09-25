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
import Toast from "../../atoms/Toast/Toast";
import { UserHook } from "../../../utils/customHooks";
import axios from "axios";
import { createUser } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userValidations } from "../../../utils/functions";

const initial = { username: "", email: "", password: "", showPass: false };

function SignUpForm() {
  const [data, setData] = useState<ICreateUser>(initial);
  const [error, setError] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setLoggedUser, findLoggedUser } = UserHook();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { username, email, password } = userValidations(data);
    if (username.length > 0 || email.length > 0 || password.length > 0) {
      return setError({ username, email, password });
    } else setError({ username: "", email: "", password: "" });

    setLoading(true);

    try {
      const res = await createUser(data);
      // una vez creado lo busco para traer sus relaciones
      const model = { email: res.response.email, password: res.response.password };
      const completeUser = await findLoggedUser(model);
      localStorage.setItem("lsLoggedUser", JSON.stringify(completeUser));
      setLoggedUser(completeUser);
      Toast("success", "Usuario creado con éxito!");
      setData(initial);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { name }: any = err.response?.data;
        name === "SequelizeUniqueConstraintError"
          ? AlertBasic("Error!", "Email ya registrado, intente iniciar sesión o use otro.", "error")
          : AlertBasic("Error!", "Lo sentimos, vuelva a intentarlo mas tarde", "error");
      } else AlertBasic("Error!", "Lo sentimos, vuelva a intentarlo mas tarde", "error");
    }
    setLoading(false);
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
          error={error.username.length > 0 && true}
          helperText={error.username.length > 0 && error.username}
          label="Nombre de usuario*"
          variant="outlined"
          size="small"
          name="username"
          type="text"
          onChange={handleChange}
          value={data.username}
        />
        <TextField
          error={error.email.length > 0 && true}
          helperText={error.email.length > 0 && error.email}
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
            error={error.password.length > 0 && true}
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
