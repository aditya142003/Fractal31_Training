import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./Components/Registration/Registration";
import BookPage from "./Components/Books/BookPage";
import UserPage from "./Components/Users/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/BookPage" element={<BookPage />}></Route>
      <Route path="/UserPage" element={<UserPage />}></Route>
    </Routes>
  );
}

export default App;
