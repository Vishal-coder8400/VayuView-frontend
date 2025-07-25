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

function WorkspaceBuilder() {
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [gst, setGST] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [registered, setRegistered] = useState(false);

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setOTPSent] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const passedValue = params.get("n");
  if(isEmpty(passedValue)){
    navigate("/")
  }

  const companyRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);
  const gstRef = useRef(null);
  const postalCodeRef = useRef(null);
  const phoneRef = useRef(null);
  const otpRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const registerUser = () => {
    if (isEmpty(companyName)) {
      Error("Company Name is Empty!");
      companyRef.current.focus();
      companyRef.current.classList.add("error-border");
      return;
    }

    if (isEmpty(address)) {
      Error("Address is Empty!");
      addressRef.current.focus();
      addressRef.current.classList.add("error-border");
      return;
    }

    if (isEmpty(city)) {
      Error("City is Empty!");
      cityRef.current.focus();
      cityRef.current.classList.add("error-border");
      return;
    }

    if (isEmpty(state)) {
      Error("State is Empty!");
      stateRef.current.focus();
      stateRef.current.classList.add("error-border");
      return;
    }

    if (isEmpty(country)) {
      Error("Country is Empty!");
      countryRef.current.focus();
      countryRef.current.classList.add("error-border");
      return;
    }

    if (isEmpty(postalCode)) {
      Error("Postal Code is Empty!");
      postalCodeRef.current.focus();
      postalCodeRef.current.classList.add("error-border");
      return;
    }

    callApi({
      method: "POST",
      endpoint: "api/users/create-workspace",
      data: {
        company_name: companyName,
        gst: gst,
        address: address,
        city,
        state,
        country,
        postal_code: postalCode,
        userEmail: passedValue,
      },
      alert: true,
    })
      .then(() => {
        navigate('/home')
      })
      .catch(() => {});
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
              {otpSent ? (
                <>
                  {" "}
                  <label className="input-label">OTP</label>
                  <input
                    className="login-input"
                    placeholder="XXXX"
                    value={otp}
                    ref={otpRef}
                    maxLength={4}
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

              <button onClick={() => {}}>
                {otpSent ? <>Verify</> : <>Generate OTP</>}
              </button>
            </>
          ) : (
            <>
              <h1>Create your Workspace</h1>
              <span>
                Simplify Your Logistics Operations with Our App Efficiently
                manage shipments, track deliveries, and optimize routes.
              </span>
              <br />
              <br />

              <label className="input-label">Company Name <span className="asterisk-span">*</span></label>
              <input
                className="login-input"
                placeholder="ABC PVT. LTD."
                value={companyName}
                ref={companyRef}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (!isEmpty(e.target.value)) {
                    companyRef.current.classList.remove("error-border");
                  }
                }}
              ></input>
              <label className="input-label">Address <span className="asterisk-span">*</span></label>
              <input
                className="login-input"
                placeholder="Street 1"
                value={address}
                ref={addressRef}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (!isEmpty(e.target.value)) {
                    addressRef.current.classList.remove("error-border");
                  }
                }}
              ></input>
              <div className="two-inputs">
                <div className="two-inputs-section">
                  <label className="input-label">City <span className="asterisk-span">*</span></label>
                  <input
                    className="login-input-half"
                    placeholder="Delhi"
                    value={city}
                    ref={cityRef}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (!isEmpty(e.target.value)) {
                        cityRef.current.classList.remove("error-border");
                      }
                    }}
                  ></input>
                </div>
                <div className="two-inputs-section">
                  <label className="input-label">State <span className="asterisk-span">*</span></label>
                  <input
                    className="login-input-half"
                    placeholder="Delhi"
                    value={state}
                    ref={stateRef}
                    onChange={(e) => {
                      setState(e.target.value);
                      if (!isEmpty(e.target.value)) {
                        stateRef.current.classList.remove("error-border");
                      }
                    }}
                  ></input>
                </div>
              </div>
              <div className="two-inputs">
                <div className="two-inputs-section">
                  <label className="input-label">Country <span className="asterisk-span">*</span></label>
                  <input
                    className="login-input-half"
                    placeholder="India"
                    value={country}
                    ref={countryRef}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      if (!isEmpty(e.target.value)) {
                        countryRef.current.classList.remove("error-border");
                      }
                    }}
                  ></input>
                </div>
                <div className="two-inputs-section">
                  <label className="input-label">Postal Code <span className="asterisk-span">*</span></label>
                  <input
                    className="login-input-half"
                    placeholder="1100XX"
                    value={postalCode}
                    ref={postalCodeRef}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                      if (!isEmpty(e.target.value)) {
                        postalCodeRef.current.classList.remove("error-border");
                      }
                    }}
                  ></input>
                </div>
              </div>
              <label className="input-label">GST<span className="asterisk-span">*</span></label>
              <input
                className="login-input"
                placeholder="xxxxxxx"
                value={gst}
                ref={gstRef}
                onChange={(e) => {
                  setGST(e.target.value);
                }}
              ></input>
              <button
                onClick={() => {
                  registerUser();
                }}
              >
                Register
              </button>
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

export default WorkspaceBuilder;
