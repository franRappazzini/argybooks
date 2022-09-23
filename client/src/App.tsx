import "./App.css";

import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Books from "./components/pages/Books/Books";
import CreateBook from "./components/pages/CreateBook/CreateBook";
import CssBaseline from "@mui/material/CssBaseline";
import Detail from "./components/pages/Detail/Detail";
import Favorites from "./components/pages/Favorites/Favorites";
import Header from "./components/organisms/Header/Header";
import Home from "./components/pages/Home/Home";
import IsLogged from "./components/pages/IsLogged/IsLogged";
import LogIn from "./components/pages/LogIn/LogIn";
import Page404 from "./components/pages/Page404/Page404";
import Profile from "./components/pages/Profile/Profile";
import ProtectedRoutes from "./components/pages/ProtectedRoutes/ProtectedRoutes";
import SignUp from "./components/pages/SignUp/SignUp";
import { ThemeHook } from "./utils/customHooks";

function App() {
  const { theme } = ThemeHook();

  const defaultTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <>
        <Header />

        <Routes>
          <Route element={<IsLogged />}>
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/log_in" element={<LogIn />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/create_book" element={<CreateBook />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>

          <Route path="/" element={<Home />} />

          <Route path="/books" element={<Books />} />

          <Route path="/book/:bookId" element={<Detail />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
