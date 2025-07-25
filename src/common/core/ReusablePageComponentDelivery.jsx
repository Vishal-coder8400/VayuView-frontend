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
import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "./Button";
import { FaDownload, FaPen, FaRegTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { callApi } from "../../utils/api";
import NoRecords from "./NoRecords";
import { Box, Slider } from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Menu, MenuItem } from "@mui/material";
// import AddIcon from "../common/core/icons/AddIcon";

const CustomToolbar = ({ rows, columns }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Export to Excel
  const exportToExcel = () => {
    console.log(rows, "ROWS");
    const workSheet = XLSX.utils.json_to_sheet(
      rows.map((row) => {
        const rowData = {};
        columns.forEach((column) => {
          rowData[column.headerName] = row[column.field];
        });
        return rowData;
      })
    );
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Data");
    XLSX.writeFile(workBook, "DataGridExport.xlsx");
    handleClose();
  };

  // Export to PDF
  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.text("Data Grid Export", 20, 10);
    doc.autoTable({
      head: [columns.map((column) => column.headerName)],
      body: rows.map((row) => columns.map((column) => row[column.field])),
    });
    doc.save("DataGridExport.pdf");
    handleClose();
  };

  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "30px",
        marginRight: "60px",
      }}
    >
      <div className="flex">
        <div>
          <GridToolbarColumnsButton
            slotProps={{
              button: {
                style: { color: "#03A9E7" },
              },
            }}
          />
        </div>
        <GridToolbarFilterButton
          slotProps={{
            button: {
              style: { color: "#03A9E7" },
            },
          }}
        />
        <GridToolbarDensitySelector
          slotProps={{
            button: {
              style: { color: "#03A9E7" },
            },
          }}
        />
        {/* <GridToolbarExport
          slotProps={{
            button: {
              style: { color: "#03A9E7" },
            },
          }}
        /> */}

        <button
          onClick={handleClick}
          style={{
            borderRadius: 2, // Rounded corners
            color: "#03A9E7",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.08)", // Adds a subtle hover background
            },
          }}
        >
          <DownloadIcon />
          EXPORT
        </button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={exportToExcel}>Export to Excel</MenuItem>
          <MenuItem onClick={exportToPdf}>Export to PDF</MenuItem>
        </Menu>
      </div>
      <div className="flex ">
        <GridToolbarQuickFilter
          style={{
            backgroundColor: "#d3d3d350",
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 12,
            paddingRight: 12,
            borderRadius: 6,
          }}
        />
      </div>
    </GridToolbarContainer>
  );
};
const ReusablePageComponent = (props) => {
  const childRef = useGridApiRef();

  const {
    heading,
    subHeading,
    column,
    rows,
    toggleSidebar,
    toggleSidebarEdit,
    toggleID,
    loading,
    toggleSidebarPickup,
    setSelectedWarehouse,
    setLoading,
    onRefChange,
    dontShowAdd,
    dontCheckboxSelection,
    showCustomTopBarComponent,
    deleteApi,
    specialEditDevice
  } = props;

  React.useEffect(() => {
    // Call the callback function provided by the parent
    // to pass the ref up to the parent
    if (onRefChange) {
      onRefChange(childRef);
    }
  }, []);

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [selectedItemsName, setSelectedItemsName] = React.useState("");

  const handleSelectionChange = (selectionModel) => {
    console.log(selectionModel);
    setSelectedItems(selectionModel);
    if (selectionModel.length > 0) {
      console.log(
        "selected ware house",
        selectionModel,
        setSelectedWarehouse,
        rows.find((element) => element["id"] === selectionModel[0]),
        typeof setSelectedWarehouse
      );
      setSelectedWarehouse(
        rows.find((element) => element["id"] === selectionModel[0])
      );
      setSelectedItemsName(
        rows.find((element) => element["id"] === selectionModel[0])[
          "warehouse_name"
        ]
      );
    }
  };

  const [columns, setColumns] = React.useState(column);
  const handleColumnWidthChange = (event, newValue, field) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.field === field ? { ...col, width: newValue } : col
      )
    );
  };

  return (
    <div className="bg-[#F5F7F9] h-screen">
      <div
        className="section-header"
        style={{ marginTop: "30px", alignItems: "flex-end" }}
      >
        <div>
          <p
            className="ml-8 mt-10 text-light text-4"
            style={{ color: "#70707060" }}
          >
            <label style={{ color: "#70707060" }}>Management / </label>
            <label style={{ color: "#707070" }}>{heading}</label>
          </p>
          <h2 className="text-[26px] ml-8 mt-2 font-800">{heading} </h2>
          <h5 className="text-[16px] ml-8 mt-2 font-800 text-slate-700">
            {subHeading}{" "}
          </h5>
        </div>
        {showCustomTopBarComponent && showCustomTopBarComponent()}
        {!dontShowAdd && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
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

                  const mapping = {
                    warehouse_name: "warehouse_name",
                    warehouse_address: "warehouse_address",
                    warehouse_city: "warehouse_city",
                    warehouse_state: "warehouse_state",
                    warehouse_country: "warehouse_country",
                    postal_code: "postal_code",
                    warehouse_contact_person: "contact_person",
                    warehouse_person_email: "contact_person_mail",
                    warehouse_contact_phone: "contact_person_number",
                    rto: "rto",
                    scheduled_start_time: "scheduled_start_time",
                    scheduled_end_time: "scheduled_end_time",
                    working_days: "working_days",
                  };

                  const updatedFormData = {
                    warehouse_name: {
                      title: "Warehouse Name",
                      value: "",
                      placeholder: "Warehouse A",
                      type: "input",
                    },
                    warehouse_address: {
                      title: "Address",
                      value: "",
                      placeholder: "address",
                      type: "input",
                    },
                    warehouse_city: {
                      title: "City",
                      value: "",
                      placeholder: "bhopal",
                      type: "input",
                    },
                    warehouse_state: {
                      title: "State",
                      value: "",
                      placeholder: "Madhya pradesh",
                      type: "input",
                    },
                    warehouse_country: {
                      title: "Country",
                      value: "",
                      placeholder: "India",
                      type: "input",
                    },
                    postal_code: {
                      title: "Postal Code",
                      value: "",
                      placeholder: "462001",
                      type: "number",
                    },
                    contact_person: {
                      title: "Contact Person Name",
                      value: "",
                      placeholder: "john williams",
                      type: "input",
                    },
                    contact_person_mail: {
                      title: "Contact Person Mail",
                      value: "",
                      placeholder: "john.williams@company.com",
                      type: "input",
                    },
                    contact_person_number: {
                      title: "Contact Person Phone",
                      value: "",
                      placeholder: "XXXXX - XXXXX",
                      type: "number",
                    },
                    scheduled_start_time: {
                      title: "Scheduled Start Time",
                      value: "10:00",
                      placeholder: "",
                      type: "time-picker",
                      required: true,
                    },
                    scheduled_end_time: {
                      title: "Scheduled End Time",
                      value: "17:00",
                      placeholder: "",
                      type: "time-picker",
                      required: true,
                    },
                    working_days: {
                      title: "Working Days",
                      value: [],
                      placeholder: "",
                      type: "days",
                    },
                    rto: {
                      title: "RTO",
                      value: false,
                      placeholder: "",
                      type: "boolean",
                    },
                  };

                  Object.entries(mapping).forEach(([rowKey, formKey]) => {
                    console.log(
                      targetRow[rowKey],
                      rowKey,
                      targetRow,
                      "FORMKEYYY"
                    );
                    updatedFormData[formKey] = {
                      ...updatedFormData[formKey],
                      value: targetRow[rowKey],
                    };
                  });
                  // Add more mappings as needed for other fields
                  return updatedFormData;
                };
                toggleSidebarEdit(convertRowFormat());
                toggleID(selectedItems[0]);
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
                          endpoint: "api/" + deleteApi + "/" + selectedItems[0],
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
        )}
        {specialEditDevice && <Button
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

                  const mapping = {
                    warehouse_name: "warehouse_name",
                    warehouse_address: "warehouse_address",
                    warehouse_city: "warehouse_city",
                    warehouse_state: "warehouse_state",
                    warehouse_country: "warehouse_country",
                    postal_code: "postal_code",
                    warehouse_contact_person: "contact_person",
                    warehouse_person_email: "contact_person_mail",
                    warehouse_contact_phone: "contact_person_number",
                    rto: "rto",
                    scheduled_start_time: "scheduled_start_time",
                    scheduled_end_time: "scheduled_end_time",
                    working_days: "working_days",
                  };

                  const updatedFormData = {
                    warehouse_name: {
                      title: "Warehouse Name",
                      value: "",
                      placeholder: "Warehouse A",
                      type: "input",
                    },
                    warehouse_address: {
                      title: "Address",
                      value: "",
                      placeholder: "address",
                      type: "input",
                    },
                    warehouse_city: {
                      title: "City",
                      value: "",
                      placeholder: "bhopal",
                      type: "input",
                    },
                    warehouse_state: {
                      title: "State",
                      value: "",
                      placeholder: "Madhya pradesh",
                      type: "input",
                    },
                    warehouse_country: {
                      title: "Country",
                      value: "",
                      placeholder: "India",
                      type: "input",
                    },
                    postal_code: {
                      title: "Postal Code",
                      value: "",
                      placeholder: "462001",
                      type: "number",
                    },
                    contact_person: {
                      title: "Contact Person Name",
                      value: "",
                      placeholder: "john williams",
                      type: "input",
                    },
                    contact_person_mail: {
                      title: "Contact Person Mail",
                      value: "",
                      placeholder: "john.williams@company.com",
                      type: "input",
                    },
                    contact_person_number: {
                      title: "Contact Person Phone",
                      value: "",
                      placeholder: "XXXXX - XXXXX",
                      type: "number",
                    },
                    scheduled_start_time: {
                      title: "Scheduled Start Time",
                      value: "10:00",
                      placeholder: "",
                      type: "time-picker",
                      required: true,
                    },
                    scheduled_end_time: {
                      title: "Scheduled End Time",
                      value: "17:00",
                      placeholder: "",
                      type: "time-picker",
                      required: true,
                    },
                    working_days: {
                      title: "Working Days",
                      value: [],
                      placeholder: "",
                      type: "days",
                    },
                    rto: {
                      title: "RTO",
                      value: false,
                      placeholder: "",
                      type: "boolean",
                    },
                  };

                  Object.entries(mapping).forEach(([rowKey, formKey]) => {
                    console.log(
                      targetRow[rowKey],
                      rowKey,
                      targetRow,
                      "FORMKEYYY"
                    );
                    updatedFormData[formKey] = {
                      ...updatedFormData[formKey],
                      value: targetRow[rowKey],
                    };
                  });
                  // Add more mappings as needed for other fields
                  return updatedFormData;
                };
                toggleSidebarEdit(convertRowFormat());
                toggleID(selectedItems[0]);
              }}
              text={
                <>
                  <FaPen />
                </>
              }
              squareOutlined
            />
        }
      </div>
      {/* <div className="m-2 text-bold">
        <h2 className="text-[32px] ml-8 mt-10">{heading} </h2>
        <p className="ml-8 mt-1 text-thin text-8">{subHeading} </p> */}
      {/* </div> */}
      <div
        style={{
          width: "80vw",
          maxWidth: "1200px",
          margin: "22px auto",
          paddingTop: 10,
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        {rows?.length === 0 ? (
          <>
            <NoRecords />
          </>
        ) : (
          <>
          
            <DataGrid
              apiRef={childRef}
              rows={rows}
              columns={column.map((col) => ({ ...col, resizable: true }))}
              // columns={column}
              disableColumnResize={false}
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
                toolbar: () => <CustomToolbar rows={rows} columns={column} />,
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
              checkboxSelection={dontCheckboxSelection ? false : true}
              //       dontShowAdd={true}
              // checkboxSelection={false}
              sx={{
                padding: 0,
                margin: 0,overflowX: 'scroll' ,
                height: "calc(100vh - 230px)",
                boxShadow: 0,
                width: "100%", // Ensure it takes full width
                minWidth: "900px", // Set a minimum width for horizontal scrolling to work
                border: 0,
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {},
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#black",
                  // color: "white",
                  // fill: "white",
                  // accentColor: "white",
                },
                ".MuiDataGrid-columnSeparator": {
                  display: "none",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
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

export default ReusablePageComponent;
