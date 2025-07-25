import React, { useEffect, useState } from "react";
import moment from "moment";
import Avatar from "react-avatar";
import Modal from 'react-modal';
import { callApi } from "../../../utils/api";
import RightSidebar from "../../RightSidebar";
import ReusablePageComponent from "../../../common/core/ReusablePageComponentPickup";
import WarehousesSidebarContent from "../../Sidebars/warehouses/WarehousesSidebarContent";
import WarehousesSidebarContentEdit from "../../Sidebars/warehouses/WarehousesSidebarContentEdit";
import PickupSidebarContent from "../../Sidebars/warehouses/PickupsSidebarContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getBaseURL } from "../../../common/constant/urls";
import axios from "axios";
import { store } from "../../../store";
import { useSelector } from "react-redux";

const Pickup_v2 = (props) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const callForPickup = useSelector(state => state.callForPickup);
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

  const handleDownload = () => {
    // Your download logic goes here
    console.log("Downloading...");
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff", // Change as needed
    color: "white",
    cursor: "pointer",
  };
  const iconStyle = {
    marginRight: "5px",
  };

  const getData = () => {
    (async () => {
      await callApi({
        endpoint: "api/pickups",
      })
        .then((res) => {
          let col = res?.columns;
          let rows = res?.data;
          console.log(rows)
          let columnData = Object.keys(col)?.map((key) => {
            return {
              field: key,
              headerName: col[key],
              //   sortable: false,
              //   filterble: false,
              flex: 1,
              minWidth: 180,
              renderCell:
                key === "pickup_date"
                  ? (params) => (
                      <div className="flex items-center">
                        <span>
                          {new Date(params.row?.[key]).toLocaleString()}
                        </span>
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
                        {params.row?.["rto"]
                          ? params.row?.["rto_address"]?.warehouse_name
                          : "N/A"}
                      </div>
                    )
                  : key === "downloads"
                  ? (params) => (
                      <>
                        <button onClick={()=>{
                          console.log(params.row, 'downloadableItems')
                          setModalId(params.row?.["id"])
                          setModalIsOpen(true)
                        }} style={buttonStyle}>
                          <FontAwesomeIcon
                            icon={faDownload}
                            style={iconStyle}
                          />
                          Download
                        </button>
                      </>
                    )
                  : key === "warehouse_id"
                  ? (params) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className="font-black"
                            style={{
                              color: "#28476B",
                              // textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={() => {}}
                          >
                            {params.row?.[key].warehouse_name}
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
  // //alert(JSON.stringify(store.getState().callForPickup))
  useEffect(() => {
    getData();
  }, [callForPickup]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalId, setModalId] = useState("");
  React.useEffect(()=>{
    // http://localhost:4000/files/pickups/66055f6dc66528e29638b1f4

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: getBaseURL()+'/files/pickups/'+modalId,

};

axios.request(config)
.then((response) => {
  // response.data?.files
  const downloadableItems = response.data?.files.map(fileName => ({
    name: fileName,
    url: getBaseURL()+'/files/pickups/'+modalId+'/'+fileName // Assuming the endpoint to download files is /files/:docType/:fileName
  }));
  console.log(downloadableItems, 'downloadableItems')
  setDownloadableItems(downloadableItems)
})
.catch((error) => {
  console.log(error, 'downloadableItems');
  setDownloadableItems([])
});

  }, [modalIsOpen])
  const [downloadableItems, setDownloadableItems] = useState([
  ]);


const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex:1000
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '20px',
    borderRadius: '5px',
    border: 'none',
  },
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '15px',
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
};

const closeIconStyle = {
  color: '#999',
  fontSize: '20px',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
};

const downloadIconStyle = {
  marginLeft: '10px',
};


  return (
    <div>
       <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyle}
        contentLabel="Downloadable Items"
      >
        <div style={headerStyle}>
          <h2 style={{ flex: 1 }}>Downloadable Items</h2>
          <button onClick={() => setModalIsOpen(false)} style={closeButtonStyle}>
            <FontAwesomeIcon icon={faTimes} style={closeIconStyle} />
          </button>
        </div>
        <ul style={listStyle}>
          {downloadableItems.map((item, index) => (
            <li key={index} style={itemStyle}>
              <a href={item.url} download={item.name} target="_blank" style={linkStyle}>
                {item.name}
              <FontAwesomeIcon icon={faDownload} style={downloadIconStyle} />
              </a>
            </li>
          ))}
        </ul>
      </Modal>
      {/* <RightSidebar
        sidebarOpen={sidebarOpenEdit}
        onSetSidebarOpen={onSetSidebarOpenEdit}
        sidebarContent={
          <WarehousesSidebarContentEdit
            toggleSidebar={toggleChangeEdit}
            addRowData={addRowData}
            selectedWarehouse={selectedWarehouse}
            dataGiven={dataGiven}
            toggleId={toggleId}
            getData={getData}
          />
        }
      /> */}

      <RightSidebar
        sidebarOpen={sidebarOpen}
        onSetSidebarOpen={onSetSidebarOpen}
        sidebarContent={
          <PickupSidebarContent
            toggleSidebar={toggleChange}
            selectedWarehouse={selectedWarehouse}
            selectedWarehouseName={selectedWarehouseName}
            getData={getData}
            // addRowData={addRowData}
            // dataGiven={dataGiven}
            // getData={getData}
          />
        }
      />

      <ReusablePageComponent
        heading={"Pickups"}
        subHeading={"Manage the Pickups"}
        column={columns}
        rows={rows}
        getData={getData}
        loading={loading}
        setLoading={setLoading}
        toggleID={toggleID}
        toggleSidebar={toggleChange}
        toggleSidebarEdit={toggleChangeEdit}
        toggleSidebarPickup={toggleChangePickup}
        onRefChange={handleChildRefChange} //lift refrence from child to parent
      />
    </div>
  );
};

export default Pickup_v2;
