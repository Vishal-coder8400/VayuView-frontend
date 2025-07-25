import React, { useState,  useEffect, useRef } from "react";
import "./style.scss"; // Import the SCSS file for styling
import InputWithIcon from "../../common/core/Input";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { DownArrow } from "../../common/icons/DownArrow";
import { NotificationIcon } from "../../common/icons/NotificationIcon";
import { stateConnected } from "../../utils/redux_tools";
import { callApi } from "../../utils/api";
import { store } from "../../store";
import LiveDateTime from "./LiveDateandTime";

function DesiredDateTime(props) {
  // Create a new Date object for October 1, 2022, at 2:34:45 AM UTC
  const desiredDate = new Date();

  // Get the desired date and time components
  const year = desiredDate.getUTCFullYear();
  const month = desiredDate.getUTCMonth() + 1; // Adding 1 to the month since it's zero-based
  const day = desiredDate.getUTCDate();
  const hours = desiredDate.getUTCHours();
  const minutes = desiredDate.getUTCMinutes();
  const seconds = desiredDate.getUTCSeconds();

  return (
    <></>
    // // <div style={{fontSize: '14px'}}>
    //   {/* {year}-{month}-{day} {hours}:{minutes}:{seconds} <b>UTC</b> */}
    // // </div>
  );
}

const Profile = ({ userData, avatar, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={toggleDropdown}
      >
        {avatar}
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <div className="py-1 text-left px-4">
            {userData?.email}<br />
            <strong>{userData?.company_id?.company_name}</strong>
          </div>
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
function Header(props) {
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      await callApi({
        endpoint: "api/transaction",
      })
        .then((res) => {
          setTransactionData(res.data);
        })
        .catch((err) => {});
    })();
  }, []);
  return (
    <header
      className="header"
      style={{
        backgroundColor: transactionData?.[0]?.wallet_balance
          ? transactionData[0].wallet_balance <
            store.getState().userData?.user?.company_id?.minimium_balance
            ? "rgba(255,0,0, 0.8)"
            : "transparent"
          : "transparent",
      }}
    >
      <div></div>
      {/* <div><InputWithIcon placeholder={"Search Platform"} /></div> */}
      {props.login ? (
        <>
          <div
            className="nav-buttons"
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
         <LiveDateTime/>
            {/* <NotificationIcon /> */}

            {/* <div style={{ marginRight: "20px" }}></div> */}
            <Profile
              userData={props?.userData?.user}
              avatar={
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {/* {JSON.stringify(props.userData?.user)} */}
                  <Avatar
                    name={
                      props.userData?.user?.name
                    }
                    size="30"
                    round={true}
                  />{" "}
                  <span
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <DownArrow />
                  </span>
                </div>
              }
              onLogout={() => {
                localStorage.clear();
                window.location.reload();
              }}
            />
          </div>
        </>
      ) : (
        <div className="nav-buttons">
        
        </div>
      )}
    </header>
  );
}

export default stateConnected(Header);
