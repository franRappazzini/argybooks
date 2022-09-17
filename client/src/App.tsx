import "./App.css";

import { Route, Routes } from "react-router-dom";

import Books from "./components/pages/Books/Books";
import CreateBook from "./components/pages/CreateBook/CreateBook";
import Detail from "./components/pages/Detail/Detail";
import Header from "./components/organisms/Header/Header";
import Home from "./components/pages/Home/Home";
import SignUp from "./components/pages/SignUp/SignUp";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/books" element={<Books />} />

        <Route path="/book/:bookId" element={<Detail />} />

        {/* TODO poner en protegida (para logeados) */}
        <Route path="/sign_up" element={<SignUp />} />

        <Route path="/create_book" element={<CreateBook />} />
      </Routes>
    </>
  );
}

export default App;
