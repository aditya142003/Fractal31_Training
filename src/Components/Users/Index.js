import "../assets/Users.css";
import React, { useState, useEffect } from "react";
import { Layout, Space, Button, Card, Row } from "antd";
import { Menu, Input, theme } from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const { Search } = Input;

function User() {
  const nav = useNavigate();
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchedData, setsearchedData] = useState("");
  const [update, setUpdate] = useState(false);


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

  useEffect(() => {
    let temp = [];
    fetch(`https://reqres.in/api/users?page=${page}`)
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
          let userNameReverse = e.last_name.concat(e.first_name).toLowerCase();
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

        setUserData(temp);
      })
      .catch((err) => console.log(err));
  }, [searchedData, page]);

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
              <div
                style={{
                  margin: "auto",
                  width: "20vw",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                <Button
                  type="primary"
                  size="small"
                  disabled={page === 1 ? true : false}
                  onClick={() => {
                    setPage(1);
                  }}
                >
                  Prev Page
                </Button>
                <Button
                  type="primary"
                  size="small"
                  disabled={page === 2 ? true : false}
                  onClick={() => {
                    setPage(2);
                  }}
                >
                  Next Page
                </Button>
              </div>
              <Content>
                <Row
                  gutter={[20, 40]}
                  style={{
                    display: "grid",
                    width: "70vw",
                    gridTemplateColumns: "1fr 1fr",
                  }}
                >
                  {userData?.map((ele) => {
                    return (
                      <Card
                        style={{
                          paddingTop: "30px",
                          margin: "auto",
                          width: "20vw",
                        }}
                        cover={
                          <img
                            alt="example"
                            src={ele.avatar}
                            className="userImage"
                          />
                        }
                      >
                        <div>ID: {ele.id}</div>
                        <div>Email: {ele.email}</div>
                        <div>
                          Name: {ele.first_name} {ele.last_name}
                        </div>
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

export default User;
