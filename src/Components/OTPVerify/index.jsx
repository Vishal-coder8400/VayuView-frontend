import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import loginVector from "../../Images/dash-image.jpg";
import "./style.scss";
import Alert from "../../utils/Alert";
import ToolTip from "../../utils/Tooltip";
import { callApi } from "../../utils/api";
import { create, first, isEmpty, last } from "lodash";
import Error from "../../utils/Error";
import { useLocation } from "react-router-dom";
import LoaderComponent from "../../common/Loader";
import "./firebaseConfig";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
function OTPVerify() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [registered, setRegistered] = useState(true);
  const [termsCheck, setTermsCheck] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setOTPSent] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const passedValue = params.get("n");
  if (isEmpty(passedValue)) {
    navigate("/");
  }

  const auth = getAuth();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const otpRef = useRef(null);
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
      Error("Enter a email address!");
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
      Error("Password must be more than 8 digits!");
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

    callApi({
      method: "POST",
      endpoint: "api/users",
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        confirm_password: passwordConfirm,
      },
      alert: true,
    })
      .then(() => {
        setRegistered(true);
      })
      .catch(() => {});
  };

  const generateOTP = () => {
    if (isEmpty(phone)) {
      Error("Phone is Empty!");
      phoneRef.current.focus();
      phoneRef.current.classList.add("error-border");
      return;
    }

    if (phone.length < 10) {
      Error("Phone must be more than 10 digits!");
      phoneRef.current.focus();
      phoneRef.current.classList.add("error-border");
      return;
    }
    sendOTP();
    // callApi({
    //   method: "POST",
    //   endpoint: "api/users/generate-otp",
    //   data: {
    //     phone: phone,
    //   },
    //   alert: true,
    // })
    //   .then(() => {
    //     setOTPSent(true);
    //   })
    //   .catch(() => {});
  };

  const verifyOTP = () => {
    if (isEmpty(otp)) {
      Error("OTP is Empty!");
      otpRef.current.focus();
      otpRef.current.classList.add("error-border");
      return;
    }

    if (otp.length < 4) {
      Error("OTP must be more than 4 digits!");
      otpRef.current.focus();
      otpRef.current.classList.add("error-border");
      return;
    }
    cR.confirm(otp).then(async(result) => {
      await callApi({
        method: "POST",
        endpoint: "api/users/verify-otp-with-firebase",
        data: {
          email: passedValue,
          phone: phone,
        },
        alert: true,
      })
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            navigate(`/workspace?n=${passedValue}`);
          }, 1000);
        })
        .catch(() => {
          setLoading(false);
        });
      // ...
    }).catch((error) => {
      Error("Cannot verify your OTP");
      // User couldn't sign in (bad verification code?)
      // ...
    });
   
  };
  React.useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      }
    );
  }, []);
  const [cR, setCR] = useState(null)

  const sendOTP = () => {
    const phoneNumber = "+91" + phone;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        ////alert("Sent to your mobile Number");
        setOTPSent(true);
        setCR(confirmationResult)
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        Error("Can't send to your mobile Number");
      });
  };
  return (
    <div className="App">
      <Header />

      <LoaderComponent
        loader={loading}
        loaderLabel={"Please Wait..."}
      ></LoaderComponent>
      <div className="content-wrapper">
        <div className="content-left-section">
          {registered ? (
            <>
              <h1>Verify Number Vayuguard AQI</h1>
              <span>
                Simplify Your Logistics Operations with Our App Efficiently
                manage shipments, track deliveries, and optimize routes.
              </span>
              <br />
              <br />
              <label className="input-label">Phone Number</label>
              <input
                className="login-input"
                placeholder="XXXXX - XXXXX"
                value={phone}
                ref={phoneRef}
                maxLength={10}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (!isEmpty(e.target.value) && phone.length >= 9) {
                    phoneRef.current.classList.remove("error-border");
                  }
                }}
              ></input>
              {!otpSent && 
              <div
              id="recaptcha-container"
              style={{ marginBottom: "20px" }}
              ></div>
            }
              {otpSent ? (
                <>
                  {" "}
                  <label className="input-label">OTP</label>
                  <input
                    className="login-input"
                    placeholder="XXXX"
                    value={otp}
                    ref={otpRef}
                    maxLength={6}
                    onChange={(e) => {
                      setOTP(e.target.value);
                      if (!isEmpty(e.target.value) && otp.length >= 3) {
                        otpRef.current.classList.remove("error-border");
                      }
                    }}
                  ></input>
                </>
              ) : (
                <></>
              )}

              <button
                onClick={() => {
                  if (otpSent) {
                    verifyOTP();
                  } else {
                    generateOTP();
                  }
                }}
              >
                {otpSent ? <>Verify</> : <>Generate OTP</>}
              </button>
            </>
          ) : (
            <>
              <h1>Sign Up to Vayuguard AQI</h1>
              <span>
                Simplify Your Logistics Operations with Our App Efficiently
                manage shipments, track deliveries, and optimize routes.
              </span>
              <br />
              <br />

              <div className="two-inputs">
                <div className="two-inputs-section">
                  <label className="input-label">First Name</label>
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
                  ></input>
                </div>
                <div className="two-inputs-section">
                  <label className="input-label">Last Name</label>
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
                  ></input>
                </div>
              </div>
              <label className="input-label">Email Address</label>
              <input
                className="login-input"
                placeholder="john.doe@company.xyz"
                value={email}
                ref={emailRef}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (
                    !isEmpty(e.target.value) &&
                    isValidEmail(e.target.value)
                  ) {
                    emailRef.current.classList.remove("error-border");
                  }
                }}
              ></input>
              <label className="input-label">Password</label>
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
              ></input>
              <label className="input-label">Confirm Password</label>
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
              ></input>
              <div className="login-options">
                <label>
                  <input
                    type="checkbox"
                    checked={termsCheck}
                    onClick={() => {
                      setTermsCheck(!termsCheck);
                    }}
                  />{" "}
                  accept the <a>Terms and Condition</a>
                </label>
              </div>
              {!termsCheck ? (
                <>
                  <button
                    disabled={!termsCheck}
                    style={{
                      opacity: 0.1,
                    }}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  <button
                    disabled={!termsCheck}
                    onClick={() => {
                      registerUser();
                    }}
                  >
                    Register
                  </button>
                </>
              )}

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
            </>
          )}
        </div>
        <div className="content-right-section">
          <img src={loginVector} height={600}></img>
        </div>
      </div>
    </div>
  );
}

export default OTPVerify;
