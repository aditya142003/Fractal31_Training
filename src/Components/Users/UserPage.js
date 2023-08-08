import React, { useState, useEffect } from "react";
import "./UserPage.css";
import NavBar from "../Common/NavigationBar";

function MoviesPage() {
  
  const [movieData, setMovieData] = useState([]);
  const [update, setUpdate] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setMovieData(JSON.parse(localStorage.getItem("movies")));
  }, [update]);

  return (
    <div className="cont">
      <NavBar setUpdate={setUpdate} update={update} pageType="user" page={page} />
      <div className="pageChange">
        <button
          disabled={page === 1 ? true : false}
          type="button"
          onClick={() => {
            setPage(1);
          }}
        >
          Prev Page
        </button>
        <button
          disabled={page === 2 ? true : false}
          type="button"
          onClick={() => {
            setPage(2);
          }}
        >
          Next Page
        </button>
      </div>
      <div className="mainUserContainer">
        {movieData?.map((user) => {
          return (
            <div className="userContainer">
              <img src={user.avatar} alt="user profile image"></img>
              <div>
                <div>ID: {user.id}</div>
                <div>Email: {user.email}</div>
                <div>
                  Name: {user.first_name} {user.last_name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MoviesPage;
