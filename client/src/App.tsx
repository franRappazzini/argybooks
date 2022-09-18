import "./App.css";

import { Route, Routes } from "react-router-dom";

import Books from "./components/pages/Books/Books";
import CreateBook from "./components/pages/CreateBook/CreateBook";
import Detail from "./components/pages/Detail/Detail";
import Header from "./components/organisms/Header/Header";
import Home from "./components/pages/Home/Home";
import IsLogged from "./components/pages/IsLogged/IsLogged";
import LogIn from "./components/pages/LogIn/LogIn";
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

        <Route path="/" element={<Home />} />

        <Route path="/books" element={<Books />} />

        <Route path="/book/:bookId" element={<Detail />} />

        <Route path="/create_book" element={<CreateBook />} />
      </Routes>
    </>
  );
}

export default App;
