import "./BookPage.css";
import React, { useState, useEffect } from "react";
import NavBar from "../Common/NavigationBar";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Layout, Space, Button, Col, Row } from "antd";
import {
  Avatar,
  Card,
  Menu,
  Modal,
  Tooltip,
  Form,
  Input,
  Upload,
  InputNumber,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;

const { Meta } = Card;

function App() {
  const nav = useNavigate();
  const [booksData, setBooksData] = useState([]);
  const [update, setUpdate] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setBooksData(JSON.parse(localStorage.getItem("books")));
  }, [update]);

  const onChangeDate = (date, dateString) => {
    console.log(dateString);
    setinputBookData({
      ...inputBookData,
      PublishedOn: dateString,
    });
  };

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Layout>
        <NavBar pageType="book" setUpdate={setUpdate} update={update} />
        <div
          style={{
            position: "fixed",
            width: "200px",
            height: "100vh",
            backgroundColor: "black",
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              nav("/UserPage");
            }}
            size="middle"
            shape="round"
            className="antButton"
            style={{ position: "absolute", top: "100px", left: "20px" }}
          >
            Users
          </Button>

          <Button
            style={{ position: "absolute", top: "160px", left: "20px"}}
            type="primary"
            onClick={showModal}
            size="middle"
            shape="round"
            className="antButton"
          >
            Register Book
          </Button>
          <Modal
            title="REGISTER BOOK"
            open={isModalOpen}
            onOk={inputBook}
            onCancel={handleCancel}
            footer={[
              <Button key="back" type="primary" danger onClick={handleCancel}>
                Return
              </Button>,
              <Button key="submit" type="primary" onClick={inputBook}>
                Submit
              </Button>,
            ]}
          >
            <Form
              layout="horizontal"
              labelCol={{ flex: "110px" }}
              labelAlign="left"
              labelWrap
              wrapperCol={{ flex: 1 }}
              colon={false}
              style={{ maxWidth: 600 }}
            >
              <Form.Item label="Title">
                <Input
                  value={inputBookData.Title}
                  onChange={(e) => {
                    setinputBookData({
                      ...inputBookData,
                      Title: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label="Author">
                <Input
                  value={inputBookData.Author}
                  onChange={(e) => {
                    setinputBookData({
                      ...inputBookData,
                      Author: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label="ISBN">
                <Input
                  value={inputBookData.ISBN}
                  onChange={(e) => {
                    setinputBookData({
                      ...inputBookData,
                      ISBN: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label="Publication">
                <Input
                  value={inputBookData.Publication}
                  onChange={(e) => {
                    setinputBookData({
                      ...inputBookData,
                      Publication: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label="Published on">
                <DatePicker
                  onChange={onChangeDate}
                  defaultValue={dayjs(inputBookData.PublishedOn, "DD/MM/YYYY")}
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
              <Form.Item label="Available">
                <InputNumber
                  value={inputBookData.AvailableCount}
                  onChange={(e) => {
                    setinputBookData({
                      ...inputBookData,
                      AvailableCount: e.target.value,
                      MaxCopies: e.target.vaue,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Image"
                name={"profilePicture"}
                onChange={(e) => {
                  setinputBookData({
                    ...inputBookData,
                    Image: e.target,
                  });
                }}
                type="file"
              >
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Form>
          </Modal>

          <Button
            type="primary"
            danger
            onClick={() => {
              nav("/");
            }}
            size="middle"
            shape="round"
            style={{ position: "absolute", bottom: "20px", left: "20px" }}
          >
            Logout
          </Button>
        </div>
        <Content style={{ position: "relative", left: "350px" }}>
          <Row
            gutter={[0, 40]}
            style={{
              display: "grid",
              width: "80vw",
              gridTemplateColumns: "1fr 1fr",
              marginTop: "100px",
            }}
          >
            {booksData.map((ele) => {
              return (
                <Card
                  style={{ width: 450, paddingTop:"30px" }}
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
      </Layout>
    </Space>
  );
}

export default App;
