import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../../redux/hooks";

function IsLogged() {
  const { loggedUser } = useAppSelector((state) => state.user);

  // si el user esta logueado no puede acceder a las paginas que contiene
  return loggedUser && Object.keys(loggedUser).length ? <Navigate to={"/"} /> : <Outlet />;
}

export default IsLogged;
