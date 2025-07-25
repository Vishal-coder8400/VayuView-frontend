import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { callApi } from "../../utils/api";
import { store } from "../../store";
import { addUserData, userLogin } from "../../store/actions";
import Loader from "../../common/Loader";
import loginVector from "../../Images/india-heatmap.jpg";
import "./style.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (isEmpty(email)) {
      emailRef.current.classList.add("error-border");
      return;
    }
    if (isEmpty(password)) {
      passwordRef.current.classList.add("error-border");
      return;
    }

    setLoading(true);
    try {
      const data = await callApi({
        method: "POST",
        endpoint: "api/login", // <-- updated here with /api prefix
        data: { email, password },
        alert: true,
      });

      console.log("Login API response:", data);

      if (data?.token && data?.user) {
        store.dispatch(addUserData(data.user));
        store.dispatch(userLogin({ token: data.token, role: data.role }));

        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 1000);
      } else {
        setLoading(false);
        console.error("Invalid login response:", data);
      }
    } catch (err) {
      setLoading(false);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="App">
      <Loader loader={loading} loaderLabel={"Please Wait..."} />
      <div className="content-wrapper">
        <div className="content-left-section">
          <h1>Welcome to Vayuview</h1>
          <h6>Login</h6>
          <input
            className="login-input"
            placeholder="Email"
            value={email}
            ref={emailRef}
            onChange={(e) => {
              setEmail(e.target.value);
              emailRef.current.classList.remove("error-border");
            }}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            ref={passwordRef}
            onChange={(e) => {
              setPassword(e.target.value);
              passwordRef.current.classList.remove("error-border");
            }}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="content-right-section">
          <img src={loginVector} style={{ width: "100%" }} alt="Heatmap" />
        </div>
      </div>
    </div>
  );
}

export default Login;
