import React, { useState } from "react";
import Users from "./Users";
import Books from "./Books";

import { UserOutlined, BookOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Layout,
  theme,
  Button,
  Menu,
  Modal,
  Form,
  Input,
  Upload,
  InputNumber,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
const { Header, Content, Sider } = Layout;
const { Search } = Input;

const Home = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [searchedData, setsearchedData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);
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
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSearch = (value) => setsearchedData(value);
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
        {selectedMenuItem == 1 ? (
          <>
            <Button
              type="primary"
              onClick={showModal}
              size="middle"
              shape="round"
              className="antButton"
            >
              Add Book
            </Button>
            <Modal
              title="Add Book"
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
          </>
        ) : (
          <></>
        )}
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
              onClick={(e) => setSelectedMenuItem(e.key)}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: "80vh",
              minWidth: 50,
            }}
          >
            <div>
              {selectedMenuItem == 1 ? (
                <Books
                  searchedData={searchedData}
                  update={update}
                  setUpdate={setUpdate}
                />
              ) : (
                <Users
                  searchedData={searchedData}
                  update={update}
                  setUpdate={setUpdate}
                />
              )}
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
export default Home;
