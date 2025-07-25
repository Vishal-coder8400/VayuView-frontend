import React, { useEffect, useState } from "react";
import { callApi } from "../../../utils/api";
import RightSidebar from "../../RightSidebar";
import ReusablePageComponent from "../../../common/core/ReusablePageComponentDelivery";
import CustomersSidebarContent from "../../Sidebars/warehouses/CustomersSidebarContent";
import CustomersSidebarContentEdit from "../../Sidebars/warehouses/CustomersSidebarContentEdit";
import { useNavigate } from "react-router-dom";
import { store } from "../../../store";
import ShareModal from "./Share";
import GroupIcon from "@mui/icons-material/Group";
import ToolTip from "../../../utils/Tooltip";
import ShimmerLoader from "../../Shimmer";
import { isEmpty } from "lodash";
import { getCompanyId, getUserId, getUserRole } from "../../../utils/roles";

const Customers = (props) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formFields, setFormFields] = useState({
    dashboardId: {
      title: "Dashboard ID",
      value: "",
      placeholder: "Enter Dashboard ID",
      type: "text", // String type in schema
    },
    title: {
      title: "Title",
      value: "",
      placeholder: "Enter Dashboard Title",
      type: "text", // String type in schema
    },
    description: {
      title: "Description",
      value: "",
      placeholder: "Enter Dashboard Description",
      type: "text", // String type in schema, optional
    },
    deviceId: {
      title: "Device ID",
      value: null,
      placeholder: "Select Device ID",
      type: "select", // ObjectId reference to AirQualityDevice
      options: [], // This will be dynamically populated
    },
    createdBy: {
      title: "Created By",
      // value: null,
      placeholder: "",
      disabled: true,
      value: getUserRole() !== "admin" ? getUserId() : "admin",
      type: "hidden", // ObjectId reference to AirQualityDevice
      // type: "text"
    },
    // template: {
    //   title: "Template",
    //   value: {},
    //   placeholder: "Enter Template Data",
    //   type: "object", // Object type in schema
    // },
    company: {
      title: "Company Name",
      value: getUserRole() !== "admin" ? getCompanyId() : "admin",
      disabled: true,
      placeholder: "Enter Company Name",
      type: "text",
    },
  });

  const [parentRef, setParentRef] = useState({}); // ref for the data grid MUI
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarOpenEdit, setSidebarOpenEdit] = useState(false);
  const [dataGiven, setDataGiven] = useState([]);

  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  const toggleChange = (dataProvided) => {
    if (dataProvided) {
      setDataGiven(dataProvided);
    }
    setSidebarOpen((prev) => !prev);
  };

  const [toggleId, setToggleID] = useState("");
  const toggleID = (id) => {
    setToggleID(id);
  };

  const toggleChangeEdit = (dataProvided) => {
    if (dataProvided) {
      setDataGiven(dataProvided);
    }
    setSidebarOpenEdit((prev) => !prev);
  };

  const onSetSidebarOpenEdit = (open) => {
    setSidebarOpenEdit(open);
  };

  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  // Callback function to receive the child ref
  const handleChildRefChange = (childRef) => {
    setParentRef(childRef);
  };

  const addRowData = (singleRow) => {
    setRows((prevRows) => [...prevRows, { ...singleRow, id: singleRow?._id }]);
  };

  const convertIndicesToDayNames = (dayIndices) => {
    const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayIndices.map((dayIndex) => allDays[dayIndex]);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState({ name: "" });
  const [id, setId] = useState("");
  useEffect(() => {
    const getSensorData = async () => {
      try {
        const endpoint =getUserRole() === "useradmin"
            ? "api/AirQualityDevice?customerId=" + getCompanyId()
            : getUserRole() === "executive"
          ? "api/AirQualityDevice?assignedUserId=" + getUserId()
            : "api/AirQualityDevice";

        const res = await callApi({ endpoint });
        const sensorOptions = res?.data?.map((device) => ({
          label: device.name, // Assuming 'name' is the field for the device name
          value: device._id, // Assuming '_id' is the field for device ID
        }));

        // Update the formFields state with the fetched sensor options
        setFormFields((prevFields) => ({
          ...prevFields,
          deviceId: {
            ...prevFields.deviceId,
            options: sensorOptions, // Populate options with API response
          },
        }));
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    getSensorData();

    const getDataCustomer = () => {
      (async () => {
        let endpoint_ =
        getUserRole() === "useradmin"
            ? "api/Customer?company=" + getCompanyId():
            getUserRole() === "executive" 
            ? "api/Customer?company=" + getCompanyId()
            : "api/Customer";

        await callApi({
          endpoint: endpoint_,
        })
          .then((res) => {
            setUsers(res?.data);
          })
          .catch((err) => {});
      })();
    };
    getDataCustomer();
  }, []);

  const getData = () => {
    (async () => {
      const endpoint =
       getUserRole() === "useradmin"
          ? "api/Dashboard?or[company]=" +
            getCompanyId() +
            "&or[sharedWith]=" +
            getUserId()
          : getUserRole() === "executive"
          ? "api/Dashboard?or[createdBy]=" + 
          getUserId()
          : "api/Dashboard";
      // alert(endpoint)
      await callApi({
        endpoint,
      })
        .then((res) => {
          const col = res?.columns;
          const rows = res?.data;

          const columnData = Object.keys(col).map((key) => {
            return {
              field: key,
              headerName: col[key],
              flex: 1,
              minWidth: 220,
              renderCell: (params) => {
                switch (key) {
                  case "warehouse_name":
                  case "warehouse_contact_person":
                    return (
                      <div className="flex items-center">
                        <span className="font-black">{params.row?.[key]}</span>
                      </div>
                    );
                  case "createdBy":
                    return (
                      <div className="flex items-center">
                        <span className="font-black">
                          {isEmpty(params.row?.createdBy)
                            ? "admin"
                            : params.row?.createdBy?.name}
                        </span>
                      </div>
                    );
                  case "dashboardId":
                    return (
                      <div className="flex items-center">
                        {params.row?.[key]} &nbsp;
                        {params.row?.sharedWith?.length > 0 ? (
                          <>
                            <ToolTip
                              content={
                                "Shared With " +
                                params.row?.sharedWith
                                  .map((user) => user.name)
                                  .join(", ")
                              }
                            >
                              <GroupIcon />
                            </ToolTip>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  case "deviceId":
                    return (
                      <div
                        className="flex items-center"
                        style={{
                          color: !params.row?.["deviceId"] ? "red" : "",
                        }}
                      >
                        {params.row?.["deviceId"]
                          ? params.row?.["deviceId"]?.name
                          : "N/A"}
                      </div>
                    );
                  case "working_days":
                    return (
                      <>
                        {convertIndicesToDayNames(
                          params.row?.[key].sort()
                        ).join(", ")}
                      </>
                    );
                  case "template":
                    return (
                      <>
                        <div className="flex items-center">
                          <span
                            className="font-black"
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              width: 180,
                              display: "flex",
                              flexDirection: "row",
                              color: "white",
                              backgroundColor: "#03A9E7",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              navigate(`/creator/_id=${params.row?.id}`);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={"20"}
                              height={"20"}
                              fill="currentColor"
                            >
                              <path d="M5 5V19H19V7.82843L16.1716 5H5ZM4 3H17L20.7071 6.70711C20.8946 6.89464 21 7.149 21 7.41421V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM12 18C10.3431 18 9 16.6569 9 15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15C15 16.6569 13.6569 18 12 18ZM6 6H15V10H6V6Z"></path>
                            </svg>
                            Setup
                          </span>
                        </div>
                      </>
                    );
                  case "share":
                    return (
                      <>
                        <div
                          className="flex items-center"
                          style={{
                            marginTop: 10,
                            cursor: "pointer",
                            width: "40px",
                          }}
                          onClick={() => {
                            console.log(params.row, "PARAMS");
                            setFile({
                              name: params.row?.dashboardId,
                            });
                            setId(params.row?.id);
                            console.log(params.row, "ROW....PARAMS");
                            setUserShared(
                              params.row?.sharedWith?.length > 0
                                ? params.row?.sharedWith
                                : []
                            );
                            setIsModalOpen(true);
                          }}
                        >
                          <img
                            src={require("./share.png")}
                            style={{ height: "30px", width: "30px" }}
                          />
                        </div>
                      </>
                    );
                  default:
                    return params.row?.[key];
                }
              },
            };
          });

          setColumns(columnData);
          const rowsData = rows?.map((user) => {
            let singleObject = {};
            Object.keys(col).forEach((singleRow) => {
              singleObject = { ...singleObject, [singleRow]: user[singleRow] };
            });
            return {
              id: user._id,
              sharedWith: user.sharedWith,
              ...singleObject,
            };
          });
          console.log("PARAMS", rowsData, rows);
          setRows(rowsData);
          setLoading(false);
        })
        .catch((err) => {});
    })();
  };

  const [userShared, setUserShared] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    (async () => {
      let endpoint_ =
        getUserRole() !== "useradmin"
          ? "api/Customer?company=" + getCompanyId()
          : "api/Customer";

      await callApi({
        method: "PUT",
        endpoint: "api/Dashboard/" + id,
        data: { sharedWith: userShared },
      })
        .then(async (res) => {
          await getData();
        })
        .catch((err) => {});
    })();
  }, [userShared]);

  return (
    <div>
      <ShareModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        file={file}
        users={users}
        sharedWith={userShared}
        setSharedWith={setUserShared}
      />
      <RightSidebar
        sidebarOpen={sidebarOpen}
        onSetSidebarOpen={onSetSidebarOpen}
        sidebarContent={
          <CustomersSidebarContent
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleChange}
            formFields={formFields}
            apiEndpoint={"api/Dashboard"}
            selectedWarehouse={selectedWarehouse}
            getData={getData}
          />
        }
      />
      <RightSidebar
        sidebarOpen={sidebarOpenEdit}
        onSetSidebarOpen={onSetSidebarOpenEdit}
        sidebarContent={
          <CustomersSidebarContent
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleChangeEdit}
            formFields={formFields}
            apiEndpoint={"api/Dashboard/" + selectedWarehouse?.id}
            selectedWarehouse={selectedWarehouse}
            addRowData={selectedWarehouse} // edit data
            getData={getData}
            apiMethod={"PUT"}
          />
          // <CustomersSidebarContentEdit
          //   toggleSidebar={toggleChangeEdit}
          //   addRowData={addRowData}
          //   formFields={formFields}
          //   selectedWarehouse={selectedWarehouse}
          //   setSelectedWarehouse={setSelectedWarehouse}
          //   dataGiven={dataGiven}
          //   toggleId={toggleId}
          //   apiMethod={'PATCH'}
          //   getData={getData}
          // />
        }
      />

      {loading ? (
        <>
          <ShimmerLoader />
        </>
      ) : (
        <ReusablePageComponent
          heading={"Templates"}
          subHeading={"Manage the Templates"}
          deleteApi={"Dashboard"}
          column={columns}
          rows={rows}
          getData={getData}
          loading={loading}
          setLoading={setLoading}
          toggleID={toggleID}
          toggleSidebar={toggleChange}
          setSelectedWarehouse={setSelectedWarehouse}
          toggleSidebarEdit={toggleChangeEdit}
          onRefChange={handleChildRefChange} //lift reference from child to parent
        />
      )}
    </div>
  );
};

export default Customers;
