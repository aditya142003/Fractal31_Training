import React, { useState, useEffect } from "react";
import "./UserPage.css";
import NavBar from "../Common/NavigationBar";
import { Layout, Space, Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

function MoviesPage() {
  const nav = useNavigate();
  const [movieData, setMovieData] = useState([]);
  const [update, setUpdate] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setMovieData(JSON.parse(localStorage.getItem("movies")));
  }, [update]);

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <NavBar
          setUpdate={setUpdate}
          update={update}
          pageType="user"
          page={page}
        />
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
              nav("/BookPage");
            }}
            size="middle"
            shape="round"
            className="antButton"
            style={{ position: "absolute", top: "100px", left: "20px" }}
          >
            Books
          </Button>
        </div>
        <Content>
          <div className="cont">
            <div className="pageChange">
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
            <div className="mainUserContainer">
              {movieData?.map((user) => {
                return (
                  <Row>
                    <Col className="gutter-row userContainer">
                      <img src={user.avatar} alt="user profile image"></img>
                      <div>
                        <div>ID: {user.id}</div>
                        <div>Email: {user.email}</div>
                        <div>
                          Name: {user.first_name} {user.last_name}
                        </div>
                      </div>
                    </Col>
                  </Row>
                );
              })}
            </div>
          </div>
        </Content>
      </Layout>
    </Space>
  );
}

export default MoviesPage;
