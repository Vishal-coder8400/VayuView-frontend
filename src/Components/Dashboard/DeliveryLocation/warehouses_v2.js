import React, { useEffect, useState } from "react";
import moment from "moment";
import Avatar from "react-avatar";
import { callApi } from "../../../utils/api";
import RightSidebar from "../../RightSidebar";
import ReusablePageComponent from "../../../common/core/ReusablePageComponentDelivery";
import WarehousesSidebarContent from "../../Sidebars/warehouses/DeliverySidebarContent";
import WarehousesSidebarContentEdit from "../../Sidebars/warehouses/DeliverySidebarContentEdit";
import PickupSidebarContent from "../../Sidebars/warehouses/PickupSidebarContent";
import { useNavigate } from "react-router-dom";

const Warehouses_v2 = (props) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [parentRef, setParentRef] = useState({}); // ref for the data grid Mui

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarOpenEdit, setSidebarOpenEdit] = useState(false);
  const [pickupSidebarOpen, setPickupSidebarOpen] = useState(false);
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

  const onSetSidebarOpenPickup = (open) => {
    setPickupSidebarOpen(open);
  };

  const onSetSidebarOpenEdit = (open) => {
    setSidebarOpenEdit(open);
  };
  const [selectedWarehouse, setSelectedWarehouse] = React.useState("");
  const [selectedWarehouseName, setSelectedWarehouseName] = React.useState("");
  const toggleChangePickup = (id) => {
    setSelectedWarehouse(id);
    onSetSidebarOpenPickup((prev) => !prev);
  };

  // Callback function to receive the child ref
  const handleChildRefChange = (childRef) => {
    // storing it in the parentRef or perform any other actions
    // parentRef = childRef;
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
      await callApi({
        endpoint: "api/delivery",
      })
        .then((res) => {
          let col = res?.columns;
          let rows = res?.data;
          let columnData = Object.keys(col)?.map((key) => {
            return {
              field: key,
              headerName: col[key],
              //   sortable: false,
              //   filterble: false,
              flex: 1,
              minWidth: 180,
              renderCell:
                key === "warehouse_name" || key === "warehouse_contact_person"
                  ? (params) => (
                      <div className="flex items-center">
                        <span className="font-black">{params.row?.[key]}</span>
                      </div>
                    )
                  : key === "rto"
                  ? (params) => (
                      <div className="flex items-center">
                        {params.row?.[key] === true ? "Yes" : "No"}
                      </div>
                    )
                  : key === "rto_address"
                  ? (params) => (
                      <div className="flex items-center">
                        {params.row?.["rto"]?params.row?.["rto_address"]?.warehouse_name:'N/A'}
                      </div>
                    )
                  : key === "working_days"
                  ? (params) => (
                      <>
                        {convertIndicesToDayNames(
                          params.row?.[key].sort()
                        ).join(", ")}
                        {/* working days */}
                      </>
                    )
                  : key === "warehouse_name"
                  ? (params) => (
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
                        {/* working days */}
                      </>
                    )
                  : (params) => params.row?.[col],
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
          <WarehousesSidebarContent
          sidebarOpen={sidebarOpen}
            toggleSidebar={toggleChange}
            addRowData={addRowData}
            selectedWarehouse={selectedWarehouse}
            // dataGiven={dataGiven}
            getData={getData}
          />
        }
      />
      <RightSidebar
        sidebarOpen={sidebarOpenEdit}
        onSetSidebarOpen={onSetSidebarOpenEdit}
        sidebarContent={
          <WarehousesSidebarContentEdit
            toggleSidebar={toggleChangeEdit}
            addRowData={addRowData}
            selectedWarehouse={selectedWarehouse}
            setSelectedWarehouse={setSelectedWarehouse}
            dataGiven={dataGiven}
            toggleId={toggleId}
            getData={getData}
          />
        }
      />
      <RightSidebar
        sidebarOpen={pickupSidebarOpen}
        onSetSidebarOpen={onSetSidebarOpenPickup}
        sidebarContent={
          <PickupSidebarContent
            toggleSidebar={toggleChangePickup}
            selectedWarehouse={selectedWarehouse}
            selectedWarehouseName={selectedWarehouseName}
            // addRowData={addRowData}
            // dataGiven={dataGiven}
            // getData={getData}
          />
        }
      />
    
      <ReusablePageComponent
        heading={"Delivery Locations"}
        subHeading={"Manage the Delivery Locations"}
        column={columns}
        rows={rows}
        getData={getData}
        loading={loading}
        setLoading={setLoading}
        toggleID={toggleID}
        toggleSidebar={toggleChange}
        setSelectedWarehouse={setSelectedWarehouse}
        toggleSidebarEdit={toggleChangeEdit}
        toggleSidebarPickup={toggleChangePickup}
        onRefChange={handleChildRefChange} //lift refrence from child to parent
      />
    </div>
  );
};

export default Warehouses_v2;
