import React, { useEffect, useState } from "react";
import { callApi } from "../../../utils/api";
import RightSidebar from "../../RightSidebar";
import ReusablePageComponent from "../../../common/core/ReusablePageComponentDelivery";
import CustomersSidebarContent from "../../Sidebars/warehouses/CustomersSidebarContent";
import CustomersSidebarContentEdit from "../../Sidebars/warehouses/CustomersSidebarContentEdit";
import { useNavigate } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";
import ApiKeyDisplay from "./ApiKey";
import TooltipContainer from "./TooltipContainer";
import AutoCompleteDropdown from "./AutoCompleteDropdown";
import ShimmerLoader from "../../Shimmer";
import { getColorForParam, getRangeMapping } from "../../../utils/aqi";
import { store } from "../../../store";
import { getUserId, getUserRole } from "../../../utils/roles";

const AQI_LOG = (props) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [colorStandard, setColorStandard] = useState("WHO");
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

  const [rotation, setRotation] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefreshIcon = () => {
    setRotation(rotation + 1440); // Rotate 1440 degrees for 4 full spins
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    // Add any other refresh functionality here
  };

  const paramMapping = {
    indoor_humidity: "humidity",
    outdoor_humidity: "humidity",
    indoor_temp: "temp",
    outdoor_temp: "temp",
    indoor_pm25: "pm2.5",
    outdoor_pm25: "pm2.5",
    indoor_pm10: "pm10.0",
    outdoor_pm10: "pm10.0",
    indoor_co2: "co2",
    outdoor_co2: "co2",
    indoor_tvoc: "tvoc",
    outdoor_tvoc: "tvoc",
    indoor_hcho: "hcho",
    outdoor_hcho: "hcho",
  };

  const getData = (colorST) => {
    (async () => {
      await callApi({
        endpoint:
          getUserRole() !== "admin"
            ? "aqi-logs-filtered/" + getUserId()
            : "aqi-logs-filtered/" + "admin",
      })
        .then((res) => {
          const col = res?.columns;
          const rows = res?.data.map((entity, idx) => {
            // Find the corresponding indoor and outdoor parameters
            const indoorParams = {};
            const outdoorParams = {};

            entity.indoor_air_quality.forEach((param) => {
              indoorParams[param.param] = param.value;
            });

            entity?.outdoor_air_quality?.forEach((param) => {
              outdoorParams[param.param] = param.value;
            });

            return {
              _id: entity._id,
              mid: entity.mid,
              timestamp: new Date(entity.timestamp).toLocaleString(),
              indoor_humidity: indoorParams.humidity || "N/A",
              outdoor_humidity: outdoorParams?.humidity || "N/A",
              indoor_temp: indoorParams.temp || "N/A",
              outdoor_temp: outdoorParams?.temp || "N/A",
              indoor_pm25: indoorParams["pm2.5"] || "N/A",
              outdoor_pm25: outdoorParams?.["pm2.5"] || "N/A",
              indoor_pm10: indoorParams["pm10.0"] || "N/A",
              outdoor_pm10: outdoorParams?.["pm10.0"] || "N/A",
              indoor_co2: indoorParams.co2 || "N/A",
              outdoor_co2: outdoorParams?.co2 || "N/A",
              indoor_tvoc: indoorParams.tvoc || "N/A",
              outdoor_tvoc: outdoorParams?.tvoc || "N/A",
              indoor_hcho: indoorParams.hcho || "N/A",
              outdoor_hcho: outdoorParams?.hcho || "N/A",
            };
          });
          console.log(rows, "ROWWSSSS");
          const columnData = Object.keys(col).map((key) => {
            return {
              field: key,
              headerName: col[key],
              flex: 1,
              minWidth: key === "timestamp" || key === "mid" ? 160 : 120,
              renderCell: (params) => {
                switch (key) {
                  case "indoor_pm1":
                  case "indoor_pm25":
                  case "indoor_pm10":
                  case "indoor_temp":
                  case "indoor_humidity":
                  case "indoor_tvoc":
                  case "indoor_co2":
                  case "indoor_hcho":
                  case "indoor_lux":
                  case "indoor_db":
                  case "indoor_so2":
                  case "indoor_no":
                  case "indoor_no2":
                  case "indoor_o2":
                  case "indoor_o3":
                  case "indoor_nh3":
                  case "indoor_ch4":
                  case "indoor_co":
                  case "outdoor_pm1":
                  case "outdoor_pm25":
                  case "outdoor_pm10":
                  case "outdoor_temp":
                  case "outdoor_humidity":
                  case "outdoor_tvoc":
                  case "outdoor_co2":
                  case "outdoor_hcho":
                  case "outdoor_lux":
                  case "outdoor_db":
                  case "outdoor_so2":
                  case "outdoor_no":
                  case "outdoor_no2":
                  case "outdoor_o2":
                  case "outdoor_o3":
                  case "outdoor_nh3":
                  case "outdoor_ch4":
                  case "outdoor_co":
                    return (
                      <>
                        <div className="flex items-center">
                          <span
                            style={{
                              backgroundColor: getColorForParam(
                                colorST,
                                paramMapping[key],
                                parseFloat(params.row?.[key])
                              ),
                              color: "white",
                              width: "100%",
                              fontWeight: "900",
                            }}
                          >
                            <TooltipContainer
                              children={
                                !params.row?.[key] ? "N/A" : params.row?.[key]
                              }
                              colorData={
                                getRangeMapping(colorST)[paramMapping[key]]
                              }
                              param={key}
                            />
                          </span>
                        </div>
                      </>
                    );
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
                      <>{params.row?.[key] === true ? <>Yes</> : <>No</>}</>
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
        .catch((err) => {
          console.log(err, "ERROR");
        });
    })();
  };

  useEffect(() => {
    getData();
    getCustomerData();
  }, []);
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);

  // Toggle auto-refresh state
  const toggleAutoRefresh = () => {
    setIsAutoRefresh((prevState) => !prevState);
  };

  // Manual refresh
  const handleRefresh = () => {
    getData();
    handleRefreshIcon();
  };

  // Auto-refresh effect
  useEffect(() => {
    let interval;
    if (isAutoRefresh) {
      interval = setInterval(() => {
        getData();
      }, 3000);
    }

    // Cleanup interval on unmount or when auto-refresh is turned off
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoRefresh]);

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
        <ReusablePageComponent
          heading={"Air Quality Logs"}
          subHeading={"Logs"}
          column={columns}
          showCustomTopBarComponent={() => (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  zIndex: 10000,
                }}
              >
                <AutoCompleteDropdown
                  colorStandard={colorStandard}
                  setColorStandard={(value) => {
                    setColorStandard(value);
                    getData(value);
                  }}
                />
                <button
                  onClick={handleRefresh}
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaSyncAlt
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: "transform 2s ease", // Adjust timing as needed
                    }}
                  />{" "}
                  {/* Refresh Icon */}
                  {refreshing ? "Refreshing" : "Refresh"}
                </button>
                <button
                  onClick={toggleAutoRefresh}
                  style={{
                    padding: "4px 12px",
                    backgroundColor: isAutoRefresh ? "#03A9E790" : "#f0f0f0",
                    color: isAutoRefresh ? "#fff" : "#000",
                    border: isAutoRefresh
                      ? "1px solid #03A9E7"
                      : "1px solid #d3d3d350",
                    borderRadius: "50px",
                    cursor: "pointer",
                  }}
                >
                  {isAutoRefresh ? "Auto-refresh on" : "Auto-refresh off"}
                </button>
              </div>
            </>
          )}
          dontShowAdd={true}
          dontCheckboxSelection={true}
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

export default AQI_LOG;
