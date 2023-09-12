import React from "react";
import Users from "./Components/Users/Index";
import Books from "./Components/Books/Index";
import { Route, Routes} from "react-router-dom";
import Registration from "./Components/Registration/Index";

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/Books" element={<Books />} />
      <Route path="/Users" element={<Users />} />
    </Routes>
  );
};
export default Home;
