import "./App.css";

import { Route, Routes } from "react-router-dom";

import Books from "./components/pages/Books/Books";
import CreateBook from "./components/pages/CreateBook/CreateBook";
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

function App() {
  return (
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
  );
}

export default App;
