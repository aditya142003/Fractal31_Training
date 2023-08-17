import React from "react";
import "./Registration.css";
import { ReactComponent as Wave1 } from "./Images/Wave1.svg";
import { ReactComponent as Wave2 } from "./Images/Wave2.svg";
import { ReactComponent as Wave3 } from "./Images/Wave3.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function Registration() {
  const nav = useNavigate();

  const swipeToLogin = () => {
    let loginCont = document.getElementById("loginCont");
    loginCont.style.zIndex = "3";
    setTimeout(() => {
      loginCont.style.visibility = "visible";
    }, 550);
    let registerCont = document.getElementById("registerCont");
    let sideCont = document.getElementById("sideCont");
    registerCont.style.right = "30vw";
    loginCont.style.right = "90vw";
    sideCont.style.right = "-70vw";
    sideCont.style.transform = "scaleX(-1)";
  };
  const swipeToReg = () => {
    let loginCont = document.getElementById("loginCont");
    loginCont.style.visibility = "hidden";
    setTimeout(() => {
      let registerCont = document.getElementById("registerCont");
      let sideCont = document.getElementById("sideCont");
      registerCont.style.right = "-10vw";
      loginCont.style.right = "70vw";
      loginCont.style.zIndex = "1";
      sideCont.style.right = "0vw";
      sideCont.style.transform = "scaleX(1)";
    }, 100);
  };

  function incHeight(e) {
    e.stopPropagation();
    const idOfInput = e.nativeEvent.srcElement.classList.value;
    const classOfDiv = document.getElementsByClassName(idOfInput);
    if (idOfInput !== "input") {
      document.getElementById(idOfInput).style.height = "35px";
      document.getElementById(idOfInput).focus();
    }
    for (let i = 0; i < classOfDiv.length; i++) {
      classOfDiv[i].style.fontSize = "15px";
    }

    const allInput = document.getElementsByTagName("input");
    let arr = [];
    for (let i = 0; i < allInput.length; i++) {
      if (
        allInput[i].value === "" &&
        allInput[i].id !== idOfInput &&
        allInput[i].id !== e.nativeEvent.srcElement.id
      ) {
        allInput[i].style.height = "1px";
        arr.push(allInput[i]);
      }
    }
    const allDiv = document.getElementsByTagName("div");
    for (let i = 0; i < allDiv.length; i++) {
      arr.forEach((e) => {
        if (e.id === allDiv[i].className) allDiv[i].style.fontSize = "25px";
      });
    }
  }
  function decHeight() {
    const allInput = document.getElementsByTagName("input");
    let arr = [];
    for (let i = 0; i < allInput.length; i++) {
      if (allInput[i].value === "") {
        allInput[i].style.height = "1px";
        arr.push(allInput[i]);
      }
    }

    // 34567890
    const allDiv = document.getElementsByTagName("div");
    for (let i = 0; i < allDiv.length; i++) {
      arr.forEach((e) => {
        if (e.id === allDiv[i].className) allDiv[i].style.fontSize = "25px";
      });
    }
  }

  return (
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      onClick={decHeight}
    >
      <div className="mainRegCont" id="mainRegCont">
        <div className="sideCont" id="sideCont">
          <Wave1 className="Wave1" id="Wave1" />
          <Wave2 className="Wave2" id="Wave2" />
          <Wave3 className="Wave3" id="Wave3" />
        </div>
        <div className="registerCont" id="registerCont">
          <h1 className="heading">REGISTER</h1>
          <div className="inputContainer">
            <div className="nameSection">
              <div className="inputPair">
                <div onClick={(event) => incHeight(event)} className="FNinput">
                  First Name
                </div>
                <input
                  className="input"
                  id="FNinput"
                  onClick={incHeight}
                  type="text"
                  autoComplete="off"
                ></input>
              </div>
              <div className="inputPair">
                <div onClick={(event) => incHeight(event)} className="LNinput">
                  Last Name
                </div>
                <input
                  className="input"
                  id="LNinput"
                  onClick={incHeight}
                  type="text"
                ></input>
              </div>
            </div>
            <div className="addressSection">
              <div className="inputPair">
                <div onClick={(event) => incHeight(event)} className="Ainput">
                  Address
                </div>
                <input
                  type="text"
                  className="input"
                  id="Ainput"
                  onClick={incHeight}
                ></input>
              </div>
            </div>
            <div className="citySection">
              <div className="inputPair">
                <div onClick={(event) => incHeight(event)} className="Cinput">
                  City
                </div>
                <input
                  className="input"
                  id="Cinput"
                  onClick={incHeight}
                  type="text"
                ></input>
              </div>
              <div className="inputPair">
                <div onClick={(event) => incHeight(event)} className="Sinput">
                  State
                </div>
                <input
                  className="input"
                  id="Sinput"
                  onClick={incHeight}
                  type="text"
                ></input>
              </div>
              <div className="inputPair">
                <div onClick={(event) => incHeight(event)} className="COinput">
                  Country
                </div>
                <input
                  className="input"
                  id="COinput"
                  onClick={incHeight}
                  type="text"
                ></input>
              </div>
            </div>
            <div className="numberSection">
              <div className="inputPair">
                <div onClick={(event) => incHeight(event)} className="Pinput">
                  Pincode
                </div>
                <input
                  className="input"
                  id="Pinput"
                  onClick={incHeight}
                  type="number"
                  maxLength={6}
                ></input>
              </div>
              <div className="inputPair">
                <div onClick={(event) => incHeight(event)} className="Minput">
                  Mobile Number
                </div>
                <input
                  className="input"
                  id="Minput"
                  onClick={incHeight}
                  type="number"
                  maxLength=" 10"
                ></input>
              </div>
            </div>
            <div className="authSection">
              <div className="inputPair">
                <div onClick={(event) => incHeight(event)} className="Einput">
                  Email
                </div>
                <input
                  className="input"
                  id="Einput"
                  onClick={incHeight}
                  type="email"
                  autoComplete="off"
                ></input>
              </div>
              <div className="inputPair">
                <div onClick={(event) => incHeight(event)} className="PAinput">
                  Password
                </div>
                <input
                  className="input"
                  id="PAinput"
                  onClick={incHeight}
                  type="password"
                  autoSave="false"
                  autoComplete="off"
                ></input>
              </div>
            </div>
            <Button
              type="primary"
              shape="round"
              className="submitbtn"
              onClick={() => {
                nav("/BookPage");
              }}
            >
              SUBMIT
            </Button>
            <h2 className="footer">
              Already have an account
              <Button
                type="default"
                shape="round"
                size="small"
                onClick={swipeToLogin}
              >
                LOGIN
              </Button>
            </h2>
          </div>
        </div>
        <div className="loginCont" id="loginCont">
          <h1 className="heading">LOGIN</h1>
          <div className="inputContainerLogin" style={{ width: "40vw" }}>
            <div className="authSectionLogin">
              <div className="inputPairLogin">
                <div onClick={(event) => incHeight(event)} className="LEinput">
                  Email
                </div>
                <input
                  className="input"
                  id="LEinput"
                  onClick={incHeight}
                  type="email"
                ></input>
              </div>
              <div className="inputPairLogin">
                <div onClick={(event) => incHeight(event)} className="LPAinput">
                  Password
                </div>
                <input
                  className="input"
                  id="LPAinput"
                  onClick={incHeight}
                  type="password"
                  autoSave="false"
                ></input>
              </div>
            </div>
            <Button
              type="primary"
              shape="round"
              size="large"
              className="submitbtn"
              onClick={() => {
                nav("/BookPage");
              }}
            >
              LOGIN
            </Button>
            <h2 className="footerLogin">
              Don't have an account
              <Button
                type="default"
                shape="round"
                size="small"
                onClick={swipeToReg}
              >
                Register
              </Button>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
