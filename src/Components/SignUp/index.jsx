import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { callApi } from "../../utils/api";
import Error from "../../utils/Error";
import LoaderComponent from "../../common/Loader";
import loginVector from "../../Images/dash-image.jpg";
import Header from "../Header";
import "./style.scss";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [termsCheck, setTermsCheck] = useState(false);
  const [loading, setLoading] = useState(false);  // fixed to boolean
  const navigate = useNavigate();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  function isValidEmail(email) {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  }

  const registerUser = () => {
    if (isEmpty(firstName)) {
      Error("First Name is Empty!");
      firstNameRef.current.focus();
      firstNameRef.current.classList.add("error-border");
      return;
    }

    if (isEmpty(lastName)) {
      Error("Last Name is Empty!");
      lastNameRef.current.focus();
      lastNameRef.current.classList.add("error-border");
      return;
    }

    if (isEmpty(email)) {
      Error("Email is Empty!");
      emailRef.current.focus();
      emailRef.current.classList.add("error-border");
      return;
    }

    if (!isValidEmail(email)) {
      Error("Enter a valid email address!");
      emailRef.current.focus();
      emailRef.current.classList.add("error-border");
      return;
    }

    if (isEmpty(password)) {
      Error("Password is Empty!");
      passwordRef.current.focus();
      passwordRef.current.classList.add("error-border");
      return;
    }

    if (password.length < 8) {
      Error("Password must be more than 8 characters!");
      passwordRef.current.focus();
      passwordRef.current.classList.add("error-border");
      return;
    }

    if (isEmpty(passwordConfirm)) {
      Error("Confirm Password is Empty!");
      passwordConfirmRef.current.focus();
      passwordConfirmRef.current.classList.add("error-border");
      return;
    }

    if (password !== passwordConfirm) {
      Error("Password must be equal to Confirm Password!");
      passwordConfirmRef.current.focus();
      passwordConfirmRef.current.classList.add("error-border");
      return;
    }

    setLoading(true); // start loading here

    callApi({
      method: "POST",
      endpoint: "api/users",
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirm_password: passwordConfirm,
      },
      alert: true,
    })
      .then(() => {
        setLoading(false); // stop loading
        navigate(`/verify?n=${email}`);
      })
      .catch(() => {
        setLoading(false); // stop loading on error too
      });
  };

  return (
    <div className="App">
      <Header />

      <LoaderComponent loader={loading} loaderLabel={"Please Wait..."} />

      <div className="content-wrapper">
        <div className="content-left-section">
          <h1>Sign Up to Vayuguard AQI</h1>
          <span>
            Simplify Your Logistics Operations with Our App Efficiently
            manage shipments, track deliveries, and optimize routes.
          </span>

          <div className="two-inputs">
            <div className="two-inputs-section">
              <label className="input-label">
                First Name <span className="asterisk-span">*</span>
              </label>
              <input
                className="login-input-half"
                placeholder="John"
                value={firstName}
                ref={firstNameRef}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (!isEmpty(e.target.value)) {
                    firstNameRef.current.classList.remove("error-border");
                  }
                }}
              />
            </div>

            <div className="two-inputs-section">
              <label className="input-label">
                Last Name <span className="asterisk-span">*</span>
              </label>
              <input
                className="login-input-half"
                placeholder="Doe"
                value={lastName}
                ref={lastNameRef}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (!isEmpty(e.target.value)) {
                    lastNameRef.current.classList.remove("error-border");
                  }
                }}
              />
            </div>
          </div>

          <label className="input-label">
            Email Address <span className="asterisk-span">*</span>
          </label>
          <input
            className="login-input"
            placeholder="john.doe@company.xyz"
            value={email}
            ref={emailRef}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!isEmpty(e.target.value) && isValidEmail(e.target.value)) {
                emailRef.current.classList.remove("error-border");
              }
            }}
          />

          <label className="input-label">
            Password <span className="asterisk-span">*</span>
          </label>
          <input
            className="login-input"
            placeholder="********"
            type="password"
            value={password}
            ref={passwordRef}
            onChange={(e) => {
              setPassword(e.target.value);
              if (!isEmpty(e.target.value) && password.length >= 7) {
                passwordRef.current.classList.remove("error-border");
              }
            }}
          />

          <label className="input-label">
            Confirm Password <span className="asterisk-span">*</span>
          </label>
          <input
            className="login-input"
            placeholder="********"
            type="password"
            value={passwordConfirm}
            ref={passwordConfirmRef}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              if (!isEmpty(e.target.value) && password === e.target.value) {
                passwordConfirmRef.current.classList.remove("error-border");
              }
            }}
          />

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={termsCheck}
                onChange={() => {
                  setTermsCheck(!termsCheck);
                }}
              />{" "}
              accept the <a>Terms and Condition</a>
            </label>
          </div>

          <button
            type="button"
            disabled={!termsCheck}
            onClick={registerUser}
            style={{ opacity: termsCheck ? 1 : 0.5 }}
          >
            Register
          </button>

          <span>
            Already a user?{" "}
            <a
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </a>
          </span>
        </div>

        <div className="content-right-section">
          <img src={loginVector} height={600} alt="Signup Visual" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
