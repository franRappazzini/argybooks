import { Navigate, Outlet } from "react-router-dom";

import { UserHook } from "../../../utils/customHooks";

function IsLogged() {
  const { loggedUser } = UserHook();

  // si el user esta logueado no puede acceder a las paginas que contiene
  return loggedUser && Object.keys(loggedUser).length ? <Navigate to={"/"} /> : <Outlet />;
}

export default IsLogged;
