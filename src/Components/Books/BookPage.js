import "./BookPage.css";
import React, { useState, useEffect } from "react";
import NavBar from "../Common/NavigationBar";
import { Layout, Space, Button, Col, Row } from "antd";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [booksData, setBooksData] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    setBooksData(JSON.parse(localStorage.getItem("books")));
  }, [update]);

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
      setBooksData(JSON.parse(localStorage.getItem("books")));
    } else {
      alert("Book exists");
    }
  }

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
    // <div>
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header>
          <NavBar setUpdate={setUpdate} update={update} pageType="book" />
        </Header>
        <Content>
          <div className="container">
            {booksData.map((ele) => {
              return (
                <Row>
                  <Col className="gutter-row bookCont" key={ele.Title}>
                      <div>
                        <img className="image" src={ele.Image}></img>
                      </div>
                      <div>
                        <h3>{ele.Title}</h3>
                        <div>Author: {ele.Author}</div>
                        <div>ISBN: {ele.ISBN}</div>
                        <div>Publisher: {ele.Publication}</div>
                        <div>Available: {ele.AvailableCount}</div>
                        <div className="btnCont">
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
                          </Button>
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
                          </Button>
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
                          </Button>
                        </div>
                      </div>
                  </Col>
                </Row>
              );
            })}
          </div>
        </Content>
      </Layout>
    </Space>
    // </div>
  );
}

export default App;
