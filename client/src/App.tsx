import "./App.css";

import { Route, Routes } from "react-router-dom";

import Books from "./components/pages/Books/Books";
import CreateBook from "./components/pages/CreateBook/CreateBook";
import Detail from "./components/pages/Detail/Detail";
import Home from "./components/pages/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/books" element={<Books />} />

        <Route path="/book/:bookId" element={<Detail />} />

        <Route path="/create_book" element={<CreateBook />} />
      </Routes>
    </>
  );
}

export default App;
