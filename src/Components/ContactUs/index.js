import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../Header";
import loginVector from "../../Images/india-heatmap.jpg";
import "./style.scss";
import { callApi } from "../../utils/api";
import { isEmpty } from "lodash";
import Loader from "../../common/Loader";
import Alert from "../../utils/Alert";
import { store } from "../../store";
import { addUserData, userLogin } from "../../store/actions";

function ContactUs() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const purposeRef = useRef(null);

  const handleLogin = async () => {
    if (isEmpty(email)) {
      Error("Email is Empty!");
      emailRef.current.focus();
      emailRef.current.classList.add("error-border");
      return;
    }
    setLoading(true);
    await callApi({
      method: "POST",
      endpoint: "login",
      data: {
        email: email,
      },
      alert: true,
    })
      .then((data) => {
        // console.log("DATA----", data);
        store.dispatch(addUserData(data));
        store.dispatch(userLogin({ token: data?.role==="admin"?"admin":data.user._id }));
        // localStorage.setItem('userId', data?.userId)
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        // if (err?.ui) {
        //   if (err.ui === "phone") {
        //     navigate(`/verify?n=${email}`);
        //   } else if (err.ui === "workspace") {
        //     navigate(`/workspace?n=${email}`);
        //   }
        // }
      });
  };

  return (
    <div className="App">
      {/* <Header /> */}
      <Loader loader={loading} loaderLabel={"Please Wait..."}></Loader>
      <div className="content-wrapper">
        <div className="content-left-section">
        <span style={{ position: "absolute", top: 10, fontSize: 20 }}>
            Track real-time air quality
            <img
              src={require("../../Images/logo.png")}
              height={100}
              width={100}
              style={{ borderRadius: 500, marginLeft: -10, marginTop: 20 }}
            ></img>
          </span>
          <h1 style={{ fontWeight: 600, fontSize: 30, marginTop: 120 }}>Welcome to Vayuview</h1>
          <h6 style={{ fontWeight: 400, fontSize: 20 }}>Registration Form</h6>
          <br />
          <br />
          <input
            className="login-input"
            placeholder="John Doe"
            value={email}
            ref={emailRef}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!isEmpty(e.target.value)) {
                emailRef.current.classList.remove("error-border");
              }
            }}
          ></input>
          <input
            className="login-input"
            placeholder="john.doe@company.xyz"
            value={email}
            ref={emailRef}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!isEmpty(e.target.value)) {
                emailRef.current.classList.remove("error-border");
              }
            }}
          ></input>
          <input
            className="login-input"
            placeholder="XXXXX-XXXXX"
            value={phone}
            ref={phoneRef}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!isEmpty(e.target.value)) {
                phoneRef.current.classList.remove("error-border");
              }
            }}
          ></input>
          <input
            className="login-input"
            placeholder="Purpose..."
            value={purpose}
            ref={purposeRef}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!isEmpty(e.target.value)) {
                purposeRef.current.classList.remove("error-border");
              }
            }}
          ></input>
          <div className="login-options">
          </div>
          <button
            onClick={() => {
              handleLogin();
            }}
          >
            Sign Up
          </button>
          <span>
            Already have an Account?{" "}
            <a
              onClick={() => {
                navigate('/')
              }}
            >
              Login
            </a>
          </span>
        </div>
        <div className="content-right-section">
          <img src={loginVector} style={{width: '100%'}}></img>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
