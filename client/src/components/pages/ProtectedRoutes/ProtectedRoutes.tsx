import { Navigate, Outlet } from "react-router-dom";

import { UserHook } from "../../../utils/customHooks";

function ProtectedRoutes() {
  const { loggedUser } = UserHook();

  // si el user no esta logueado no puede acceder a las paginas que contiene
  return loggedUser && Object.keys(loggedUser).length ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoutes;
