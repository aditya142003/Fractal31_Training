import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";

function NavBar(props) {
  const nav = useNavigate();

  const [searchedData, setsearchedData] = useState("");
  const [inputBookData, setinputBookData] = useState({
    Title: "The Palace of Illusions",
    Author: "Chitra Banerjee",
    ISBN: "9780307472496",
    Publication: "DoubleDay",
    Image:
      "https://th.bing.com/th/id/OIP.nv1w_K4BEVEUFJTwLkkwcQHaLe?w=137&h=213&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    AvailableCount: "10",
    MaxCopies: "10",
  });

  useEffect(() => {
    let temp = [];
    props.pageType === "book"
      ? fetch("books.json")
          .then((res) => {
            return res.json();
          })
          .then((element) => {
            element.books.map((e) => {
              let search = searchedData.replaceAll(" ", "").toLowerCase();
              let Title = e.Title.replaceAll(" ", "")
                .toLowerCase()
                .toLowerCase();
              let Author = e.Author.replaceAll(" ", "")
                .toLowerCase()
                .toLowerCase();
              let Publication = e.Publication.replaceAll(" ", "")
                .toLowerCase()
                .toLowerCase();
              let len = search?.length;
              if (
                e.ISBN.substring(0, len) === searchedData ||
                Title.substring(0, len) === search ||
                Author.substring(0, len) === search ||
                Publication.substring(0, len) === search ||
                searchedData === ""
              ) {
                temp.push(e);
              }
            });
            localStorage.setItem("books", JSON.stringify(temp));
            props.setUpdate(!props.update);
          })
          .catch((err) => {
            console.log(err);
          })
      : fetch(`https://reqres.in/api/users?page=${props.page}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            return data.data;
          })
          .then((element) => {
            element.map((e) => {
              let searchName = searchedData.replaceAll(" ", "").toLowerCase();
              let userName = e.first_name.concat(e.last_name).toLowerCase();
              let userNameReverse = e.last_name
                .concat(e.first_name)
                .toLowerCase();
              let len = searchName?.length;
              if (
                e.email.substring(0, len) === searchedData ||
                userName.substring(0, len) === searchName ||
                userNameReverse.substring(0, len) === searchName ||
                searchedData === ""
              ) {
                temp.push(e);
              }
            });

            localStorage.setItem("movies", JSON.stringify(temp));
            props.setUpdate(!props.update);
          })
          .catch((err) => console.log(err));
  }, [searchedData, props.page]);

  async function inputBook() {
    let flag = 0;
    let arr = JSON.parse(localStorage.getItem("books"));
    arr.forEach((ele) => {
      if (ele.ISBN === inputBookData.ISBN) {
        flag = 1;
      }
    });
    if (!flag) {
      arr.push(inputBookData);
      localStorage.clear();
      localStorage.setItem("books", JSON.stringify(arr));
      props.setUpdate(!props.update);
    } else {
      alert("Book exists");
    }
    document.getElementById("inputCont").style.height = "0vh";
  }

  function openForm() {
    document.getElementById("inputCont").style.height = "90vh";
  }
  function closeForm() {
    document.getElementById("inputCont").style.height = "0vh";
  }

  return (
    <div className="navBar">
      <div className="navbarFirst">
        <div className="logo">Digital Space</div>
        <input
          onChange={(e) => {
            setsearchedData(e.target.value);
          }}
          placeholder="search"
        ></input>
      </div>
      <div className="navbarSecond">
        {props.pageType === "book" ? (
          <>
            <button
              onClick={(e) => {
                openForm(e);
              }}
            >
              Register Book
            </button>
            <div
              className="inputCont"
              id="inputCont"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h3>
                Register Book{" "}
                <div onClick={closeForm} className="close">
                  X
                </div>
              </h3>
              <div className="inputContField">
                <h4>Title</h4>
                <input
                  value={inputBookData.Title}
                  onChange={(e) => {
                    setinputBookData({
                      ...inputBookData,
                      Title: e.target.value,
                    });
                  }}
                />
                <h4>Author</h4>
                <input
                  value={inputBookData.Author}
                  onChange={(e) => {
                    setinputBookData({
                      ...inputBookData,
                      Author: e.target.value,
                    });
                  }}
                />
                <h4>ISBN</h4>
                <input
                  value={inputBookData.ISBN}
                  onChange={(e) => {
                    setinputBookData({
                      ...inputBookData,
                      ISBN: e.target.value,
                    });
                  }}
                />
                <h4>Publication</h4>
                <input
                  value={inputBookData.Publication}
                  onChange={(e) => {
                    setinputBookData({
                      ...inputBookData,
                      Publication: e.target.value,
                    });
                  }}
                />
                <h4>Image</h4>
                <input
                  value={inputBookData.Image}
                  onChange={(e) => {
                    setinputBookData({
                      ...inputBookData,
                      Image: e.target.value,
                    });
                  }}
                />
                <h4>Available Count</h4>
                <input
                  value={inputBookData.AvailableCount}
                  onChange={(e) => {
                    setinputBookData({
                      ...inputBookData,
                      AvailableCount: e.target.value,
                    });
                  }}
                />
                <h4>Maximum Copies</h4>
                <input
                  value={inputBookData.MaxCopies}
                  onChange={(e) => {
                    setinputBookData({
                      ...inputBookData,
                      MaxCopies: e.target.value,
                    });
                  }}
                />
              </div>
              <button type="submit" onClick={inputBook}>
                Submit
              </button>
            </div>
            <button
              onClick={() => {
                nav("/UserPage");
              }}
            >
              Users
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                nav("/BookPage");
              }}
            >
              Books
            </button>
          </>
        )}

        <button
          onClick={() => {
            nav("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default NavBar;
