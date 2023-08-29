import "./Books.css";
import React, { useState, useEffect } from "react";
import { Layout, Space, Button, Card, Row } from "antd";
const { Content } = Layout;
const { Meta } = Card;

function Books(props) {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    let temp = [];
    fetch("books.json")
      .then((res) => {
        return res.json();
      })
      .then((element) => {
        element.books.map((e) => {
          let search = props.searchedData.replaceAll(" ", "").toLowerCase();
          let Title = e.Title.replaceAll(" ", "").toLowerCase().toLowerCase();
          let Author = e.Author.replaceAll(" ", "").toLowerCase().toLowerCase();
          let Publication = e.Publication.replaceAll(" ", "")
            .toLowerCase()
            .toLowerCase();
          let len = search?.length;
          if (
            e.ISBN.substring(0, len) === props.searchedData ||
            Title.substring(0, len) === search ||
            Author.substring(0, len) === search ||
            Publication.substring(0, len) === search ||
            props.searchedData === ""
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

      .catch((err) => console.log(err));
  }, [props.searchedData]);

  useEffect(() => {
    setBooksData(JSON.parse(localStorage.getItem("books")));
  }, [props.update]);

  const removeBook = (ISBN) => {
    let arr = JSON.parse(localStorage.getItem("books"));
    localStorage.clear();
    let newarr = arr.filter((ele) => ele.ISBN !== ISBN);
    localStorage.setItem("books", JSON.stringify(newarr));
    setBooksData(JSON.parse(localStorage.getItem("books")));
  };

  const issueBook = (ISBN) => {
    let arr = JSON.parse(localStorage.getItem("books"));
    localStorage.clear();
    arr.forEach((ele) => {
      if (ele.ISBN === ISBN) {
        ele.AvailableCount--;
      }
    });
    localStorage.setItem("books", JSON.stringify(arr));
    setBooksData(JSON.parse(localStorage.getItem("books")));
  };

  const returnBook = (ISBN) => {
    let arr = JSON.parse(localStorage.getItem("books"));
    localStorage.clear();
    arr.forEach((ele) => {
      if (ele.ISBN === ISBN) {
        ele.AvailableCount++;
      }
    });
    localStorage.setItem("books", JSON.stringify(arr));
    setBooksData(JSON.parse(localStorage.getItem("books")));
  };

  return (
    <Space direction="vertical">
      <Content>
        <Row
          gutter={[20, 40]}
          style={{
            display: "grid",
            width: "70vw",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {booksData.map((ele) => {
            return (
              <Card
                style={{ paddingTop: "30px", margin: "auto" }}
                cover={
                  <img alt="example" src={ele.Image} className="booksImage" />
                }
                actions={[
                  <Button
                    type="primary"
                    size="small"
                    shape="round"
                    className="antButton"
                    onClick={() => {
                      issueBook(ele.ISBN);
                    }}
                    disabled={!ele.AvailableCount}
                  >
                    Issue
                  </Button>,
                  <Button
                    type="primary"
                    size="small"
                    shape="round"
                    className="antButton"
                    onClick={() => {
                      returnBook(ele.ISBN);
                    }}
                    disabled={ele.AvailableCount === ele.MaxCopies}
                    style={{ color: "white" }}
                  >
                    Return
                  </Button>,
                  <Button
                    type="primary"
                    danger
                    size="small"
                    shape="round"
                    className="antButton"
                    onClick={() => {
                      removeBook(ele.ISBN);
                    }}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <Meta title={ele.Title} />
                <div>Author: {ele.Author}</div>
                <div>ISBN: {ele.ISBN}</div>
                <div>Publisher: {ele.Publication}</div>
                <div>Available: {ele.AvailableCount}</div>
              </Card>
            );
          })}
        </Row>
      </Content>
    </Space>
  );
}

export default Books;
