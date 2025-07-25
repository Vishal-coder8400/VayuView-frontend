import React, { useEffect, useState } from "react";
import { callApi } from "../../../utils/api";
import RightSidebar from "../../RightSidebar";
import ReusablePageComponent from "../../../common/core/ReusablePageComponentDelivery";
import CustomersSidebarContent from "../../Sidebars/warehouses/CustomersSidebarContent";
import CustomersSidebarContentEdit from "../../Sidebars/warehouses/CustomersSidebarContentEdit";
import { useNavigate } from "react-router-dom";
import ApiKeyDisplay from "./ApiKey";
import ShimmerLoader from "../../Shimmer/index";

const APISubscription = (props) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formFields, setFormFields] = useState({
    subscriptionId: {
      title: "Subscription ID",
      value: "",
      placeholder: "Enter Subscription ID",
      type: "text", // String type in schema
    },
    subscriberName: {
      title: "Subscriber Name",
      value: "",
      placeholder: "Enter Subscriber Name",
      type: "text", // String type in schema
    },
    subscriberEmail: {
      title: "Subscriber Email",
      value: "",
      placeholder: "Enter Subscriber Email",
      type: "text", // Email type based on schema
    },
    deviceId: {
      title: "Device ID",
      value: null,
      placeholder: "Select Device ID",
      type: "select", // Reference type in schema
      options: [], // Populate with device options from API or database
    },
    active: {
      title: "Active",
      value: true,
      placeholder: "",
      type: "boolean", // Boolean type in schema
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

  const getCustomerData = () => {
    (async () => {
      await callApi({
        endpoint: "api/AirQualityDevice",
      })
        .then((res) => {
          const customerOptions = res?.data?.map((customer) => ({
            label: customer.name, // Assuming 'name' is the field for customer name
            value: customer._id, // Assuming '_id' is the field for customer ID
          }));
          console.log(customerOptions, "customerOptions");

          setTimeout(() => {
            // setFormFields({})
            // Update the formFields state with the fetched customer options
            setFormFields((prevFields) => ({
              ...prevFields,
              deviceId: {
                ...prevFields.deviceId,
                options: customerOptions, // Populate options with API response
              },
            }));
          }, 10);
        })
        .catch((err) => {
          console.log(err, "ERRORROORROR");
        });
    })();
  };
  function getDaysDifference(date) {
    const currentDate = new Date();
    const targetDate = new Date(date);
    // Calculate the difference in milliseconds
    const differenceInTime = targetDate - currentDate;

    // Convert the time difference from milliseconds to days
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );

    // Return 0 if the difference is negative
    return differenceInDays < 0 ? 0 : differenceInDays;
  }

  const getData = () => {
    (async () => {
      await callApi({
        endpoint: "api/Subscription",
      })
        .then((res) => {
          const col = res?.columns;
          const rows = res?.data;

          const columnData = Object.keys(col).map((key) => {
            return {
              field: key,
              headerName: col[key],
              flex: 1,
              minWidth: key === "subsciptionExpiryDate" ? 280 : 40,
              renderCell: (params) => {
                switch (key) {
                  case "warehouse_name":
                  case "subscriptionId":
                    return (
                      <div className="flex items-center">
                        <span className="font-black">{params.row?.[key]}</span>
                      </div>
                    );
                  case "rto":
                    return (
                      <div className="flex items-center">
                        {params.row?.[key] === true ? "Yes" : "No"}
                      </div>
                    );
                  case "customerId":
                    return (
                      <div
                        className="flex items-center"
                        style={{
                          color: params.row?.["customerId"] ? "red" : "",
                        }}
                      >
                        {params.row?.["customerId"]
                          ? params.row?.["customerId"]?.name
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
                  case "subsciptionExpiryDate":
                    return (
                      <>
                        {new Date(params.row?.[key]).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                        [{getDaysDifference(new Date(params.row?.[key]))} days
                        left ]
                      </>
                    );
                  case "deviceId":
                    return (
                      <div
                        className="flex items-center"
                        style={{
                          color: params.row?.["deviceId"] ? "red" : "",
                        }}
                      >
                        {params.row?.["deviceId"]
                          ? params.row?.["deviceId"]?.name
                          : "N/A"}
                      </div>
                    );
                  case "warehouse_name":
                    return (
                      <>
                        <div className="flex items-center">
                          <span
                            className="font-black"
                            style={{
                              color: "#28476B",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              props.setActiveComponent("timeline");
                            }}
                          >
                            {params.row?.[key]}
                          </span>
                        </div>
                      </>
                    );
                  case "apiKey":
                    return (
                      <>
                        <div className="flex items-center">
                          <ApiKeyDisplay apiKey={params.row?.[key]}>
                            {params.row?.[key]}
                          </ApiKeyDisplay>
                        </div>
                      </>
                    );
                  case "active":
                    return (
                      <>
                        {params.row?.[key] === true ? (
                          <div>
                            <label
                              style={{
                                width: 60,
                                height: 20,
                                borderRadius: 50,
                                // backgroundColor: "#A91B0D20",
                                color: "#028A0F",
                              }}
                            >Yes</label></div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <label
                              style={{
                                width: 60,
                                height: 20,
                                borderRadius: 50,
                                // backgroundColor: "#A91B0D20",
                                color: "#A91B0D",
                              }}
                            >
                              No
                            </label>
                          </div>
                        )}
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
              ...singleObject,
            };
          });
          setRows(rowsData);
          setLoading(false);
        })
        .catch((err) => {});
    })();
  };

  useEffect(() => {
    getData();
    getCustomerData();
  }, []);

  return (
    <div>
      <RightSidebar
        sidebarOpen={sidebarOpen}
        onSetSidebarOpen={onSetSidebarOpen}
        sidebarContent={
          <CustomersSidebarContent
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleChange}
            formFields={formFields}
            apiEndpoint={"api/Subscription"}
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
            apiEndpoint={"api/Subscription/" + selectedWarehouse?.id}
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
          //   apiMethod={"PATCH"}
          //   getData={getData}
          // />
        }
      />
      {loading ? (
        <>
          <ShimmerLoader />
        </>
      ) : (
        <>
          <ReusablePageComponent
            heading={"API Subscriptions"}
            subHeading={"Manage the Subscriptions"}
            deleteApi={"Subscription"}
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
        </>
      )}
    </div>
  );
};

export default APISubscription;
