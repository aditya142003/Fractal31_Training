import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import { Button, Tooltip } from "antd";

function NavBar(props) {
  const nav = useNavigate();

  const [searchedData, setsearchedData] = useState("");

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

  return (
    <div className="navBar">
      <div className="logo">Digital Space</div>
      <Tooltip
        title={
          props.pageType === "book"
            ? "Book-Name, Author, ISBN"
            : "Name, Email-ID"
        }
      >
        <input
          onChange={(e) => {
            setsearchedData(e.target.value);
          }}
          placeholder="search"
          style={{ width: "15vw" }}
        ></input>
      </Tooltip>
    </div>
  );
}

export default NavBar;
