import React, { useEffect, useState } from "react";
import moment from "moment";
import Avatar from "react-avatar";
import { callApi } from "../../../utils/api";
import RightSidebar from "../../RightSidebar";
import ReusablePageComponent from "../../../common/core/ReusablePageComponent";
import WarehousesSidebarContent from "../../Sidebars/warehouses/WarehousesSidebarContent";
import ReusablePageComponentShipping from "../../../common/core/ReusablePageComponentShipping";
import ShipmentSidebarContent from "../../Sidebars/warehouses/ShipmentSidebarContent";
import ShipmentSidebarContentEdit from "../../Sidebars/warehouses/ShipmentSidebarContentEdit";
import { round } from "lodash";
import { Modal, Button } from "@mui/material";

const DimensionDisplay = ({ params, keyName }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
      <div>
          <Button variant="contained" onClick={handleOpen}>
              View Dimensions
          </Button>

          <Modal open={open} onClose={handleClose}>
              <div style={{ padding: '20px', background: 'white', margin: 'auto', marginTop: '10%', maxWidth: '500px' }}>
                  <h2>Dimensions</h2>
                  {params.row?.[keyName]?.map((dimension, index) => (
                      <div key={index}>
                          <span>
                              <strong>Dimension {index + 1}:</strong>
                          </span>
                          <br />
                          <span>Number of Boxes: {dimension.numOfBoxes || "N/A"}</span>
                          <br />
                          <span>Length: {dimension.length || "N/A"}</span>
                          <br />
                          <span>Breadth: {dimension.breadth || "N/A"}</span>
                          <br />
                          <span>Height: {dimension.height || "N/A"}</span>
                          <br />
                          <br />
                          <span>Volumetric Weight: {dimension.volumetric_weight || "N/A"}</span>
                          <br />
                      </div>
                  ))}
                  <Button variant="contained" onClick={handleClose} style={{ marginTop: '20px' }}>
                      Close
                  </Button>
              </div>
          </Modal>
      </div>
  );
};

const Modal_ = ({ isOpen, onClose, alertText }) => {
  return (
    <>
      {false && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className=" py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-l font-bold w-[400px]">{alertText}</p>
                <button className="modal-close" onClick={onClose}></button>
              </div>
              <button
                className="bg-red-500 w-[200px] hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={onClose}
              >
                Understood!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Warehouses_v2 = (props) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pickupId, setPickupId] = useState("");

  const toggleChangeEdit = (dataProvided) => {
    if (dataProvided) {
      setDataGiven(dataProvided);
    }
    setSidebarOpenEdit((prev) => !prev);
  };
  const [sidebarOpenEdit, setSidebarOpenEdit] = useState(false);
  const [dataGiven, setDataGiven] = useState([]);

  const [parentRef, setParentRef] = useState({}); // ref for the data grid Mui

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertText, setAlertText] = useState("");

  const openModal = (text) => {
    setAlertText(text);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };
  const toggleChange = (dataProvided) => {
    if (dataProvided) {
      setDataGiven(dataProvided);
    }
    setSidebarOpen((prev) => !prev);
  };
  const onSetSidebarOpenEdit = (open) => {
    setSidebarOpenEdit(open);
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

  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleTimeString("en-US", options);
  }

  const getData = () => {
    (async () => {
      await callApi({
        endpoint: "api/shippings",
      })
        .then((res) => {
          let col = res?.columns;
          let rows = res?.data;
          // Get the keys (columns) of the first dictionary
          const keys = Object.keys(rows[0]);

          // Iterate over each key (column)
          for (const key of keys) {
            // Check if any value in the column is empty, null, or undefined
            const isEmptyOrNull = rows.some(
              (dict) =>
                dict[key] === "" ||
                dict[key] === null ||
                dict[key] === undefined
            );
            // If any value in the column is empty, return true
            if (isEmptyOrNull) {
              openModal(
                "Please edit and update the missing fields of the shipments"
              );
              break;
            }
          }

          let columnData = Object.keys(col)?.map((key) => {
            console.log(key);
            // if (!params.row?.[key]){
            //   openModal("jfoi")
            // }
            return {
              field: key,
              headerName: col[key],
              //   sortable: false,
              //   filterble: false,
              flex: 1,
              minWidth: 220,
              renderCell:
                key === "usn"
                  ? (params) => (
                      <div className="flex items-center">
                        <Avatar
                          name={params.row?.[key]}
                          size="35"
                          round={true}
                        />{" "}
                        &nbsp;&nbsp;{" "}
                        <span className="font-medium">{params.row?.[key]}</span>
                      </div>
                    )
                  : key === "_id"
                  ? (params) => (
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
                            props.setShippingData(params.row);
                          }}
                        >
                          {params.row?.[key]}
                        </span>
                      </div>
                    )
                  : key === "pickup_id"
                  ? (params) => (
                      <div className="flex items-center">
                        <span className="font-black">
                          {params.row?.[key]?.["pickup_id"]}
                        </span>
                      </div>
                    )
                  : key === "dimensions"
                  ? (params) => (
                      <div className="flex items-center wrap">
                        <DimensionDisplay params={params} keyName={key}/>
                        {/* {params.row?.[key]?.map((dimension, index) => (
                          <div key={index}>
                            <span>
                              <strong>Dimension {index + 1}:</strong>
                            </span>
                            <br />
                            <span>
                              Number of Boxes: {dimension.numOfBoxes || "N/A"}
                            </span>
                            <br />
                            <span>Length: {dimension.length || "N/A"}</span>
                            <br />
                            <span>Breadth: {dimension.breadth || "N/A"}</span>
                            <br />
                            <span>Height: {dimension.height || "N/A"}</span>
                            <br />
                            <br />
                            <span>
                              Volumetric Weight:{" "}
                              {dimension.volumetric_weight || "N/A"}
                            </span>
                            <br />
                          </div>
                        ))} */}
                      </div>
                    )
                  : key === "appointmentTimeRange"
                  ? (params) => (
                      <div className="flex items-center">
                        {params.row?.[key]?.length > 1 && (
                          <span
                            className="font-black"
                            style={{ fontWeight: "300" }}
                          >
                            {formatTime(params.row?.[key]?.[0])} -&nbsp;
                            {formatTime(params.row?.[key]?.[1])}
                          </span>
                        )}
                      </div>
                    )
                  : key === "role" && res?.roleMap
                  ? (params) => (
                      <div className="flex items-center">
                        {res?.roleMap[params.row?.[key]] === "admin" ? (
                          <>
                            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Administrator
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-sky-100 text-sky-800 px-2 py-1 rounded-full">
                              Incharge
                            </div>
                          </>
                        )}
                      </div>
                    )
                  : (params) => (
                      <div className="flex items-center">
                        {params.row?.[key] ? (
                          <>
                            <span>{params.row?.[key]}</span>
                          </>
                        ) : (
                          <>
                            <span style={{ color: "red" }}>N/A</span>
                          </>
                        )}
                      </div>
                    ),
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

  const [toggleId, setToggleID] = useState("");
  const toggleID = (id) => {
    setToggleID(id);
  };

  const [selectedWarehouse, setSelectedWarehouse] = React.useState("");
  const [selectedWarehouseName, setSelectedWarehouseName] = React.useState("");
  const toggleChangePickup = (id) => {
    setSelectedWarehouse(id);
    // onSetSidebarOpenPickup((prev) => !prev);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Modal_ isOpen={isModalOpen} onClose={closeModal} alertText={alertText} />
      <RightSidebar
        sidebarOpen={sidebarOpen}
        onSetSidebarOpen={onSetSidebarOpen}
        sidebarContent={
          <ShipmentSidebarContent
            toggleSidebar={toggleChange}
            addRowData={addRowData}
            dataGiven={dataGiven}
            getData={getData}
          />
        }
      />

      <RightSidebar
        sidebarOpen={sidebarOpenEdit}
        onSetSidebarOpen={onSetSidebarOpenEdit}
        sidebarContent={
          <ShipmentSidebarContentEdit
            toggleSidebar={toggleChangeEdit}
            addRowData={addRowData}
            selectedWarehouse={selectedWarehouse}
            dataGiven={dataGiven}
            toggleId={toggleId}
            getData={getData}
            pickupId={pickupId}
          />
        }
      />

      <ReusablePageComponentShipping
        heading={"Shipments"}
        subHeading={"Manage the Shipments"}
        column={columns}
        rows={rows}
        getData={getData}
        loading={loading}
        toggleID={toggleID}
        setSelectedWarehouse={setSelectedWarehouse}
        setLoading={setLoading}
        toggleSidebar={toggleChange}
        toggleSidebarEdit={toggleChangeEdit}
        onRefChange={handleChildRefChange} //lift refrence from child to parent
      />
    </div>
  );
};

export default Warehouses_v2;
