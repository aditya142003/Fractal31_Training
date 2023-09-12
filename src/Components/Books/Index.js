import "../assets/Books.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UploadOutlined, BookOutlined, UserOutlined } from "@ant-design/icons";
import {
  Layout,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  InputNumber,
  DatePicker,
  Space,
  Card,
  Row,
} from "antd";
import dayjs from "dayjs";
import { Menu , theme} from "antd";
const { Meta } = Card;
const { Header, Content, Sider } = Layout;
const { Search } = Input;

function Books() {
  const [booksData, setBooksData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchedData, setsearchedData] = useState("");
  const [update, setUpdate] = useState(false);

  const nav = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("Books", "1", <BookOutlined />),
    getItem("User", "2", <UserOutlined />),
  ];

  const onSearch = (value) => setsearchedData(value);

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
      setUpdate(!update);
      handleCancel();
    } else {
      alert("Book exists");
      handleCancel();
    }
  }

  useEffect(() => {
    let temp = [];
    fetch("books.json")
      .then((res) => {
        return res.json();
      })
      .then((element) => {
        element.books.map((e) => {
          let search = searchedData.replaceAll(" ", "").toLowerCase();
          let Title = e.Title.replaceAll(" ", "").toLowerCase().toLowerCase();
          let Author = e.Author.replaceAll(" ", "").toLowerCase().toLowerCase();
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
        setUpdate(!update);
      })
      .catch((err) => {
        console.log(err);
      })

      .catch((err) => console.log(err));
  }, [searchedData]);

  useEffect(() => {
    setBooksData(JSON.parse(localStorage.getItem("books")));
  }, [update]);

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
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ color: "white", fontSize: "25px" }}>DIGISPACE</div>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={250}
          >
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{
                height: "100%",
              }}
              items={items}
              onClick={(e) => {
                if (e.key === "1") {
                  nav("/Books");
                } else {
                  nav("/Users");
                }
              }}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: "80vh",
              minWidth: 50,
            }}
          >
            <Space direction="vertical">
              <Button
                type="primary"
                onClick={showModal}
                size="middle"
                shape="round"
                className="antButton"
                style={{ position: "relative", left: "57vw" }}
              >
                Add Book
              </Button>
              <Modal
                title="Add Book"
                open={isModalOpen}
                onOk={inputBook}
                onCancel={handleCancel}
                footer={[
                  <Button
                    key="back"
                    type="primary"
                    danger
                    onClick={handleCancel}
                  >
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
                      onChange={(dateString) => {
                        console.log(dateString);
                        setinputBookData({
                          ...inputBookData,
                          PublishedOn: dateString,
                        });
                      }}
                      defaultValue={dayjs(
                        inputBookData.PublishedOn,
                        "DD/MM/YYYY"
                      )}
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
                          <img
                            alt="example"
                            src={ele.Image}
                            className="booksImage"
                          />
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
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default Books;
