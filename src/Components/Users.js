import "./Users.css";
import React, { useState, useEffect } from "react";
import { Layout, Space, Button, Card, Row } from "antd";
const { Content } = Layout;

function User(props) {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);

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
          let searchName = props.searchedData.replaceAll(" ", "").toLowerCase();
          let userName = e.first_name.concat(e.last_name).toLowerCase();
          let userNameReverse = e.last_name.concat(e.first_name).toLowerCase();
          let len = searchName?.length;
          if (
            e.email.substring(0, len) === props.searchedData ||
            userName.substring(0, len) === searchName ||
            userNameReverse.substring(0, len) === searchName ||
            props.searchedData === ""
          ) {
            temp.push(e);
          }
        });

        setUserData(temp);
      })
      .catch((err) => console.log(err));
  }, [props.searchedData, page]);

  return (
    <Space direction="vertical">
      <div style={{ margin: "auto", width: "20vw", display: "grid", gridTemplateColumns:"1fr 1fr" }}>
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
                style={{ paddingTop: "30px", margin: "auto", width: "20vw" }}
                cover={
                  <img alt="example" src={ele.avatar} className="userImage" />
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

    /* <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Content>
          <div className="cont">
            <div className="pageChange">
              
            </div>
            <div className="mainUserContainer">
              {userData?.map((user) => {
                return (
                  <Row>
                    <Col className="gutter-row userContainer">
                      <img src={user.avatar} alt="user profile image"></img>
                      
                    </Col>
                  </Row>
                );
              })}
            </div>
          </div>
        </Content>
      </Layout>
    </Space> */
  );
}

export default User;
