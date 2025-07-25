import React from "react";
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
// import AddIcon from "../common/core/icons/AddIcon";

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
    setLoading,
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
  const [selectedItemsName, setSelectedItemsName] = React.useState("");
  
  const handleSelectionChange = (selectionModel) => {
    console.log(selectionModel);
    setSelectedItems(selectionModel);
    if(selectionModel.length>0)
    setSelectedItemsName(rows.find(element => element['id'] === selectionModel[0])['warehouse_name']);
  };

  return (
    <div className="bg-[#FAFAF8] h-screen">
      <div className="section-header" style={{ marginTop: "30px" }}>
        <div>
          <p className="ml-8 mt-10 text-light text-4"><label style={{color: '#707070'}}>Home/</label>{heading}</p>
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
            text={`Create Pickup +`}
            onClick={() => {
              toggleSidebar();
            }}
          />{" "}
          {/* <Button
            customClass={selectedItems.length !== 1 ? "disabled" : ""}
            onClick={() => {
              if (selectedItems.length !== 1) {
                return;
              }
              console.log(rows)
              // toggleSidebar()
              const convertRowFormat = () => {
                const targetRow = rows.find(row => row.id === selectedItems[0]);
              
                if (!targetRow) {
                  console.error(`Row with id ${selectedItems[0]} not found.`);
                  return;
                }
              
                const mapping = 
                  {
                    "warehouse_name": "warehouse_name",
                    "warehouse_address": "warehouse_address",
                    "warehouse_city": "warehouse_city",
                    "warehouse_state": "warehouse_state",
                    "warehouse_country": "warehouse_country",
                    "postal_code": "postal_code",
                    "warehouse_contact_person": "contact_person",
                    "warehouse_person_email": "contact_person_mail",
                    "warehouse_contact_phone": "contact_person_number",
                    "rto": "rto",
                    "scheduled_start_time": "scheduled_start_time",
                    "scheduled_end_time": "scheduled_end_time",
                    "working_days": "working_days",
                  }
                
              
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
                }};
              
                Object.entries(mapping).forEach(([rowKey, formKey]) => {
                  console.log(targetRow[rowKey], rowKey, targetRow, 'FORMKEYYY')
                  updatedFormData[formKey] = {
                    ...updatedFormData[formKey],
                    value: targetRow[rowKey],
                  };
                });
                // Add more mappings as needed for other fields
              return updatedFormData
              };
              toggleSidebarEdit(convertRowFormat())
              toggleID(selectedItems[0])
            }}
            text={
              <>
                <FaPen />
              </>
            }
            squareOutlined
          /> */}
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
                        method: 'DELETE',
                        endpoint: "api/pickups/"+selectedItems[0],
                        alert: true
                      }).then(()=>{
                        setTimeout(()=>{
                          props.getData();
                        },200)
                      }).catch(()=>{

                      })
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
        {rows.length === 0?<>
        
          <NoRecords />
        </>:<>
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
        </>}
     
      </div>
    </div>
  );
};

export default ReusablePageComponent;
