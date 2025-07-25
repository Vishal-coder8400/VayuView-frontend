import React, { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
  useGridApiRef,
} from "@mui/x-data-grid";
import { Button } from "./Button";
import { FaDownload, FaPen, FaRegTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { callApi } from "../../utils/api";
import NoRecords from "./NoRecords";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "30px",
        marginRight: "60px",
      }}
    >
      <div className="">
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </div>
      <div className="flex ">
        <GridToolbarQuickFilter />
      </div>
    </GridToolbarContainer>
  );
};
const ReusablePageComponentShipping = (props) => {
  const childRef = useGridApiRef();

  const {
    heading,
    subHeading,
    column,
    rows,
    toggleSidebar,
    toggleSidebarEdit,
    loading,
    setSelectedWarehouse,
    setLoading,
    toggleID,
    onRefChange,
  } = props;

  React.useEffect(() => {
    // Call the callback function provided by the parent
    // to pass the ref up to the parent
    if (onRefChange) {
      onRefChange(childRef);
    }
  }, []);

  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleSelectionChange = (selectionModel) => {
    console.log(selectionModel);
    setSelectedItems(selectionModel);
  };

  return (
    <div className="bg-[#FAFAF8] h-screen">
      <div className="section-header" style={{ marginTop: "30px" }}>
        <div>
          <p className="ml-8 mt-10 text-light text-4">
            <label style={{ color: "#707070" }}>Home/</label>
            {heading}
          </p>
          <h2 className="text-[24px] ml-8 mt-2">{heading} </h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          className="mt-12"
        >
          <Button
            text={`Add ${props.heading} +`}
            onClick={() => {
              toggleSidebar();
            }}
          />{" "}
          <Button
            customClass={selectedItems.length !== 1 ? "disabled" : ""}
            onClick={() => {
              if (selectedItems.length !== 1) {
                return;
              }
              console.log(rows);
              // toggleSidebar()
              const convertRowFormat = () => {
                const targetRow = rows.find(
                  (row) => row.id === selectedItems[0]
                );

                if (!targetRow) {
                  console.error(`Row with id ${selectedItems[0]} not found.`);
                  return;
                }

                toggleID(targetRow["pickup_id"]);
                console.log("targetRow", targetRow);
                const mapping = {
                  orderType: "orderType",
                  consigneeName: "consigneeName",
                  consigneeAddress: "consigneeAddress",
                  pincode: "pincode",
                  city: "city",
                  state: "state",
                  contactNo: "contactNo",
                  consigneeGet: "consigneeGet",
                  noOfBoxes: "noOfBoxes",
                  actualWeight: "actualWeight",
                  description: "description",
                  paymentMode: "paymentMode",
                  orderNo: "orderNo",
                  invoiceNo: "invoiceNo",
                  invoiceValue: "invoiceValue",
                  dimensions: "dimensions",
                  eWayBill: "eWayBill",
                  rovFovType: "rovFovType",
                  rovFovType: "rovFovType",
                  appointmentDateTime: "appointmentDateTime",
                  appointmentTimeRange: "appointmentTimeRange",
                  // "slt": "Time Slots",
                };

                const updatedFormData = {
                  orderType: {
                    title: "Order Type",
                    value: "single_order",
                    placeholder: "Select order type",
                    type: "toggle",
                  },
                  // warehouse_id: {
                  //   title: "Warehouse ID",
                  //   value: "",
                  //   placeholder: "e.g., warehouseA",
                  //   type: "input",
                  // },
                  consigneeName: {
                    title: "Consignee Name",
                    value: "",
                    placeholder: "e.g., John Doe",
                    type: "input",
                  },
                  consigneeAddress: {
                    title: "Consignee Address",
                    value: "",
                    placeholder: "e.g., 123 Main Street",
                    type: "input",
                  },
                  pincode: {
                    title: "Postal Code",
                    value: "",
                    placeholder: "e.g., 123456",
                    type: "number",
                  },
                  city: {
                    title: "City",
                    value: "",
                    placeholder: "e.g., Cityville",
                    type: "input",
                  },
                  state: {
                    title: "State",
                    value: "",
                    placeholder: "e.g., Stateville",
                    type: "input",
                  },
                  contactNo: {
                    title: "Contact Number",
                    value: "",
                    placeholder: "e.g., 123-456-7890",
                    countryCodeReq: true,
                    type: "number",
                  },
                  consigneeGet: {
                    title: "Consignee Gst",
                    value: "",
                    placeholder: "e.g., Get Info",
                    type: "input",
                  },
                  noOfBoxes: {
                    title: "Number of Boxes",
                    value: "",
                    placeholder: "Enter the number of boxes",
                    type: "number",
                  },
                  // dimensions: {
                  //   title: "Dimensions",
                  //   value: {
                  //     length: 0,
                  //     width: 0,
                  //     height: 0,
                  //   },
                  //   placeholder: "Enter dimensions (L x W x H)",
                  //   type: "dimensions",
                  // },
                  actualWeight: {
                    title: "Actual Weight",
                    value: 0,
                    placeholder: "Enter actual weight",
                    type: "number",
                  },
                  description: {
                    title: "Description",
                    value: "",
                    placeholder: "Enter a description",
                    type: "input",
                  },
                  paymentMode: {
                    title: "Payment Mode",
                    value: "prepaid",
                    placeholder: "Select payment mode",
                    type: "select",
                    options: ["prepaid", "cod"],
                  },
                  orderNo: {
                    title: "Order Number",
                    value: "",
                    placeholder: "e.g., ABC123",
                    type: "input",
                  },

                  invoiceValue: {
                    title: "Invoice Value",
                    value: "",
                    placeholder: "e.g., 100",
                    type: "input",
                    required: true,
                  },
                  invoiceNo: {
                    title: "Invoice Number",
                    value: "",
                    placeholder: "e.g., INV456",
                    type: "input",
                  },
                  dimensions: {
                    title: "Dimensions",
                    value: [],
                    type: "dimensions",
                    required: true,
                  },
                  eWayBill: {
                    title: "E-Way Bill",
                    value: "",
                    placeholder: "Enter E-Way Bill",
                    type: "input",
                  },
                  rovFovType: {
                    title: "FOV Type",
                    value: "Owner Risk",
                    placeholder: "FOV Type",
                    type: "select",
                    options: ["Carrier Risk", "Owner Risk"],
                    required: true,
                  },
                  appointmentDateTime: {
                    title: "Appointment Date & Time",
                    value: new Date(),
                    placeholder: "",
                    type: "time-picker",
                    required: true,
                  },
                  appointmentTimeRange: {
                    title: "Appointment Time Range",
                    value: [new Date(), new Date()],
                    placeholder: "",
                    type: "time-range",
                    required: true,
                  },
                };

                Object.entries(mapping).forEach(([rowKey, formKey]) => {
                  updatedFormData[formKey] = {
                    ...updatedFormData[formKey],
                    value: targetRow[rowKey],
                  };
                });
                // Add more mappings as needed for other fields
                return updatedFormData;
              };
              toggleSidebarEdit(convertRowFormat());
              setSelectedWarehouse(selectedItems[0]);
            }}
            text={
              <>
                <FaPen />
              </>
            }
            squareOutlined
          />
          <Button
            customClass={selectedItems.length !== 1 ? "disabled" : ""}
            onClick={() => {
              if (selectedItems.length !== 1) {
                return;
              }
              confirmAlert({
                title: "Confirm to delete",
                message:
                  "Are you sure to do this. This action is non reversible",
                buttons: [
                  {
                    label: "Yes",
                    onClick: () => {
                      callApi({
                        method: "DELETE",
                        endpoint: "api/shippings/" + selectedItems[0],
                        alert: true,
                      })
                        .then(() => {
                          setTimeout(() => {
                            props.getData();
                          }, 200);
                        })
                        .catch(() => {});
                    },
                  },
                  {
                    label: "No",
                    onClick: () => {},
                  },
                ],
              });
            }}
            text={
              <>
                <FaRegTrashAlt />
              </>
            }
            squareOutlined
          />
        </div>
      </div>
      {/* <div className="m-2 text-bold">
        <h2 className="text-[32px] ml-8 mt-10">{heading} </h2>
        <p className="ml-8 mt-1 text-thin text-8">{subHeading} </p> */}
      {/* </div> */}
      <div style={{ width: "83vw" }}>
        {rows.length === 0 ? (
          <>
            <NoRecords />
          </>
        ) : (
          <>
            <DataGrid
              apiRef={childRef}
              rows={rows}
              columns={column}
              onRowSelectionModelChange={handleSelectionChange}
              // onSelectionModelChange={handleSelectionChange}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 25,
                  },
                },
              }}
              loading={loading}
              slots={{
                toolbar: CustomToolbar,
                noRowsOverlay: <>No Data Available</>,
              }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  // printOptions: { disableToolbarButton: true },
                  // csvOptions: { disableToolbarButton: true },
                },
              }}
              pageSizeOptions={[25, 50, 100]}
              // disableColumnFilter
              // disableColumnSelector
              // disableDensitySelector
              disableRowSelectionOnClick
              checkboxSelection
              sx={{
                padding: 0,
                margin: 0,
                overflowX: "scroll",
                height: "calc(100vh - 80px)",
                boxShadow: 0,
                border: 0,
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {},
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "primary.main",
                  // color: "white",
                  // fill: "white",
                  // accentColor: "white",
                },
                ".MuiDataGrid-columnSeparator": {
                  display: "none",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "rgba(224, 231, 255, 0.25)",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-row": {
                  height: "60px",
                },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ReusablePageComponentShipping;
