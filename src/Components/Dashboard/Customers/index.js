import React, { useEffect, useState } from "react";
import { callApi } from "../../../utils/api";
import RightSidebar from "../../RightSidebar";
import ReusablePageComponent from "../../../common/core/ReusablePageComponentDelivery";
import CustomersSidebarContent from "../../Sidebars/warehouses/CustomersSidebarContent";
import CustomersSidebarContentEdit from "../../Sidebars/warehouses/CustomersSidebarContentEdit";
import { useNavigate } from "react-router-dom";
import { store } from "../../../store";
import ShimmerLoader from "../../Shimmer";
import { getCompanyId, getUserRole } from "../../../utils/roles";

const Customers = (props) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formFields, setFormFields] = useState({
    customerId: {
      title: "Customer ID",
      value: "",
      placeholder: "Enter Customer ID",
      type: "text",
    },
    name: {
      title: "Name",
      value: "",
      placeholder: "Enter Customer Name",
      type: "text",
    },
    company: {
      title: "Company Name",
      value:
        getUserRole() !== "admin"
        ? getCompanyId()
        : "",
      disabled:  getUserRole() !== "admin" ? true : false,
      placeholder: "Enter Company Name",
      type: "text",
    },
    email: {
      title: "Email",
      value: "",
      placeholder: "Enter Customer Email",
      type: "text",
    },
    phone: {
      title: "Phone Number",
      value: "",
      placeholder: "Enter Phone Number",
      type: "phone",
    },
    user_role: {
      title: "User Role",
      value: "executive",
      placeholder: "Choose User Role",
      type: "select", // enum type in schema
      disabled: getUserRole() !== "admin",
      options: [
        { label: "Admin", value: "useradmin" },
        { label: "Executive", value: "executive" },
      ],
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

  const getData = () => {
    (async () => {
      const endpoint =
        getUserRole() !== "admin"
          ? "api/Customer?company=" + getCompanyId()
          : "api/Customer";

      await callApi({
        endpoint: endpoint,
      })
        .then((res) => {
          const col = res?.columns;
          const rows = res?.data;

          const columnData = Object.keys(col).map((key) => {
            return {
              field: key,
              headerName: col[key],
              flex: 1,
              minWidth: 180,
              renderCell: (params) => {
                switch (key) {
                  case "customerId":
                  case "company":
                    return (
                      <div className="flex items-center">
                        <span className="font-semibold">
                          {params.row?.[key]}
                        </span>
                      </div>
                    );
                  case "phone":
                    return (
                      <div className="flex items-center">
                        <span>+91 {params.row?.[key]}</span>
                      </div>
                    );
                  case "rto_address":
                    return (
                      <div className="flex items-center">
                        {params.row?.["rto"]
                          ? params.row?.["rto_address"]?.warehouse_name
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
            apiEndpoint={"api/Customer"}
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
            apiEndpoint={"api/Customer/" + selectedWarehouse?.id}
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
          heading={"Customers"}
          subHeading={"View, edit, and add customer details below."}
          deleteApi={"Customer"}
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
