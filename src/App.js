import React, { useState } from "react";
import Users from "./Components/Users";
import Books from "./Components/Books";
import { Route, Routes, useNavigate } from "react-router-dom";
import Registration from "./Components/Registration";

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
  return (
    <Routes>
      <Route path="/" element={<Registration />}></Route>
      <Route
        path="/Books"
        element={
          <>
            <Layout>
              <Header
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ color: "white", fontSize: "25px" }}>
                  DIGISPACE
                </div>
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
                    <Books
                      searchedData={searchedData}
                      update={update}
                      setUpdate={setUpdate}
                    />
                  </Content>
                </Layout>
              </Content>
            </Layout>
          </>
        }
      ></Route>
      <Route
        path="/Users"
        element={
          <>
            <Layout>
              <Header
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ color: "white", fontSize: "25px" }}>
                  DIGISPACE
                </div>
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
                    <Users
                      searchedData={searchedData}
                      update={update}
                      setUpdate={setUpdate}
                    />
                  </Content>
                </Layout>
              </Content>
            </Layout>
          </>
        }
      ></Route>
    </Routes>
  );
};
export default Home;
