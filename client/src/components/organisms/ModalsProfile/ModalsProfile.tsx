import "./ModalsProfile.scss";

import React, { useEffect, useState } from "react";

import AlertBasic from "../../atoms/AlertBasic/AlertBasic";
import ModalCustom from "../../molecules/ModalCustom/ModalCustom";
import { TextField } from "@mui/material";
import { UserHook } from "../../../utils/customHooks";
import { hash } from "../../../utils/functions";

interface Data {
  password: string;
  newPassword: string;
  username: string;
}

function ModalsProfile() {
  const { loggedUser, destroyUser, changePass, findLoggedUser, setLoggedUser } = UserHook();
  const { id, password, email, username } = loggedUser;
  const [disabled, setDisabled] = useState({ password: true, delete: true });
  const [loading, setLoading] = useState({ password: false, delete: false });
  const [data, setData] = useState<Data>({ password: "", newPassword: "", username: "" });

  useEffect(() => {
    // function necesaria para hashear la password
    const validatePass = async () => {
      const hashedPass = await hash(data.password);
      if (password !== hashedPass) setDisabled({ ...disabled, password: true });
      else if (data.newPassword.length < 6) setDisabled({ ...disabled, password: true });
      else setDisabled({ ...disabled, password: false });
    };
    validatePass();
  }, [data.newPassword.length, data.password, password]);

  useEffect(() => {
    if (username !== data.username) setDisabled({ ...disabled, delete: true });
    else setDisabled({ ...disabled, delete: false });
  }, [data.username, username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    setLoading({ ...loading, delete: true });

    try {
      await destroyUser(id);
      localStorage.removeItem("lsLoggedUser");
      window.location.href = "/";
    } catch (err) {
      AlertBasic("Error", "Lo sentimos, no se ha podido eliminar el usuario.", "error");
    }

    setLoading({ ...loading, delete: false });
  };

  const handlePassword = async () => {
    setLoading({ ...loading, password: true });

    try {
      // cambio la contraseña y después actualizo el logged user
      await changePass(id, data.newPassword);
      const res = await findLoggedUser({ email, password: await hash(data.newPassword) });
      localStorage.setItem("lsLoggedUser", JSON.stringify(res));
      setLoggedUser(res);
      AlertBasic("", "Contraseña actualizada exitosamente!", "success");
    } catch (err) {
      AlertBasic("Error", "Lo sentimos, no se ha podido cambiar la contraseña", "error");
    }

    setLoading({ ...loading, password: false });
  };

  return (
    <>
      <ModalCustom
        title="Cambiar contraseña"
        text="Debe poner su contraseña actual y la nueva."
        btnName="Cambiar contraseña"
        btnSuccessDisabled={disabled.password}
        onClick={handlePassword}
        children={childrenPassword(data, handleChange)}
      />
      <ModalCustom
        title="Eliminar cuenta"
        text="¿Seguro desea eliminar su cuenta? No se podrá revertir el cambio."
        text2="Escriba su nombre de usuario para poder eliminar su cuenta."
        btnName="Eliminar cuenta"
        btnColor="error"
        btnSuccessColor="error"
        btnSuccessDisabled={disabled.delete}
        onClick={handleDelete}
        children={childrenDelete(username, data, handleChange)}
      />
    </>
  );
}

const childrenPassword = (
  state: Data,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
  return (
    <div className="password-inputs_container">
      <TextField
        label="Contraseña actual"
        variant="outlined"
        size="small"
        autoComplete="off"
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
      />
      <TextField
        label="Contraseña nueva"
        variant="outlined"
        size="small"
        autoComplete="off"
        type="password"
        name="newPassword"
        value={state.newPassword}
        onChange={handleChange}
      />
    </div>
  );
};

const childrenDelete = (
  username: string,
  state: Data,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
  return (
    <TextField
      label="Nombre de usuario"
      variant="outlined"
      size="small"
      placeholder={username}
      autoComplete="off"
      name="username"
      value={state.username}
      onChange={handleChange}
    />
  );
};

export default ModalsProfile;
