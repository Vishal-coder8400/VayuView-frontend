import React, { useEffect, useRef, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./style.scss";

// import 'react-pro-sidebar/dist/css/styles.css';

import Header from "../Header";
// import { HomeIcon } from "../../common/icons/homeIcon";
// import { ShipmentIcon } from "../../common/icons/ShipmentIcon";
// import { EstimationIcon } from "../../common/icons/EstimationIcon";
// import { WalletIcon } from "../../common/icons/WalletIcon";
// import { SettingIcon } from "../../common/icons/SettingIcon";
import { GetHelpIcon } from "../../common/icons/GetHelpIcon";
import Home from "./Home";
import { WarehouseIcon } from "../../common/icons/WarehouseIcon";
import Warehouses from "./Warehouses";
import Shipments from "./Shipments";
import Shipments_v2 from "./Shipments/shipments_v2";
import Estimation from "./Estimation";
import Wallet from "./Wallet";
import Modal from "../../common/Modal";
import { Button } from "../../common/core/Button";
import { Dropdown } from "../../common/core/Dropdown";
import { callApi } from "../../utils/api";
import Warehouses_v2 from "./Warehouses/warehouses_v2";
import Customers from "./Customers";
import VGDevices from "./VayuguardDevices";
import Templates from "./Templates";
import TrackingPage from "./Warehouses/Timeline";
import CustomInput from "../../common/core/CustomInput";
import { store } from "../../store";
import { PickupIcon } from "../../common/icons/PickupIcon";
import Pickup_v2 from "./Pickup/pickup_v2";
import { DeliveryLocationIcon } from "../../common/icons/DeliveryLocationIcon";
import { addUserData, callForPickup, userLogin } from "../../store/actions";
import { MISIcon } from "../../common/icons/MISIcon";
import Mis from "./MIS/mis_v2";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import AirIcon from "@mui/icons-material/AirOutlined";
import DatasetIcon from "@mui/icons-material/DatasetOutlined";
import DevicesIcon from "@mui/icons-material/DeviceHubOutlined";
import TemplateIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CustomerIcon from "@mui/icons-material/PeopleOutline";
import SubscriptionsIcon from "@mui/icons-material/SubscriptionsOutlined";
import HelpIcon from "@mui/icons-material/HelpOutline";
import DashboardMain from "./Dashboard/dash_main";
import AQI from "./AQI";
import LiveAQIComponent from "./LiveAQIComponent";
import APISubscription from "./ApiSubscription";
import AQI_LOG from "./AQI_LOG";

const menuItems = [
  {
    label: "Analytics",
    items: [
      { name: "Dashboard", icon: DashboardIcon, component: "dashboard" },
      {
        name: "History",
        icon: AirIcon,
        component: "live-aqi",
      },
      {
        name: "Air Quality Log",
        icon: DatasetIcon,
        component: "air-quality-index",
      },
    ],
  },
  {
    label: "Hardware",
    items: [
      { name: "Devices", icon: DevicesIcon, component: "vg-devices" },
      { name: "Templates", icon: TemplateIcon, component: "templates" },
    ],
  },
  {
    label: "Management",
    items: [
      { name: "Customers", icon: CustomerIcon, component: "customers" },
      {
        name: "API Subscriptions",
        icon: SubscriptionsIcon,
        component: "subscriptions",
      },
    ],
  },
];

const menuItemsCustomer = [
  {
    label: "Analytics",
    items: [
      {
        name: "History",
        icon: AirIcon,
        component: "live-aqi",
      },
      {
        name: "Air Quality Log",
        icon: DatasetIcon,
        component: "air-quality-index",
      },
    ],
  },
  {
    label: "Hardware",
    items: [
      { name: "Devices", icon: DevicesIcon, component: "vg-devices" },
      { name: "Templates", icon: TemplateIcon, component: "templates" },
    ],
  },
  {
    label: "Management",
    items: [
      { name: "Users", icon: CustomerIcon, component: "users" },
    ],
  },
];

const menuItemsCustomerExecutive = [
  {
    label: "Analytics",
    items: [
      {
        name: "History",
        icon: AirIcon,
        component: "live-aqi",
      },
      {
        name: "Air Quality Log",
        icon: DatasetIcon,
        component: "air-quality-index",
      },
    ],
  },
  {
    label: "Hardware",
    items: [
      { name: "Devices", icon: DevicesIcon, component: "vg-devices" },
      { name: "Templates", icon: TemplateIcon, component: "templates" },
    ],
  }
];

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState(store.getState().userData.role === "customer" && store.getState().userData?.user?.user_role === "useradmin"?"live-aqi":store.getState().userData.role === "customer" && store.getState().userData?.user?.user_role !== "useradmin"?"vg-devices":"dashboard");
  const [shippingData, setShippingData] = useState({});

  React.useEffect(() => {
    (async () => {
      //alert(JSON.stringify(store.getState().userData))
      await callApi({
        method: "POST",
        endpoint: "api/users/login",
        data: {
          email: store.getState().userData.user?.email,
          password: store.getState().userData.user?.password,
        },
      })
        .then((data) => {
          store.dispatch(addUserData(data));
          store.dispatch(userLogin({ token: data.user._id }));
          // localStorage.setItem('userId', data?.userId)
        })
        .catch((err) => {});
    })();
  }, []);
  // const menuItems = [
  //   {
  //     label: "Analytics",
  //     items: [
  //       { name: "Dashboard", icon: HomeIcon, component: "dashboard" },
  //       { name: "Air Quality Index", icon: AirQualityIcon, component: "air-quality-index" },
  //     ],
  //   },
  //   {
  //     label: "Hardware",
  //     items: [
  //       { name: "Vayuguard Devices", icon: WarehouseIcon, component: "vg-devices" },
  //       { name: "Templates", icon: TemplateIcon, component: "templates" },
  //     ],
  //   },
  //   {
  //     label: "Management",
  //     items: [
  //       { name: "Customers", icon: CustomerIcon, component: "customers" },
  //       { name: "Subscriptions", icon: SubscriptionIcon, component: "subscriptions" },
  //     ],
  //   },
  // ];

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return (
          <>
            {/* <Home /> */}
            {/* <VGDevices/> */}
            <DashboardMain />
          </>
        );
      case "vg-devices":
        return (
          <>
            <VGDevices />
          </>
        );
      case "live-aqi":
        return (
          <>
            <LiveAQIComponent />
          </>
        );
      case "air-quality-index":
        return (
          <>
          <AQI_LOG/>
          </>
        );
      case "customers":
        case "users":
        return (
          <>
            <Customers />
          </>
        );
      case "templates":
        return (
          <>
            <Templates />
          </>
        );
      case "subscriptions":
        return (
          <>
            <APISubscription />
          </>
        );
      case "shipments":
        return (
          <>
            <Shipments_v2
              setActiveComponent={setActiveComponent}
              setShippingData={setShippingData}
            />
          </>
        );
      case "mis":
        return (
          <>
            <Mis />
          </>
        );
      case "estimation":
        return (
          <>
            <Estimation />
          </>
        );
      case "myWallet":
        return (
          <>
            <Wallet />
          </>
        );
      case "timeline":
        return (
          <>
            <TrackingPage
              setActiveComponent={setActiveComponent}
              shippingData={shippingData}
            />
          </>
        );
      case "settings":
        return <>settings</>;
      default:
        return null;
    }
  };
  const modalRef = useRef();

  const handleOpenModal = () => {
    modalRef.current.openModal();
  };

  const handleCloseModal = () => {
    modalRef.current.closeModal();
  };
  const [warehouseOptionsId, setWarehouseOptionsId] = useState([]);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [warehouseSelected, setWarehouseSelected] =
    useState("Select Warehouse");
  const [no_of_boxes, setNoOfBoxes] = useState("");
  function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
  const [date, setDate] = useState(getCurrentDate());
  React.useEffect(() => {
    setDate(getCurrentDate());
  }, []);
  const [isVisible, setIsVisible] = useState(false);

  // Reference to the component to check for outside clicks
  const componentRef = useRef(null);

  // Toggle the visibility of the component
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Hide the component
  const hideComponent = () => setIsVisible(false);

  // Handle outside clicks
  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      hideComponent();
    }
  };

  // Add and remove event listener for outside clicks
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <>
      <Header login={true} />
      <div className="dashboard-component">
        {/* Sidebar */}
        <Sidebar style={{ width: "10vw", backgroundColor: "#F5F7F9" }}>
          <Menu iconShape="square">
            <div
              style={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "left",
                justifyItems: "center",
              }}
            >
              <img
                src={require("../../Images/logo.png")}
                height={50}
                width={50}
                style={{ borderRadius: 500 }}
              ></img>
              <h1>VG AQI Platform</h1>
            </div>
            {/* menuItemsCustomerExecutive */}
            {store.getState().userData.role === "customer" && store.getState().userData.user.user_role === "useradmin"?<>
              {menuItemsCustomer.map((section) => (
              <div key={section.label} style={{ backgroundColor: "#F5F7F9" }}>
                <label
                  style={{ marginLeft: 10, fontWeight: "500", fontSize: 12 }}
                >
                  {section.label}
                </label>
                {section.items.map((item) => (
                  <MenuItem
                    key={item.name}
                    onClick={() => setActiveComponent(item.component)}
                    prefix={
                      <item.icon
                        color={
                          activeComponent === item.component
                            ? "#03A9E7"
                            : "#474747"
                        }
                      />
                    }
                    className={
                      "menu-button " +
                      (activeComponent === item.component
                        ? "active-menu-button"
                        : "")
                    }
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </div>
            ))}</>:
            store.getState().userData.role === "customer" && store.getState().userData.user.user_role !== "useradmin"?<>
             {menuItemsCustomerExecutive.map((section) => (
              <div key={section.label} style={{ backgroundColor: "#F5F7F9" }}>
                <label
                  style={{ marginLeft: 10, fontWeight: "500", fontSize: 12 }}
                >
                  {section.label}
                </label>
                {section.items.map((item) => (
                  <MenuItem
                    key={item.name}
                    onClick={() => setActiveComponent(item.component)}
                    prefix={
                      <item.icon
                        color={
                          activeComponent === item.component
                            ? "#03A9E7"
                            : "#474747"
                        }
                      />
                    }
                    className={
                      "menu-button " +
                      (activeComponent === item.component
                        ? "active-menu-button"
                        : "")
                    }
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </div>
            ))}</>
            :
            <>
            {menuItems.map((section) => (
              <div key={section.label} style={{ backgroundColor: "#F5F7F9" }}>
                <label
                  style={{ marginLeft: 10, fontWeight: "500", fontSize: 12 }}
                >
                  {section.label}
                </label>
                {section.items.map((item) => (
                  <MenuItem
                    key={item.name}
                    onClick={() => setActiveComponent(item.component)}
                    prefix={
                      <item.icon
                        color={
                          activeComponent === item.component
                            ? "#03A9E7"
                            : "#474747"
                        }
                      />
                    }
                    className={
                      "menu-button " +
                      (activeComponent === item.component
                        ? "active-menu-button"
                        : "")
                    }
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </div>
            ))}
            </>}
            <div className="sidebar-footer">
              <MenuItem
                onClick={toggleVisibility}
                prefix={
                  <GetHelpIcon
                    color={
                      activeComponent === "gethelp" ? "#03A9E7" : "#474747"
                    }
                  />
                }
                className={
                  "menu-button " +
                  (activeComponent === "gethelp" ? "active-menu-button" : "")
                }
              >
                Get Help
              </MenuItem>
            </div>
          </Menu>
        </Sidebar>

        {/* Main content */}
        <div style={{ flex: 1 }}>
          {renderActiveComponent()}</div>
      </div>
    </>
  );
}

export default Dashboard;
