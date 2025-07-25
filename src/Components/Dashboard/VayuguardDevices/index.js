import React, { useEffect, useState } from "react";
import { callApi } from "../../../utils/api";
import RightSidebar from "../../RightSidebar";
import ReusablePageComponent from "../../../common/core/ReusablePageComponentDelivery";
import CustomersSidebarContent from "../../Sidebars/warehouses/CustomersSidebarContent";
import CustomersSidebarContentEdit from "../../Sidebars/warehouses/CustomersSidebarContentEdit";
import { useNavigate } from "react-router-dom";
import { store } from "../../../store";
import ShimmerLoader from "../../Shimmer";
import { getCompanyId, getUserId, getUserRole } from "../../../utils/roles";

const Customers = (props) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formFields, setFormFields] = useState(
    getUserRole() === "useradmin"
      ? {
          name: {
            title: "Device Name",
            value: "",
            placeholder: "Enter Device Name",
            type: "text", // String type in schema
          },
          locationName: {
            title: "Location",
            value: "",
            placeholder: "Enter Location",
            type: "text", // String type in schema
          },
          assignedUserId: {
            title: "Assigned User",
            value: null,
            placeholder: "Enter User",
            type: "select", // enum type in schema
            options: [], // Options for the select dropdown based on enum
          },
        }
      : {
          deviceId: {
            title: "Device ID",
            value: "",
            placeholder: "Enter Device ID",
            type: "text", // String type in schema
          },
          name: {
            title: "Device Name",
            value: "",
            placeholder: "Enter Device Name",
            type: "text", // String type in schema
          },
          locationName: {
            title: "Location",
            value: "",
            placeholder: "Enter Location",
            type: "text", // String type in schema
          },
          status: {
            title: "Status",
            value: "active", // Default value as per schema
            placeholder: "Select Status",
            type: "select", // enum type in schema
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Maintenance", value: "maintenance" },
            ], // Options for the select dropdown based on enum
          },
          assignedUserId: {
            title: "Assigned User",
            value: null,
            placeholder: "Enter User",
            type: "select", // enum type in schema
            options: [], // Options for the select dropdown based on enum
          },
          customerId: {
            title: "Customer ID",
            value: null,
            placeholder: "Enter Customer ID",
            type: "select", // enum type in schema
            options: [], // Options for the select dropdown based on enum
          },
          outdoorAPI: {
            title: "Outdoor API Lat/Lon",
            value: null,
            placeholder: "Lat:Lon",
            type: "text",
          },
          subscriptionType: {
            title: "Subscription Type",
            value: "Basic", // Default value as per schema
            placeholder: "Select Subscription Type",
            type: "select", // enum type in schema
            options: [
              { label: "Basic", value: "Basic" },
              { label: "Premium", value: "Premium" },
              { label: "Elite", value: "Elite" },
            ], // Options for the select dropdown based on enum
          },
          subsciptionExpiryDate: {
            title: "Subscription Upto?",
            value: null,
            placeholder: "Select subscription date",
            type: "input-date", // enum type in schema
          },
          editableByCustomer: {
            title: "Editable By Customer",
            value: true,
            placeholder: "",
            type: "boolean", // enum type in schema
          },
        }
  );

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
      const endpoint =
        getUserRole() === "useradmin"
          ? "api/Customer?company=" + getCompanyId()
          : getUserRole() === "executive"
          ? "api/Customer?assignedUserId=" + getUserId()
          : "api/Customer";
      await callApi({
        endpoint: endpoint,
      })
        .then((res) => {
          const customerOptions_ = res?.data?.map((obj) => obj.company);
          const c = [...new Set(customerOptions_)];
          const customerOptions = c.map((customer) => ({
            label: customer, // Assuming 'name' is the field for customer name
            value: customer, // Assuming '_id' is the field for customer ID
          }));

          const assignedOptions = res?.data?.map((obj) => ({
            label: obj.name, // Customer name as label
            value: obj._id, // Customer ID as value
          }));
          // const a = [...new Set(assignedOptions_)];
          // const assignedOptions = a.map((name_) => ({
          //   label: name_, // Assuming 'name' is the field for customer name
          //   value: name_, // Assuming '_id' is the field for customer ID
          // }));

          console.log(customerOptions, "customerOptions");

          setTimeout(() => {
            // setFormFields({})
            // Update the formFields state with the fetched customer options
            setFormFields((prevFields) => ({
              ...prevFields,
              assignedUserId: {
                ...prevFields.assignedUserId,
                options: assignedOptions, // Populate options with API response
              },
              customerId: {
                ...prevFields.customerId,
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


  const getColWidth = (key) => {
    switch (key) {
      case "customerId":
      case "subsciptionExpiryDate":
      case "assignedUserId":
        return 200;
      case "subscriptionType":
      case "deviceId":
        return 150;
      default:
        return 50;
    }
  };

  const getData = () => {
    (async () => {
      const endpoint =
        getUserRole() === "useradmin"
          ? "api/AirQualityDevice?customerId=" + getCompanyId()
          : getUserRole() === "executive"
          ? "api/AirQualityDevice?assignedUserId=" + getUserId()
          : "api/AirQualityDevice";

      await callApi({
        endpoint: endpoint,
      })
        .then((res) => {
          let col = res?.columns;
          const rows = res?.data;
          if (getUserRole() !== "admin"){
            delete col.deviceId;
          }
          const columnData = Object.keys(col).map((key) => {
            return {
              field: key,
              headerName: col[key],
              flex: 1,
              // minWidth: getColWidth(key),
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
                  case "assignedUserId":
                    return (
                      <div className="flex items-center">
                        {params.row?.[key]?.name}
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
                  case "editableByCustomer":
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
            apiEndpoint={"api/AirQualityDevice"}
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
            apiEndpoint={"api/AirQualityDevice/" + selectedWarehouse?.id}
            selectedWarehouse={selectedWarehouse}
            addRowData={selectedWarehouse} // edit data
            getData={getData}
            apiMethod={"PUT"}
          />
        }
      />
      {loading ? (
        <>
          <ShimmerLoader />
        </>
      ) : (
        <ReusablePageComponent
          heading={"Devices"}
          subHeading={"Manage the Devices"}
          deleteApi={"AirQualityDevice"}
          column={columns}
          rows={rows}
          getData={getData}
          loading={loading}
          setLoading={setLoading}
          dontShowAdd={getUserRole() !== "admin" ? true : false}
          specialEditDevice={getUserRole() === "useradmin"}
          dontCheckboxSelection={getUserRole() === "useradmin" ? true : false}
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
