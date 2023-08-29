import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
// import Registration from "./Components/Registration/Registration";
import Home from "./Components/Home";


function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Registration />}></Route> */}
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
